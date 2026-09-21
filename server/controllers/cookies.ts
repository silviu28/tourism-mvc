import express from "express";
import { postCookiePreferencesSchema } from "../schemas";
import BrowserIdentifier from "../models/BrowserIdentifier";
import { buildConsentCookie } from "../utils";

const router = express.Router();

router.post("/api/cookies", async (req, res) => {
  try {
    const parsed = postCookiePreferencesSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { permissions } = parsed.data;

    if (!req.cookies.identifier) {
      const uuid = crypto.randomUUID();
      await BrowserIdentifier.create({ uuid, permissions, date: new Date() });

      const cookie = buildConsentCookie(uuid, permissions);
      return res.cookie("consent", cookie, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }

    const existing = await BrowserIdentifier.findOne({
      where: { identifier: req.cookies.identifier as string }
    });
    if (!existing)
      return res.status(404).json({ error: "Cannot confirm validity of existing identifier" }); 
    await existing.update({ permissions });
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to assign identifier cookie" });
  }
});

module.exports = router;