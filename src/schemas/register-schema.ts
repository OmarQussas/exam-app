import { z } from "zod";
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, " at least 2 characters long")
      .max(50, "must not exceed 50 characters"),
    lastName: z
      .string()
      .min(2, " at least 2 characters long")
      .max(50, "must not exceed 50 characters"),
    username: z.string().min(3, " at least 3 characters long"),
    email: z.email("Invalid email").nonempty("Your email is required"),
    phone: z
      .string()
      .regex(
        /^(\+?20)?1[0125][0-9]{8}$/,
        "Phone number must start with 010, 011, 012, or 015 (optionally with +20) and be 11 digits long"
      ),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long"
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"), // Checks empty field
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Error will be shown under confirmPassword field
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
