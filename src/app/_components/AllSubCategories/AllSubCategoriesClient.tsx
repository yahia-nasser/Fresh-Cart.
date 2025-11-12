"use client";

import React, { useEffect, useState } from "react";
import { getSubCategory } from "@/apis/getSubCategory";
import Link from "next/link";
import { Subcategory } from "@/app/types/product.type";
const AllSubCategoriesClient = ({ id }: { id: string }) => {
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    async function fetchSubs() {
      const data = await getSubCategory(id);
      setSubCategories(data);
    }
    fetchSubs();
  }, [id]);

  return (
    <div className="pl-3 flex flex-col gap-3">
      {subCategories.map((sub) => (
        <Link key={sub._id} href={`/subcategory/${sub._id}`}>
          {sub.name}
        </Link>
      ))}
    </div>
  );
};

export default AllSubCategoriesClient;
