"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // Each address belongs to a user
      Address.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("Home", "Office"),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      landmark: {
        type: DataTypes.STRING,
      },
      mobileNo: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "address",
      timestamps: false,
    }
  );

  return Address;
};
