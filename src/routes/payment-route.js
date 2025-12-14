const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/payment-controller");
const auth = require("../middleware/auth-middleware");

router.post("/order", auth("user"), (req, res, next) =>
  PaymentController.createOrder(req, res, next)
);

router.post("/verify", auth("user"), (req, res, next) =>
  PaymentController.verifyPayment(req, res, next)
);

module.exports = router;
