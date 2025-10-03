"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("artist_review", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      artist_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "artist", key: "id" },
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rating_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("artist_review");
  },
};
