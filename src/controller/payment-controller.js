const PaymentService = require("../service/payment-service");
const { StatusCodes } = require("http-status-codes");
const success = require("../utils/success/success-response");

const paymentService = new PaymentService();

class PaymentController {

    async createPaymentOrder(req, res, next) {
        try {
            const response = await paymentService.createPaymentOrder(req.body);
            return res
                .status(StatusCodes.CREATED)
                .json(success(response, "Payment order created"));
        } catch (error) {
            next(error);
        }
    }

    async verifyPayment(req, res, next) {
        try {
            const response = await paymentService.verifyPayment(req.body);
            return res
                .status(StatusCodes.OK)
                .json(success(response, "Payment verified"));
        } catch (error) {
            next(error);
        }
    }

    // Optional: Webhook handler
    async handleWebhook(req, res, next) {
        // Implement webhook signature verification here using req.headers['x-razorpay-signature']
        // ...
        res.status(StatusCodes.OK).json({ status: "ok" });
    }
}

module.exports = new PaymentController();
