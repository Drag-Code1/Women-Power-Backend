"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OTP extends Model {
    static associate(models) {
      // no associations needed for now
    }
  }

  OTP.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "OTP",
      tableName: "otp",
      timestamps: false,
    }
  );

  return OTP;
};
