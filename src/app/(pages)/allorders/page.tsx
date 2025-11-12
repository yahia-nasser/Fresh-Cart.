import { getUserOrders } from "@/apis/getUserOrders";
import { CartItem, Order } from "@/app/types/userOrders.type";
import Image from "next/image";
import React from "react";

const allOrders = async () => {
  const { data } = await getUserOrders();

  if (data.length == 0) {
    return (
      <div className="mx-auto flex justify-center items-center h-screen">
        <h2 className="text-7xl text-main">No Orders Yet</h2>
      </div>
    );
  }

  return (
    <section className="p-3 my-10 w-full md:w-[80%] mx-auto bg-gray-100 ">
      <div className="allorders">
        {data.map(function (order: Order, idx: number) {
          return (
            <div
              className="flex flex-col md:flex-row gap-2 p-3 mb-5  border-b-2 border-b-gray-200 shadow items-center relative "
              key={idx}
            >
              {order.cartItems.map(function (item: CartItem, idx: number) {
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl flex justify-center items-center flex-col w-full mb-7 md:mb-3 md:w-1/6 border-2 shadow-2xl "
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={150}
                      height={150}
                    />
                    <h3 className="font-bold mt-2 line-clamp-1 ">
                      {item.product.title}
                    </h3>
                    <h3 className="font-bold mt-2">Price: {item.price} EGP</h3>
                  </div>
                );
              })}
              <div className="md:absolute md:right-10 md:top-1/2">
                <h2 className="font-bold mb-2 text-xl">
                  Total Price: {order.totalOrderPrice} EGP
                </h2>
                <h2 className="font-bold text-main text-xl">
                  Method: {order.paymentMethodType}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default allOrders;
