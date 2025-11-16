"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Categories } from "@/app/types/category.type";

const CategorySwiper = ({ categories }: { categories: Categories[] }) => {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {categories.map((category: Categories, idx: number) => (
          <SwiperSlide key={idx}>
            <Image
              width={500}
              height={500}
              src={category.image}
              alt={category.name}
              className="h-[200px] w-full object-cover"
            />
            <h4 className="text-center font-sm text-gray-500 mt-2">
              {category.name}
            </h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySwiper;
