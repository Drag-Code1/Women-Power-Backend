const express = require("express");
const router = express.Router();
const CartItemController = require("../controller/cart-item-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  CartItemController.createNewItem(req, res, next)
);
router.get("/:id", auth("user"), (req, res, next) =>
  CartItemController.getAllCartItems(req, res, next)
);
router.put("/:id", auth("user"), (req, res, next) =>
  CartItemController.updateItemInCart(req, res, next)
);
router.delete("/:id", auth("user"), (req, res, next) =>
  CartItemController.deleteItem(req, res, next)
);

module.exports = router;
