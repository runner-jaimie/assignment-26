"use server";
import { z } from "zod";

const passwordRegex = new RegExp(/\d/);

const formSchema = z.object({
  username: z.string().min(5, "Username should be at least 5 characters long"),
  email: z
    .string()
    .email()
    .refine(
      (email) => (email.includes("@zod.com") ? true : false),
      "Only @zod.com emails are allowed"
    ),
  password: z
    .string()
    .min(10)
    .regex(
      passwordRegex,
      "Password should contain at least one number(0123456789)"
    ),
});

export interface FormState {
  errors?: string[];
  fieldErrors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  success: boolean;
  message?: string;
}

export async function handleForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      ...result.error.flatten(),
      success: false,
    };
  }
  return {
    success: true,
    message: "Welcome back!",
  };
}
