"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order belongs to a user
      Order.belongsTo(models.User, { foreignKey: "user_id" });

      // Order has a shipping address
      Order.belongsTo(models.Address, { foreignKey: "address_id" });

      // Order has many items
      Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: DataTypes.ENUM("delivered", "shipped", "processing", "rejected", "completed"),
        allowNull: false,
        defaultValue: "processing",
      },
      address_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "address", key: "id" },
        onDelete: "CASCADE",
      },
      payment_status: {
        type: DataTypes.ENUM("paid", "unpaid"),
        allowNull: false,
        defaultValue: "paid",
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: false,
      hooks: {
        beforeCreate: async (order) => {
          if (!order.id) {
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            order.id = `WM-ORD-${randomNum}`;
          }
        },
      },
    }
  );

  return Order;
};
