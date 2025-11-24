"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

export async function getMyToken() {
  const session = await getServerSession(authOptions);

  const token = session?.user?.token;

  if (!token) {
    return null;
  }

  return token as string;
}
