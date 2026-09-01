import express from "express";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import { Notification } from "../models/Notification";

const router = express.Router();

router.get("/api/notifications", adminTokenAuthenticator, async (_req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.get("/api/notifications/active", async (_req, res) => {
  try {
    const now = Date.now();

    const notifications = await Notification.findAll({
      order: [["createdAt", "DESC"]],
    });

    const active = notifications.filter(n => {
      const createdAtMs = new Date(n.createdAt).getTime();
      return createdAtMs + n.duration > now;
    });

    res.status(200).json(active);
  } catch (err) {
    console.error("Failed to fetch active notifications:", err);
    res.status(500).json({ error: "Failed to fetch active notifications" });
  }
});

router.post("/api/notifications", adminTokenAuthenticator, async (req, res) => {
  try {
    const { title, content, category, duration } = req.body;

    if (!title || !content || !duration) {
      return res.status(400).json({ error: "title, content, and duration are required" });
    }

    const notification = await Notification.create({
      title,
      content,
      category,
      duration,
      createdAt: new Date(),
    });

    return res.status(201).json(notification);
  } catch (err) {
    console.error("Failed to create notification:", err);
    return res.status(500).json({ error: "Failed to create notification" });
  }
});

module.exports = router;