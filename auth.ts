import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { getUserByEmail, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { getAccountByUserId } from "./lib/account";



export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      // const existUser = await getUserById(user.id as string);
      // //prevent login if email is not verified
      // if (!existUser?.emailVerified) {
      //   return false;
      // }
      // //Todo: Add 2FA verification

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existUser = await getUserById(token.sub);
      if (!existUser) return token;

      const existingAccount = await getAccountByUserId(existUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existUser.name;
      token.email = existUser.email;
      token.role = existUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
