"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_item", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "orders", key: "id" },
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "product", key: "id" },
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_item");
  },
};
