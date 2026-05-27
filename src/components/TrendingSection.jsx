import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg",
    title: "Matte Black 24oz",
    price: 600,
    oldPrice: 750,
    rating: 5,
    reviews: 128,
    bg: "#fff5f2",
    discount: 20,
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg",
    title: "Rose Gold 20oz",
    price: 600,
    oldPrice: 750,
    rating: 4.5,
    reviews: 98,
    bg: "#fff0f0",
    discount: 20,
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg",
    title: "Lavender Dream 24oz",
    price: 600,
    oldPrice: 750,
    rating: 5,
    reviews: 142,
    bg: "#f5f0ff",
    discount: 20,
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779189010/imgi_1143_8901372268703_3-removebg-preview_nnm2vx.png",
    title: "Olive Green 30oz",
    price: 600,
    oldPrice: 750,
    rating: 4,
    reviews: 110,
    bg: "#f3f5ec",
    discount: 20,
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188733/categryone-Photoroom_odwr1b.png",
    title: "Blush Pink 22oz",
    price: 600,
    oldPrice: 750,
    rating: 5,
    reviews: 106,
    bg: "#fff0f5",
    discount: 20,
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1009_8901372268734_2_fmlakc.jpg",
    title: "Midnight Blue 24oz",
    price: 650,
    oldPrice: 800,
    rating: 4.8,
    reviews: 87,
    bg: "#eef5ff",
    discount: 19,
  },
];

const TrendingSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);


  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  // Auto-scroll logic
  const startAutoScroll = () => {
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    autoScrollInterval.current = setInterval(() => {
      if (!isPaused && scrollRef.current && showRightArrow) {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      } else if (!isPaused && !showRightArrow) {
        // When reaching the end, scroll back to start smoothly
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };
  }, [isPaused, showRightArrow]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkScrollButtons();
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  // Mouse drag for carousel
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="w-full py-12 md:py-10 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trending Now
            </h2>
            <p className="text-gray-500 mt-1">
              See what's hot in the world of tumblers
            </p>
          </div>
          <button 
           onClick={() => navigate("/allproducts")}
           className="hidden sm:flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-full text-gray-700 font-medium hover:bg-gray-900 hover:text-white transition-all">
            View all
            <FiChevronRight />
          </button>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all -ml-4 lg:-ml-5"
              aria-label="Previous"
            >
              <FiChevronLeft size={22} />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all -mr-4 lg:-mr-5"
              aria-label="Next"
            >
              <FiChevronRight size={22} />
            </button>
          )}

          {/* Scrollable Products */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[280px] lg:min-w-[250px] flex-shrink-0"
              >
                <ProductCard key={product.id} product={product} tag="Trending" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="flex sm:hidden justify-center mt-8">
          <button className="flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-full text-gray-700 font-medium hover:bg-gray-900 hover:text-white transition-all">
            View all
            <FiChevronRight />
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;