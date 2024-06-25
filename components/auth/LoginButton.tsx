"use client"
import { useRouter } from "next/navigation";

 

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {

    const router = useRouter();

    const handleOnClick = () => {
        // console.log("clicked");
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
        <span>
            Todo : Implement Modal
        </span>
        );
    }

  return (
    <span onClick={handleOnClick}>
        {children}
    </span>
  );
}
