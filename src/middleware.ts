import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/login", "/register", "/forgot-password", "/otp"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  // 🔀 Redirect homepage "/" → "/subjects"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/subjects", request.url));
  }

  if (token && isPublic) {
    //Logged-in user should not visit login/register/resetPassword
    return NextResponse.redirect(new URL("/subjects", request.url));
  }

  if (!token && !isPublic) {
    // Guest trying to visit a protected route
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
