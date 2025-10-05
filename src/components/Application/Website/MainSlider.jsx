"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import slider1 from "@/assets/images/slider_1.png";
import slider2 from "@/assets/images/slider_2.png";
import slider3 from "@/assets/images/slider_3.png";
import slider4 from "@/assets/images/slider_4.png";
import slider5 from "@/assets/images/slider_5.png";
import slider6 from "@/assets/images/slider_6.png";

import Image from "next/image";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ArrowNext = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 hidden sm:flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white right-10"
    >
      <LuChevronRight size={25} className="text-gray-600" />
    </button>
  );
};
const ArrowPrev = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-14 h-14 hidden sm:flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-white left-10"
    >
      <LuChevronLeft size={25} className="text-gray-600" />
    </button>
  );
};

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: false,
          arrows: false,
          nextArrow: "",
          prevArrow: "",
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <Image
            src={slider1.src}
            width={slider1.width}
            height={slider1.height}
            alt="slider 1"
          />
        </div>
        <div>
          <Image
            src={slider2.src}
            width={slider2.width}
            height={slider2.height}
            alt="slider 2"
          />
        </div>
        <div>
          <Image
            src={slider6.src}
            width={slider6.width}
            height={slider6.height}
            alt="slider 6"
          />
        </div>
        <div>
          <Image
            src={slider3.src}
            width={slider3.width}
            height={slider3.height}
            alt="slider 3"
          />
        </div>

        <div>
          <Image
            src={slider4.src}
            width={slider4.width}
            height={slider4.height}
            alt="slider 4"
          />
        </div>
        <div>
          <Image
            src={slider5.src}
            width={slider5.width}
            height={slider5.height}
            alt="slider 5"
          />
        </div>
      </Slider>
    </div>
  );
};

export default MainSlider;
