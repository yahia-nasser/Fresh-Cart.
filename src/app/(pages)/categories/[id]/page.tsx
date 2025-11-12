import getAllProducts from "@/apis/getAllProducts";
import getSingleCategory from "@/apis/getSingleCategory";
import AddToCartBTN from "@/app/_components/AddToCartBTN/AddToCartBTN";
import AddToWishlistBTN from "@/app/_components/AddToWishlistBTN/AddToWishlistBTN";
import { Category, Products } from "@/app/types/product.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const data: Category = await getSingleCategory(id);
  const products: Products[] = await getAllProducts();

  const singleCategoryProducts = products.filter(
    (product) => product.category._id === data._id
  );

  if (singleCategoryProducts.length == 0) {
    return (
      <div className="mx-auto flex justify-center items-center h-screen">
        <h2 className="text-7xl text-main">No Items !</h2>
      </div>
    );
  }
  return (
    <section className="px-5 md:px-0 my-10 w-full md:w-[80%] mx-auto ">
      <h2 className="text-2xl font-bold bg-black rounded-3xl shadow-xl p-1 text-center text-main mb-10">
        {data.name}
      </h2>
      <div className="flex flex-wrap justify-center ">
        {singleCategoryProducts.map((product, idx: number) => {
          return (
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
          );
        })}
      </div>
    </section>
  );
};

export default SingleCategory;
