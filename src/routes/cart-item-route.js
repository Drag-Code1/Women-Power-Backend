const express = require("express");
const router = express.Router();
const CartItemController = require("../controller/cart-item-controller");

router.post("/", (req, res, next) =>
  CartItemController.createNewItem(req, res, next)
);
router.get("/", (req, res, next) =>
  CartItemController.getAllCartItems(req, res, next)
);
router.put("/:id", (req, res, next) =>
  CartItemController.updateItemInCart(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  CartItemController.deleteItem(req, res, next)
);

module.exports = router;
