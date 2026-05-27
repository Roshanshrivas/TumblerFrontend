import React from "react";
import { FiArrowRight, FiCoffee, FiSun, FiMoon } from "react-icons/fi";

const LifestyleSection = () => {
  return (
    <section className="w-full bg-[#f9fafb] overflow-hidden py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN: Lifestyle Image (with hover effect) */}
          <div className="relative group rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779180721/ChatGPT_Image_May_10_2026_08_48_33_PM_twjzi0.png"
              alt="Tumbler in everyday life"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="space-y-6">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
              <FiCoffee className="w-4 h-4" />
              <span>Everyday Essential</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Made for your{" "}
              <span className="text-[#FF5A1F] relative inline-block">
                every moment
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-orange-200"
                  viewBox="0 0 200 10"
                  fill="currentColor"
                >
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              From morning coffee to late‑night workouts – our tumblers keep you refreshed, stylish, and hydrated wherever you go.
            </p>

            {/* Feature list (small icons + text) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiSun className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">24H cold / 12H hot</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiMoon className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">Leak‑proof & durable</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group mt-4 inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#E04B14] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
              Shop Lifestyle
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;