"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // One category has many products
      Category.hasMany(models.Product, { foreignKey: "category_id" });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING(700),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "category",
      timestamps: false,
    }
  );

  return Category;
};
