"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("address", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM("Home", "Office"),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      pincode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      landmark: {
        type: Sequelize.STRING,
      },
      mobileNo: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("address");
  },
};
