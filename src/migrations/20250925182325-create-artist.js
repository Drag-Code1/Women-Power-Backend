'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artist', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      artist_Name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      artist_profile_pic: {
        type: Sequelize.STRING(700),
        allowNull: true,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'category', key: 'id' },
        onDelete: 'CASCADE',
      },
      introduction: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      joining_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('artist');
  },
};
