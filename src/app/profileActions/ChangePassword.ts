"use server";

import { getMyToken } from "@/utilites/token";
import axios from "axios";

export async function ChangePasswordAction({
  current,
  newPw,
  rePw,
}: {
  current: string;
  newPw: string;
  rePw: string;
}) {
  const token = (await getMyToken()) as string;

  if (!token) {
    throw new Error("Login first");
  }

  const values = {
    currentPassword: current,
    password: newPw,
    rePassword: rePw,
  };

  const { data } = await axios.put(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    values,
    { headers: { token: token } }
  );

  return data;
}
