const OrderRepository = require("../repository/OrderRepository");
const OrderItemRepository = require("../repository/OrderItemRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");
const { sequelize } = require("../models");

class OrderService {
  constructor() {
    this.orderRepo = new OrderRepository();
    this.orderItemRepo = new OrderItemRepository();
  }

  //1.create new order
  async addNewOrder(data) {
    const t = await sequelize.transaction();
    try {
      const { user_id, address_id, orderItems, amount } = data;
      // Default to pending for both
      const orderData = {
        user_id,
        address_id,
        amount: amount || 0,
        status: 'pending',
        payment_status: 'pending'
      };

      const order = await this.orderRepo.create(orderData, { transaction: t });

      const itemsToInsert = orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      }));

      await this.orderItemRepo.createMultiple(itemsToInsert, {
        transaction: t,
      });

      await t.commit();
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

  // 4. Cancel Order
  async cancelOrder(orderId) {
    try {
      const order = await this.orderRepo.get(orderId);
      if (!order) {
        throw new AppError("Order not found", StatusCodes.NOT_FOUND);
      }

      // Check logic if order can be cancelled (e.g. not already shipped)
      if (order.status === 'shipped' || order.status === 'delivered') {
        throw new AppError("Cannot cancel shipped or delivered order", StatusCodes.BAD_REQUEST);
      }

      const response = await this.orderRepo.update(orderId, {
        status: 'cancelled',
        // Optionally trigger refund logic here if payment_status was 'paid'
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OrderService;
