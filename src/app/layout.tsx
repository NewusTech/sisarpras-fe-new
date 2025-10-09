import { Filter, FilterRegistryProvider } from "@/components/filters";
import { MyAlertDialog } from "@/components/shared/customAlertDialog";
import NetInfo from "@/components/shared/netInfo";
import ThemeProvider from "@/components/shared/themeProvider";
import { ToastProvider } from "@/components/shared/toast/toastComponent";
import { ImageProvider } from "@/image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import ServiceWorkerWarp from "@/components/shared/serviceWorkerWarp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SISARPAS",
    description: "Sistem Informasi Sarana dan Prasarana",
    icons: {
      icon: {
        url: "/", // replace this
      },
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  // default seo
  const tagManager = "";
  const googleTagManager = "";

  return (
    <html lang={"id"} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* GTM Script */}
        <Script id="GT">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagManager}');`}
        </Script>
        <Script id="GTM">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManager}');`}
        </Script>
      </head>
      <body className={cn(poppins.className, "scroll-smooth")}>
        <ThemeProvider>
          <QueryProvider>
            <NextTopLoader showSpinner={false} color="#475D37" />
            <FilterRegistryProvider>
              <Suspense>
                <ServiceWorkerWarp>
                  <Filter>
                    <ImageProvider>{children}</ImageProvider>
                  </Filter>
                </ServiceWorkerWarp>
                <NetInfo />
              </Suspense>
            </FilterRegistryProvider>
          </QueryProvider>
        </ThemeProvider>
        {/* GTM NoScript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${tagManager}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManager}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <MyAlertDialog />
        <ToastProvider />
      </body>
    </html>
  );
}
