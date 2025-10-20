const { Sequelize } = require('sequelize');
require('dotenv').config({ quiet: true });

module.exports = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: "localhost",
  port: 3306,
});