"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PaymentIntent extends Model {
    static associate(models) {
      PaymentIntent.belongsTo(models.User, { foreignKey: "user_id" });
      PaymentIntent.belongsTo(models.Address, { foreignKey: "address_id" });
      PaymentIntent.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }

  PaymentIntent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      razorpay_signature: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "INR",
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("created", "paid", "failed"),
        allowNull: false,
        defaultValue: "created",
      },
      order_payload: {
        type: DataTypes.TEXT, // JSON string of items snapshot
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PaymentIntent",
      tableName: "payment_intents",
      timestamps: false,
    }
  );

  return PaymentIntent;
};
