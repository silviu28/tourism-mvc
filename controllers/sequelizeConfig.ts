import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Price } from "./models/Price";
import { Feedback } from "./models/Feedback";
require('dotenv').config({ quiet: true });

const con: Sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: process.env.HOST,
  models: [User, Comment, Price, Feedback],
});

con.sync({ alter: true });

export default con;