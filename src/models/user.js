"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // One user has one cart
      User.hasOne(models.Cart, { foreignKey: "userId" });

      // One user can have many addresses
      User.hasMany(models.Address, { foreignKey: "userId" });

      // One user can give many product reviews
      User.hasMany(models.ProductReview, { foreignKey: "user_id" });

      // One user can give many artist reviews
      User.hasMany(models.ArtistReview, { foreignKey: "user_id" });

      // One user can place many orders
      User.hasMany(models.Order, { foreignKey: "user_id" });

      // One user can have many wishlist entries
      User.hasMany(models.Wishlist, { foreignKey: "user_id" });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      mobileNo: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      joining_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      role: {
        type: DataTypes.ENUM("user", "artist", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,

      hooks: {
        // Hook runs after user is created
        async afterCreate(user, options) {
          const { Cart } = sequelize.models;
          try {
            await Cart.create({
              userId: user.id,
            });
          } catch (error) {
            console.error("Failed to create cart for new user:", error);
          }
        },
      },
    }
  );

  return User;
};
