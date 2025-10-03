const { StatusCodes } = require("http-status-codes");
const { Product } = require("../models");
const AppError = require("../utils/errors/AppError");
const CrudRepository = require("./CrudRepository");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }

  async getAllProducts() {
    try {
      const response = await this.model.findAll({
        attributes: [
          "id",
          "p_Name",
          "thumbnail",
          "category_id",
          "price",
          "discount",
          "isTrending",
        ],
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Fail to fetch all products.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ProductRepository;
