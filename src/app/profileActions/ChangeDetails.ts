"use server";

import { getMyToken } from "@/utilites/token";
import axios, { isAxiosError } from "axios";
import { DetailsPayload } from "../types/user.type";

export async function ChangeDetailsAction({
  name,
  email,
  phone,
}: DetailsPayload) {
  const token = (await getMyToken()) as string;

  if (!token) {
    return { success: false, message: "Please login first" };
  }

  if (!phone || !name || !email) {
    return { success: false, message: "All fields are required" };
  }

  const regexPhone = /^01[0125][0-9]{8}$/;

  if (!regexPhone.test(phone)) {
    return { success: false, message: "Phone number is not correct" };
  }

  try {
    const values = { name, email, phone };

    const { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe",
      values,
      {
        headers: {
          token: token,
        },
      }
    );

    return { success: true, data, message: "Details updated successfully!" };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error("API Error Response Data:", error.response?.data);

      const errorMessage =
        error.response?.data?.errors?.msg || "An API error occurred";
      return { success: false, message: errorMessage };
    } else if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "An unexpected error occurred" };
    }
  }
}
