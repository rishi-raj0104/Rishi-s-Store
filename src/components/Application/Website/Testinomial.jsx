"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStar } from "react-icons/io5";
import { BsChatQuote } from "react-icons/bs";

const testimonials = [
  {
    name: "Amit Kumar",
    review:
      "The service was beyond my expectations. Every detail was beautifully managed by the team. I would definitely recommend to others and will use the service again for sure.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    review:
      "Fast, reliable, and courteous staff. The entire experience, from start to finish, was seamless. My whole family was extremely pleased and satisfied with the service quality.",
    rating: 4,
  },
  {
    name: "Ravi Verma",
    review:
      "Customer support was prompt whenever I had any queries. The product quality is excellent and delivery was on time. I am a happy and loyal customer now.",
    rating: 5,
  },
  {
    name: "Sneha Gupta",
    review:
      "Pricing is reasonable and the options available are the best in the market. The packaging was wonderful and professional. Would happily refer my friends and colleagues.",
    rating: 4,
  },
  {
    name: "Anjali Sinha",
    review:
      "This company truly values its customers. I received regular updates about my order. Their professional approach really impressed me, and I’ll continue shopping here.",
    rating: 5,
  },
  {
    name: "Rahul Raj",
    review:
      "I had an issue and it was resolved in no time. The resolution was quick, thoughtful, and customer-focused. I appreciate their commitment to satisfaction.",
    rating: 4,
  },
  {
    name: "Meena Agarwal",
    review:
      "Amazing experience! Easy payment process, wide selection of products, and everything exactly as described. I am looking forward to future purchases.",
    rating: 5,
  },
  {
    name: "Sunil Kumar",
    review:
      "Everything worked smoothly, from ordering to delivery. The website is user-friendly and very easy to navigate. Highly professional, I recommend it strongly.",
    rating: 5,
  },
  {
    name: "Riya Sen",
    review:
      "Ordered for the first time and was amazed by the quality. The packaging was neat and delivery was on time. I will definitely recommend this to my friends.",
    rating: 4,
  },
  {
    name: "Vikram Singh",
    review:
      "The variety available here is unmatched. The staff was very helpful and guided me throughout the process. Thank you for the wonderful service and timely communication.",
    rating: 5,
  },
];

const Testinomial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
      <h2 className="text-center sm:text-4xl text-2xl mb-5 font-semibold">
        Customer Review
      </h2>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="p-5">
            <div className="border rounded-lg p-5">
              <BsChatQuote size={30} className="mb-3" />
              <p className="mb-5">{item.review}</p>
              <h4 className="font-semibold">{item.name}</h4>
              <div className="flex mt-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <IoStar
                    key={`star${i}`}
                    className="text-yellow-400"
                    size={20}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testinomial;
