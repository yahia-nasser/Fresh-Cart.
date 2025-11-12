"use client";
import { cashPay } from "@/app/paymentActions/cashPayment";
import { OnlinePay } from "@/app/paymentActions/onlinePayment";
import { CartProductItem } from "@/app/types/cart.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartContext } from "@/Context/CartContext";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
import { toast } from "sonner";

const Payment = () => {
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  const { cartId, afterPayment } = useContext(cartContext);
  const router = useRouter();

  async function cashPayment() {
    const values = {
      shoppingAddress: {
        details: details.current?.value || "",
        phone: phone.current?.value || "",
        city: city.current?.value || "",
      },
    };

    if (
      !values.shoppingAddress.details.trim() ||
      !values.shoppingAddress.phone.trim() ||
      !values.shoppingAddress.city.trim()
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    try {
      const data: CartProductItem = await cashPay(cartId, values);
      if (data) {
        toast.success("Order Done", { position: "top-center", duration: 1500 });
        afterPayment();
        router.push("/allorders");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  async function OnlinePayment() {
    const values = {
      shoppingAddress: {
        details: details.current?.value || "",
        phone: phone.current?.value || "",
        city: city.current?.value || "",
      },
    };

    if (
      !values.shoppingAddress.details.trim() ||
      !values.shoppingAddress.phone.trim() ||
      !values.shoppingAddress.city.trim()
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    try {
      const data = await OnlinePay(cartId, values);
      if (data?.session?.url) {
        window.location.href = data.session.url;
      } else {
        toast.error("Invalid payment session", { position: "top-center" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <section className="w-full md:w-[80%] p-5 mt-5 mx-auto bg-gray-100 min-h-screen rounded flex flex-col justify-center items-center">
      <h2 className="mb-10 text-center font-bold text-4xl">Payment</h2>
      <div className="w-1/2 mx-auto">
        <label htmlFor="details">Details</label>
        <Input
          ref={details}
          type="text"
          id="details"
          className="mb-4 border-green-300"
          required
        />

        <label htmlFor="phone">Phone</label>
        <Input
          ref={phone}
          type="text"
          id="phone"
          className="mb-4 border-green-300"
          required
        />

        <label htmlFor="city">City</label>
        <Input
          ref={city}
          type="text"
          id="city"
          className="mb-4 border-green-300"
          required
        />
      </div>

      <div className="mt-5 flex flex-col justify-center items-center md:flex-row">
        <Button
          className="cursor-pointer mt-3 me-3 transition hover:bg-green-500 text-white"
          onClick={cashPayment}
        >
          Cash Payment
        </Button>
        <Button
          className="cursor-pointer mt-3 transition hover:bg-green-500 text-white"
          onClick={OnlinePayment}
        >
          Online Payment
        </Button>
      </div>
    </section>
  );
};

export default Payment;
