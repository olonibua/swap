"use client";
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I sell my gadgets?",
      answer:
        "To sell your gadgets, create an account, list your item with photos and a description, and set your desired price. Buyers will contact you through the platform.",
    },
    {
      question: "Can I swap gadgets with other users?",
      answer:
        "Yes, you can swap gadgets by finding a user who has a listing you're interested in and initiating a swap request through the platform.",
    },
    {
      question: "What types of gadgets can I buy?",
      answer:
        "You can buy a variety of gadgets, including smartphones, laptops, tablets, gaming consoles, and accessories. Simply browse the listings to find what you need.",
    },
    {
      question: "Are there any fees for selling gadgets?",
      answer:
        "No, there are no fees for listing or selling your gadgets. It's completely free to use our platform to connect with buyers.",
    },
    {
      question: "Is shipping available for purchased gadgets?",
      answer:
        "Yes, you can arrange shipping with the buyer or seller directly. Make sure to agree on shipping terms and costs before finalizing the transaction.",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg bg-white hover:bg-gray-50"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-2xl font-bold">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          View all questions
        </button>
      </div>
    </div>
  );
};

export default FAQ;
