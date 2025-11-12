"use server";

import axios from "axios";

export async function ResetPasswordAction(email: string, newPw: string) {
  const values = {
    email: email,
    newPassword: newPw,
  };
  try {
    const data = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      values
    );
    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error("Something went wrong");
    }
  }
}
