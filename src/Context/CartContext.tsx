"use client";

import {
  CartContextType,
  CartType,
  CartProductItem,
} from "@/app/types/cart.type";
import { AddToCartAction } from "@/CartActions/addToCart";
import { clearCart } from "@/CartActions/clearCart";
import { getUserCartAction } from "@/CartActions/getUserCart";
import { removeCartItem } from "@/CartActions/removeCartItem";
import { updateProductCount } from "@/CartActions/updateProductCount";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext<CartContextType>(
  {} as CartContextType
);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [CartProducts, setCartProducts] = useState<CartProductItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartId, setCartId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function addProductToCart(id: string) {
    try {
      const data = await AddToCartAction(id);
      getUserCart();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromCart(id: string): Promise<CartType> {
    try {
      setLoading(true);
      const data: CartType = await removeCartItem(id);
      setLoading(false);
      setNumOfCartItems(data.numOfCartItems);
      setCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function updateCount(id: string, count: number): Promise<CartType> {
    try {
      const data: CartType = await updateProductCount(id, count);
      setNumOfCartItems(data.numOfCartItems);
      setCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function clearAll() {
    try {
      setLoading(true);
      const data = await clearCart();
      setLoading(false);
      setNumOfCartItems(0);
      setCartProducts([]);
      setTotalCartPrice(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    setIsLoading(true);
    try {
      const data: CartType = await getUserCartAction();
      setNumOfCartItems(data.numOfCartItems);
      setCartProducts(data.data.products);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartId(data.cartId);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function afterPayment() {
    setNumOfCartItems(0);
    setCartProducts([]);
    setTotalCartPrice(0);
    setCartId("");
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        CartProducts,
        isLoading,
        addProductToCart,
        removeProductFromCart,
        updateCount,
        clearAll,
        cartId,
        afterPayment,
        loading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
