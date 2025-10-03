const CrudRepository = require("./CrudRepository");
const { CartItem } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class CartItemRepository extends CrudRepository {
  constructor() {
    super(CartItem);
  }

  async getAllCartItems(id) {
    try {
      const response = await this.model.findAll({
        where: { cartId: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "fail to load items",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CartItemRepository;
