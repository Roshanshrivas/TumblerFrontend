import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    review:
      "The quality is amazing! Keeps my coffee hot for hours and looks super stylish. My everyday companion now!",
  },
  {
    name: "Rahul Mehta",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    review:
      "Absolutely love the premium build and modern look. Worth every penny!",
  },
  {
    name: "Ananya Verma",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    review:
      "Perfect for travel and daily office use. The temperature retention is incredible.",
  },
];

const stats = [
  {
    icon: <FiUsers />,
    value: "50K+",
    label: "Happy Customers",
  },
  {
    icon: <FiAward />,
    value: "4.9/5",
    label: "Customer Rating",
  },
  {
    icon: <FiGlobe />,
    value: "Pan India",
    label: "Fast Delivery",
  },
];

const TestimonialSection = () => {
  const [active, setActive] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-6 bg-white">
      <div className="max-w-[1400px] mx-auto">

        {/* MAIN CARD */}
        <div className="bg-[#f8f2ec] rounded-[22px] overflow-hidden border border-[#eeeeee]">

          <div className="grid lg:grid-cols-[1.2fr_1fr]">

            {/* LEFT TESTIMONIAL */}
            <div className="relative px-6 sm:px-8 md:px-10 py-8">

              {/* QUOTE ICON */}
              <div className="absolute top-4 left-8 text-[#ff6b1a] text-[38px] font-bold leading-none">
                “
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

                {/* USER IMAGE */}
                <img
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  className="w-[90px] h-[90px] rounded-full object-cover shadow-md border-4 border-white"
                />

                {/* TEXT */}
                <div className="flex-1">

                  {/* REVIEW */}
                  <p className="text-[17px] md:text-[18px] leading-[1.8] text-[#333] font-medium max-w-[520px]">
                    "{testimonials[active].review}"
                  </p>

                  {/* NAME + STARS */}
                  <div className="flex flex-wrap items-center gap-4 mt-5">

                    <h3 className="text-[20px] font-semibold text-[#111]">
                      {testimonials[active].name}
                    </h3>

                    <div className="flex items-center gap-1 text-[#ff6b1a]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[14px]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 border-t lg:border-t-0 lg:border-l border-[#e7e7e7]">

              {stats.map((item, index) => (
                <div
                  key={index}
                  className={`
                    flex flex-col items-center justify-center
                    text-center px-6 py-8
                    ${
                      index !== stats.length - 1
                        ? "border-b sm:border-b-0 sm:border-r border-[#e7e7e7]"
                        : ""
                    }
                  `}
                >

                  {/* ICON */}
                  <div className="text-[#ff6b1a] text-[38px] mb-4">
                    {item.icon}
                  </div>

                  {/* VALUE */}
                  <h3 className="text-[34px] font-bold text-[#111] leading-none">
                    {item.value}
                  </h3>

                  {/* LABEL */}
                  <p className="text-[16px] text-[#555] mt-3 font-medium">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SLIDER DOTS */}
          <div className="flex items-center justify-center gap-2 pb-5">

            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`
                  h-[10px] rounded-full transition-all duration-300
                  ${
                    active === index
                      ? "w-[32px] bg-[#ff6b1a]"
                      : "w-[10px] bg-[#d0d0d0]"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;