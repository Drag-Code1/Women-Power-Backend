"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("image", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      page_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("image");
  },
};
