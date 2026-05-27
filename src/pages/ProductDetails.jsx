// ProductDetailsPage.jsx
// Production Ready – Optimized Image Frame, Integrated Custom Cards, Upgraded Brand Colors

import React, { useState } from "react";
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
} from "react-icons/fi";
import {
  BsSnow,
  BsCupHot,
  BsShieldCheck,
  BsStarFill,
} from "react-icons/bs";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";


// ---------- Enhanced Product Data ----------
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

// Formatted correctly to support your ProductCard component props directly
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

// ---------- Helper Components ----------
const FeatureCard = ({ icon, title }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col items-center gap-1.5 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-sm">
    <div className="w-10 h-10 rounded-full bg-orange-50 text-[#ff6b35] flex items-center justify-center text-lg">
      {icon}
    </div>
    <p className="font-bold text-[10px] sm:text-xs text-gray-800 tracking-wide uppercase">{title}</p>
  </div>
);

const InfoCard = ({ icon, title, text }) => (
  <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:border-gray-200 transition">
    <div className="w-9 h-9 rounded-full bg-orange-50 text-[#ff6b35] flex items-center justify-center text-base shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
      <p className="text-xs text-gray-500 mt-0.5 leading-normal">{text}</p>
    </div>
  </div>
);

// ---------- Main Component ----------
const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[1].label);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find(item => item.id === productData.id && item.color === selectedColor.name && item.size === selectedSize);

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
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist", { duration: 1500 });
  };

  const renderStars = (rating, sizeClass = "text-[#ffb800] text-sm") => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => <BsStarFill key={`f-${i}`} className={sizeClass} />)}
        {half && <span className={`${sizeClass} font-bold leading-none -mt-0.5`}>½</span>}
        {[...Array(empty)].map((_, i) => <BsStarFill key={`e-${i}`} className="text-gray-200 text-sm" />)}
      </div>
    );
  };

  return (
    <section className="w-full bg-gray-50/50 min-h-screen py-6 md:py-12 antialiased text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-[#ff6b35] transition-colors">Home</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <Link to="/products" className="hover:text-[#ff6b35] transition-colors">Products</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <Link to="/products/tumblers" className="hover:text-[#ff6b35] transition-colors">Tumblers</Link>
          <FiChevronRight className="text-gray-300 shrink-0" />
          <span className="text-gray-800 font-semibold truncate">{productData.title}</span>
        </nav>

        {/* MAIN PRODUCT VIEW PLATFORM */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Premium Dynamic Sticky Image Gallery */}
          <div className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-6">
            
            {/* Gallery Thumbnails */}
            <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-none">
              {productData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 bg-white flex-shrink-0 transition-all ${
                    selectedImage === img ? "border-[#ff6b35] shadow-sm scale-95" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Frame Container */}
            <div className="flex-1 bg-white rounded-2xl p-6 relative border border-gray-100 shadow-xs order-1 md:order-2 flex items-center justify-center min-h-[350px] md:min-h-[480px]">
              <div className="absolute top-4 left-4 z-10 bg-[#ff6b35] text-white px-3 py-1 rounded-full text-2xs font-extrabold tracking-wider uppercase shadow-xs">
                {productData.discount}% Off
              </div>
              <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 border border-gray-100 transition active:scale-90 group"
              >
                <FiHeart className={`text-lg transition-all duration-300 ${isWishlisted ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 group-hover:text-red-400"}`} />
              </button>
              
              <div className="w-full max-w-md mx-auto flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={productData.title}
                  className="w-full h-auto max-h-[420px] object-contain transition-all duration-300 transform group-hover:scale-102"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Business Commercial Controls */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest bg-orange-50 px-2.5 py-1 rounded-md">Premium Vessels</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mt-2.5">{productData.title}</h1>
              <div className="flex items-center gap-3 mt-3.5">
                {renderStars(productData.rating)}
                <span className="text-gray-500 font-semibold text-xs sm:text-sm">({productData.reviews} Verified Customer Reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <span className="text-3xl md:text-4xl font-bold text-[#ff6b35]">₹{productData.price}.00</span>
              <span className="text-gray-400 line-through text-lg font-bold">₹{productData.oldPrice}.00</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ml-auto flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> In Stock
              </span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">{productData.description}</p>

            {/* Quick Features Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <FeatureCard icon={<BsSnow />} title="Cold 24H" />
              <FeatureCard icon={<BsCupHot />} title="Hot 12H" />
              <FeatureCard icon={<BsShieldCheck />} title="BPA Free" />
              <FeatureCard icon={<FiTruck />} title="Cup Ready" />
            </div>

            {/* Color Configurator */}
            <div className="pt-2 border-t border-gray-50">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">Color: <span className="text-[#ff6b35] font-extrabold">{selectedColor.name}</span></h3>
              <div className="flex flex-wrap gap-3.5 mt-3">
                {productData.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full ring-2 transition-all transform active:scale-95 shadow-xs ${
                      selectedColor.code === color.code ? "ring-[#ff6b35] ring-offset-4 scale-105" : "ring-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector Layout */}
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wide uppercase">Selected Capacity: <span className="text-[#ff6b35] font-extrabold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    disabled={!size.available}
                    className={`px-5 py-2.5 rounded-xl border-2 font-bold text-xs sm:text-sm tracking-wide transition-all transform active:scale-95 ${
                      selectedSize === size.label
                        ? "border-[#ff6b35] text-[#ff6b35] bg-orange-50/30 shadow-2xs"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                    } ${!size.available && "opacity-30 cursor-not-allowed"}`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Module */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
              <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden shrink-0">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <FiMinus size={13} />
                </button>
                <div className="w-10 text-center font-bold text-gray-900 text-sm">{quantity}</div>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                >
                  <FiPlus size={13} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex-1 flex gap-3">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-[#ff6b35] hover:bg-[#e05621] text-white font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm transform active:scale-98"
                >
                  <FiShoppingCart size={16} />
                  Add to Cart
                </button>
                <Link to="/customize" className="flex-1 hidden sm:block">
                  <button className="w-full border-2 border-gray-900 text-gray-900 font-bold py-2.5 rounded-xl transition-all hover:bg-gray-900 hover:text-white transform active:scale-98 bg-white">
                    Customize Now
                  </button>
                </Link>
              </div>
            </div>
            
            <Link to="/customize" className="w-full sm:hidden pt-1">
              <button className="w-full border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl transition-all hover:bg-gray-900 hover:text-white bg-white">
                Customize Now
              </button>
            </Link>
          </div>
        </div>

        {/* ---------- PREMIUM DESCRIPTION & REVIEW CONTEXT PLATFORM ---------- */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          
          {/* TABS COMPONENT PANEL */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            <div className="flex gap-6 sm:gap-8 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-none">
              {["description", "specifications", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-bold text-sm sm:text-base pb-2 transition-all relative capitalize whitespace-nowrap ${
                    activeTab === tab 
                      ? "text-[#ff6b35] border-b-2 border-[#ff6b35]" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "shipping" ? "Shipping & Logistics" : tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === "description" && (
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3 space-y-4">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                      Engineered for professionals on the move, this flagship thermal canister offers uncompromised construction aesthetics. Its unique premium double-wall architecture eliminates outer condensation models entirely.
                    </p>
                    <ul className="space-y-3 pt-2">
                      {productData.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700">
                          <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 hidden md:block rounded-xl overflow-hidden aspect-square bg-gray-50 border border-gray-100 p-2">
                    <img src={selectedImage} alt="Context view" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 shadow-2xs">
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
            </div>

            {/* REAL CUSTOMER VERIFIED TIMELINE REVIEWS */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-6 flex items-center gap-2">
                <FiMessageSquare className="text-[#ff6b35]" /> Top Verified Feedback
              </h3>
              <div className="space-y-4">
                {sampleReviews.map((rev, i) => (
                  <div key={i} className="p-4 bg-gray-50/60 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-800">{rev.name}</span>
                        {rev.verified && <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5"><FiCheckCircle /> Verified</span>}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                    </div>
                    <div className="mt-1.5">{renderStars(rev.rating, "text-[#ffb800] text-xs")}</div>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DYNAMIC CUSTOMER METRICS DASHBOARD */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">Customer Analytics</h3>
              
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-4xl font-bold text-gray-900">{productData.rating}</span>
                <span className="text-gray-400 font-semibold text-sm">/ 5.0</span>
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                {renderStars(productData.rating, "text-[#ffb800] text-base")}
                <span className="text-xs font-semibold text-gray-500">({productData.reviews} global evaluations)</span>
              </div>

              {/* Progress Distribution Bars */}
              <div className="space-y-2.5 mt-6 border-t border-gray-50 pt-5">
                {[
                  { stars: 5, percentage: "82%" },
                  { stars: 4, percentage: "12%" },
                  { stars: 3, percentage: "4%" },
                  { stars: 2, percentage: "1%" },
                  { stars: 1, percentage: "1%" }
                ].map((row, idx) => (
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

            <button className="w-full mt-8 border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-xl text-sm transition-all hover:bg-gray-900 hover:text-white bg-white active:scale-98 transform">
              Write a Review
            </button>
          </div>
        </div>

        {/* Logistics Matrix Footer Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <InfoCard icon={<FiTruck />} title="Free Shipping Protection" text="Automatically active on all configurations crossing ₹999 total bounds." />
          <InfoCard icon={<FiRefreshCw />} title="Frictionless Exchanges" text="7-day completely automated account processing loops for replacements." />
          <InfoCard icon={<FiShield />} title="Secure Checkout Matrix" text="Validated safety security protocols executing certified standard checkout channels." />
        </div>

        {/* ---------- RELATED PRODUCTS RE-ARCHITECTED RACK ---------- */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#ff6b35] uppercase tracking-widest">Recommended Choices</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mt-1">You May Also Like</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-[#ff6b35] hover:text-[#e05621] transition-colors hidden sm:block">View Collection →</Link>
          </div>
          
          {/* Dynamic Map using your real custom ProductCard component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                tag={prod.id === 2 ? "Best Seller" : prod.id === 3 ? "New Launch" : null} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;