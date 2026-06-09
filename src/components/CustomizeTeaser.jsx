import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { TbPalette, TbLetterT, TbTypography, TbSticker, TbRuler, TbPackage } from "react-icons/tb";
import { FiArrowRight, FiStar, FiTrendingUp } from "react-icons/fi";

import tumblerBlack from "../assets/tumblerimg.png";
import tumblerOrange from "../assets/tumblerorangee.png";
import tumblerWhite from "../assets/tumblerwhite.png";

const CustomizeTeaser = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sampleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 15 } },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <FiStar /> Create Your Signature
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Design Your Own Tumbler
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose colors, add your name, pick a font, upload artwork – make it uniquely yours.
          </p>
        </motion.div>

        {/* Sample Gallery */}
        <div className="mb-16">
          <motion.div
            className="flex items-center justify-center gap-2 text-gray-700 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <FiTrendingUp className="text-orange-500" />
            <span className="font-semibold">See what others are creating</span>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {samples.map((sample) => (
              <motion.div
                key={sample.id}
                variants={sampleVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-64 flex items-center justify-center p-4">
                  <img
                    src={sample.image}
                    alt={sample.name}
                    className="h-52 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating text label (optional) */}
                  <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-medium text-orange-600">
                    {sample.text}
                  </div>
                </div>
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-800">{sample.name}</p>
                  <p className="text-xs text-gray-500">Customized with “{sample.text}”</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              variants={featureVariants}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#ff6b00] text-2xl transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {feat.icon}
              </motion.div>
              <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition">
                {feat.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Link to="/customize">
            <motion.button
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 20px 35px -10px rgba(249, 115, 22, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Customizing Now <FiArrowRight className="text-lg" />
            </motion.button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No design skills needed • Easy to use • Preview in real time
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomizeTeaser;