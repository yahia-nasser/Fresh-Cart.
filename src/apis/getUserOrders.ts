"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export async function getUserOrders() {
  const token = (await getMyToken()) as string;

  if (!token) {
    toast.error("Login First");
  }

  const { id }: { id: string } = jwtDecode(token);

  const data = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  );

  return data;
}
