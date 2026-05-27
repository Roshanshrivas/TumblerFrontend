import React, { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiEdit3, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GiCoffeeCup } from "react-icons/gi";
import {
  MdOutlineVerifiedUser,
  MdOutlineWaterDrop,
} from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

// ========== REUSABLE FEATURES DATA ==========
const features = [
  {
    icon: <GiCoffeeCup className="text-[24px] text-[#ff6b00]" />,
    title: "24H Cold",
    subtitle: "12H Hot",
  },
  {
    icon: <MdOutlineVerifiedUser className="text-[24px] text-[#ff6b00]" />,
    title: "Premium",
    subtitle: "SS304 Steel",
  },
  {
    icon: <MdOutlineWaterDrop className="text-[24px] text-[#ff6b00]" />,
    title: "Eco-Friendly",
    subtitle: "BPA Free",
  },
  {
    icon: <BsShieldCheck className="text-[22px] text-[#ff6b00]" />,
    title: "Leak Proof",
    subtitle: "Design",
  },
];

// Carousel images for mobile – each slide highlights a key benefit
const carouselSlides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779476329/LoginPage_lrcwem.png",
    title: "24H Cold • 12H Hot",
    desc: "Keeps your drinks perfect all day",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779180649/ChatGPT_Image_May_10_2026_08_30_31_PM_ztuifi.png",
    title: "Premium SS304 Steel",
    desc: "Rust‑proof, durable & food‑grade",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779263583/ChatGPT_Image_May_20_2026_01_20_45_PM_bmblvd.png",
    title: "Eco‑Friendly & Leak Proof",
    desc: "BPA‑free, safe for you & the planet",
  },
];

