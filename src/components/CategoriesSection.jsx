import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const categories = [
  {
    title: "Travel",
    products: "16 Products",
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188733/categryone-Photoroom_odwr1b.png",
  },
  {
    title: "Coffee Mugs",
    products: "12 Products",
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188926/categrytwo-removebg-preview_xci0l8.png",
    wishlist: true,
  },
  {
    title: "Gym Bottles",
    products: "14 Products",
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188925/boottle-removebg-preview_irowts.png",
  },
  {
    title: "Kids",
    products: "10 Products",
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188734/bottle-Photoroom_pqzvhc.png",
  },
  {
    title: "Accessories",
    products: "8 Products",
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779189010/imgi_1143_8901372268703_3-removebg-preview_nnm2vx.png",
  },
];

const CategoriesSection = () => {
  const scrollRef = useRef(null);

  return (
    <section className="w-full py-2 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h2 className="sm:text-3xl md:text-[38px] font-bold text-[#161616] tracking-[-0.5px] md:tracking-[-1px]">
            Shop By Category
          </h2>
          <button
            className="
              h-9 md:h-[46px]
              px-4 md:px-6
              rounded-full
              border border-[#dddddd]
              bg-white
              hover:bg-[#111]
              hover:text-white
              hover:border-[#111]
              transition-all duration-300
              flex items-center gap-1 md:gap-2
              text-xs md:text-[15px]
              font-semibold
              text-[#222]
              shadow-sm
            "
            aria-label="View all categories"
          >
            View all
            <FiArrowRight className="text-xs md:text-[17px]" />
          </button>
        </div>

        {/* Mobile: horizontal scrollable carousel – app‑style compact cards */}
        <div className="block md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="
                  relative
                  bg-[#f4ece8]
                  rounded-2xl
                  overflow-hidden
                  w-[150px]
                  flex-shrink-0
                  snap-start
                  transition-all
                  duration-200
                  active:scale-95
                  border border-[#ece7e4]
                  shadow-sm
                  group
                "
              >
                {/* Wishlist heart */}
                {item.wishlist && (
                  <button
                    className="
                      absolute top-2 right-2 z-20
                      w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm shadow-sm
                      flex items-center justify-center
                      hover:scale-110 transition
                    "
                    aria-label="Add to wishlist"
                  >
                    <FaHeart className="text-[#888] text-[10px]" />
                  </button>
                )}

                {/* Image */}
                <div className="h-[130px] overflow-hidden flex items-center justify-center bg-[#f4ece8]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="
                      w-full h-full object-contain
                      group-hover:scale-105 transition-transform duration-300
                      p-3
                    "
                  />
                </div>

                {/* Text content */}
                <div className="pb-3 px-2 text-center">
                  <h3 className="text-sm font-bold text-[#1d1d1d] truncate">{item.title}</h3>
                  <p className="mt-0.5 text-[11px] text-[#7a7a7a] font-medium">{item.products}</p>
                  <button className="mt-2 text-[#ff6b00] text-[11px] font-semibold flex items-center justify-center gap-0.5 w-full">
                    Explore <FiArrowRight className="text-[10px]" />
                  </button>
                </div>
              </div>
            ))}
            {/* Extra "View All" card (optional) */}
            <div
              className="
                relative
                bg-white
                rounded-2xl
                overflow-hidden
                w-[150px]
                flex-shrink-0
                snap-start
                border border-dashed border-[#ff6b00]
                flex flex-col items-center justify-center
                text-center
                p-3
                shadow-sm
              "
            >
              <div className="w-12 h-12 rounded-full bg-[#ff6b00]/10 flex items-center justify-center mb-2">
                <FiArrowRight className="text-[#ff6b00] text-xl" />
              </div>
              <p className="text-sm font-semibold text-[#ff6b00]">View All</p>
              <p className="text-[10px] text-gray-400 mt-1">28+ products</p>
            </div>
          </div>
          {/* Scroll hint */}
          <div className="flex justify-center gap-1 mt-2 md:hidden">
            <span className="text-[9px] text-gray-400">← Swipe to explore →</span>
          </div>
        </div>

        {/* Desktop/Tablet: responsive grid (unchanged) */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((item, index) => (
            <div
              key={index}
              className="
                group
                relative
                bg-[#f4ece8]
                rounded-[24px]
                overflow-hidden
                hover:-translate-y-1
                transition-all duration-300
                border border-[#ece7e4]
                shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
              "
            >
              {item.wishlist && (
                <button
                  className="
                    absolute top-4 right-4 z-20
                    w-9 h-9 rounded-full bg-white shadow-md
                    flex items-center justify-center
                    hover:scale-110 transition
                  "
                  aria-label="Add to wishlist"
                >
                  <FaHeart className="text-[#888] text-[13px]" />
                </button>
              )}

              <div className="h-[210px] overflow-hidden flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="
                    w-full h-full object-contain
                    group-hover:scale-105 transition-transform duration-500
                    p-5
                  "
                />
              </div>

              <div className="pb-7 px-5 text-center">
                <h3 className="text-xl font-bold text-[#1d1d1d]">{item.title}</h3>
                <p className="mt-2 text-[15px] text-[#7a7a7a] font-medium">{item.products}</p>
                <button className="mt-4 text-[#ff6b00] text-sm font-semibold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now <FiArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar for Chrome/Safari */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;