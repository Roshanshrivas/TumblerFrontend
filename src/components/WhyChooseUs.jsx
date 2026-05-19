import React from "react";
import {
  FiBox,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { BiRecycle } from "react-icons/bi";

const features = [
  {
    icon: <FiBox />,
    title: "Top Quality",
    subtitle: "Materials",
  },
  {
    icon: <FiShield />,
    title: "Stylish & Modern",
    subtitle: "Designs",
  },
  {
    icon: <FiUser />,
    title: "Perfect For",
    subtitle: "Every Lifestyle",
  },
  {
    icon: <BiRecycle />,
    title: "Sustainable",
    subtitle: "& Reusable",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-6 bg-white">
      <div className="max-w-[1400px] mx-auto">

        {/* MAIN CARD */}
        <div className="relative overflow-hidden rounded-[22px] bg-[#f8f2ec] min-h-[340px] flex flex-col lg:flex-row">

          {/* LEFT CONTENT */}
          <div className="relative z-20 w-full lg:w-[58%] px-7 sm:px-10 md:px-14 py-10 md:py-12">

            {/* HEADING */}
            <h2 className="text-[30px] md:text-[38px] font-bold text-[#111111] tracking-[-1px]">
              Why Choose Tumbler?
            </h2>

            {/* FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-y-10">

              {features.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center px-4"
                >

                  {/* VERTICAL DIVIDER */}
                  {index !== 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-[90px] bg-[#e8ddd4]" />
                  )}

                  {/* ICON */}
                  <div className="text-[#ff6b1a] text-[34px] mb-5">
                    {item.icon}
                  </div>

                  {/* TEXT */}
                  <h3 className="text-[16px] font-semibold text-[#222] leading-[1.5]">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-[#444] leading-[1.5] mt-1">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE SIDE */}
          <div className="relative w-full lg:w-[42%] min-h-[320px] overflow-hidden">

            {/* BACKGROUND IMAGE */}
            <img
              src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779185673/ChatGPT_Image_May_19_2026_03_44_00_PM_a892bh.png"
              alt="Tumbler"
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05]"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f8f2ec]" />

            {/* BLUR LIGHT */}
            <div className="absolute top-[10%] left-[5%] w-[220px] h-[220px] rounded-full bg-white/30 blur-[90px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;