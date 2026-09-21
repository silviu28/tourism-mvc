import express from "express";
const path = require('path');
require('dotenv').config({ quiet: true });
const cors = require('cors');
import sequelize from "./sequelizeConfig";
import wholeRouting from "./controllers";
const cookieParser = require("cookie-parser");

const rateLimiter = require("express-rate-limit");

const PORT = 4004;
const app = express();

if (process.env.TEST !== "1" && process.env.TEST !== "true") {
  app.use(rateLimiter({
    windowMs: 60000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: "You are being rate limited"
  }));
}

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());
app.use(cookieParser());

app.use( ...wholeRouting() );

(async function () {
  await sequelize.authenticate();
  if (process.env.DB_ALTER === "true") {
    await sequelize.sync({ alter: true });
  }
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