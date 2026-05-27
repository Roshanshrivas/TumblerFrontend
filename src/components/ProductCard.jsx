// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductCard = ({ product, tag }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-[#ffb800]">
            ★
          </span>
        ))}

        {halfStar && (
          <span className="text-[#ffb800]">½</span>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </>
    );
  };

  const handleNavigate = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart") || []);
    const existingProduct = existingCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Added ${product.title} to cart`, { duration: 1500 });
  };


  const handleWishlist = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = wishlist.find((item) => item.id === product.id);
    if (exists) {
      const updated = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      toast.success("Removed from wishlist", { duration: 1500 });
    } else {
      wishlist.push({ id: product.id, title: product.title, price: product.price, image: product.image, discount: product.discount });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      toast.success("Added to wishlist", { duration: 1500 });
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div
      onClick={handleNavigate}
      className="
        cursor-pointer
        group
        bg-white
        border
        border-gray-100
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        transform
        hover:-translate-y-1
        h-full
        flex
        flex-col
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full pt-[90%] overflow-hidden bg-gray-100">

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: product.bg || "#fafafa",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* DISCOUNT */}
        <div className="absolute top-2 left-2 z-10 bg-[#ff6b35] text-white text-xs font-bold px-3 py-1 rounded-full">
          -{product.discount}%
        </div>

        {/* TAG */}
        {tag && (
          <div
            className={`
              absolute top-0 right-0 z-10
              text-white text-xs font-bold
              px-3 py-1 rounded-bl-xl
              ${
                tag === "Best Seller"
                  ? "bg-[#ff6b35]"
                  : "bg-blue-500"
              }
            `}
          >
            {tag}
          </div>
        )}

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          className="
            absolute bottom-3 right-3 z-10
            w-9 h-9 bg-white rounded-full
            flex items-center justify-center
            shadow-md hover:bg-[#ff6b35]
            transition-colors duration-200
            group/heart
          "
        >
          <FiHeart
            className="
              text-gray-600
              group-hover/heart:text-white
            "
            size={16}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <span className="sm:text-xl md:text-2xl font-bold text-[#ff6b35]">
            ₹{product.price}
          </span>

          <span className="text-gray-400 line-through text-sm">
            ₹{product.oldPrice}
          </span>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-sm">
            {renderStars(product.rating)}
          </div>

          <span className="text-gray-500 text-xs">
            ({product.reviews})
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          className="
            w-full py-3 rounded-xl
            border-[1.5px] border-[#ff8c57]
            text-[#ff6b35] font-semibold
            flex items-center justify-center gap-2
            hover:bg-[#ff6b35]
            hover:text-white
            transition-all duration-300
            mt-auto
          "
        >
          <FaShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;