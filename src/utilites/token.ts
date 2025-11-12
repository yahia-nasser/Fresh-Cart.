"use server";
import { decode, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function getMyToken() {
  const cookiesInstance = (await cookies()) as ReadonlyRequestCookies;
  const sessionToken = cookiesInstance.get("next-auth.session-token")?.value;

  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    console.error("NEXTAUTH_SECRET is not defined");
    return null;
  }

  if (!sessionToken) {
    return null;
  }

  const token = (await decode({
    token: sessionToken,
    secret: secret,
  })) as JWT;

  return token?.token;
}
