import React, { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FiTruck, FiRefreshCw, FiLock, FiAward, FiPhoneCall } from "react-icons/fi";

const bannerData = [
  { icon: <FiTruck />, title: "Free Shipping", subtitle: "Orders above ₹999" },
  { icon: <FiRefreshCw />, title: "7 Days Returns", subtitle: "No questions asked" },
  { icon: <FiLock />, title: "Safe Checkout", subtitle: "Secure payments" },
  { icon: <FiAward />, title: "Premium Quality", subtitle: "Built to last" },
  { icon: <FiPhoneCall />, title: "24/7 Support", subtitle: "We're here" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const FeaturesBanner = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#FBFBFA] border-y border-gray-100 py-2 md:py-6 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-3 md:px-4">
        {/* Mobile: horizontal scroll with fade-in each card */}
        <div className="block md:hidden">
          <motion.div
            className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            initial="hidden"
            animate={isInView && !shouldReduceMotion ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {bannerData.map((item, index) => (
              <motion.div
                key={index}
                variants={mobileItemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100 snap-start min-w-[145px] transition-all duration-200"
              >
                <div className="text-[#14C6D8] text-xl">{item.icon}</div>
                <div>
                  <h3 className="text-xs font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
              className="text-[8px] text-gray-300"
            >
              ← swipe →
            </motion.span>
          </div>
        </div>

        {/* Tablet/Desktop: responsive grid with staggered entrance */}
        <motion.div
          className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate={isInView && !shouldReduceMotion ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {bannerData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center justify-start lg:justify-center gap-4 group cursor-default"
            >
              <div className="text-[#14C6D8] text-3xl group-hover:scale-110 group-hover:text-[#09AFBD] transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#1A1A1A] group-hover:text-[#14C6D8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[12px] text-gray-400 font-medium">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

export default FeaturesBanner;