import express from "express";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import { BlogPost } from "../models/BlogPost";
import DOMPurify from "isomorphic-dompurify";
import userTokenAuthenticator from "../middleware/userTokenAuthenticator";
import BlogLike from "../models/BlogLike";

const router = express.Router();

const PAGE_SIZE = 10;

router.get("/api/blog", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;

    if (page < 1) {
      return res.status(400).json({ error: "page must be 1 or greater" });
    }

    const { rows, count } = await BlogPost.findAndCountAll({
      where: { archived: false },
      order: [["date", "DESC"]],
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * (page - 1),
    });

    return res.status(200).json({
      blogPosts: rows,
      totalCount: count,
      totalPages: Math.ceil(count / PAGE_SIZE),
      currentPage: page,
    });
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/api/blog/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogPost.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "BlogPost post not found" });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
    return res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

router.post("/api/blog", adminTokenAuthenticator, async (req, res) => {
  try {
    const { title, html } = req.body;
    const { adminId } = (req as any).admin as { adminId: number }; // ts gaslighting

    if (!title || !html) {
      return res.status(400).json({ error: "title and html are required" });
    }

    const blog = await BlogPost.create({
      title,
      html: DOMPurify.sanitize(html),
      adminId,
      date: new Date(),
      archived: false,
    });

    return res.status(201).json(blog);
  } catch (err) {
    console.error("Failed to create blog post:", err);
    return res.status(500).json({ error: "Failed to create blog post" });
  }
});

router.put("/api/blog/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;
    const updated = req.body;

    const blog = await BlogPost.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "BlogPost post not found" });
    }

    await blog.update({ ...updated });

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Failed to update blog post:", err);
    return res.status(500).json({ error: "Failed to update blog post" });
  }
});

router.delete("/api/blog/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogPost.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "BlogPost post not found" });
    }

    await blog.destroy();

    return res.status(204).end();
  } catch (err) {
    console.error("Failed to delete blog post:", err);
    return res.status(500).json({ error: "Failed to delete blog post" });
  }
});

router.post("/api/blog/:id/like", userTokenAuthenticator, async (req, res) => {
  try {
    const blogPostId = parseInt(req.params.id, 10);
    const { id: userId } = (req as any).user as { id: number };

    if (isNaN(blogPostId)) {
      return res.status(400).json({ error: "Invalid blog id" });
    }

    const blog = await BlogPost.findByPk(blogPostId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    try {
      await BlogLike.create({ blogPostId, userId });
    } catch (err: any) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Already liked" });
      }
      throw err;
    }

    const likeCount = await BlogLike.count({ where: { blogPostId } });

    return res.status(201).json({ liked: true, likeCount });
  } catch (err) {
    console.error("Failed to like blog:", err);
    return res.status(500).json({ error: "Failed to like blog" });
  }
});

module.exports = router;