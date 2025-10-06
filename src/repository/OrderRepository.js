const CrudRepository = require("./CrudRepository");
const { Order } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class OrderRepository extends CrudRepository {
  constructor() {
    super(Order);
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
      const response = await this.model.findAll({
        order: [["order_date", "DESC"]],
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Cannot fetch orders",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderRepository;
