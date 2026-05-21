import React from "react";
import { FiTruck, FiRefreshCw, FiLock, FiAward, FiPhoneCall } from "react-icons/fi";

const bannerData = [
  {
    icon: <FiTruck className="text-[28px] text-[#FF5A1F]" />,
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
  },
  {
    icon: <FiRefreshCw className="text-[26px] text-[#FF5A1F]" />,
    title: "7 Days Returns",
    subtitle: "No questions asked",
  },
  {
    icon: <FiLock className="text-[26px] text-[#555555]" />, // Using the darker color from screenshot
    title: "100% Safe Checkout",
    subtitle: "Secure payments",
  },
  {
    icon: <FiAward className="text-[28px] text-[#FF5A1F]" />,
    title: "Premium Quality",
    subtitle: "Built to last",
  },
  {
    icon: <FiPhoneCall className="text-[26px] text-[#FF5A1F]" />,
    title: "24/7 Support",
    subtitle: "We're here to help",
  },
];

const FeaturesBanner = () => {
  return (
    <div className="w-full bg-[#FBFBFA] border-y border-gray-100 py-10 px-4 sm:px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 items-center justify-center">
        {bannerData.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-start lg:justify-center gap-4 w-full relative
              ${index % 2 === 0 ? "pr-2" : "pl-2 md:pl-0"} 
              /* Desktop dividers between items */
              lg:border-r lg:last:border-r-0 lg:border-gray-200/60 lg:px-4`
            }
          >
            {/* Icon Wrapper */}
            <div className="flex-shrink-0 flex items-center justify-center min-w-[32px]">
              {item.icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col text-left">
              <h3 className="text-[14px] sm:text-[15px] font-bold text-[#1A1A1A] leading-tight tracking-tight">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-[12px] text-gray-400 font-medium mt-1 leading-none">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBanner;