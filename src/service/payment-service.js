const Razorpay = require("razorpay");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");

const PaymentIntentRepository = require("../repository/PaymentIntentRepository");
const ProductRepository = require("../repository/ProductRepository");
const OrderRepository = require("../repository/OrderRepository");
const OrderItemRepository = require("../repository/OrderItemRepository");
const AppError = require("../utils/errors/AppError");
const { sequelize } = require("../models");

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
