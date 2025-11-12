import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const { data } = await response.json();
  return NextResponse.json(data);
}
