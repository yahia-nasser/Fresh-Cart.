"use server";

import { getMyToken } from "@/utilites/token";

export async function getUserCartAction() {
  const token = await getMyToken();

  if (!token) {
    throw Error("Please Login First");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token as string,
    },
  });

  const data = await response.json();
  return data;
}
