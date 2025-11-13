import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import getAllProducts from "../apis/getAllProducts";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";
import Image from "next/image";
import { Products } from "./types/product.type";
import AddToCartBTN from "./_components/AddToCartBTN/AddToCartBTN";
import AddToWishlistBTN from "./_components/AddToWishlistBTN/AddToWishlistBTN";

export default async function Home() {
  const data = await getAllProducts();

  if (!Array.isArray(data)) {
    console.error("Expected an array of products, but received:", data);
    return (
      <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto ">
        <p>Could not load products. Please try again later.</p>
      </section>
    );
  }
  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto ">
      <MainSlider />
      <CategoriesSlider />
      <div className="flex flex-wrap justify-center ">
        {data.map((product: Products, idx: number) => (
          <div
            key={idx}
            className="p-3 w-[300px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 product transition"
          >
            <div className="inner">
              <Card className="p-2">
                <AddToWishlistBTN id={product.id} />
                <Link href={`/productDetails/${product.id}`}>
                  <CardHeader className="p-0 text-center">
                    <Image
                      width={500}
                      height={500}
                      src={product.imageCover}
                      alt="product"
                    />
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-main font-bold font-sm">
                      {product.category.name}
                    </p>
                    <p className="font-bold font-sm line-clamp-1">
                      {product.title}
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 flex justify-between mt-2">
                    <p>{product.price} EGP</p>
                    <p>
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </p>
                  </CardFooter>
                </Link>
                <AddToCartBTN id={product.id} />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
