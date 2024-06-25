"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerifiacationToken } from "@/lib/token";

export default async function register(values: z.infer<typeof RegisterSchema>) {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, name, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 12);

    const existUser = await getUserByEmail(email);

    if (existUser) return { error: "User already exist!" };

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await generateVerifiacationToken(email);
    // Send email with verification token

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}
