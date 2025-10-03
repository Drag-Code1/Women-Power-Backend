"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });
      CartItem.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }

  CartItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "cart",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cart_item",
      timestamps: false,
    }
  );

  return CartItem;
};
