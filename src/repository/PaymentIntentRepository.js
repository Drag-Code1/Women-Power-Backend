const CrudRepository = require("./CrudRepository");
const { PaymentIntent } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class PaymentIntentRepository extends CrudRepository {
  constructor() {
    super(PaymentIntent);
  }

  async findByRazorpayOrderId(orderId, options = {}) {
    try {
      const intent = await this.model.findOne({
        where: { razorpay_order_id: orderId },
        ...options,
      });
      if (!intent) {
        throw new AppError("Payment intent not found", StatusCodes.NOT_FOUND);
      }
      return intent;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Failed to fetch payment intent",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = PaymentIntentRepository;
