const PaymentRepository = require("../repository/PaymentRepository");
const OrderRepository = require("../repository/OrderRepository");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/AppError");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { sequelize } = require("../models");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentService {
    constructor() {
        this.paymentRepo = new PaymentRepository();
        this.orderRepo = new OrderRepository();
    }

    // Create Razorpay Order
    async createPaymentOrder(data) {
        try {
            const { amount, currency, receipt, notes } = data;

            const options = {
                amount: amount * 100, // Amount in paise
                currency: currency || "INR",
                receipt,
                notes,
            };

            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            throw new AppError(
                "Failed to create Razorpay order",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    // Verify Payment
    async verifyPayment(data) {
        const t = await sequelize.transaction();
        try {
            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                order_id, // Internal Order ID
            } = data;

            const body = razorpay_order_id + "|" + razorpay_payment_id;

            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature === razorpay_signature) {
                // Payment is authentic

                // 1. Update Order Status
                const order = await this.orderRepo.get(order_id);
                await this.orderRepo.update(
                    order_id,
                    {
                        payment_status: "paid",
                        status: "processing", // Move to processing after payment
                        transaction_id: razorpay_payment_id,
                        payment_method: "razorpay",
                    },
                    { transaction: t }
                );

                // 2. Create Payment Record
                await this.paymentRepo.create(
                    {
                        order_id: order_id,
                        transaction_id: razorpay_payment_id,
                        payment_method: "razorpay",
                        amount: order.amount,
                        status: "captured",
                        gateway_response: {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        },
                    },
                    { transaction: t }
                );

                await t.commit();
                return { success: true, message: "Payment verified successfully" };
            } else {
                throw new AppError("Invalid Signature", StatusCodes.BAD_REQUEST);
            }
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
}

module.exports = PaymentService;
