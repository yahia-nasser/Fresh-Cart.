"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";

export async function clearCart() {
  const token = (await getMyToken()) as string;

  if (!token) {
    throw Error("Please Login First");
  }

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { headers: { token: token } }
  );

  return data;
}
