require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.TIMEZONE,
    logging: false,
    pool: {
      max: 3,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.TIMEZONE,
    logging: false,
    pool: {
      max: 2,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.TIMEZONE,
    logging: false,
    pool: {
      max: 3,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
