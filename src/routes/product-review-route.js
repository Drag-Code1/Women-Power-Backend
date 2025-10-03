const express = require("express");
const router = express.Router();
const ProductReviewController = require("../controller/product-review-controller");

router.post("/", (req, res, next) =>
  ProductReviewController.createProductReview(req, res, next)
);
router.get("/:id", (req, res, next) =>
  ProductReviewController.getProductReviews(req, res, next)
);
router.put("/:id", (req, res, next) =>
  ProductReviewController.updateProductReview(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ProductReviewController.deleteProductReview(req, res, next)
);

module.exports = router;
