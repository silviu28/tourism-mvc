import { Sequelize } from "sequelize-typescript";
import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Price } from "./models/Price";
import { Feedback } from "./models/Feedback";
import { Admin } from "./models/Admin";
import { Image } from "./models/Image";
import { NotificationCategory } from "./models/NotificationCategory";
import { Notification } from "./models/Notification";
import { BlogPost } from "./models/BlogPost";
import BlogLike from "./models/BlogLike";
import { BlogPostComment } from "./models/BlogPostComment";
import BlogPostCommentLike from "./models/BlogPostCommentLike";
import RefreshToken from "./models/RefreshToken";
import WikiPost from "./models/WikiPost";
import WikiPostLike from "./models/WikiPostLike";
import WikiPostContribution from "./models/WikiPostContribution";
import WikiPostCoauthor from "./models/WikiPostCoauthor";
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
  models: [User, Comment, Price, Feedback, Admin, Image, NotificationCategory, Notification, BlogPost, BlogLike, BlogPostComment, BlogPostCommentLike, RefreshToken,
    WikiPost, WikiPostLike, WikiPostContribution, WikiPostCoauthor
  ],
});

export default con;