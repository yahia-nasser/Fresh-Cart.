"use client";
import Loading from "@/app/loading";
import { cartContext } from "@/Context/CartContext";
import React, { useContext } from "react";
import Image from "next/image";
import { CartProductItem } from "@/app/types/cart.type";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const Cart = () => {
  const {
    totalCartPrice,
    CartProducts: cartProducts,
    isLoading,
    removeProductFromCart,
    updateCount,
    clearAll,
    loading,
  } = useContext(cartContext);

  async function removeItem(id: string) {
    const data = await removeProductFromCart(id);
    if (data.status === "success") {
      toast.success("Product Successfully Removed !", {
        duration: 1000,
        position: "top-center",
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (cartProducts.length == 0) {
    return (
      <div className="mx-auto flex justify-center items-center h-screen">
        <h2 className="text-7xl text-main">Empty Cart</h2>
      </div>
    );
  }

  return (
    <section className="w-full md:w-[80%] p-5 mt-5 mx-auto bg-gray-100 min-h-screen rounded">
      <h2 className="font-bold text-3xl">Shopping Cart :</h2>
      <h4 className="text-main text-2xl mt-2 font-bold">
        Total Cart Price: {totalCartPrice}
      </h4>
      <Button className="cursor-pointer w-[100px] mt-3 me-3" onClick={clearAll}>
        {loading ? (
          <i className="fas fa-spinner fa-spin text-white font-bold"></i>
        ) : (
          <span>Clear Cart</span>
        )}
      </Button>

      <Link href={"/payment"}>
        <Button className="cursor-pointer w-[100px] mt-3">
          <span>Payment</span>
        </Button>
      </Link>
      <div className="flex items-center w-full p-2 mt-5 flex-col gap-7 md:gap-0">
        {cartProducts.map(function (product: CartProductItem, idx: number) {
          return (
            <div
              className="flex flex-col justify-start gap-5 md:gap-0 md:flex-row md:justify-between items-center w-full p-2 border-b-2 mt-5"
              key={idx}
            >
              <div className="item flex gap-7 items-center flex-col md:flex-row ">
                <div className="product-image p-2">
                  <Image
                    src={product.product.imageCover}
                    alt={product.product.title}
                    width={500}
                    height={500}
                    className="max-w-[100px]"
                  />
                </div>
                <div className="product-details flex flex-col gap-3 w-full">
                  <p>{product.product.title}</p>
                  <p className="text-main">Price: {product.price}</p>

                  <Button
                    className="cursor-pointer w-[100px]"
                    onClick={() => {
                      removeItem(product.product.id);
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
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Button
                  className="text-main cursor-pointer"
                  onClick={() => {
                    updateCount(product.product.id, product.count + 1);
                  }}
                >
                  <i className="fas fa-plus "></i>
                </Button>
                <p>{product.count}</p>
                <Button
                  className="text-main cursor-pointer"
                  onClick={() => {
                    updateCount(product.product.id, product.count - 1);
                  }}
                >
                  <i className="fas fa-minus"></i>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Cart;
