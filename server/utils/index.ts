import crypto from "crypto";
import RefreshToken from "../models/RefreshToken";
import { Response } from "express";
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const WIKI_DOCS_ROOT = path.join(process.cwd(), "storage", "wiki");

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

export const placeAsDocumentAndGetPath = async (dir: string, html: string, title: string): Promise<string> => {
  const safeFolder = dir.replace(/^\/+/, "");
  const dirPath = path.join(WIKI_DOCS_ROOT, safeFolder);

  await fs.mkdir(dirPath, { recursive: true });

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const uniqueSuffix = crypto.randomBytes(6).toString("hex");
  const filename = `${slug}-${uniqueSuffix}.html`;

  const filePath = path.join(dirPath, filename);
  await fs.writeFile(filePath, html, "utf-8");

  return path.join(safeFolder, filename);
};

export const readDocument = async (relativePath: string): Promise<string> => {
  const fullPath = path.join(WIKI_DOCS_ROOT, relativePath);
  return fs.readFile(fullPath, "utf-8");
};