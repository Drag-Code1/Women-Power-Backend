"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart_item", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cart",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cart_item");
  },
};
