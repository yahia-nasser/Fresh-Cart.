"use server";

import { getMyToken } from "@/utilites/token";

export async function getUserWishlistAction() {
  const token = (await getMyToken()) as string;
  if (!token) {
    throw Error("Please Login First");
  }
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: { token: token },
    }
  );

  const { data } = await response.json();
  return data;
}
