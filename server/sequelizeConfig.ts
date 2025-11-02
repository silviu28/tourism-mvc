import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Price } from "./models/Price";
import { Feedback } from "./models/Feedback";
import { Admin } from "./models/Admin";
import { Image } from "./models/Image";
require('dotenv').config({ quiet: true });

const con: Sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: process.env.HOST,
  models: [User, Comment, Price, Feedback, Admin, Image],
});

// con.sync({ force: true });

export default con;