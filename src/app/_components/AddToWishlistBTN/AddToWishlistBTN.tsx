"use client";
import { Button } from "@/components/ui/button";
import { wishlistContext } from "@/Context/WishlistContext";
import { getMyToken } from "@/utilites/token";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const AddToWishlistBTN = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addToWishlist } = useContext(wishlistContext);
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

    try {
      setLoading(true);
      const data = await addToWishlist!(id);

      if (data.status === "success") {
        setLoading(false);
        toast.success(data.message, { duration: 1000, position: "top-center" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error("Something went wrong");
      }
    }
  }
  return (
    <Button onClick={handleAdd} className="btn2 cursor-pointer">
      {loading ? (
        <i className="fas fa-spinner fa-spin text-white font-bold"></i>
      ) : (
        <>
          <i className="fas fa-heart"></i>
          <span>Add To Wishlist</span>
        </>
      )}
    </Button>
  );
};

export default AddToWishlistBTN;
