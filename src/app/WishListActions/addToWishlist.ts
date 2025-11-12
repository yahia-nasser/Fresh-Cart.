"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";

export async function addToWishlistAction(id: string) {
  const token = (await getMyToken()) as string;
  if (!token) {
    throw Error("Please Login First");
  }

  const value = {
    productId: id,
  };

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    value,
    { headers: { token: token } }
  );

  return data;
}
