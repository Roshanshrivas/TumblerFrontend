// CustomizeTeaser.jsx – Brand Cyan Theme (#00C2D6)
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { TbPalette, TbLetterT, TbTypography, TbSticker, TbRuler, TbPackage } from "react-icons/tb";
import { FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi";

import tumblerBlack from "../assets/tumblerimg.png";
import tumblerOrange from "../assets/tumblerorangee.png";
import tumblerWhite from "../assets/tumblerwhite.png";

// Logo Theme Color Constants
const BRAND_CYAN = "#00C2D6";
const BRAND_HOVER = "#00A0B0";

const CustomizeTeaser = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const samples = [
    { id: 1, name: "Roshan's Black", text: "Roshan", color: "#FFFFFF", image: tumblerBlack },
    { id: 2, name: "Priya's Rose Gold", text: "Priya ♥", color: "#FFD700", image: tumblerOrange },
    { id: 3, name: "Amit's Quote", text: "Stay Hydrated", color: "#FFFFFF", image: tumblerWhite },
  ];

  const features = [
    { icon: <TbPalette />, text: "10+ Colors" },
    { icon: <TbLetterT />, text: "Personalized Text" },
    { icon: <TbTypography />, text: "Custom Fonts" },
    { icon: <TbSticker />, text: "Artwork / Icons" },
    { icon: <TbRuler />, text: "4 Sizes" },
    { icon: <TbPackage />, text: "Accessories" },
  ];

  // Motion Orchestration Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100 } },
  };

  const sampleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 16 } },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-[#E6F9FA]/60 via-white to-[#E6F9FA]/30 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#E6F9FA] border border-[#00C2D6]/20 text-[#00C2D6] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <FiStar /> Create Your Signature
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Design Your Own <span style={{ color: BRAND_CYAN }}>Tumbler</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
            Choose colors, add your name, pick custom typography, or upload your own artwork to make it uniquely yours.
          </p>
        </motion.div>

        {/* Sample Gallery Section */}
        <div className="space-y-6">
          <motion.div
            className="flex items-center justify-center gap-2 text-xs font-bold text-gray-600 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <FiTrendingUp style={{ color: BRAND_CYAN }} />
            <span>See What Others Are Creating</span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {samples.map((sample) => (
              <motion.div
                key={sample.id}
                variants={sampleVariants}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm transition-shadow hover:shadow-md group flex flex-col justify-between"
              >
                <div className="relative bg-[#F1F3F5] rounded-2xl h-64 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="h-52 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                  />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-extrabold text-[#00C2D6] shadow-sm border border-gray-100">
                    “{sample.text}”
                  </div>
                </div>
                <div className="p-3 text-center space-y-0.5">
                  <p className="font-extrabold text-sm text-gray-900">{sample.name}</p>
                  <p className="text-xs text-gray-400 font-medium">Custom engraved tumbler</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Customization Capabilities Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto pt-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E6F9FA] text-[#00C2D6] flex items-center justify-center text-2xl group-hover:bg-[#00C2D6] group-hover:text-white transition-all duration-300 mb-2">
                {feat.icon}
              </div>
              <p className="text-xs font-bold text-gray-800 group-hover:text-[#00C2D6] transition-colors">
                {feat.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Bar */}
        <motion.div
          className="text-center pt-4 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <Link to="/customize" className="inline-block">
            <motion.button
              className="inline-flex items-center gap-2.5 bg-[#00C2D6] hover:bg-[#00A0B0] text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-[#00C2D6]/20 transition-all outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Customizing Now <FiArrowRight className="text-base" />
            </motion.button>
          </Link>
          <p className="text-xs text-gray-400 font-medium">
            No design skills needed • Live 3D preview • Fast dispatch
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default CustomizeTeaser;