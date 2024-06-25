import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials);

        if (!validatedField.success) {
          return null;
        }

        const { email, password } = validatedField.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
