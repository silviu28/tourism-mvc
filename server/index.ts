import express from "express";
const path = require('path');
require('dotenv').config({ quiet: true });
const cors = require('cors');
import sequelize from "./sequelizeConfig";
const cookieParser = require("cookie-parser");

const commentRouter = require('./controllers/comments');
const feedbackRouter = require('./controllers/feedback');
const priceRouter = require('./controllers/prices');
const userRouter = require('./controllers/users');
const imageRouter = require("./controllers/images");
const adminRouter = require("./controllers/admins");

const PORT = 4004;

const app = express();
app.use(express.static(
  path.join(__dirname, '..', 'views')
));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(
  commentRouter,
  feedbackRouter,
  priceRouter,
  userRouter,
  imageRouter,
  adminRouter,
);

(async function () {
  await sequelize.authenticate();
  console.log("Database connected");
})();

app.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});