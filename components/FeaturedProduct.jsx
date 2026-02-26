import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    title: "Fresh & Organic",
    description: "Farm-fresh vegetables and fruits delivered daily",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
    title: "Pantry Essentials",
    description: "Stock up on rice, flour, oils, and daily staples",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80",
    title: "Household Care",
    description: "Keep your home clean with our range of supplies",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-8 md:mt-14">
      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl md:text-3xl font-medium">Featured Products</p>
        <div className="w-20 md:w-28 h-0.5 bg-orange-600 mt-1"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 lg:gap-14 mt-8 md:mt-12 px-4 sm:px-0">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              className="group-hover:brightness-75 transition duration-300 w-full h-[400px] object-cover rounded-md"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              {/* <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
