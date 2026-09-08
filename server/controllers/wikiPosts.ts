import express from "express";
import userTokenAuthenticator from "../middleware/userTokenAuthenticator";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import WikiPost from "../models/WikiPost";
import { placeAsDocumentAndGetPath, readDocument } from "../utils";
import { User } from "../models/User";
import { Op } from "sequelize";

const router = express.Router();

router.get("/api/wiki", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 10;
    const search = req.query.search as string | undefined;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const where: any = { pendingApproval: false };

    if (search && search.trim()) {
      where.title = { [Op.like]: `%${search.trim()}%` };
    }

    const { rows, count } = await WikiPost.findAndCountAll({
      where,
      order: [["date", "DESC"]],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });

    return res.status(200).json({
      content: rows,
      totalCount: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch wiki pages:", err);
    return res.status(500).json({ error: "Failed to fetch wiki pages" });
  }
});

router.get("/api/wiki/admin", adminTokenAuthenticator, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 10;
    const search = req.query.search as string | undefined;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const where: any = { };

    if (search && search.trim()) {
      where.title = { [Op.like]: `%${search.trim()}%` };
    }

    const { rows, count } = await WikiPost.findAndCountAll({
      where,
      order: [["date", "DESC"]],
      limit: pageSize,
      offset: pageSize * (page - 1),
    });

    return res.status(200).json({
      content: rows,
      totalCount: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch wiki pages:", err);
    return res.status(500).json({ error: "Failed to fetch wiki pages" });
  }
});

router.get("/api/wiki/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const wikiPost = await WikiPost.findByPk(id, {
      include: [
          { model: User, as: "user", attributes: ["id", "username"] },
          { model: User, as: "coauthors", attributes: ["id", "username"] },
        ],
    });

    if (!wikiPost) {
      return res.status(404).json({ error: "Wiki page not found" });
    }

    const html = await readDocument(wikiPost.htmlRef);
    return res.status(200).json({ wikiPost, html });
  } catch (err) {
    console.error("Failed to fetch wiki page:", err);
    return res.status(500).json({ error: "Failed to fetch wiki page" });
  }
});

router.post("/api/wiki", userTokenAuthenticator, async (req, res) => {
  try {
    const { title, html } = req.body;
    const userId = (req as any).id;

    if (!title || !html) {
      return res.status(400).json({ error: "title and htmlRef are required" });
    }

    const htmlRef = await placeAsDocumentAndGetPath("/wiki", html, title);

    const wikiPost = await WikiPost.create({
      title,
      htmlRef,
      userId,
      date: new Date(),
      archived: false,
    });

    return res.status(201).json(wikiPost);
  } catch (err) {
    console.error("Failed to create wiki page:", err);
    return res.status(500).json({ error: "Failed to create wiki page" });
  }
});

router.put("/api/wiki/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, htmlRef, archived, pendingApproval } = req.body;

    const wikiPost = await WikiPost.findByPk(id);

    if (!wikiPost) {
      return res.status(404).json({ error: "Wiki page not found" });
    }

    await wikiPost.update({ title, htmlRef, archived, pendingApproval });

    return res.status(200).json(wikiPost);
  } catch (err) {
    console.error("Failed to update wiki page:", err);
    return res.status(500).json({ error: "Failed to update wiki page" });
  }
});

module.exports = router;