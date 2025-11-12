"use client";
import React from "react";
import Image from "next/image";
import banner1 from "./../../../../public/assets/slider/slider-2.jpeg";
import banner2 from "./../../../../public/assets/slider/grocery-banner-2.jpeg";
import slider1 from "./../../../../public/assets/slider/slider-image-1.jpeg";
import slider2 from "./../../../../public/assets/slider/slider-image-2.jpeg";
import slider3 from "./../../../../public/assets/slider/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
const MainSlider = () => {
  return (
    <div className="mb-10 flex">
      <div className="w-2/3">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          <SwiperSlide>
            <Image
              src={slider1}
              alt="grocery1"
              className="h-[400px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src={slider2}
              alt="grocery1"
              className="h-[400px] object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src={slider3}
              alt="grocery1"
              className="h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/3">
        <Image
          src={banner1}
          alt="grocery1"
          className="h-[200px] object-cover"
        />
        <Image
          src={banner2}
          alt="grocery2"
          className="h-[200px] object-cover"
        />
      </div>
    </div>
  );
};

export default MainSlider;
