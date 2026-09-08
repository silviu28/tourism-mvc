import express from "express";
const path = require('path');
require('dotenv').config({ quiet: true });
const cors = require('cors');
import sequelize from "./sequelizeConfig";
const cookieParser = require("cookie-parser");
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

const commentRouter = require('./controllers/comments');
const feedbackRouter = require('./controllers/feedback');
const priceRouter = require('./controllers/prices');
const userRouter = require('./controllers/users');
const imageRouter = require("./controllers/images");
const adminRouter = require("./controllers/admins");
const notificationCategoryRouter = require("./controllers/notificationCategories");
const notificationRouter = require("./controllers/notifications");
const blogPostsRouter = require("./controllers/blogPosts");
const wikiPostsRouter = require("./controllers/wikiPosts");

const rateLimiter = require("express-rate-limit");

const PORT = 4004;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws/support" });

interface ChatMessage {
  id: number;
  from: "user" | "agent";
  text: string;
  roomId: string;
};

const rooms = new Map<String, Set<WebSocket>>();

wss.on("connection", (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("roomId") || "default";

  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId)!.add(ws);

  ws.on("message", (raw) => {
    const msg: ChatMessage = JSON.parse(raw.toString());

    rooms.get(roomId)?.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });

  ws.on("close", () => {
    rooms.get(roomId)?.delete(ws);
  });
});

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
  notificationCategoryRouter,
  notificationRouter,
  blogPostsRouter,
  wikiPostsRouter,
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