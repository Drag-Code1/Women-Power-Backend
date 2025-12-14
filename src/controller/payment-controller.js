const { StatusCodes } = require("http-status-codes");
const PaymentService = require("../service/payment-service");
const success = require("../utils/success/success-response");

const paymentService = new PaymentService();

class PaymentController {
  async createOrder(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }

      const { addressId, items } = req.body;
      if (!addressId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ success: false, message: "addressId is required" });
      }

      const response = await paymentService.createPaymentIntent({
        userId,
        addressId,
        items,
      });

      return res
        .status(StatusCodes.OK)
        .json(success(response, "Razorpay order created"));
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req, res, next) {
    try {
      const response = await paymentService.verifyAndCreateOrder(req.body);
      return res
        .status(StatusCodes.OK)
        .json(success(response, "Payment verified and order placed"));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
