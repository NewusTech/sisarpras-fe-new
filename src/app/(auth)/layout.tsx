import AnimatedBackground from "@/components/sections/auth/animatedBackground";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-warning-100">
      <AnimatedBackground />
      {children}
    </div>
  );
}
