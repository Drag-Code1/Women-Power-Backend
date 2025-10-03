"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.ENUM("delivered", "shipped", "processing"),
        allowNull: false,
        defaultValue: "processing",
      },
      address_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "address", key: "id" },
        onDelete: "CASCADE",
      },
      payment_status: {
        type: Sequelize.ENUM("paid", "unpaid"),
        allowNull: false,
        defaultValue: "paid",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
