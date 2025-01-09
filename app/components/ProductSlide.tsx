"use client";
import Image from "next/image";
import React from "react";

const ProductSlide = () => {
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

  return (
    <div className="w-full overflow-hidden">
      <div
        className="relative flex whitespace-nowrap"
        style={{
          animation: "scroll 20s linear infinite",
        }}
      >
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .relative:hover {
            animation-play-state: paused;
          }
        `}</style>
        {doubledProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="inline-block mx-4 hover:scale-105 transition-transform duration-300"
          >
            <Image
              width={1000}
              height={1000}
              src={product.image}
              alt={product.name}
              className="min-w-[300px] max-h-[500px] w-auto object-contain rounded-lg" // Changed to use max-height and auto width
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlide;
