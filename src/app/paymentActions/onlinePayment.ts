"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";
import { toast } from "sonner";

export async function OnlinePay(id: string, values: object) {
  const token = (await getMyToken()) as string;

  if (!token) {
    toast.error("Login First");
  }

  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000
`,
    values,
    { headers: { token: token } }
  );
  return data;
}
