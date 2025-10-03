const ProductReviewService = require("../service/product-review-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const product_review_Serv = new ProductReviewService();

class ProductReviewController {
  //1.add new product review
  async createProductReview(req, res, next) {
    try {
      const response = await product_review_Serv.addNewProductReview(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(success(response, "Review sent successfully"));
    } catch (error) {
      next(error);
    }
  }

  //2.get product All reviews
  async getProductReviews(req, res, next) {
    try {
      const response = await product_review_Serv.getProductReviews(
        req.params.id
      );
      return res
        .status(StatusCodes.OK)
        .json(success(response, "All reviews retrived"));
    } catch (error) {
      next(error);
    }
  }

  //3.update
  async updateProductReview(req, res, next) {
    try {
      const response = await product_review_Serv.updateProductReview(
        req.params.id,
        req.body
      );
      return res
        .status(StatusCodes.OK)
        .json(success(response, "review updated"));
    } catch (error) {
      next(error);
    }
  }

  //4.delete
  async deleteProductReview(req, res, next) {
    try {
      const response = await product_review_Serv.deleteProductReview(
        req.params.id
      );
      return res.status(StatusCodes.OK).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductReviewController();
