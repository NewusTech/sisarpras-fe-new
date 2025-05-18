// import { NextConfig } from "next";
// import createNextIntlPlugin from "next-intl/plugin";

// const nextConfig: NextConfig = {};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);

// import { isI18nEnabled, routing } from "@/i18n/routing";
// import createNextIntlPlugin from "next-intl/plugin";
// import createI18nMiddleware from "next-intl/middleware";
// import { NextResponse } from "next/server";
// import type { NextConfig } from "next";

// const middleware = isI18nEnabled
//   ? createI18nMiddleware({
//       locales: routing.locales,
//       defaultLocale: routing.defaultLocale,
//       localePrefix: routing.localePrefix,
//     })
//   : () => NextResponse.next();

// // Konfigurasi middleware matcher dinamis
// export const config = {
//   matcher: isI18nEnabled
//     ? ["/", `/${routing.locales.join("|")}/:path*`]
//     : ["/((?!_next|favicon.ico|api).*)"],
// };

// // Konfigurasi Next.js utama (boleh ditambah lain kalau butuh)
// const nextConfig: NextConfig = {};

// // Bungkus dengan next-intl plugin
// const withNextIntl = createNextIntlPlugin({
//   // optional config di sini (misal messagesPath kalau custom)
// });

// export default withNextIntl(nextConfig);

import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin({
  // Kalau perlu, bisa override message path atau localePrefix manual di sini
  // default behavior: akan ambil dari `src/i18n/routing.ts` dan `src/i18n/request.ts`
});

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
