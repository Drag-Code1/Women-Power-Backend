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

    await queryInterface.addConstraint("wish_list", {
      fields: ["user_id", "product_id"],
      type: "unique",
      name: "unique_user_product",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("wish_list", "unique_user_product");
    await queryInterface.dropTable("wish_list");
  },
};
