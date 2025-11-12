"use client";

import { cartContext } from "@/Context/CartContext";
import { getMyToken } from "@/utilites/token";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const AddToCartBTN = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const { addProductToCart } = useContext(cartContext);
  const router = useRouter();
  async function handleAdd() {
    const token = await getMyToken();
    if (!token) {
      setLoading(false);
      toast.error("Please Login First", {
        duration: 1000,
        position: "top-center",
      });
      router.push("/login");
    }
    setLoading(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      setLoading(false);
      toast.success(data.message, { duration: 1000, position: "top-center" });
    } else {
      setLoading(false);
      toast.error(data.message, { duration: 1000, position: "top-center" });
    }
  }

  return (
    <div>
      <button
        className="bg-main text-white font-bold cursor-pointer w-full md:w-[200px] rounded p-1 btn"
        onClick={handleAdd}
      >
        {loading ? (
          <i className="fas fa-spinner fa-spin text-white font-bold"></i>
        ) : (
          <>
            <i className="fas fa-plus"></i>
            <span>Add To Cart</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartBTN;
