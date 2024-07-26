import React, { useState } from "react";
import PromoCategoryCard from "../components/PromoCategoryCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [promoData, setPromoData] = useState([
    {
      type: "Women",
      message:
        "offers elegance and style with our exclusive women's fashion collection.",
      categories: [
        "short",
        "tees",
        "short",
        "tees",
        "short",
        "tees",
        "short",
        "tees",
      ],
    },
    {
      type: "Men",
      message:
        "brings sophistication and flair with our exclusive men's fashion collection.",
      categories: ["tees"],
    },
  ]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full flex justify-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300">
        <Slider className="w-[700px]" {...settings}>
          {promoData.map((value) => (
            <PromoCategoryCard
              key={value.type}
              type={value.type}
              message={value.message}
              categories={value.categories}
            />
          ))}
        </Slider>
      </div>
    </main>
  );
}
