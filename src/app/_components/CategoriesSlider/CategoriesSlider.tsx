import React from "react";
import getAllCategories from "@/apis/getAllCategories";
import CategorySwiper from "../CategorySwiper/CategorySwiper";
import { Categories } from "@/app/types/category.type";
const CategoriesSlider = async () => {
  const data: Categories[] = await getAllCategories();
  return (
    <div className="mb-3 p-2 border-3 border-dotted">
      <h3 className="mb-3 font-bold">Shop Popular Categories</h3>
      <CategorySwiper categories={data} />
    </div>
  );
};

export default CategoriesSlider;
