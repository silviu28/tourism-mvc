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
  duration: z.number().min(1, "Duration too short")
}).strict();

export const updateNotificationSchema = addNotificationSchema.partial();

export const addPricingSchema = z
  .object({
    country: z.string().trim(),
    isAvailable: z.boolean(),
    travelHost: z.string().trim(),
    priceLower: z.number().min(1, "Price too low"),
    priceHigher: z.number().optional()
  })
  .strict()
  .refine(({ priceLower, priceHigher }) => priceHigher === undefined || priceLower <= priceHigher, {
    message: "Lower price bound must not be higher than upper bound",
    path: ["priceLower"]
  });

export const updatePricingSchema = addPricingSchema.partial();

export const addUserSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  
  dob: z.string()
    .trim()
    .min(1, "Date of birth is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    })
    .refine((val) => {
      const date = new Date(val);
      return date <= new Date();
    }, {
      message: "Date of birth cannot be in the future",
    }),
  
  username: z.string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be 3-18 characters")
    .max(18, "Username must be 3-18 characters")
    .regex(/^[a-zA-Z0-9_.-]+$/, "Username can only contain letters, numbers, underscores, dots, and hyphens"),
  
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .regex(/^\S+@\S+\.\S+$/, "Invalid email address"),
  
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  
  notify: z.boolean(),
}).strict();

export const updateUserSchema = addUserSchema.partial();

export const userLoginSchema = z.object({
  username: z.string().trim(),
  password: z.string().trim(),
  remember: z.boolean()
}).strict();

export const addWikiPostSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title is too long"),
  html: z.string()
    .trim()
    .min(1, "HTML is required")
    .max(2_000_000, "HTML is too long")
}).strict();

export const updateWikiPostSchema = addWikiPostSchema.partial()
  .extend({
    archived: z.boolean().optional(),
    htmlRef: z.string().trim(),
    pendingApproval: z.boolean().optional()
  });