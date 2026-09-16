import express from "express";
import { Comment } from "../models/Comment";
import { User } from "../models/User";
import userTokenAuthenticator from "../middleware/userTokenAuthenticator";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
import rateLimit from "express-rate-limit";
import { addCommentSchema } from "../schemas";

const router = express.Router();

const commentRateLimiter = rateLimit({
  windowMs: 60000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: "You are being rate limited"
});

router.get("/api/comments", async (_req, res) => {
  const comments = await Comment.findAll({
    attributes: ["id", "comment"],
    include: [
      {
        model: User,
        attributes: ["username"],
      }
    ],
  });
  res.json(comments);
});

router.post("/api/comments", commentRateLimiter, userTokenAuthenticator, async (req, res) => {
  try {
    const parsed = addCommentSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const id = (req as any).id!;
    const { comment } = parsed.data;

    const user = await User.findOne({
      where: { id }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const comm = await Comment.create({
      userId: user.id,
      comment,
      date: new Date()
    });
    console.log(comm);

    return res.status(200).json(comm);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/comments/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Not found" });
    }
    await comment.destroy();
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;