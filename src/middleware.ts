import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!_next|.*\\..*|api).*)",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const loginUrl = new URL("/login", request.url);
  const dashboardUrl = new URL("/dashboard", request.url);

  // ✅ Skip static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ✅ Special case: root → redirect tergantung login
  if (pathname === "/") {
    if (!token) return NextResponse.redirect(loginUrl);
    return NextResponse.redirect(dashboardUrl);
  }

  // 🧱 PUBLIC ROUTES
  const publicRoutes = ["/login", "/register", "/forgot-password"];
  const isPublic = publicRoutes.includes(pathname);

  // 🔐 Tidak punya token dan bukan halaman public → ke login
  if (!token && !isPublic) {
    return NextResponse.redirect(loginUrl);
  }

  // 🚫 Sudah login tapi buka /login → ke dashboard
  if (token && pathname === "/login") {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp > now) {
        return NextResponse.redirect(dashboardUrl);
      }
    } catch {
      // kalau token invalid, hapus cookie dan biarkan tetap di /login
      const res = NextResponse.next();
      res.cookies.delete("accessToken");
      return res;
    }
  }

  // ✅ Validasi token untuk semua halaman selain public
  if (token && !isPublic) {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete("accessToken");
        return res;
      }

      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("accessToken");
      return res;
    }
  }

  return NextResponse.next();
}
