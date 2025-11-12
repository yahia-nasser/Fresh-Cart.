"use client";
import AddToCartBTN from "@/app/_components/AddToCartBTN/AddToCartBTN";
import Loading from "@/app/loading";
import { WishListProduct } from "@/app/types/wishlist.type";
import { Button } from "@/components/ui/button";
import { wishlistContext } from "@/Context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const WishList = () => {
  const { wishListItems, removeItemFromWishlist, isLoading, loading } =
    useContext(wishlistContext);

  if (isLoading) {
    <Loading />;
  }

  if (wishListItems.length == 0) {
    return (
      <div className="mx-auto flex justify-center items-center h-screen">
        <h2 className="text-7xl text-main">No items Yet</h2>
      </div>
    );
  }

  return (
    <section className="w-full md:w-[80%] p-5 mt-5 mx-auto bg-gray-100 min-h-screen rounded flex justify-center items-center flex-col">
      <h2 className="font-bold text-4xl mb-16 border-b-2 border-b-green-500 p-4 ">
        Wish List
      </h2>
      <div className="flex flex-col">
        {wishListItems.map(function (item: WishListProduct, idx: number) {
          return (
            <div
              className="flex flex-col gap-5 md:flex-row items-center w-full p-2 border-b-2 mt-5"
              key={idx}
            >
              <div className="item flex gap-3 items-center justify-between mb-5 flex-col md:flex-row  ">
                <div className="product-image p-2">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="max-w-[120px]"
                  />
                </div>
                <div className="product-details flex flex-col gap-3 w-[200px]">
                  <p>{item.title}</p>
                  <p className="text-main">Price: {item.price}</p>
                  <Button
                    className="cursor-pointer w-[200px]"
                    onClick={() => {
                      removeItemFromWishlist(item.id);
                    }}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin text-white font-bold"></i>
                    ) : (
                      <>
                        <i className="fas fa-trash-can text-main"></i>
                        <span>Remove</span>
                      </>
                    )}
                  </Button>
                  <AddToCartBTN id={item.id} />
                </div>
                <div>
                  <Link href={`/productDetails/${item.id}`}>
                    Product Details
                    <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WishList;
