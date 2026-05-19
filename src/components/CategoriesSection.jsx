import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const categories = [
  {
    title: "Travel Tumblers",
    products: "16 Products",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188733/categryone-Photoroom_odwr1b.png",
  },
  {
    title: "Coffee Mugs",
    products: "12 Products",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188926/categrytwo-removebg-preview_xci0l8.png",
    wishlist: true,
  },
  {
    title: "Gym Bottles",
    products: "14 Products",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188925/boottle-removebg-preview_irowts.png",
  },
  {
    title: "Kids Tumblers",
    products: "10 Products",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188734/bottle-Photoroom_pqzvhc.png",
  },
  {
    title: "Accessories",
    products: "8 Products",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779189010/imgi_1143_8901372268703_3-removebg-preview_nnm2vx.png",
  },
];

const CategoriesSection = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1400px] mx-auto px-5">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between mb-10">

          <h2 className="text-[38px] font-bold text-[#161616] tracking-[-1px]">
            Shop By Category
          </h2>

          <button
            className="
              h-[46px]
              px-6
              rounded-full
              border border-[#dddddd]
              bg-white
              hover:bg-[#111]
              hover:text-white
              transition-all duration-300
              flex items-center gap-2
              text-[15px]
              font-semibold
              text-[#222]
              shadow-sm
            "
          >
            View all
            <FiArrowRight className="text-[17px]" />
          </button>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

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
              "
            >

              {/* HEART ICON */}
              {item.wishlist && (
                <button
                  className="
                    absolute
                    top-4
                    right-4
                    z-20
                    w-9
                    h-9
                    rounded-full
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaHeart className="text-[#888] text-[13px]" />
                </button>
              )}

              {/* IMAGE */}
              <div className="h-[210px] overflow-hidden">

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    h-full
                    object-contain
                    group-hover:scale-105
                    transition-all duration-500
                    p-5
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="pb-7 px-5 text-center">

                <h3
                  className="
                    text-[20px]
                    font-bold
                    text-[#1d1d1d]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[15px]
                    text-[#7a7a7a]
                    font-medium
                  "
                >
                  {item.products}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;