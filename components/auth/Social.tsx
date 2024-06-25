"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {
  const ProviderSignIn = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex gap-x-2 items-center w-full">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => ProviderSignIn("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={() => ProviderSignIn("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}
