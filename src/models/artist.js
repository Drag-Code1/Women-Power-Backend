'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    static associate(models) {
      // One artist belongs to a category
      Artist.belongsTo(models.Category, { foreignKey: 'category_id' });

      // One artist can have many products
      Artist.hasMany(models.Product, { foreignKey: 'artist_id' });

      // One artist can have many reviews
      Artist.hasMany(models.ArtistReview, { foreignKey: 'artist_id' });
    }
  }

  Artist.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      artist_Name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      artist_profile_pic: {
        type: DataTypes.STRING(700), // increased length for long URLs
        allowNull: true,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      introduction: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      joining_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artist',
      timestamps: false,
    }
  );

  return Artist;
};
