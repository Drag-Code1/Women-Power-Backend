"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_review", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_review");
  },
};
