"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // Each cart belongs to a user
      Cart.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE", // if user is deleted, delete cart
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "cart",
      timestamps: false,
    }
  );

  return Cart;
};
