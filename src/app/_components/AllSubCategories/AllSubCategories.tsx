import { getSubCategory } from "@/apis/getSubCategory";
import { Subcategory } from "@/app/types/product.type";
import Link from "next/link";
import React from "react";

const AllSubCategories = async ({ id }: { id: string }) => {
  const data = await getSubCategory(id);
  return (
    <div className="flex flex-col gap-2 pl-3">
      {data.length === 0 && <p className="text-gray-400">No subcategories</p>}

      {data.map((sub: Subcategory) => (
        <Link
          key={sub._id}
          href={`/categories/${sub.slug}`}
          className="text-green-600 hover:underline transition"
        >
          {sub.name}
        </Link>
      ))}
    </div>
  );
};

export default AllSubCategories;
