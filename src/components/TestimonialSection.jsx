import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiUsers, FiAward, FiGlobe } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    review: "The quality is amazing! Keeps my coffee hot for hours and looks super stylish. My everyday companion now!",
  },
  {
    name: "Rahul Mehta",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    review: "Absolutely love the premium build and modern look. Worth every penny!",
  },
  {
    name: "Ananya Verma",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    review: "Perfect for travel and daily office use. The temperature retention is incredible.",
  },
];

const stats = [
  { icon: <FiUsers />, value: 50000, label: "Happy Customers", suffix: "+" },
  { icon: <FiAward />, value: 4.9, label: "Customer Rating", suffix: "/5", prefix: "" },
  { icon: <FiGlobe />, value: 100, label: "Fast Delivery", suffix: "%" },
];

const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{typeof count === "number" ? count.toFixed(value % 1 === 0 ? 0 : 1) : count}{suffix}
    </span>
  );
};

const TestimonialSection = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Auto-slide with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, delay: 0.1 } },
  };

  const testimonialVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };

  return (
    <section ref={sectionRef} className="w-full px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="bg-gradient-to-br from-[#f8f2ec] to-[#f8f2ec] rounded-3xl overflow-hidden shadow-xl border border-[#eeeeee]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            {/* LEFT: TESTIMONIAL CAROUSEL */}
            <div className="relative px-6 sm:px-8 md:px-10 py-8 md:py-10 bg-white/40 backdrop-blur-sm">
              <div className="absolute top-6 left-8 text-[#ff6b1a] text-5xl font-serif opacity-20">“</div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
                >
                  <motion.img
                    src={testimonials[active].image}
                    alt={testimonials[active].name}
                    className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  <div className="flex-1">
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 font-medium max-w-lg">
                      “{testimonials[active].review}”
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-5">
                      <h3 className="text-xl font-bold text-[#111]">{testimonials[active].name}</h3>
                      <div className="flex items-center gap-1 text-[#ff6b1a]">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: STATS WITH ANIMATED COUNTERS */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 border-t lg:border-t-0 lg:border-l border-[#e7e7e7] bg-gradient-to-br from-white/50 to-transparent"
              variants={statsContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {stats.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={statItemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`
                    flex flex-col items-center justify-center text-center px-4 py-8
                    ${idx !== stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#e7e7e7]" : ""}
                  `}
                >
                  <div className="text-[#ff6b1a] text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#111] leading-none">
                    <AnimatedCounter value={item.value} suffix={item.suffix || ""} prefix={item.prefix || ""} />
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 font-medium">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* SLIDER DOTS with animations */}
          <div className="flex items-center justify-center gap-2 py-5 bg-white/30">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index ? "bg-[#ff6b1a]" : "bg-gray-300"
                }`}
                style={{ width: active === index ? 28 : 8 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;