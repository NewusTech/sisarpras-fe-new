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
      <div className="bg-white sm:py-8 py-3 sm:px-10 px-3 z-10 rounded-2xl shadow-lg">
        <main className="flex-1">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <Image
                src="/assets/images/logo.webp"
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <div className="mx-auto p-4 flex w-full flex-col justify-center space-y-6 sm:w-[34rem] rounded-lg">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
