import React from "react";
import { FiTruck, FiRefreshCw, FiLock, FiAward, FiPhoneCall } from "react-icons/fi";

const bannerData = [
  { icon: <FiTruck />, title: "Free Shipping", subtitle: "Orders above ₹999" },
  { icon: <FiRefreshCw />, title: "7 Days Returns", subtitle: "No questions asked" },
  { icon: <FiLock />, title: "Safe Checkout", subtitle: "Secure payments" }, // shortened
  { icon: <FiAward />, title: "Premium Quality", subtitle: "Built to last" },
  { icon: <FiPhoneCall />, title: "24/7 Support", subtitle: "We're here" },
];

const FeaturesBanner = () => {
  return (
    <div className="w-full bg-[#FBFBFA] border-y border-gray-100 py-2 md:py-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 md:px-4">
        {/* Mobile: compact horizontal scroll */}
        <div className="xsm:hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bannerData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/90 rounded-lg px-2 py-2 shadow-sm border border-gray-100 snap-start min-w-[135px] active:scale-95 transition-transform"
              >
                <div className="text-[#FF5A1F] text-xl">{item.icon}</div>
                <div>
                  <h3 className="text-xs font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Very subtle scroll hint (optional, can remove if too much space) */}
          <div className="flex justify-center mt-0.5 md:hidden">
            <span className="text-[8px] text-gray-300">← swipe →</span>
          </div>
        </div>

        {/* Tablet/Desktop: original grid (unchanged) */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {bannerData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-start lg:justify-center gap-4 group transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="text-[#FF5A1F] text-3xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1A1A1A]">{item.title}</h3>
                <p className="text-[12px] text-gray-400 font-medium">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeaturesBanner;