import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(18)
    .regex(/^[a-zA-Z0-9_.-]$/),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(8),
  birthdate: z.string(),
  notify: z.boolean(),
});

export default userSchema;