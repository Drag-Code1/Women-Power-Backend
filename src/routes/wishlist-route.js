const express = require("express");
const router = express.Router();
const WishListController = require("../controller/wishlist-controller");

router.post("/", (req, res, next) =>
  WishListController.addToWishList(req, res, next)
);
router.get("/:id", (req, res, next) =>
  WishListController.getAllProductsInWishList(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  WishListController.removeFromWishList(req, res, next)
);

module.exports = router;
