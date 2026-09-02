import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Price } from "./models/Price";
import { Feedback } from "./models/Feedback";
import { Admin } from "./models/Admin";
import { Image } from "./models/Image";
import { NotificationCategory } from "./models/NotificationCategory";
import { Notification } from "./models/Notification";
import { Blog } from "./models/Blog";
require('dotenv').config({ quiet: true });

const con: Sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.PASSWORD || "",
  host: process.env.HOST,
  models: [User, Comment, Price, Feedback, Admin, Image, NotificationCategory, Notification, Blog],
});

con.sync({ alter: process.env.DB_ALTER === "true" });

export default con;