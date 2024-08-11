"use server";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const passwordRegex = new RegExp(/\d/);

// 이메일로 사용자를 찾아야 한다.
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "An account with this email does not exists."),
  // .refine(
  //   (email) => (email.includes("@zod.com") ? true : false),
  //   "Only @zod.com emails are allowed"
  // ),
  password: z.string(),
  // .min(5)
  // .regex(
  //   passwordRegex,
  //   "Password should contain at least one number(0123456789)"
  // ),
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

export async function logIn(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      fieldErrors: {
        email: fieldErrors.email || [],
        password: fieldErrors.password || [],
      },
      success: false,
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    console.log(ok);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password"],
          email: [],
        },
        success: false,
      };
    }
  }
  return {
    success: true,
    message: "Welcome!",
  };
}
