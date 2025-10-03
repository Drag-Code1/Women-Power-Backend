'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      p_Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      p_images: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'category', // table name
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      artist_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'artist', // table name
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      sell_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      specification: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isTrending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  },
};
