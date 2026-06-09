// ProductDetailsPage.jsx
// Production Ready – Fully Animated, Responsive, Professional + Skeleton Loading

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiChevronRight,
  FiMessageSquare,
  FiCheckCircle,
  FiArrowUp,
} from "react-icons/fi";
import {
  BsSnow,
  BsCupHot,
  BsShieldCheck,
  BsStarFill,
} from "react-icons/bs";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

// ========== ENHANCED PRODUCT DATA ==========
const productData = {
  id: 1,
  title: "Matte Black 24oz Insulated Tumbler",
  price: 600,
  oldPrice: 750,
  discount: 20,
  rating: 4.8,
  reviews: 128,
  inStock: true,
  description: "Elevate your daily hydration with our premium vacuum-insulated vessel. Sculpted from professional-grade kitchen stainless steel, this sleek matte finish flawlessly preserves optimum beverage temperatures while remaining entirely sweat-free.",
  features: [
    "Premium 18/8 kitchen-grade stainless steel body",
    "Double-wall vacuum insulation thermal technology",
    "Sweat-free, ultra-durable powder-coat exterior finish",
    "Leak-resistant ergonomic engineered slider lid",
    "Tapered base profiles engineered to fit standard cup holders",
  ],
  specifications: [
    { label: "Material", value: "18/8 Pro-Grade Stainless Steel, BPA-Free Eco-Plastic" },
    { label: "Insulation Capacity", value: "Hot up to 12 Hours | Cold up to 24 Hours" },
    { label: "Dimensions", value: "7.4\" H x 3.5\" Top Diameter x 2.75\" Base" },
    { label: "Maintenance", value: "Top-rack dishwasher safe, hand wash recommended" },
  ],
  images: [
    "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg",
    "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1009_8901372268734_2_fmlakc.jpg",
    "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg",
    "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1009_8901372268734_2_fmlakc.jpg",
  ],
  colors: [
    { name: "Matte Black", code: "#1a1a1a" },
    { name: "Midnight Blue", code: "#1e3a8a" },
    { name: "Sky Blue", code: "#0ea5e9" },
    { name: "Coral Red", code: "#ef4444" },
    { name: "Olive Green", code: "#64784b" },
    { name: "Blush Pink", code: "#f9a8d4" },
  ],
  sizes: [
    { label: "20oz", available: true },
    { label: "24oz", available: true },
    { label: "30oz", available: true },
  ],
};

