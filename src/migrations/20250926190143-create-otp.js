'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expiry: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otp');
  },
};
