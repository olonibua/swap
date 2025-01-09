import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">
          Discover, Swap, and Sell Your Gadgets
        </h2>
        <a
          href="/get-started"
          className="text-blue-500 hover:underline text-xl font-medium mt-4 inline-block"
        >
          Get started →
        </a>
      </div>
      <div className="p-10 mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* <div>
          <h3 className="font-bold mb-4">Marketplace</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Browse Gadgets
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Post a Listing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trade Gadgets
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Featured Deals
              </a>
            </li>
          </ul>
        </div> */}
        <div>
          <h3 className="font-bold mb-4">Learn</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                How to Buy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                How to Sell
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trading Guide
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press
              </a>
            </li>
          </ul>
        </div>
        {/* <div>
          <h3 className="font-bold mb-4">Compare to</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                eBay
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Amazon
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Craigslist
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Swappa
              </a>
            </li>
          </ul>
        </div> */}
        <div>
          <h3 className="font-bold mb-4">Socials</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