const relatedProducts = [
  { 
    id: 2, 
    title: "Royal Purple Professional 24oz", 
    price: 600, 
    oldPrice: 750, 
    discount: 20, 
    rating: 4.7, 
    reviews: 94, 
    image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1143_8901372268703_3_nkvrhu.jpg", 
    bg: "#f3e8ff" 
  },
  { id: 3, title: "Sky Blue Hydration Vessel 24oz", price: 600, oldPrice: 750, discount: 20, rating: 4.9, reviews: 112, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1009_8901372268734_2_fmlakc.jpg", bg: "#e0f2fe" },
  { id: 4, title: "Coral Red Thermal Tumbler 24oz", price: 600, oldPrice: 750, discount: 20, rating: 4.6, reviews: 48, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg", bg: "#fee2e2" },
  { id: 5, title: "Olive Green Expedition Flask 24oz", price: 600, oldPrice: 750, discount: 20, rating: 4.8, reviews: 67, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1009_8901372268734_2_fmlakc.jpg", bg: "#f0fdf4" },
];

const sampleReviews = [
  { name: "Arjun M.", date: "May 12, 2026", rating: 5, comment: "Insulation performance is absolute luxury class. Kept my iced americano solid for over 20 hours in the Delhi summer heat. Powder coating feels top-tier.", verified: true },
  { name: "Priya R.", date: "April 28, 2026", rating: 4, comment: "Beautiful minimalist styling. Perfectly sits in my car's central dashboard dock. Docking one star just because the slider cap mechanism takes some pressure to wash clean.", verified: true }
];

// ========== SKELETON COMPONENTS ==========
const SkeletonImage = () => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs min-h-[350px] md:min-h-[480px] flex items-center justify-center">
    <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse" />
  </div>
);

const SkeletonThumbnail = () => (
  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-200 animate-pulse" />
);

const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`} />
);

const SkeletonFeature = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center gap-1.5">
    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
    <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
  </div>
);

const SkeletonSpecRow = () => (
  <div className="grid grid-cols-3 p-4">
    <SkeletonText width="w-20" height="h-4" />
    <SkeletonText width="w-32" height="h-4" className="col-span-2" />
  </div>
);

const SkeletonReview = () => (
  <div className="p-4 bg-gray-50/60 rounded-xl border border-gray-100">
    <div className="flex items-center justify-between">
      <SkeletonText width="w-24" height="h-4" />
      <SkeletonText width="w-16" height="h-3" />
    </div>
    <div className="mt-2"><SkeletonText width="w-32" height="h-4" /></div>
    <div className="mt-2"><SkeletonText width="w-full" height="h-12" /></div>
  </div>
);

// ========== HELPER COMPONENTS (Animated) ==========
const FeatureCard = ({ icon, title, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, type: "spring", damping: 12 }}
      className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center gap-1.5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-10 h-10 rounded-full bg-orange-50 text-[#ff6b35] flex items-center justify-center text-lg">
        {icon}
      </div>
      <p className="font-bold text-[10px] sm:text-xs text-gray-800 tracking-wide uppercase">{title}</p>
    </motion.div>
  );
};

const InfoCard = ({ icon, title, text, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 hover:border-gray-200"
    >
      <div className="w-9 h-9 rounded-full bg-orange-50 text-[#ff6b35] flex items-center justify-center text-base shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-normal">{text}</p>
      </div>
    </motion.div>
  );
};

// ========== MAIN COMPONENT ==========
const ProductDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[1].label);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pageRef = useRef(null);

  // Simulate data fetch (replace with actual API call)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const addToCart = () => {
    if (loading) return;
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find(
      item => item.id === productData.id && item.color === selectedColor.name && item.size === selectedSize
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({
        id: productData.id,
        title: productData.title,
        price: productData.price,
        oldPrice: productData.oldPrice,
        discount: productData.discount,
        image: productData.images[0],
        color: selectedColor.name,
        size: selectedSize,
        quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success(`Added ${quantity} × ${productData.title} to cart`, {
      duration: 2000,
      style: { background: "#1a1a1a", color: "#fff" },
    });
  };

  const toggleWishlist = () => {
    if (loading) return;
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist", { duration: 1500 });
  };

  const renderStars = (rating, sizeClass = "text-[#ffb800] text-sm") => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => <BsStarFill key={`f-${i}`} className={sizeClass} />)}
        {half && <span className={`${sizeClass} font-bold leading-none -mt-0.5`}>½</span>}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => <BsStarFill key={`e-${i}`} className="text-gray-200 text-sm" />)}
      </div>
    );
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 15 } },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 15, delay: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <motion.div
      ref={pageRef}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="w-full bg-gray-50/50 min-h-screen py-6 md:py-12 antialiased text-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Breadcrumb (always visible) */}
        <motion.nav
          variants={fadeUp}
          className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium mb-8 overflow-x-auto whitespace-nowrap scrollbar-none"
        >
          <Link to="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <Link to="/products" className="hover:text-[#ff6b35] transition-colors">Products</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <Link to="/products/tumblers" className="hover:text-[#ff6b35] transition-colors">Tumblers</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <span className="text-gray-800 font-semibold truncate">{productData.title}</span>
        </motion.nav>

        {/* MAIN PRODUCT SECTION with skeleton */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* LEFT COLUMN: Image Gallery */}
          <motion.div variants={slideInLeft} className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-none">
              {loading ? (
                [...Array(4)].map((_, idx) => <SkeletonThumbnail key={idx} />)
              ) : (
                productData.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 bg-white flex-shrink-0 transition-all ${
                      selectedImage === img ? "border-[#ff6b35] shadow-sm scale-95" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))
              )}
            </div>

            {/* Main Image */}
            {loading ? (
              <SkeletonImage />
            ) : (
              <div className="flex-1 bg-white rounded-2xl p-6 relative border border-gray-100 shadow-xs order-1 md:order-2 flex items-center justify-center min-h-[350px] md:min-h-[480px]">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md mx-auto flex items-center justify-center"
                >
                  <img src={selectedImage} alt={productData.title} className="w-full h-auto max-h-[420px] object-contain" />
                </motion.div>
                <div className="absolute top-4 left-4 z-10 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-2xs font-extrabold tracking-wider uppercase shadow-xs">
                  {productData.discount}% Off
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleWishlist}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 border border-gray-100 transition"
                >
                  <FiHeart className={`text-lg transition-all duration-300 ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-400"}`} />
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* RIGHT COLUMN: Product Info */}
          <motion.div variants={slideInRight} className="flex flex-col space-y-6">
            {loading ? (
              <>
                <div><SkeletonText width="w-32" height="h-6" /><SkeletonText width="w-3/4" height="h-8" className="mt-2" /></div>
                <div className="flex items-center gap-4"><SkeletonText width="w-24" height="h-8" /><SkeletonText width="w-20" height="h-6" /></div>
                <SkeletonText width="w-full" height="h-20" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => <SkeletonFeature key={i} />)}
                </div>
                <SkeletonText width="w-full" height="h-10" />
                <SkeletonText width="w-full" height="h-12" />
                <div className="flex gap-4"><SkeletonText width="w-32" height="h-12" /><SkeletonText width="w-full" height="h-12" /></div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded-md">Premium Vessels</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mt-2.5">{productData.title}</h1>
                  <div className="flex items-center gap-3 mt-3.5 flex-wrap">
                    {renderStars(productData.rating)}
                    <span className="text-gray-500 font-semibold text-xs sm:text-sm">({productData.reviews} Verified Customer Reviews)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-b border-gray-100 pb-5 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold text-[#ff6b35]">₹{productData.price}.00</span>
                  <span className="text-gray-400 line-through text-lg font-bold">₹{productData.oldPrice}.00</span>
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ml-auto flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> In Stock
                  </span>
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">{productData.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <FeatureCard icon={<BsSnow />} title="Cold 24H" index={0} />
                  <FeatureCard icon={<BsCupHot />} title="Hot 12H" index={1} />
                  <FeatureCard icon={<BsShieldCheck />} title="BPA Free" index={2} />
                  <FeatureCard icon={<FiTruck />} title="Cup Ready" index={3} />
                </div>

                <div className="pt-2 border-t border-gray-50">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">Color: <span className="text-[#ff6b35] font-extrabold">{selectedColor.name}</span></h3>
                  <div className="flex flex-wrap gap-3.5 mt-3">
                    {productData.colors.map((color, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full ring-2 transition-all shadow-xs ${
                          selectedColor.code === color.code ? "ring-[#ff6b35] ring-offset-4 scale-105" : "ring-transparent"
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">Selected Capacity: <span className="text-[#ff6b35] font-extrabold">{selectedSize}</span></h3>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {productData.sizes.map((size) => (
                      <motion.button
                        key={size.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSize(size.label)}
                        disabled={!size.available}
                        className={`px-5 py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm tracking-wide transition-all ${
                          selectedSize === size.label
                            ? "border-[#ff6b35] text-[#ff6b35] bg-orange-50/30"
                            : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                        } ${!size.available && "opacity-30 cursor-not-allowed"}`}
                      >
                        {size.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-50 flex-wrap">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden shrink-0">
                    <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"><FiMinus size={13} /></button>
                    <div className="w-10 text-center font-bold text-gray-900 text-sm">{quantity}</div>
                    <button onClick={() => setQuantity(prev => prev + 1)} className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"><FiPlus size={13} /></button>
                  </div>
                  <div className="flex-1 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addToCart}
                      className="flex-1 bg-[#ff6b35] hover:bg-[#e05621] text-white font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <FiShoppingCart size={16} /> Add to Cart
                    </motion.button>
                    <Link to="/customize" className="flex-1 hidden sm:block">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full border-2 border-gray-900 text-gray-900 font-bold py-2.5 rounded-xl transition-all hover:bg-gray-900 hover:text-white bg-white">
                        Customize Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
                <Link to="/customize" className="w-full sm:hidden pt-1">
                  <button className="w-full border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl transition-all hover:bg-gray-900 hover:text-white bg-white">Customize Now</button>
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* TABS & REVIEWS SECTION with skeleton */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            <div className="flex gap-6 sm:gap-8 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-none">
              {["description", "specifications", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-bold text-sm sm:text-base pb-2 transition-all relative capitalize whitespace-nowrap ${
                    activeTab === tab ? "text-[#ff6b35] border-b-2 border-[#ff6b35]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "shipping" ? "Shipping & Logistics" : tab}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="mt-6 space-y-4">
                <SkeletonText width="w-full" height="h-20" />
                {[...Array(3)].map((_, i) => <div key={i} className="flex items-center gap-3"><SkeletonText width="w-6" height="h-6" /><SkeletonText width="w-3/4" height="h-4" /></div>)}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6"
                >
                  {activeTab === "description" && (
                    <div className="grid md:grid-cols-5 gap-6 items-center">
                      <div className="md:col-span-3 space-y-4">
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                          Engineered for professionals on the move, this flagship thermal canister offers uncompromised construction aesthetics. Its unique premium double-wall architecture eliminates outer condensation models entirely.
                        </p>
                        <ul className="space-y-3 pt-2">
                          {productData.features.map((feature, idx) => (
                            <motion.li key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700">
                              <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-2 hidden md:block rounded-xl overflow-hidden aspect-square bg-gray-50 border border-gray-100 p-2">
                        <img src={selectedImage} alt="Context view" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    </div>
                  )}

                  {activeTab === "specifications" && (
                    <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                      {productData.specifications.map((spec, i) => (
                        <div key={i} className={`grid grid-cols-3 p-4 text-xs sm:text-sm ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                          <span className="font-bold text-gray-500 col-span-1">{spec.label}</span>
                          <span className="text-gray-800 font-semibold col-span-2 pl-4">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl font-medium">
                      <h4 className="font-bold text-gray-900">Fulfillment Framework</h4>
                      <p>All warehouse orders undergo quality dispatch metrics loops within 24 operational business hours. Dispatch updates link directly to accounts automatically.</p>
                      <h4 className="font-bold text-gray-900">Returns Policy</h4>
                      <p>We supply an automated 7-day hassle-free online portal loop to execute item replacements if functional thermal variations emerge.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Reviews Section with skeleton */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-6 flex items-center gap-2">
                <FiMessageSquare className="text-[#ff6b35]" /> Top Verified Feedback
              </h3>
              <div className="space-y-4">
                {loading ? (
                  [...Array(2)].map((_, i) => <SkeletonReview key={i} />)
                ) : (
                  sampleReviews.map((rev, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 bg-gray-50/60 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-800">{rev.name}</span>
                          {rev.verified && <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"><FiCheckCircle /> Verified</span>}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                      </div>
                      <div className="mt-1.5">{renderStars(rev.rating, "text-[#ffb800] text-xs")}</div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2 leading-relaxed">{rev.comment}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Customer Analytics Panel with skeleton */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
              <SkeletonText width="w-32" height="h-6" />
              <SkeletonText width="w-20" height="h-10" className="mt-4" />
              <SkeletonText width="w-full" height="h-20" className="mt-4" />
              <SkeletonText width="w-full" height="h-10" className="mt-6" />
            </div>
          ) : (
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">Customer Analytics</h3>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-4xl font-bold text-gray-900">{productData.rating}</span>
                  <span className="text-gray-400 font-semibold text-sm">/ 5.0</span>
                </div>
                <div className="flex items-center gap-3 mt-1">{renderStars(productData.rating, "text-[#ffb800] text-base")}</div>
                <div className="space-y-2.5 mt-6 border-t border-gray-50 pt-5">
                  {[{ stars: 5, percentage: "82%" }, { stars: 4, percentage: "12%" }, { stars: 3, percentage: "4%" }, { stars: 2, percentage: "1%" }, { stars: 1, percentage: "1%" }].map((row, idx) => (
                    <div key={idx} className="flex items-center text-xs text-gray-600 font-medium gap-3">
                      <span className="w-3 text-right font-bold">{row.stars}★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffb800] rounded-full" style={{ width: row.percentage }} />
                      </div>
                      <span className="w-8 text-right text-gray-400 font-bold">{row.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-8 border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl text-sm transition-all hover:bg-gray-900 hover:text-white bg-white">Write a Review</motion.button>
            </motion.div>
          )}
        </div>

        {/* Logistics Info Cards */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <InfoCard icon={<FiTruck />} title="Free Shipping Protection" text="Automatically active on all configurations crossing ₹999 total bounds." index={0} />
          <InfoCard icon={<FiRefreshCw />} title="Frictionless Exchanges" text="7-day completely automated account processing loops for replacements." index={1} />
          <InfoCard icon={<FiShield />} title="Secure Checkout Matrix" text="Validated safety security protocols executing certified standard checkout channels." index={2} />
        </motion.div>

        {/* Related Products */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">Recommended Choices</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-1">You May Also Like</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-[#ff6b35] hover:text-[#e05621] transition-colors hidden sm:block">View Collection →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            ) : (
              relatedProducts.map((prod, idx) => (
                <motion.div key={prod.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <ProductCard product={prod} tag={prod.id === 2 ? "Best Seller" : prod.id === 3 ? "New Launch" : null} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </motion.div>
  );
};

// Skeleton Card for related products
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded w-full" />
    </div>
  </div>
);

export default ProductDetailsPage;