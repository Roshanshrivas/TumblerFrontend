import React from "react";
import { Link } from "react-router-dom";
import { TbPalette, TbLetterT, TbTypography, TbSticker, TbRuler, TbPackage } from "react-icons/tb";
import { FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi";

import tumblerBlack from "../assets/tumblerimg.png";
import tumblerOrange from "../assets/tumblerorangee.png";
import tumblerWhite from "../assets/tumblerwhite.png";

const CustomizeTeaser = () => {
  // Sample customized tumbler images (replace with your own)
  const samples = [
    {
      id: 1,
      name: "Roshan's Black",
      text: "Roshan",
      color: "#FFFFFF",
      image: tumblerBlack, // Replace with actual sample image URLs
    },
    {
      id: 2,
      name: "Priya's Rose Gold",
      text: "Priya ♥",
      color: "#FFD700",
      image: tumblerOrange,
    },
    {
      id: 3,
      name: "Amit's Quote",
      text: "Stay Hydrated",
      color: "#FFFFFF",
      image: tumblerWhite,
    },
  ];

  const features = [
    { icon: <TbPalette />, text: "10+ Colors" },
    { icon: <TbLetterT />, text: "Personalized Text" },
    { icon: <TbTypography />, text: "Custom Fonts" },
    { icon: <TbSticker />, text: "Artwork / Icons" },
    { icon: <TbRuler />, text: "4 Sizes" },
    { icon: <TbPackage />, text: "Accessories" },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <FiStar /> Create Your Signature
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Design Your Own Tumbler
          </h2>
          <p className="text-gray-600 text-lg">
            Choose colors, add your name, pick a font, upload artwork – make it uniquely yours.
          </p>
        </div>

        {/* Sample Gallery - shows what's possible */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 text-gray-700 mb-6">
            <FiTrendingUp className="text-orange-500" />
            <span className="font-semibold">See what others are creating</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {samples.map((sample) => (
              <div key={sample.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
                <div className="relative bg-gray-100 h-64 flex items-center justify-center">
                  <img src={sample.image} alt={sample.name} className="h-56 object-contain" />
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-800">{sample.name}</p>
                  <p className="text-xs text-gray-500">Customized with “{sample.text}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#ff6b00] text-2xl transition group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                {feat.icon}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">{feat.text}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/customize">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Start Customizing Now <FiArrowRight className="text-lg" />
            </button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No design skills needed • Easy to use • Preview in real time
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomizeTeaser;