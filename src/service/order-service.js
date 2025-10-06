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
      const { user_id, address_id, orderItems } = data;
      const orderData = { user_id, address_id };

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
}

module.exports = OrderService;
