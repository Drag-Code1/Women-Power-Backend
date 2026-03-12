const Razorpay = require("razorpay");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

const PaymentIntentRepository = require("../repository/PaymentIntentRepository");
const ProductRepository = require("../repository/ProductRepository");
const OrderRepository = require("../repository/OrderRepository");
const OrderItemRepository = require("../repository/OrderItemRepository");
const AppError = require("../utils/errors/AppError");
const { sequelize } = require("../models");
const MailService = require("./mail-service");

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

class PaymentService {
  constructor() {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error(
        "Razorpay keys are missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
      );
    }
    this.razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    this.paymentIntentRepo = new PaymentIntentRepository();
    this.productRepo = new ProductRepository();
    this.orderRepo = new OrderRepository();
    this.orderItemRepo = new OrderItemRepository();
  }

  async createPaymentIntent({ userId, addressId, items }) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new AppError("No items provided for payment", StatusCodes.BAD_REQUEST);
    }

    // Fetch product details to calculate amount server-side
    const productIds = items.map((i) => i.productId);
    const products = await this.productRepo.model.findAll({
      where: { id: productIds },
    });

    if (products.length !== productIds.length) {
      throw new AppError(
        "One or more products are unavailable",
        StatusCodes.BAD_REQUEST
      );
    }

    let amountPaise = 0;
    const itemSnapshot = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      const basePrice = parseFloat(product.price);
      const discountAmount = (basePrice * (product.discount || 0)) / 100;
      const finalUnitPrice = +(basePrice - discountAmount).toFixed(2);

      if (finalUnitPrice <= 0) {
        throw new AppError(
          `Invalid price for product ${product.p_Name}`,
          StatusCodes.BAD_REQUEST
        );
      }

      const lineAmount = Math.round(finalUnitPrice * 100) * item.quantity;
      amountPaise += lineAmount;

      itemSnapshot.push({
        product_id: item.productId,
        quantity: item.quantity,
        unitPrice: finalUnitPrice.toFixed(2),
        name: product.p_Name,
        discount: product.discount,
      });
    }

    const razorpayOrder = await this.razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `wej_${Date.now()}`,
      payment_capture: 1,
      notes: { userId, addressId },
    });

    const intent = await this.paymentIntentRepo.create({
      user_id: userId,
      address_id: addressId,
      amount: amountPaise,
      currency: "INR",
      razorpay_order_id: razorpayOrder.id,
      status: "created",
      order_payload: JSON.stringify(itemSnapshot),
    });

    return {
      orderId: razorpayOrder.id,
      amount: amountPaise,
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
      paymentIntentId: intent.id,
    };
  }

  async verifyAndCreateOrder({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }) {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError("Incomplete payment details", StatusCodes.BAD_REQUEST);
    }

    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new AppError("Payment signature mismatch", StatusCodes.BAD_REQUEST);
    }

    const t = await sequelize.transaction();
    try {
      // Fetch payment details from Razorpay to ensure it is captured/authorized
      const paymentDetails = await this.razorpay.payments.fetch(
        razorpay_payment_id
      );

      if (
        !paymentDetails ||
        !["captured", "authorized"].includes(paymentDetails.status)
      ) {
        throw new AppError(
          `Payment not successful: ${paymentDetails?.status || "unknown"}`,
          StatusCodes.BAD_REQUEST
        );
      }

      if (paymentDetails.order_id !== razorpay_order_id) {
        throw new AppError(
          "Payment does not belong to this order",
          StatusCodes.BAD_REQUEST
        );
      }

      const intent = await this.paymentIntentRepo.findByRazorpayOrderId(
        razorpay_order_id,
        { transaction: t, lock: t.LOCK.UPDATE }
      );

      if (intent.status === "paid" && intent.order_id) {
        await t.commit();
        return { alreadyProcessed: true, orderId: intent.order_id };
      }

      const items = JSON.parse(intent.order_payload || "[]");
      if (!Array.isArray(items) || items.length === 0) {
        throw new AppError("No items stored for this payment", StatusCodes.BAD_REQUEST);
      }

      // Create order + items
      const order = await this.orderRepo.create(
        {
          user_id: intent.user_id,
          address_id: intent.address_id,
          payment_status: "paid",
        },
        { transaction: t }
      );

      const orderItemsPayload = items.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.unitPrice,
      }));

      await this.orderItemRepo.createMultiple(orderItemsPayload, { transaction: t });

      // Mark payment intent as paid and link order
      await this.paymentIntentRepo.update(
        intent.id,
        {
          status: "paid",
          order_id: order.id,
          razorpay_payment_id,
          razorpay_signature,
          // Store the method actually used for future reference
          payment_method: paymentDetails.method || null,
        },
        { transaction: t }
      );

      await t.commit();

      // Send email notification to admin
      try {
        const orderDetails = await this.orderRepo.getDetailedById(order.id);
        const productNames = orderDetails.OrderItems.map(
          (item) => item.Product.p_Name
        ).join(", ");

        const userAddress = orderDetails.Address
          ? `${orderDetails.Address.address}, ${orderDetails.Address.city}, ${orderDetails.Address.state} - ${orderDetails.Address.pincode}`
          : "N/A";

        const userName = `${orderDetails.User.firstName} ${orderDetails.User.lastName}`;
        const userEmail = orderDetails.User.email || "N/A";
        const userNumber = orderDetails.User.mobileNo || "N/A"; // Account mobile
        const userPhoneNumber = orderDetails.Address ? orderDetails.Address.mobileNo : "N/A"; // Delivery mobile

        const totalAmount = orderDetails.OrderItems.reduce((sum, item) => {
          return sum + (item.quantity * parseFloat(item.price));
        }, 0).toFixed(2);

        const subject = `New Order #${order.id} - Women Power`;
        const htmlContent = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; background-color: #fff;">
            <div style="text-align: center; margin-bottom: 25px;">
              <h1 style="color: #d81b60; margin-bottom: 5px; font-size: 28px;">New Order Received!</h1>
              <p style="color: #666; font-size: 16px;">Order ID: <strong>#${order.id}</strong></p>
            </div>
            
            <p style="font-size: 16px;">Hello Admin,</p>
            <p style="font-size: 16px;">A new order has been placed on the <strong>Women Power</strong> platform. Here are the customer and order details:</p>
            
            <div style="background-color: #fce4ec; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #ad1457; margin-top: 0; border-bottom: 1px solid #f8bbd0; padding-bottom: 10px;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #555; width: 40%;"><strong>Customer Name:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555;"><strong>Customer Email:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555;"><strong>User Number:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userNumber}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0; border-bottom: 1px solid #d1d5db; padding-bottom: 10px;">Delivery & Order Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #555; width: 40%;"><strong>Product Name(s):</strong></td>
                  <td style="padding: 8px 0; color: #333;">${productNames}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555;"><strong>User Address:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userAddress}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555;"><strong>User Phone Number:</strong></td>
                  <td style="padding: 8px 0; color: #333;">${userPhoneNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #555; font-size: 18px;"><strong>Total Amount:</strong></td>
                  <td style="padding: 8px 0; color: #d81b60; font-size: 18px;"><strong>₹${totalAmount}</strong></td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <p style="font-size: 14px; color: #888;">Please login to your admin dashboard to process this order.</p>
              <p style="font-size: 12px; color: #aaa; margin-top: 10px;">&copy; ${new Date().getFullYear()} Women Power. All rights reserved.</p>
            </div>
          </div>
        `;

        await MailService.sendMail(
          "namrtaguptadelhi@gmail.com",
          subject,
          htmlContent
        );
      } catch (mailError) {
        console.error("Failed to send order notification email:", mailError);
        // We don't throw here to avoid failing the payment verification
      }

      return { orderId: order.id };
    } catch (error) {
      await t.rollback();
      throw error instanceof AppError
        ? error
        : new AppError("Payment verification failed", StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = PaymentService;
