import { getAllBrands } from "@/apis/getAllBrands";
import { Brand } from "@/app/types/product.type";
import Image from "next/image";
import React from "react";

const Brands = async () => {
  const data = await getAllBrands();

  return (
    <section className="p-3 my-10 w-full md:w-[80%] mx-auto bg-gray-100 ">
      <h2 className="text-center text-4xl font-bold mt-5 p-3 border-b-3 rounded-3 text-main">
        Discover Our Brands
      </h2>
      <div className="flex flex-col md:flex-row md:w-full flex-wrap gap-7 justify-center items-center mt-10">
        {data.map(function (brand: Brand, idx: number) {
          return (
            <div key={idx} className="hover:scale-70 transition-all">
              <Image
                src={brand.image}
                alt={brand.name}
                width={250}
                height={250}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
