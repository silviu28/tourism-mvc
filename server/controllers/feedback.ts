import express from 'express';
import { Feedback } from '../models/Feedback';
import adminTokenAuthenticator from '../middleware/adminTokenAuthenticator';
const router = express.Router();

router.get('/feedback', adminTokenAuthenticator, async (_req, res) => {
  const feedback = await Feedback.findAll();
  res.json(feedback);
});

router.post('/feedback', async (req, res) => {
  try {
    const { id, feedback } = req.body;
    const query = await Feedback.create({
      user_id: id,
      feedback
    });

    res.status(200).json(query);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/feedback/:id", adminTokenAuthenticator, async (req, res) => {
  try {
    const id = req.params.id;
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;