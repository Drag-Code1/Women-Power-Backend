"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    static associate(models) {
      // Each review belongs to a product
      ProductReview.belongsTo(models.Product, { foreignKey: "product_id" });
      // Each review belongs to a user
      ProductReview.belongsTo(models.User, { foreignKey: "user_id" });
      // Product has many reviews (for bidirectional mapping)
      models.Product.hasMany(ProductReview, { foreignKey: "product_id" });
      // User has many reviews
      models.User.hasMany(ProductReview, { foreignKey: "user_id" });
    }
  }

  ProductReview.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
          isInt: true,
        },
      },
      rating_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "ProductReview",
      tableName: "product_review",
      timestamps: false,
    }
  );

  return ProductReview;
};
