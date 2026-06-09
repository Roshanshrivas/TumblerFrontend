import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiCoffee, FiSun, FiMoon } from "react-icons/fi";

const LifestyleSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12, stiffness: 80 } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12, stiffness: 80, delay: 0.1 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 400 } },
    tap: { scale: 0.98 },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.5 } },
  };

  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeInOut" } },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#f9fafb] to-white overflow-hidden py-12 md:py-24"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT COLUMN: Image */}
          <motion.div
            className="relative group rounded-2xl overflow-hidden shadow-xl"
            variants={leftVariants}
            whileHover="hover"
          >
            <motion.img
              src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779180721/ChatGPT_Image_May_10_2026_08_48_33_PM_twjzi0.png"
              alt="Tumbler in everyday life"
              className="w-full h-full object-cover"
              variants={imageVariants}
              style={{ willChange: "transform" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* RIGHT COLUMN: Content */}
          <motion.div className="space-y-5 md:space-y-6" variants={rightVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-orange-50 text-[#FF5A1F] px-3 py-1 rounded-full text-sm font-medium"
              variants={badgeVariants}
            >
              <FiCoffee className="w-4 h-4" />
              <span>Everyday Essential</span>
            </motion.div>

            {/* Heading with animated underline */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
              variants={headingVariants}
            >
              Made for your{" "}
              <span className="text-[#FF5A1F] relative inline-block">
                every moment
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2 text-orange-200"
                  viewBox="0 0 200 10"
                  fill="currentColor"
                >
                  <motion.path
                    d="M0,5 Q50,0 100,5 T200,5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    variants={underlineVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md"
              variants={textVariants}
            >
              From morning coffee to late‑night workouts – our tumblers keep you refreshed, stylish, and hydrated wherever you go.
            </motion.p>

            {/* Feature list */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
              variants={containerVariants}
            >
              <motion.div className="flex items-center gap-3" variants={featureItemVariants}>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiSun className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <span className="text-sm text-gray-700">24H cold / 12H hot</span>
              </motion.div>
              <motion.div className="flex items-center gap-3" variants={featureItemVariants}>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiMoon className="w-4 h-4 text-[#FF5A1F]" />
                </div>
                <span className="text-sm text-gray-700">Leak‑proof & durable</span>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="group mt-4 inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#E04B14] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Shop Lifestyle
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleSection;