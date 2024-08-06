"use server";
export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  if (password === "12345") {
    return { success: true, message: "Welcome back!" };
  } else {
    return {
      success: false,
      errors: ["Wrong password"],
    };
  }
}
