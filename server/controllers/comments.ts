import express from "express";
import { Comment } from "../models/Comment";
import { User } from "../models/User";
import userTokenAuthenticator from "../middleware/userTokenAuthenticator";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
const router = express.Router();

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

router.post("/api/comments", userTokenAuthenticator, async (req, res) => {
  try {
    const { username, comment } = req.body;
    const user = await User.findOne({
      where: {
        username
      }
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const query = await Comment.create({
      userId: user.id,
      comment,
      date: new Date()
    });
    console.log(query);

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/comments", adminTokenAuthenticator, async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    await comment.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;