"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const products = [
    { id: 1, image: "/img/iphone.jpg", name: "iPhone" },
    { id: 2, image: "/img/mac.jpg", name: "iPad" },
    { id: 3, image: "/img/macmini.jpg", name: "MacBook" },
    { id: 4, image: "/img/monitor.jpg", name: "AirPods" },
    { id: 5, image: "/img/iphone.jpg", name: "iMac" },
    { id: 6, image: "/img/mac.jpg", name: "Apple Watch" },
    { id: 7, image: "/img/macMonitor.jpg", name: "iPad Pro" },
    { id: 8, image: "/img/iphone16.jpg", name: "Mac Mini" },
  ];

  const doubledProducts = [...products, ...products];

  useEffect(() => {
    const scrollAnimation = () => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        if (newPosition > doubledProducts.length * 200) {
          return 0;
        }
        return newPosition;
      });
    };

    const animationInterval = setInterval(scrollAnimation, 50);
    return () => clearInterval(animationInterval);
  }, [doubledProducts.length]);

  return (
    <div className="relative w-ful overflow-hidden bg-black h-min ">
      <div className="max-w-screen-2xl mx-auto">
        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center space-y-6 pt-24 md:pt-0 text-white z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Buy, Sell, and Swap Used Items
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Find amazing deals on pre-loved items in your area. Join our
              community of smart shoppers and sellers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-400 flex items-center">
                No hidden fees • Secure transactions • Local community
              </p>
            </div>
          </div>

          {/* Right Column - Product Slides */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden md:pt-40">
            <div
              className="absolute flex transition-transform duration-1000 ease-linear"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                width: `${doubledProducts.length * 200}px`,
              }}
            >
              {doubledProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-[200px] px-2 flex-shrink-0"
                >
                  <div className="relative h-[250px] md:h-[300px] w-full bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="min-w-[300px] max-h-[500px] w-auto object-cover"
                      // className="min-w-[300px] max-h-[500px] w-auto object-cover"
                    />
                  </div>
                  <p className="text-white text-center mt-2">{product.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
};

export default Hero;
