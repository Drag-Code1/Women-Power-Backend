"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Each event belongs to a category
      Event.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }

  Event.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      e_image: {
        type: DataTypes.STRING(700),
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("upcoming", "completed", "ongoing"),
        allowNull: false,
        defaultValue: "upcoming",
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      banner: {
        type: DataTypes.STRING(700),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Event",
      tableName: "event",
      timestamps: false,
    }
  );

  return Event;
};
