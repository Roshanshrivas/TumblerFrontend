// WhyChooseSection.jsx – Refined Light Theme with Teal Accents
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBox, FiShield, FiUser } from "react-icons/fi";
import { BiRecycle } from "react-icons/bi";

const features = [
  { icon: <FiBox />, title: "Top Quality", subtitle: "Materials" },
  { icon: <FiShield />, title: "Stylish & Modern", subtitle: "Designs" },
  { icon: <FiUser />, title: "Perfect For", subtitle: "Every Lifestyle" },
  { icon: <BiRecycle />, title: "Sustainable", subtitle: "& Reusable" },
];

const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 80 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", damping: 12 },
    },
  };

  const iconHoverVariants = {
    hover: { scale: 1.1, rotate: 5, transition: { type: "spring", stiffness: 300 } },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-16 bg-gradient-to-b from-white to-[#f7fafc] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[#E6F9FA] border border-[#00C2D6]/20 shadow-sm min-h-[380px] md:min-h-[340px] flex flex-col lg:flex-row"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Subtle teal glow on top-left */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#14C6D8]/5 rounded-full blur-3xl pointer-events-none" />

          {/* LEFT CONTENT */}
          <div className="relative z-20 w-full lg:w-[58%] px-6 sm:px-10 md:px-14 py-10 md:py-12">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-[42px] font-bold text-gray-900 tracking-[-1px]"
              variants={headingVariants}
            >
              Why Choose <span className="text-[#14C6D8]">Tumbler?</span>
            </motion.h2>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-10 mt-10"
              variants={containerVariants}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center text-center px-3"
                  variants={featureVariants}
                  whileHover="hover"
                >
                  {/* Vertical divider – teal */}
                  {index !== 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[90px] bg-gradient-to-b from-transparent via-[#14C6D8]/30 to-transparent" />
                  )}

                  {/* Icon with hover effect – teal */}
                  <motion.div
                    className="text-[#14C6D8] bg-white p-4 rounded-full text-4xl md:text-[38px] mb-4"
                    variants={iconHoverVariants}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-base font-semibold text-gray-800 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-tight mt-1">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT IMAGE SIDE */}
          <div className="relative w-full lg:w-[42%] min-h-[300px] md:min-h-[320px] overflow-hidden">
            <motion.img
              src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1783755632/ChatGPT_Image_Jul_11_2026_01_10_16_PM_ilivvu.png"
              alt="Premium Tumbler"
              className="absolute inset-0 w-full h-full object-cover object-center"
              variants={imageVariants}
              whileHover="hover"
              style={{ willChange: "transform" }}
              loading="lazy"
            />
            {/* Gradient overlay to blend smoothly */}
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#E6F9FA] via-[#E6F9FA]/80 to-transparent pointer-events-none hidden lg:block" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#E6F9FA] via-[#E6F9FA]/80 to-transparent pointer-events-none lg:hidden" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;