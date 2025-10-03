"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // Each order item belongs to an order
      OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });

      // Each order item belongs to a product
      OrderItem.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "orders", key: "id" },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "product", key: "id" },
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "order_item",
      timestamps: false,
    }
  );

  return OrderItem;
};
