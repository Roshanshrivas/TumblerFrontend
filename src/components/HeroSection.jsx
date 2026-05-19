import React from "react";
import { FiArrowRight, FiEdit3 } from "react-icons/fi";
import { GiCoffeeCup } from "react-icons/gi";
import {
  MdOutlineVerifiedUser,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";

const features = [
  {
    icon: <GiCoffeeCup className="text-[24px] text-[#ff6b00]" />,
    title: "24H Cold",
    subtitle: "12H Hot",
  },
  {
    icon: <MdOutlineVerifiedUser className="text-[24px] text-[#ff6b00]" />,
    title: "Premium",
    subtitle: "SS304 Steel",
  },
  {
    icon: <MdOutlineWaterDrop className="text-[24px] text-[#ff6b00]" />,
    title: "Eco-Friendly",
    subtitle: "BPA Free",
  },
  {
    icon: <BsShieldCheck className="text-[22px] text-[#ff6b00]" />,
    title: "Leak Proof",
    subtitle: "Design",
  },
];

const HeroSection = () => {
  return (
    <section className="w-full bg-[#f7f3ef] overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen items-center">
        
        {/* LEFT CONTENT - Text & Features */}
        <div className="relative z-20 flex justify-center items-center">
          <div className="w-full max-w-full px-6 sm:px-10 lg:px-20 py-16 mx-auto lg:mx-0">
            {/* Top Badge */}
            <div className="inline-flex items-center rounded-full border border-[#ffd6bf] bg-[#fff4ec] px-4 py-[7px]">
              <span className="text-[#ff6b00] text-[11px] font-bold tracking-[1px] uppercase">
                Premium Quality
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-[54px] sm:text-[68px] lg:text-[84px] leading-[1.2] font-bold tracking-[-3px] text-[#111111]">
              Sip in <span className="text-[#ff6b00]">Style.</span>
              <br />
              Every <span className="text-[#ff6b00]">Moment.</span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-[520px] text-[19px] sm:text-[22px] leading-[1.7] text-[#4a4a4a] font-medium">
              Premium quality tumblers designed to keep your drinks perfect — hot or cold.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button className="h-[62px] px-9 rounded-2xl bg-[#ff6b00] hover:bg-[#eb6200] text-white font-semibold text-[17px] flex items-center gap-3 transition-all duration-300 shadow-[0_15px_35px_rgba(255,107,0,0.28)] hover:scale-[1.02]">
                Shop Now
                <FiArrowRight className="text-[20px]" />
              </button>
              <button className="h-[62px] px-9 rounded-2xl border border-[#cfcfcf] bg-white/90 backdrop-blur-md hover:bg-white text-[#222] font-semibold text-[17px] flex items-center gap-3 transition-all duration-300 shadow-sm">
                <FiEdit3 className="text-[18px]" />
                Customize Now
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 mt-16">
              {features.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white/90 backdrop-blur-md border border-[#ececec] flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold leading-6 text-[#222]">
                    {item.title}<br />{item.subtitle}
                  </h3>
                  {/* Divider between features (only on desktop, except last) */}
                  {index !== features.length - 1 && (
                    <div className="hidden sm:block absolute right-[-15px] top-[18px] w-[1px] h-[90px] bg-gradient-to-b from-[#e5e5e5] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE - With Gradient & Blur Transition */}
        <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
          {/* Background Image */}
          <img
            src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779183046/tumb_nb0ehl.png"
            alt="Hero visual"
            className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
          />

          {/* Gradient Overlay – Bridges left background to image smoothly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f3ef] via-[#f7f3ef]/70 via-10% to-transparent to-50%" />

          {/* Soft Blur Effect – Adds depth and blends the middle section */}
          <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-gradient-to-r from-[#f7f3ef] to-transparent blur-xl opacity-60" />

          {/* Optional: subtle light glow on the right side */}
          <div className="absolute right-0 bottom-0 w-[40%] h-[60%] bg-white/10 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;