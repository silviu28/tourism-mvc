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

const rateLimiter = require("express-rate-limit");

const PORT = 4004;
const app = express();

app.use(rateLimiter({
  windowMs: 60000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "You are being rate limited"
}));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
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

app.get("/index", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Health check endpoint
app.get("/health", (_req, res) => {
  res.send("health is pretty good");
});

app.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});