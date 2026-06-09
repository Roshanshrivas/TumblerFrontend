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
      className="w-full px-4 md:px-6 lg:px-8 py-10 md:py-16 bg-white overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[#f8f2ec] min-h-[380px] md:min-h-[340px] flex flex-col lg:flex-row shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT CONTENT */}
          <div className="relative z-20 w-full lg:w-[58%] px-6 sm:px-10 md:px-14 py-10 md:py-12">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-[42px] font-bold text-[#111111] tracking-[-1px]"
              variants={headingVariants}
            >
              Why Choose Tumbler?
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
                  {/* Vertical divider (desktop) */}
                  {index !== 0 && (
                    <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-[90px] bg-gradient-to-b from-transparent via-[#e8ddd4] to-transparent" />
                  )}

                  {/* Icon with hover effect */}
                  <motion.div
                    className="text-[#ff6b1a] text-4xl md:text-[38px] mb-4"
                    variants={iconHoverVariants}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Text */}
                  <h3 className="text-base font-semibold text-[#222] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#444] leading-tight mt-1">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT IMAGE SIDE */}
          <div className="relative w-full lg:w-[42%] min-h-[300px] md:min-h-[320px] overflow-hidden">
            <motion.img
              src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779185673/ChatGPT_Image_May_19_2026_03_44_00_PM_a892bh.png"
              alt="Premium Tumbler"
              className="absolute inset-0 w-full h-full object-cover object-center"
              variants={imageVariants}
              whileHover="hover"
              style={{ willChange: "transform" }}
            />
            {/* Soft gradient overlay to blend with left side */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f8f2ec] pointer-events-none" />
            <div className="absolute top-10 left-5 w-40 h-40 rounded-full bg-white/30 blur-3xl pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;