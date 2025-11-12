import {
  WishlistContextType,
  WishlistResponse,
} from "@/app/types/wishlist.type";
import { addToWishlistAction } from "@/app/WishListActions/addToWishlist";
import { getUserWishlistAction } from "@/app/WishListActions/getUsersWishList";
import { removeFromWishlistAction } from "@/app/WishListActions/removeFromWishlist";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const wishlistContext = createContext<WishlistContextType>({
  wishListItems: [],
  isLoading: false,
  loading: false,
  addToWishlist: async () => ({ status: "", message: "" }),
  removeItemFromWishlist: () => {},
});

const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishListItems, setWishListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function addToWishlist(id: string): Promise<WishlistResponse> {
    try {
      const data = await addToWishlistAction(id);
      getUserWishList();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error("Something went wrong");
      }
    }
  }
  async function getUserWishList() {
    setIsLoading(true);
    try {
      const data = await getUserWishlistAction();
      setWishListItems(data);
      setIsLoading(false);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error("Something went wrong");
      }
    }
  }

  async function removeItemFromWishlist(id: string) {
    try {
      setLoading(true);
      const data = await removeFromWishlistAction(id);
      setLoading(false);
      getUserWishList();
      toast.success(data.message, { position: "top-center", duration: 1500 });
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw Error(error.message);
      } else {
        throw Error("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getUserWishList();
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        wishListItems,
        addToWishlist,
        removeItemFromWishlist,
        isLoading,
        loading,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
export default WishlistProvider;
