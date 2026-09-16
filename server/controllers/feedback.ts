import express from 'express';
import { Feedback } from '../models/Feedback';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
import { addFeedbackSchema } from '../schemas';
import { handlePagedQuery } from '../utils';
const router = express.Router();

router.get("/api/feedback", adminTokenAuthenticator, async (req, res) => {
  return handlePagedQuery(Feedback, req, res);
});

router.post("/api/feedback", async (req, res) => {
  try {
    const parsed = addFeedbackSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { feedback } = parsed.data;
    const query = await Feedback.create({ feedback });
    return res.status(200).json(query);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/api/feedback/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    await feedback.destroy();
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;