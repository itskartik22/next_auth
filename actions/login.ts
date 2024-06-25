"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateVerifiacationToken } from "@/lib/token";
import { getUserByEmail } from "@/data/user";

export default async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = validatedFields.data;

  const existUser = await getUserByEmail(email);
  if (!existUser || !existUser.email || !existUser.password) {
    return { error: "User not found!" };
  }

  // if (!existUser.emailVerified) {
  //   const verificationToken = await generateVerifiacationToken(existUser.email);
  //   return { success: "Email not verified. Confirmation email sent!" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Logged in successfull." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credential!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}
