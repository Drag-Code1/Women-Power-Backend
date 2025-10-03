"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.belongsTo(models.Artist, { foreignKey: "artist_id" });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      p_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      p_images: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      thumbnail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      artist_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "artist",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sell_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specification: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isTrending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "product",
      timestamps: false,
    }
  );

  return Product;
};
