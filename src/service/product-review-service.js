const ProductReviewRepo = require("../repository/ProductReviewRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");

class ProductReviewService {
  constructor() {
    this.product_review_Repo = new ProductReviewRepo();
  }

  //1.Add new product Review
  async addNewProductReview(data) {
    try {
      const response = await this.product_review_Repo.create(data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to create product review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //2.get All product Review by productId
  async getProductReviews(productId) {
    try {
      const response = await this.product_review_Repo.getAllByProductId(productId);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to fetch product reviews",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //3.update product Review
  async updateProductReview(id, data) {
    try {
      const response = await this.product_review_Repo.update(id, data);
      return response;
    } catch (error) {
      throw new AppError(
        "failed to update review",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  //4.delete product Review
  async deleteProductReview(id) {
    try {
      const response = await this.product_review_Repo.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductReviewService ;
