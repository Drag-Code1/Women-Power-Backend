"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ArtistReview extends Model {
    static associate(models) {
      // Each review belongs to an artist
      ArtistReview.belongsTo(models.Artist, { foreignKey: "artist_id" });

      // Each review belongs to a user
      ArtistReview.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  ArtistReview.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      artist_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "artist",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
          isInt: true,
        },
      },
      rating_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "ArtistReview",
      tableName: "artist_review",
      timestamps: false,
    }
  );

  return ArtistReview;
};
