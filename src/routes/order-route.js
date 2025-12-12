const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  OrderController.newOrder(req, res, next)
);
router.get("/:id", auth(["user", "admin"]), (req, res, next) =>
  OrderController.getOrders(req, res, next)
);
router.get("/", auth("admin"), (req, res, next) =>
  OrderController.getAllOrders(req, res, next)
);

router.put("/:id/cancel", auth("user"), (req, res, next) =>
  OrderController.cancelOrder(req, res, next)
);

module.exports = router;
