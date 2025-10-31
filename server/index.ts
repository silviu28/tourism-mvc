import express from "express";
const path = require('path');
require('dotenv').config({ quiet: true });
const cors = require('cors');
import sequelize from "./sequelizeConfig";

const commentRouter = require('./controllers/comments');
const feedbackRouter = require('./controllers/feedback');
const priceRouter = require('./controllers/prices');
const userRouter = require('./controllers/users');

const PORT = 4004;

const app = express();
app.use(express.static(
  path.join(__dirname, '..', 'views')
));
app.use(express.json());
app.use(cors());

app.use(
  commentRouter,
  feedbackRouter,
  priceRouter,
  userRouter,
);

(async function () {
  await sequelize.authenticate();
  console.log("Database connected");
})();

app.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});