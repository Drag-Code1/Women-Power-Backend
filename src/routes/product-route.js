const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product-controller");

router.post("/", (req, res, next) =>
  ProductController.createProduct(req, res, next)
);
router.get("/", (req, res, next) =>
  ProductController.getAllProducts(req, res, next)
);
router.get("/filter", (req, res, next) =>
  ProductController.getProductsFilter(req, res, next)
);
router.get("/trending", (req, res, next) =>
  ProductController.getTrendingProducts(req, res, next)
);
router.get("/:id", (req, res, next) =>
  ProductController.getProductDetails(req, res, next)
);
router.get("/search/:search", (req, res, next) =>
  ProductController.searchProducts(req, res, next)
);
router.put("/:id", (req, res, next) =>
  ProductController.updateProduct(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ProductController.deleteProduct(req, res, next)
);

module.exports = router;
