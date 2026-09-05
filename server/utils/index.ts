import crypto from "crypto";
import RefreshToken from "../models/RefreshToken";
import { Response } from "express";
const jwt = require("jsonwebtoken");

export const generateRefreshToken = async (userId: number, remember: boolean) => {
  const token = crypto.randomBytes(48).toString("hex");
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + (remember ? 30 : 1));

  await RefreshToken.create({
    userId,
    token,
    createdAt: now,
    expiresAt,
    remember,
  });

  return { token, expiresAt };
};

export const verifyAndRotateRefreshToken = async (req) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return null;
 
  const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!storedToken) return null;
 
  if (new Date(storedToken.expiresAt) < new Date()) {
    return null;
  }
 
  const newRefreshToken = crypto.randomBytes(48).toString("hex");
  const now = new Date();
  const newExpiresAt = new Date(now);
  newExpiresAt.setDate(newExpiresAt.getDate() + (storedToken.remember ? 30 : 1));
 
  await storedToken.update({
    token: newRefreshToken,
    createdAt: now,
    expiresAt: newExpiresAt,
  });
 
  return { storedToken, newRefreshToken, newExpiresAt };
};
 
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  refreshExpiresAt: Date
) => {
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: refreshExpiresAt,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: refreshExpiresAt,
  });
};

export const signAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRY,
  });
 
export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
};

