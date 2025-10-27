import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Price } from "./models/Price";
require('dotenv').config({ quiet: true });

export default new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: process.env.HOST,
  models: [User, Comment, Price],
});