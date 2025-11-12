"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";

export async function updateProductCount(id: string, count: number) {
  const token = (await getMyToken()) as string;

  if (!token) {
    throw Error("Please Login First");
  }

  const value = { count: count };

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    value,
    { headers: { token: token } }
  );

  return data;
}
