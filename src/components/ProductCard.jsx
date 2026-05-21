import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ product, tag }) => {   // 👈 tag can be "Best Seller" or "Trending"
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-[#ffb800]">★</span>
        ))}
        {halfStar && <span className="text-[#ffb800]">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    );
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      
      {/* Image Section */}
      <div className="relative w-full pt-[90%] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: product.bg || "#fafafa" }}>
          <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10 bg-[#ff6b35]/80 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </div>

        {/* Tag Badge (Best Seller / Trending) */}
        {tag && (
          <div className={`absolute top-0 right-0 z-10 text-white text-xs font-bold px-3 py-1 rounded-bl-xl ${
            tag === "Best Seller" ? "bg-amber-500" : "bg-blue-500"
          }`}>
            {tag}
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute bottom-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#ff6b35] transition-colors duration-200">
          <FiHeart className="text-gray-600 hover:text-white" size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="sm:text-xl md:text-2xl font-bold text-[#ff6b35]">
            ₹{product.price}
          </span>
          <span className="text-gray-400 line-through text-sm">
            ₹{product.oldPrice}
          </span>
        </div>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-sm">{renderStars(product.rating)}</div>
          <span className="text-gray-500 text-xs">({product.reviews})</span>
        </div>
        
        <button className="w-full py-2.5 rounded-lg border-2 border-[#ff8c57] text-[#ff6b35] font-semibold flex items-center justify-center gap-2 hover:bg-[#ff6b35] hover:text-white transition-all duration-300 mt-auto">
          <FaShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;