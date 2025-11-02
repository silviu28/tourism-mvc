import express from "express";
import { Admin } from "../models/Admin";
import adminTokenAuthenticator from "../middleware/adminTokenAuthenticator";
const router = express.Router();

router.get("/admins", async (_req, res) => {
  const admins = await Admin.findAll();
  res.json(admins);
});

router.get("/admin/auth", adminTokenAuthenticator, async (_req, res) => {
  res.status(200).send("Access to admin controls in permitted");
});

module.exports = router;