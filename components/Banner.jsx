'use client';
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Banner = () => {
  const { router } = useAppContext();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:px-20 py-14 md:py-16 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden relative">
      <div className="flex-1 flex justify-center mb-8 md:mb-0">
        <Image
          className="w-64 md:w-80 object-cover rounded-lg shadow-lg"
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
          alt="Grocery Basket"
          width={400}
          height={400}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4 z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          Superfast Delivery <br /><span className="text-orange-600">to Your Doorstep</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-md">
          Get fresh groceries, daily essentials, and household items delivered in minutes.
        </p>
        <button
          onClick={() => router.push('/all-products')}
          className="group flex items-center justify-center gap-2 px-10 py-4 bg-orange-600 rounded-full text-white font-semibold text-lg hover:bg-orange-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Shopping
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>

      <div className="flex-1 flex justify-center mt-8 md:mt-0">
        <Image
          className="w-64 md:w-80 object-cover rounded-lg shadow-lg"
          src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80"
          alt="Fresh Vegetables"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};


export default Banner;