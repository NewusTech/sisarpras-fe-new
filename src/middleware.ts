// import createMiddleware from "next-intl/middleware";
// import { isI18nEnabled, routing } from "./i18n/routing";
// import { NextResponse } from "next/server";

// // export default createMiddleware(routing);

// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
// };

// const middleware = isI18nEnabled
//   ? createMiddleware({
//       locales: routing.locales,
//       defaultLocale: routing.defaultLocale,
//       localePrefix: routing.localePrefix,
//     })
//   : () => NextResponse.next();

// export default middleware;

import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isI18nEnabled, routing } from "./i18n/routing";

export const config = {
  matcher: "/((?!_next|.*\\..*|api).*)",
};

const middlewareI18n = isI18nEnabled
  ? createMiddleware({
      locales: routing.locales,
      defaultLocale: routing.defaultLocale,
      localePrefix: routing.localePrefix,
    })
  : function middleware(request: NextRequest) {
      const { pathname } = request.nextUrl;

      // Allow next internals & static
      if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.includes(".") // file asset
      ) {
        return NextResponse.next();
      }

      // ⬅️ jika i18n NON-AKTIF, inject defaultLocale ke pathname
      const defaultLocale = routing.defaultLocale;

      // Hindari duplikasi jika sudah ada prefix
      const isAlreadyPrefixed = routing.locales.some((locale) =>
        pathname.startsWith(`/${locale}`)
      );

      if (!isAlreadyPrefixed) {
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${pathname}`;
        return NextResponse.rewrite(url); // ⬅️ Rewrite internal, tanpa ubah URL di browser
      }

      return NextResponse.next();
    };

export default middlewareI18n;
