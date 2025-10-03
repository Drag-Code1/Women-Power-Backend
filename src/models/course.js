"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Each course belongs to a category
      Course.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }

  Course.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      thumbnail: {
        type: DataTypes.STRING(700),
        allowNull: true,
      },
      course_coordinator: {
        type: DataTypes.STRING(60),
        allowNull: false,
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
      lessons: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      level: {
        type: DataTypes.ENUM("beginner", "intermediate", "advance"),
        allowNull: false,
        defaultValue: "beginner",
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
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "course",
      timestamps: false,
    }
  );

  return Course;
};