// ========== DESKTOP / TABLET HERO (original design, unchanged) ==========
const DesktopHero = () => {
  return (
    <section className="w-full bg-[#FEE9DC]/90 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-screen items-center">
        {/* LEFT CONTENT - Text & Features */}
        <div className="relative z-20 flex justify-center items-center">
          <div className="w-full max-w-full px-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 sm:py-16 mx-auto lg:mx-0">
            {/* Top Badge */}
            <div className="hidden sm:inline-flex items-center rounded-full border border-[#ffd6bf] bg-[#fff4ec] px-4 py-[7px]">
              <span className="text-[#ff6b00] text-[11px] font-bold tracking-[1px] uppercase">
                Premium Quality
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-[54px] sm:text-[68px] lg:text-[54px] xl:text-[72px] leading-[1.2] font-bold tracking-[-3px] text-[#111111]">
              Stay <span className="text-[#ff6b00]">Refreshed.</span>
              <br />
              Everywhere <span className="text-[#ff6b00]">You Go.</span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-[#5F5F5F] text-[16px] sm:text-[18px] max-w-[480px] font-medium leading-relaxed">
              Premium tumblers designed for work, gym, travel & lifestyle.
            </p>

            {/* Customer + Rating */}
            <div className="flex flex-wrap items-center gap-8 mt-8">
              {/* Customers */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/46.jpg"
                    alt=""
                    className="w-11 h-11 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold text-[#222]">
                    10,000+
                    <span className="font-normal text-[#777]"> Happy Customers</span>
                  </h4>
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#ffb400]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-[15px] text-[#555]">
                  <span className="font-semibold text-[#111]">4.9</span> (2.5k Reviews)
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button className="h-[62px] px-9 rounded-2xl bg-[#ff6b00] hover:bg-[#eb6200] text-white font-semibold text-[17px] flex items-center gap-3 transition-all duration-300 shadow-[0_15px_35px_rgba(255,107,0,0.28)] hover:scale-[1.02]">
                Shop Now
                <FiArrowRight className="text-[20px]" />
              </button>
              <button className="h-[62px] px-9 rounded-2xl border border-[#cfcfcf] bg-white/90 backdrop-blur-md hover:bg-white text-[#222] font-semibold text-[17px] flex items-center gap-3 transition-all duration-300 shadow-sm">
                <FiEdit3 className="text-[18px]" />
                Customize Now
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-7 mt-16">
              {features.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white/90 backdrop-blur-md border border-[#ececec] flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-[15px] font-semibold leading-6 text-[#222]">
                    {item.title}<br />{item.subtitle}
                  </h3>
                  {index !== features.length - 1 && (
                    <div className="hidden sm:block absolute right-[-15px] top-[18px] w-[1px] h-[90px] bg-gradient-to-b from-[#e5e5e5] to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
          <img
            src="https://res.cloudinary.com/dbkpwluh0/image/upload/v1779263583/ChatGPT_Image_May_20_2026_01_20_45_PM_bmblvd.png"
            alt="Hero visual"
            className="absolute inset-0 w-full h-full object-cover object-right scale-[1.02]"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-gradient-to-r from-[#f7f3ef] to-transparent blur-xl opacity-60" />
          <div className="absolute right-0 bottom-0 w-[40%] h-[60%] bg-white/10 blur-[120px] rounded-full" />
        </div>
      </div>
    </section>
  );
};

// ========== MOBILE HERO WITH AUTO-SCROLLING CAROUSEL ==========
// ========== MOBILE HERO – CAROUSEL FIRST, THEN TEXT ==========
const MobileHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const totalSlides = carouselSlides.length;

  // Auto-scroll logic
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="w-full bg-[#FEE9DC]/90 overflow-hidden pb-3">
      
      <div className="px-2 pt-6">
        {/* ===== CAROUSEL FIRST ===== */}
        <div className="relative mb-1">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">{slide.title}</p>
                    <p className="text-white/80 text-sm">{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-md hover:bg-white transition"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-[#ff6b00] text-xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur rounded-full p-2 shadow-md hover:bg-white transition"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-[#ff6b00] text-xl" />
          </button> */}

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-[#ff6b00]" : "w-2 bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Premium Quality Badge */}
        {/* <div className="inline-flex items-center rounded-full border border-[#ffd6bf] bg-[#fff4ec] px-4 py-[7px] mb-4">
          <span className="text-[#ff6b00] text-[11px] font-bold tracking-[1px] uppercase">
            Premium Quality
          </span>
        </div> */}

        {/* Heading */}
        {/* <h1 className="text-[40px] leading-[1.2] font-bold tracking-[-2px] text-[#111111]">
          Stay <span className="text-[#ff6b00]">Refreshed.</span>
          <br />
          Everywhere <span className="text-[#ff6b00]">You Go.</span>
        </h1> */}

        {/* <p className="mt-3 text-[#5F5F5F] text-[15px] font-medium leading-relaxed">
          Premium tumblers for work, gym, travel & lifestyle.
        </p> */}

        {/* Customer + Rating */}
        {/* <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#222]">10,000+ <span className="font-normal text-[#777]">Happy Customers</span></h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-[#ffb400] text-sm"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
            <p className="text-[13px] text-[#555]"><span className="font-semibold">4.9</span> (2.5k)</p>
          </div>
        </div> */}

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="w-full py-4 rounded-xl bg-[#ff6b00] hover:bg-[#eb6200] text-white font-semibold sm:text-[16px] xsm:text-[14px] flex items-center justify-center gap-2 transition shadow-md">
            Shop Now <FiArrowRight />
          </button>
          <button className="w-full py-4 rounded-xl border border-[#cfcfcf] bg-white/90 backdrop-blur hover:bg-white text-[#222] font-semibold sm:text-[16px] xsm:text-[14px] flex items-center justify-center gap-2 transition">
            <FiEdit3 /> Customize Now
          </button>
        </div>

        {/* Features Grid (2x2) */}
        {/* <div className="grid grid-cols-2 gap-5 mt-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center bg-white/60 rounded-xl p-3 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow">
                {item.icon}
              </div>
              <h3 className="mt-2 text-[13px] font-semibold text-[#222]">
                {item.title}<br />{item.subtitle}
              </h3>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

// ========== RESPONSIVE WRAPPER ==========
const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // <768px = mobile
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <MobileHero /> : <DesktopHero />;
};

export default HeroSection;