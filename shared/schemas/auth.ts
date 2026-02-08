import { z } from 'zod';

export const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password must contain at least one special character",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number",
  });
