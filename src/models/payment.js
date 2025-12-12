"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            // Payment belongs to an Order
            Payment.belongsTo(models.Order, { foreignKey: "order_id" });
        }
    }

    Payment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "orders",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            transaction_id: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "Razorpay payment ID or similar",
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "pending",
                comment: "e.g., created, captured, failed",
            },
            gateway_response: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            sequelize,
            modelName: "Payment",
            tableName: "payments",
            timestamps: false,
        }
    );

    return Payment;
};
