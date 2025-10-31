"use client";

import GoogleIcon from "@/assets/Logo/GoogleIcon";
import { BASE_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const GoogleSignInButton = ({ className = "" }) => {
  const router = useRouter();
  const handleGoogle = () => {
    router.push(
      `${BASE_URL}/auth/google?redirectUrl=${encodeURIComponent(window.location.origin + "/login/callback")}`
    );
  };

  return (
    <Button
      type="button"
      className={`bg-white hover:bg-slate-50 text-black`}
      onClick={handleGoogle}
    >
      <GoogleIcon /> Login Google
    </Button>
  );
};

export default GoogleSignInButton;
