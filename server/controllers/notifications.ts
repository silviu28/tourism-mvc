import express from "express";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import { Notification } from "../models/Notification";

const router = express.Router();

router.get("/api/notifications", adminTokenAuthenticator, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 10;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const { rows, count } = await Notification.findAndCountAll({
      order: [["publishDate", "DESC"]],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });

    return res.status(200).json({
      notifications: rows,
      totalCount: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch notifications:", err);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.get("/api/notifications/active", async (_req, res) => {
  try {
    const now = Date.now();

    const notifications = await Notification.findAll({
      order: [["publishDate", "DESC"]],
    });

    const active = notifications.filter(n => {
      const createdAtMs = new Date(n.publishDate).getTime();
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
      publishDate: new Date(),
    });

    return res.status(201).json(notification);
  } catch (err) {
    console.error("Failed to create notification:", err);
    return res.status(500).json({ error: "Failed to create notification" });
  }
});

router.put("/api/notifications/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = req.body;

    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    await notification.update({ ...updated });
    return res.status(200).json(notification);
  } catch (err) {
    console.error("Failed to update notification:", err);
    return res.status(500).json({ error: "Failed to update notification" });
  }
});

module.exports = router;