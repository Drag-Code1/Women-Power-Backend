"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("course", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      thumbnail: {
        type: Sequelize.STRING(700),
        allowNull: true,
      },
      course_coordinator: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "category", key: "id" },
        onDelete: "SET NULL",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lessons: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      level: {
        type: Sequelize.ENUM("beginner", "intermediate", "advance"),
        allowNull: false,
        defaultValue: "beginner",
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("course");
  },
};
