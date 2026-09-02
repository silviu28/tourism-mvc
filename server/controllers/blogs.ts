import express from "express";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import { Blog } from "../models/Blog";

const router = express.Router();

const PAGE_SIZE = 10;

router.get("/api/blogs", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const { rows, count } = await Blog.findAndCountAll({
      where: { archived: false },
      order: [["date", "DESC"]],
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * (page - 1),
    });

    return res.status(200).json({
      blogs: rows,
      totalCount: count,
      totalPages: Math.ceil(count / PAGE_SIZE),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Failed to fetch blog:", err);
    return res.status(500).json({ error: "Failed to fetch blog" });
  }
});

router.post("/api/blogs", adminTokenAuthenticator, async (req, res) => {
  try {
    const { title, html } = req.body;
    const { adminId } = (req as any).admin as { adminId: number }; // ts gaslighting

    if (!title || !html) {
      return res.status(400).json({ error: "title and html are required" });
    }

    const blog = await Blog.create({
      title,
      html,
      adminId,
      date: new Date(),
      archived: false,
    });

    return res.status(201).json(blog);
  } catch (err) {
    console.error("Failed to create blog:", err);
    return res.status(500).json({ error: "Failed to create blog" });
  }
});

router.put("/api/blogs/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = req.body;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blog.update({ ...updated });

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Failed to update blog:", err);
    return res.status(500).json({ error: "Failed to update blog" });
  }
});

router.delete("/api/blogs/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await blog.destroy();

    return res.status(204).end();
  } catch (err) {
    console.error("Failed to delete blog:", err);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;