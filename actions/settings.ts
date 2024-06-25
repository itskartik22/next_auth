"use server";
import bcrypt from "bcryptjs";
import { useCurrentUser as currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { SettingSchema } from "@/schemas";
import { error } from "console";
import { z } from "zod";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.name?.length === 0) {
    return { error: "Name can't be empty!" };
  }

  if (values.email && values.email !== user.email) {
    const emailExists = await db.user.findFirst({
      where: {
        email: values.email,
      },
    });

    if (emailExists && emailExists.id !== user.id) {
      return { error: "Email already exists!" };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    if (values.password === values.newPassword) {
      return { error: "New password can't be the same as the old password!" };
    }
    const valid = await bcrypt.compare(values.password, dbUser.password);
    if (!valid) {
      return { error: "Password is incorrect!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 12);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Profile updated successfully!" };
};
