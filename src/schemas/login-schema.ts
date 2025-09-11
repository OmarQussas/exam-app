import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email").nonempty("Your email is required"),
  password: z.string().nonempty("Your password is required"),
});
