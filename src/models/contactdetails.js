"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ContactDetails extends Model {
    static associate(models) {
      // If you want, you can link messages to users in the future
      // ContactDetails.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  ContactDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      msg: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ContactDetails",
      tableName: "contact_details",
      timestamps: false,
    }
  );

  return ContactDetails;
};
