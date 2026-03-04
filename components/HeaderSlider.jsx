import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "Fresh Farm Produce - Vegetables & Fruits Delivered Daily",
      offer: "Up to 30% Off Seasonal Produce",
      buttonText1: "Shop Now",
      buttonText2: "View Offers",
      imgSrc: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Organic Essentials - Healthy Choices for Your Family",
      offer: "Exclusive Deals on Organic Staples",
      buttonText1: "Order Now",
      buttonText2: "Explore Range",
      imgSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Weekly Pantry Restock - Big Savings on Bulk Items",
      offer: "Flat 20% Off Rice, Dal & More",
      buttonText1: "Stock Up",
      buttonText2: "See Discounts",
      imgSrc: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-6 md:py-8 px-4 md:px-14 mt-4 md:mt-6 rounded-lg md:rounded-xl min-w-full gap-4 md:gap-0"
          >
            <div className="md:pl-8 mt-6 md:mt-0 w-full md:w-auto">
              <p className="text-xs md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg text-lg md:text-2xl lg:text-[40px] lg:leading-[48px] font-semibold leading-tight">
                {slide.title}
              </h1>
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 md:mt-6">
                <button className="w-full sm:w-auto px-6 md:px-10 py-2 md:py-2.5 bg-orange-600 rounded-full text-white font-medium text-sm md:text-base hover:bg-orange-700 transition" onClick={() => router.push('/all-products')}>
                  {slide.buttonText1}
                </button>
                <button className="hidden sm:flex group items-center gap-2 px-4 md:px-6 py-2.5 font-medium text-sm md:text-base" onClick={() => router.push('/all-products')}>
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center w-full md:w-auto">
              {slide.imgSrc ? (
                <Image
                  className="w-36 md:w-56 lg:w-72 h-auto object-cover rounded-lg"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                  priority
                  width={800}
                  height={600}
                />
              ) : (
                <div className="w-36 md:w-56 lg:w-72 h-36 md:h-56 lg:h-72 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
