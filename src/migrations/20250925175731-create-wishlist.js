"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("wish_list", {
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
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "product", key: "id" },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("wish_list");
  },
};
