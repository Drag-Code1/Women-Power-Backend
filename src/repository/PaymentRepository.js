const CrudRepository = require("./CrudRepository");
const { Payment } = require("../models");
const AppError = require("../utils/errors/AppError");
const { StatusCodes } = require("http-status-codes");

class PaymentRepository extends CrudRepository {
    constructor() {
        super(Payment);
    }

    async getByOrderId(orderId) {
        try {
            const response = await this.model.findOne({
                where: { order_id: orderId },
            });
            return response;
        } catch (error) {
            throw new AppError(
                "Cannot fetch payment details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getByTransactionId(transactionId) {
        try {
            const response = await this.model.findOne({
                where: { transaction_id: transactionId },
            });
            return response;
        } catch (error) {
            throw new AppError(
                "Cannot fetch payment details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = PaymentRepository;
