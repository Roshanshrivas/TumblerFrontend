// CategorySection.jsx – with navigation to filtered products
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Coffee,
  Plane,
  Dumbbell,
  Sparkles,
  CupSoda,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Insulated Tumblers",
    description: "Maximum temperature retention for all-day hydration.",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_45_33_AM_vsusu1.png",
    bg: "bg-[#FCF1EC]",
    icon: <CupSoda size={18} />,
  },
  {
    id: 2,
    title: "Travel Tumblers",
    description: "Leak-proof and travel-friendly for your on-the-go lifestyle.",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_27_35_AM_usdykk.png",
    bg: "bg-[#F6EFEC]",
    icon: <Plane size={18} />,
  },
  {
    id: 3,
    title: "Sports Tumblers",
    description: "Built for performance and active lifestyles.",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_44_01_AM_e19f5h.png",
    bg: "bg-[#F7EFF2]",
    icon: <Dumbbell size={18} />,
  },
  {
    id: 4,
    title: "Coffee Tumblers",
    description: "Perfect for coffee lovers, keeps drinks hot & fresh.",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779991950/ChatGPT_Image_May_28_2026_11_40_22_PM_kgdcha.png",
    bg: "from-[#f7eadf] to-[#fff8f1]",
    icon: <Coffee size={18} />,
  },
  {
    id: 5,
    title: "Limited Edition",
    description: "Exclusive designs for those who love to stand out.",
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779991615/ChatGPT_Image_May_28_2026_11_36_32_PM_a8ea7o.png",
    bg: "from-[#ffdcec] to-[#fff4fa]",
    icon: <Sparkles size={18} />,
  },
];

const CategorySection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 90 },
    },
  };
  const mobileItemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", damping: 15, stiffness: 100 },
    },
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/allproducts?category=${categoryId}`);
  };

  const handleViewAll = () => {
    navigate("/allproducts");
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-14 md:py-20 overflow-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-[#111]">
              Shop By Category
            </h2>
          </div>
          {/* Desktop "View all" button – updated to teal */}
          <button
            onClick={handleViewAll}
            className="hidden md:flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-[#14C6D8] hover:text-white hover:border-[#14C6D8] transition-all duration-300 shadow-sm hover:shadow-md group"
            aria-label="View all categories"
          >
            View All
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>

        {/* DESKTOP: Responsive Grid */}
        <motion.div
          className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-5"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {categories.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={() => handleCategoryClick(item.id)}
              className={`
                relative
                overflow-hidden
                rounded-[26px]
                bg-gradient-to-br
                ${item.bg}
                border border-[#efe8e5]
                group
                cursor-pointer
                transition-all duration-500
                hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                flex flex-col
                focus:outline-none focus:ring-2 focus:ring-[#14C6D8]
              `}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(item.id);
                }
              }}
            >
              {/* Icon – teal accent */}
              <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md bg-white/80 text-[#14C6D8] group-hover:bg-[#14C6D8] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>

              {/* Image Area */}
              <div className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute w-[180px] h-[180px] rounded-full bg-white/40 blur-3xl" />
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="px-4 pb-7 pt-2 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#111] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                  {item.description}
                </p>
                <button className="mt-5 flex items-center gap-3 font-semibold text-sm group/button text-black">
                  Explore Now
                  <span className="transition-all duration-300 group-hover/button:translate-x-2 text-[#14C6D8]">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>

              {/* Bottom line animation – teal */}
              <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-[#14C6D8] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE: Horizontal Scroll Carousel (snap scroll) */}
        <div className="block md:hidden">
          <motion.div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-5 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {categories.map((item) => (
              <motion.div
                key={item.id}
                variants={mobileItemVariants}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(item.id)}
                className={`
                  relative
                  w-[200px]
                  flex-shrink-0
                  snap-start
                  overflow-hidden
                  rounded-[24px]
                  bg-gradient-to-br
                  ${item.bg}
                  border border-[#efe8e5]
                  group
                  cursor-pointer
                  shadow-sm
                  flex flex-col
                  focus:outline-none focus:ring-2 focus:ring-[#14C6D8]
                `}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCategoryClick(item.id);
                  }
                }}
              >
                {/* Icon – teal */}
                <div className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm bg-white/80 text-[#14C6D8] group-hover:bg-[#14C6D8] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>

                {/* Image */}
                <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover pb-3 drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="px-4 pb-5 pt-1">
                  <h3 className="text-lg font-bold text-[#111] leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <button className="mt-3 flex items-center gap-2 font-semibold text-xs group/button text-black">
                    Explore Now
                    <span className="transition-all duration-300 group-hover/button:translate-x-1 text-[#14C6D8]">
                      <ArrowRight size={14} />
                    </span>
                  </button>
                </div>

                {/* Bottom line – teal */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#14C6D8] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
          {/* Scroll hint */}
          <div className="flex justify-center mt-2">
            <span className="text-[10px] text-gray-400">← Swipe to see more →</span>
          </div>
        </div>

        {/* Mobile "View All" button – updated to teal */}
        <div className="flex justify-center mt-10 lg:hidden">
          <button
            onClick={handleViewAll}
            className="flex items-center gap-3 border border-[#ece7e4] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#14C6D8] hover:text-white hover:border-[#14C6D8] transition-all duration-300"
            aria-label="View all categories"
          >
            View All
            <span className="w-8 h-8 rounded-full bg-[#14C6D8] text-white flex items-center justify-center">
              <ArrowRight size={16} />
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;