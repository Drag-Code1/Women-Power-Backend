"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("event", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      e_image: {
        type: Sequelize.STRING(700),
        allowNull: true,
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
      date_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("upcoming", "completed", "ongoing"),
        allowNull: false,
        defaultValue: "upcoming",
      },
      keywords: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banner: {
        type: Sequelize.STRING(700),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("event");
  },
};
