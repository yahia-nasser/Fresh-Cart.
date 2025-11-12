"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "./../../../../public/assets/freshcart-logo.svg";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/Context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getAllCategories from "@/apis/getAllCategories";
import { getSubCategory } from "@/apis/getSubCategory";
import { Category, Subcategory } from "@/app/types/product.type";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { numOfCartItems } = useContext(cartContext);
  const [categories, setCategories] = useState<
    (Category & { subCategories?: Subcategory[] })[]
  >([]);

  useEffect(() => {
    async function fetchCategories() {
      const cats = await getAllCategories();

      const withSubs = await Promise.all(
        cats.map(async (cat: Category) => {
          const subs = await getSubCategory(cat._id);
          return { ...cat, subCategories: subs };
        })
      );

      setCategories(withSubs);
    }
    fetchCategories();
  }, []);

  return (
    <div className="bg-main-light p-3">
      <div className="w-full md:w-[80%] mx-auto flex justify-between items-center flex-col md:flex-row gap-2 text-center">
        <ul className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
          <li className="w-[140px]">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                width={200}
                height={200}
                style={{ height: "auto" }}
                priority
              />
            </Link>
          </li>
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Products
            </Link>
          </li>
          <li>
            <Sheet>
              <SheetTrigger className="cursor-pointer font-bold hover:text-green-500 transition">
                <i className="fas fa-bars me-1"></i>
                Categories
              </SheetTrigger>
              <SheetContent className="md:p-3">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold bg-black rounded-3xl shadow-xl p-1 text-center text-main">
                    All Categories
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-3 max-h-[70vh] overflow-y-auto pr-2">
                  <Accordion type="multiple" className="p-2">
                    {categories.map((category, idx) => (
                      <AccordionItem value={`item-${idx}`} key={idx}>
                        <AccordionTrigger className="cursor-pointer font-bold text-xl decoration-0 hover:text-green-500 transition">
                          <Link href={`/categories/${category._id}`}>
                            {category.name}
                          </Link>
                        </AccordionTrigger>
                        <AccordionContent>
                          {category.subCategories?.map((sub) => (
                            <Link
                              key={sub._id}
                              href={`/subcategories/${sub._id}`}
                              className="block pl-3 sub"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </li>

          <li>
            <Link
              href="/brands"
              className={pathname === "/brands" ? "active" : ""}
            >
              Brands
            </Link>
          </li>

          <li>
            <Link
              href="/allorders"
              className={pathname === "/allorders" ? "active" : ""}
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex flex-col">
              <span className="rounded-full bg-gray-300 text-main font-bold mb-1">
                {numOfCartItems}
              </span>
              <i className="fas fa-cart-shopping text-xl"></i>
            </Link>
          </li>
        </ul>

        <div className="flex flex-col md:flex-row gap-2 text-center items-center">
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-tiktok"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-youtube"></i>

          {status === "unauthenticated" && (
            <>
              <div>
                <Link href="/login">Login</Link>
              </div>
              <div>
                <Link href="/register">Register</Link>
              </div>
            </>
          )}

          {status === "authenticated" && (
            <>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col justify-center items-center mx-2 font-bold hover:text-green-500 transition">
                  <Avatar>
                    <Sheet>
                      <SheetTrigger>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          className="cursor-pointer"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle className="text-2xl font-bold bg-black rounded-3xl shadow-xl p-1 text-center text-main mb-5">
                            My Profile
                          </SheetTitle>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            className="w-1/2 ms-20 mb-5 rounded-full"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                          <h3 className="text-xl font-bold">
                            Name :{" "}
                            <span className="text-main ms-2">
                              {session?.user?.name}
                            </span>
                          </h3>
                          <h3 className="text-xl font-bold border-b-2 pb-3">
                            Email :{" "}
                            <span className="text-main ms-2">
                              {session?.user?.email}
                            </span>
                          </h3>
                        </SheetHeader>
                        <div className="flex flex-col justify-center items-center gap-7">
                          <Link href={"/wishlist"}>My WishList</Link>

                          <Link href={"/changePassword"}>Change Password</Link>

                          <Link href={"/changeDetails"}>Change My Data</Link>

                          <button
                            className="font-bold cursor-pointer hover:text-green-500 transition"
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            SignOut
                          </button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </Avatar>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
