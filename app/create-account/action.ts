"use server";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const passwordRegex = new RegExp(/\d/);

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const formSchema = z
  .object({
    username: z
      .string()
      .min(5, "Username should be at least 5 characters long")
      .refine(checkUniqueUsername, "This username is alreday taken"),
    email: z
      .string()
      .email()
      // .refine(
      //   (email) => (email.includes("@zod.com") ? true : false),
      //   "Only @zod.com emails are allowed"
      // )
      .refine(
        checkUniqueEmail,
        "There is an accont alredy registered with the email "
      ),
    password: z
      .string()
      .min(4)
      .regex(
        passwordRegex,
        "Password should contain at least one number(0123456789)"
      ),
    confirm_password: z.string().min(4),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccout(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    // 사용자가 db에 저장되면 사용자 로그인 시켜준다.
    // 랜덤 텍스트를 쿠키에 담아서 사용자에게 준다.
    const session = await getSession();

    session.id = user.id;
    await session.save();

    // redirect user to "/profile"
    redirect("/profile");
  }
}
