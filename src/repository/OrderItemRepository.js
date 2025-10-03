const CrudRepository = require("./CrudRepository");
const { OrderItem } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class OrderItemRepository extends CrudRepository {
  constructor() {
    super(OrderItem);
  }

  async createMultiple(data, options = {}) {
    try {
      const response = await this.model.bulkCreate(data, { ...options });
      return response;
    } catch (error) {
      throw new AppError(
        "Fail to insert items.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = OrderItemRepository;
