import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TbFlame } from "react-icons/tb";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const products = [
  // ... same product data as original ...
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

const BestSellers = () => {
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const addToCart = (product) => {
    toast.success(`Added ${product.title} to cart`, {
      duration: 2000,
      style: { background: "#ff6b00", color: "#fff" },
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    toast.success(wishlist.includes(productId) ? "Removed from wishlist" : "Added to wishlist", {
      duration: 1500,
    });
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 15);
    }
  };

  // Auto-scroll with loop
  const startAutoScroll = () => {
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    autoScrollInterval.current = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };
  }, [isPaused]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, []);

  // Drag scroll (mouse + touch)
  const handleDragStart = (e) => {
    const pageX = e.pageX ?? e.touches[0]?.pageX;
    if (!pageX) return;
    setIsDragging(true);
    setStartX(pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const pageX = e.pageX ?? e.touches[0]?.pageX;
    if (!pageX) return;
    e.preventDefault();
    const x = pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-12 md:py-20 bg-[#e6f7ff]/30 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
          variants={headerVariants}
        >
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Best Sellers
              </h2>
            </div>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Most loved tumblers by our customers
            </p>
          </div>
          <motion.button
            onClick={() => navigate("/allproducts")}
            className="hidden sm:flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-full text-gray-700 font-medium hover:bg-gray-900 hover:text-white transition-all"
            whileHover={{ scale: 1.02, backgroundColor: "#111", color: "#fff" }}
            whileTap={{ scale: 0.98 }}
          >
            View all
            <FiChevronRight className="text-sm" />
          </motion.button>
        </motion.div>

        {/* Carousel Area */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all -ml-4 lg:-ml-5 cursor-pointer"
                aria-label="Previous"
              >
                <FiChevronLeft size={22} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all -mr-4 lg:-mr-5 cursor-pointer"
                aria-label="Next"
              >
                <FiChevronRight size={22} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Products with drag & stagger */}
          <motion.div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 scroll-smooth hide-scrollbar cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            variants={cardContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="min-w-[260px] sm:min-w-[280px] md:min-w-[280px] flex-shrink-0"
                variants={cardVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <ProductCard
                  product={product}
                  tag="Best Seller"
                  onAddToCart={() => addToCart(product)}
                  onToggleWishlist={() => toggleWishlist(product.id)}
                  isWishlisted={wishlist.includes(product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile View All Button */}
        <motion.div
          className="flex sm:hidden justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/allproducts")}
            className="flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-full text-gray-700 font-medium hover:bg-gray-900 hover:text-white transition-all"
          >
            View all
            <FiChevronRight />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
};

export default BestSellers;