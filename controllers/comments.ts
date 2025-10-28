import express from "express";
import { Comment } from "./models/Comment";
import { User } from "./models/User";
const router = express.Router();

router.get('/comments', async (_req, res) => {
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

router.post('/comments', async (req, res) => {
  try {
    const { id, comment } = req.body;
    const query = await Comment.create({
      userId: id,
      comment,
      date: new Date()
    });
    console.log(query);

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/comments", async (req, res) => {
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