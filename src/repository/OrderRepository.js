const CrudRepository = require("./CrudRepository");
const db = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class OrderRepository extends CrudRepository {
  constructor() {
    super(db.Order);
    this.db = db;
  }

  async getAllByUserId(userId) {
    try {
      const response = await this.model.findAll({
        where: { user_id: userId },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "cannot find orders",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllRecent() {
    try {
      const orders = await this.model.findAll({
        include: [
          {
            model: this.db.User,
            attributes: ["firstName", "lastName"],
          },
          {
            model: this.db.OrderItem,
            attributes: ["quantity", "price"],
          },
        ],
        order: [["order_date", "DESC"]],
      });

      // Format the response
      const formattedOrders = orders.map((order) => {
        const productCount = order.OrderItems.length;
        const totalPrice = order.OrderItems.reduce((sum, item) => {
          return sum + item.quantity * parseFloat(item.price);
        }, 0);

        return {
          id: order.id,
          order_date: order.order_date,
          firstName: order.User.firstName,
          lastName: order.User.lastName,
          productCount,
          totalPrice: totalPrice.toFixed(2),
        };
      });

      return formattedOrders;
    } catch (error) {
      throw new AppError(
        "Cannot fetch orders",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderRepository;
