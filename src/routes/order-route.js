const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order-controller");

router.post("/", (req, res, next) => OrderController.newOrder(req, res, next));
router.get("/:id", (req, res, next) =>
  OrderController.getOrders(req, res, next)
);
router.get("/", (req, res, next) =>
  OrderController.getAllOrders(req, res, next)
);

module.exports = router;
