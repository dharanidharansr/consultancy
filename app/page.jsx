'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOMetadata from "@/components/SEOMetadata";
import RecentlyViewed from "@/components/RecentlyViewed";

const Home = () => {
  return (
    <>
      <Navbar />
      <SEOMetadata
        title="Glossary Mart | Fresh Groceries & Daily Essentials"
        description="Shop fresh groceries, daily essentials, and household items at Glossary Mart. Fast delivery, great prices, and a wide selection of quality products."
        keywords="online grocery, fresh vegetables, daily essentials, household items, grocery delivery, supermarket, glossary mart"
        url="/"
      />
      <div className="px-4 sm:px-6 md:px-16 lg:px-32 pt-20 md:pt-24">
        <HeaderSlider />
        <HomeProducts />
        <RecentlyViewed />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
