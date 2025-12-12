const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/payment-controller");
const auth = require("../middleware/auth-middleware");

// Create Razorpay Order - Protected by Auth
router.post("/create-order", auth("user"), (req, res, next) => PaymentController.createPaymentOrder(req, res, next));

// Verify Payment - Protected by Auth
router.post("/verify", auth("user"), (req, res, next) => PaymentController.verifyPayment(req, res, next));

// Webhook handling - Usually no auth middleware, but signature verification inside controller
router.post("/webhook", (req, res, next) => PaymentController.handleWebhook(req, res, next));

module.exports = router;
