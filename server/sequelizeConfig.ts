import { Sequelize } from "sequelize-typescript";
import wholeSchema from "./models";
require('dotenv').config({ quiet: true });

const isTestEnv = process.env.TEST === "1" || process.env.TEST === "true";
const databaseName = isTestEnv
  ? (process.env.DB_NAME_TEST || `${process.env.DB_NAME || "tourism"}_test`)
  : process.env.DB_NAME;

const con = new Sequelize({
  dialect: "mysql",
  database: databaseName,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: process.env.HOST,
  models: wholeSchema(),
});

export default con;