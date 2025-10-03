const CrudRepository = require("./CrudRepository");
const { ProductReview } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class ProductReviewRepository extends CrudRepository {
  constructor() {
    super(ProductReview);
  }

  async getAllByProductId(id) {
    try {
      const response = await this.model.findAll({
        where: { product_id: id },
      });
      return response;
    } catch (error) {
      throw new AppError(
        "Failed to fetch reviews for product",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ProductReviewRepository;
