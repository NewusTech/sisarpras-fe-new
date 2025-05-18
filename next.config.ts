import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin({
  // Kalau perlu, bisa override message path atau localePrefix manual di sini
  // default behavior: akan ambil dari `src/i18n/routing.ts` dan `src/i18n/request.ts`
});

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
