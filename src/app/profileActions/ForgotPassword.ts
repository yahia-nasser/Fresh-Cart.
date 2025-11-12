"use server";

import axios from "axios";

export async function ForgotPasswordAction(email: string) {
  try {
    const value = {
      email: email,
    };
    const res = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      value
    );

    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error("Something went wrong");
    }
  }
}
