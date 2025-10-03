"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    static associate(models) {
      // Wishlist belongs to a User
      Wishlist.belongsTo(models.User, { foreignKey: "user_id" });

      // Wishlist belongs to a Product
      Wishlist.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  Wishlist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Wishlist",
      tableName: "wish_list",
      timestamps: false,
    }
  );

  return Wishlist;
};
