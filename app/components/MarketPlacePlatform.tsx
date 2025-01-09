'use client'
import React, { useState } from "react";
import {
  Camera,
  
  ShoppingBag,
  User,
  MessageSquare,
  Heart,
  
  Menu,
  X,
} from "lucide-react";

const MarketplacePlatform = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "electronics", label: "Electronics", color: "bg-purple-600" },
    { id: "swap", label: "Swap", color: "bg-amber-600" },
    { id: "offers", label: "Offers", color: "bg-blue-800" },
  ];

  const pollData = {
    question: "Which device has better value?",
    options: [
      { name: "MacBook M1", percentage: 42 },
      { name: "MacBook M2", percentage: 38 },
      { name: "MacBook M3", percentage: 20 },
    ],
  };

  const comments = [
    {
      author: "Daniel",
      content:
        "Looking to trade my iPhone 13 Pro for a Samsung S23. Anyone interested?",
    },
    {
      author: "Jessica",
      content:
        "Selling my gaming PC setup. Great condition, all specs available. DM for details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <span className="text-red-500 font-bold text-xl">SWAP&SELL</span>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                BROWSE
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                SELL
              </span>
              <span className="text-white font-semibold">SWAP</span>
            </nav>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <User className="w-5 h-5 cursor-pointer" />
            <ShoppingBag className="w-5 h-5 cursor-pointer" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black p-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <span className="text-gray-400 hover:text-white">BROWSE</span>
              <span className="text-gray-400 hover:text-white">SELL</span>
              <span className="text-white font-semibold">SWAP</span>
            </nav>
            <div className="flex space-x-4 mt-4">
              <User className="w-5 h-5" />
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Left Content */}
          <div className="md:col-span-8 bg-black text-white rounded-lg p-4 md:p-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base ${tab.color}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Market Poll */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <h3 className="text-lg md:text-xl mb-4">{pollData.question}</h3>
              {pollData.options.map((option) => (
                <div key={option.name} className="mb-3">
                  <div className="flex justify-between mb-1 text-sm md:text-base">
                    <span>{option.name}</span>
                    <span>{option.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${option.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center space-x-4 mt-4 text-gray-400">
                <button className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">248</span>
                </button>
                <button className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">23</span>
                </button>
              </div>
            </div>

            {/* Listings/Comments */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-2">
                <Camera className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="List your item or make an offer"
                  className="bg-transparent w-full outline-none text-sm md:text-base"
                />
              </div>
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm md:text-base">
                      {comment.author}
                    </span>
                    <p className="text-gray-400 text-sm md:text-base">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg p-4 md:p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full" />
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Jeremy</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      Verified Seller
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Top Trader
                    </span>
                  </div>
                </div>
              </div>
              <h2 className="text-base md:text-lg font-semibold mb-4">
                Latest Listings
              </h2>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm md:text-base">
                        {comment.author}
                      </span>
                      <p className="text-gray-600 text-sm md:text-base">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketplacePlatform;
