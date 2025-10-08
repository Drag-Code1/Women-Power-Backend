const express = require("express");
const router = express.Router();
const WishListController = require("../controller/wishlist-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  WishListController.addToWishList(req, res, next)
);
router.get("/:id", auth("user"), (req, res, next) =>
  WishListController.getAllProductsInWishList(req, res, next)
);
router.delete("/:id", auth("user"), (req, res, next) =>
  WishListController.removeFromWishList(req, res, next)
);

module.exports = router;
