import { getMyToken } from "@/utilites/token";
import axios from "axios";

export async function AddToCartAction(id: string) {
  const token = (await getMyToken()) as string;
  if (!token) {
    throw Error("Please Login First");
  }

  const values = {
    productId: id,
  };

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    values,
    {
      headers: {
        token: token,
      },
    }
  );
  return data;
}
