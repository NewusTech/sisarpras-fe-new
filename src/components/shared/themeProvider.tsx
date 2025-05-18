// src/components/common/ThemeProvider.tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      //   attribute="data-theme"
      attribute={"class"}
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
