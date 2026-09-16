import z from "zod";

export const createBlogPostSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  html: z.string()
    .trim()
    .min(1, "HTML content is required")
    .max(2_000_000, "Too much HTML content"),
  description: z.string()
    .trim()
    .max(511, "Description is too long")
    .optional()
}).strict();

export const updateBlogPostSchema = createBlogPostSchema.partial();

export const addBlogPostCommentSchema = z.object({
  comment: z.string()
    .trim()
    .min(1, "No comment to post")
    .max(511, "Comment is too long")
}).strict();