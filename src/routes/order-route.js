const express = require("express");
const router = express.Router();
const OrderController = require("../controller/order-controller");

router.post("/", (req, res, next) =>
  OrderController.newOrder(req, res, next)
);

module.exports = router;