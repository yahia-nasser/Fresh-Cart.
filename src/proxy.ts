import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const authRoutes = [
    "/login",
    "/register",
    "/forgotPasswords",
    "/resetPassword",
    "/verifyCode",
  ];

  const protectedRoutes = [
    "/cart",
    "/payment",
    "/allorders",
    "/wishlist",
    "/changePassword",
    "/changeDetails",
  ];

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export default proxy;
