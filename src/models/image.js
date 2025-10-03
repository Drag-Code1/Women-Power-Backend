"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // Add associations here later if needed
      // e.g., if you want to link images to a product or category
    }
  }

  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      page_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING, // or ENUM("banner", "thumbnail", "gallery") if limited types
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "image",
      timestamps: false,
    }
  );

  return Image;
};
