const OrderRepository = require("../repository/OrderRepository");
const OrderItemRepository = require("../repository/OrderItemRepository");
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");
const { sequelize } = require("../models");
const MailService = require("./mail-service");

class OrderService {
  constructor() {
    this.orderRepo = new OrderRepository();
    this.orderItemRepo = new OrderItemRepository();
  }

  //1.create new order
  async addNewOrder(data) {
    const t = await sequelize.transaction();
    try {
      const { user_id, address_id, orderItems } = data;
      // Generate custom order ID (Format: WM-ORD-XXXXXX)
      const customOrderId = `WM-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = { id: customOrderId, user_id, address_id };

      const order = await this.orderRepo.create(orderData, { transaction: t });

      const itemsToInsert = orderItems.map((item) => ({
        ...item,
        id: crypto.randomUUID(),
        order_id: order.id,
      }));

      await this.orderItemRepo.createMultiple(itemsToInsert, {
        transaction: t,
      });

      await t.commit();

      // Send email notification to admin
      try {
        const orderDetails = await this.getOrderDetail(order.id);
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
              <p style="color: #666; font-size: 14px;">Date: <strong>${new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</strong></p>
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

        // Send order confirmation email to the user (customer)
        if (userEmail && userEmail !== "N/A") {
          const userSubject = `Order Confirmation #${order.id} - Women Power`;
          const userHtmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; padding: 30px; border-radius: 12px; background-color: #fff;">
              <div style="text-align: center; margin-bottom: 25px;">
                <h1 style="color: #d81b60; margin-bottom: 5px; font-size: 28px;">Order Confirmed!</h1>
                <p style="color: #666; font-size: 16px;">Order ID: <strong>#${order.id}</strong></p>
                <p style="color: #666; font-size: 14px;">Date: <strong>${new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</strong></p>
              </div>
              
              <p style="font-size: 16px;">Hello ${userName},</p>
              <p style="font-size: 16px;">Thank you for your order on <strong>Women Power</strong>. Your order has been successfully placed and is confirmed!</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0; border-bottom: 1px solid #d1d5db; padding-bottom: 10px;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #555; width: 40%;"><strong>Product(s):</strong></td>
                    <td style="padding: 8px 0; color: #333;">${productNames}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555;"><strong>Delivery Address:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${userAddress}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-size: 18px;"><strong>Total Amount:</strong></td>
                    <td style="padding: 8px 0; color: #d81b60; font-size: 18px;"><strong>₹${totalAmount}</strong></td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 16px;">We will notify you once your order is dispatched.</p>

              <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
                <p style="font-size: 14px; color: #888;">Thank you for shopping with us!</p>
                <p style="font-size: 12px; color: #aaa; margin-top: 10px;">&copy; ${new Date().getFullYear()} Women Power. All rights reserved.</p>
              </div>
            </div>
          `;

          await MailService.sendMail(
            userEmail,
            userSubject,
            userHtmlContent
          );
        }
      } catch (mailError) {
        console.error("Failed to send order notification email:", mailError);
        // We don't throw here to avoid failing the order creation if only email fails
      }

      return order;
    } catch (error) {
      await t.rollback();
      throw new AppError(
        "Failed to create order.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get orders by user id
  async getOrders(userId) {
    try {
      const response = await this.orderRepo.getAllByUserId(userId);
      return response;
    } catch (error) {
      throw error;
    }
  }

  //3.get all orders
  async getAllOrders() {
    try {
      const response = await this.orderRepo.getAllRecent();
      return response;
    } catch (error) {
      throw error;
    }
  }

  //4.get order detail by id
  async getOrderDetail(id) {
    try {
      const response = await this.orderRepo.getDetailedById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  //5.update order status
  async updateOrderStatus(id, status) {
    try {
      const response = await this.orderRepo.update(id, { status });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderService;
