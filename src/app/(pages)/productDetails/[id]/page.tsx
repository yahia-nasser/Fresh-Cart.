import React from "react";
import getProductDetails from "@/apis/singleProduct";
import Image from "next/image";
import AddToCartBTN from "@/app/_components/AddToCartBTN/AddToCartBTN";
const PrdouctDeatils = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const data = await getProductDetails(id);
  return (
    <section className="w-full md:w-[80%] mx-auto flex flex-wrap md:flex-row md:flex-nowrap justify-center items-center h-screen gap-6 px-5 md:px-0 bg-gray-50">
      {/* image section */}
      <div className="w-full md:w-1/4 border-2 border-green-600 rounded-3xl overflow-hidden">
        <Image
          width={500}
          height={500}
          src={data.imageCover}
          alt={data.title}
        />
      </div>
      {/* details section */}
      <div className="w-full md:w-2/3">
        <h4 className="text-2xl font-bold mb-3">{data.title}</h4>
        <p className="text-slate-400 font-sm mb-3">{data.description}</p>
        <p className="font-sm font-bold mb-3">{data.category.name}</p>
        <div className="flex justify-between items-center mb-3">
          <p className="font-sm font-bold mb-3">{data.price} EGP</p>
          <p>
            <i className="fas fa-star rating-color"></i>
            {data.ratingsAverage}
          </p>
        </div>
        <AddToCartBTN id={data.id} />
      </div>
    </section>
  );
};

export default PrdouctDeatils;
