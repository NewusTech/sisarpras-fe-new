import { decodedProps } from "@/types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  const _mode = process.env.NEXT_PUBLIC_MODE;

  if (_mode === "UI") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Biarkan permintaan untuk file statis (seperti JS, CSS, dll.) lewat
  if (
    pathname.startsWith("/_next/") || // File internal Next.js
    pathname.startsWith("/static/") || // File di folder public/static
    pathname.startsWith("/favicon.ico") || // Favicon
    /\.(.*)$/.test(pathname) // File dengan ekstensi seperti .png, .jpg, .css, .js, dll.
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  // Cek apakah pengguna sudah berada di halaman 403
  if (pathname === "/403") {
    return NextResponse.next(); // Biarkan pengguna tetap di halaman 403
  }

  const forbiddenUrl = new URL("/403", request.url);
  const loginUrl = new URL("/login", request.url);

  if (pathname === "/login" && !token) {
    return NextResponse.next();
  }

  if (token) {
    try {
      // Redirect jika mencoba akses login/register saat sudah login
      if (pathname === "/login" && token) {
        const dashboardUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
      }
      // Decode JWT
      const decoded: decodedProps = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Cek apakah token expired
      if (decoded.exp < currentTime) {
        const loginUrl = new URL("/login", request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("accessToken");
        return response;
      }

      return NextResponse.next();
    } catch (error) {
      console.error("JWT decode error:", error);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.redirect(loginUrl);
}

// Middleware configuration
export const config = {
  matcher: ["/login/:path*"],
};
