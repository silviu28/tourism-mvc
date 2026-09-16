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

export const addFeedbackSchema = z.object({
  feedback: z.string()
    .trim()
    .min(1, "No feedback to post")
    .max(511, "Feedback is too long")
}).strict();

export const addCommentSchema = addBlogPostCommentSchema;

export const addImageSchema = z.object({
  src: z.string().trim(),
  alt: z.string()
    .trim()
    .max(511, "Alt text too long")
    .optional()
}).strict();

export const addNotificationSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "No notification title")
    .max(255, "Notification title too long"),
  content: z.string()
    .trim()
    .min(1, "No notification content")
    .max(511, "Notification content too long"),
  category: z.string().trim(),
  duration: z.number().min(1)
}).strict();

export const updateNotificationSchema = addNotificationSchema.partial();