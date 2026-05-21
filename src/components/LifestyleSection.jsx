import React from "react";
import { FiArrowRight } from "react-icons/fi";

const LifestyleSection = () => {
  return (
    <section className="w-full bg-[#FCFAF7] min-h-[300px] flex items-center justify-center overflow-hidden mb-14">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-stretch">
        
        {/* LEFT COLUMN: Lifestyle Image */}
        <div className="relative min-h-[300px] w-full">
          <img
            src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779180721/ChatGPT_Image_May_10_2026_08_48_33_PM_twjzi0.png" 
            alt="Made For Your Every Moment Lifestyle"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />
          {/* Subtle warm overlay to blend with the brand aesthetic */}
          <div className="absolute inset-0 bg-orange-900/5 mix-blend-multiply pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: Typography & Call-To-Action */}
        <div className="flex flex-col justify-center items-start px-6 sm:px-16 lg:px-24 py-16 bg-gradient-to-r from-[#FAF8F5] to-[#FCFAF7]">
          
          {/* Small Top Tagline */}
          <span className="text-[#8C8C8C] text-[11px] sm:text-[12px] font-bold tracking-[0.15em] uppercase mb-4">
            Perfect Companion
          </span>

          {/* Heading */}
          <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] font-extrabold leading-[1.15] text-[#1A1A1A] tracking-tight">
            Made For Your
            <br />
            <span className="text-[#FF5A1F]">Every Moment</span>
          </h2>

          {/* Body Description Text */}
          <p className="mt-5 text-[#6B6B6B] text-[15px] sm:text-[16px] max-w-[440px] font-medium leading-relaxed">
            From morning coffee to late-night workouts – our tumblers keep you refreshed and stylish.
          </p>

          {/* Brand Colored Button */}
          <button className="mt-8 bg-[#FF5A1F] hover:bg-[#E04B14] text-white font-bold text-[14px] sm:text-[15px] px-7 py-3.5 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md shadow-orange-500/10 hover:scale-[1.01]">
            Shop Lifestyle
            <FiArrowRight className="text-[16px] ml-0.5" />
          </button>

        </div>

      </div>
    </section>
  );
};

export default LifestyleSection;