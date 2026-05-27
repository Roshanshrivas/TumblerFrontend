import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiTrash2, FiHeart, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

const WishlistDrawer = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistItems(wishlist);
  };

  useEffect(() => {
    if (isOpen) {
      loadWishlist();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleUpdate = () => loadWishlist();
    window.addEventListener("wishlistUpdated", handleUpdate);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, [isOpen]);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistItems(updated);
    window.dispatchEvent(new Event("wishlistUpdated"));
    toast.success("Removed from wishlist", { duration: 1500 });
  };

  const addToCartFromWishlist = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`Added ${item.title} to cart`, { duration: 1500 });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            Wishlist{" "}
            {wishlistItems.length > 0 && (
              <span className="text-sm font-medium text-gray-500 ml-2">
                ({wishlistItems.length})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close wishlist"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Scrollable items */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-5"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiHeart className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Save your favorite items here.
              </p>
              <button
                onClick={onClose}
                className="text-orange-500 font-medium hover:underline"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow duration-200"
              >
                <Link
                  to={`/product/${item.id}`}
                  onClick={onClose}
                  className="block shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-50"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} onClick={onClose}>
                    <h4 className="font-semibold text-gray-800 text-base hover:text-orange-500 transition line-clamp-1">
                      {item.title}
                    </h4>
                  </Link>
                  <p className="font-bold text-orange-600 text-lg mt-1">
                    ₹{item.price}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={() => addToCartFromWishlist(item)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition flex items-center justify-center gap-1"
                    >
                      <FiShoppingCart size={14} /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="ml-2 text-red-400 hover:text-red-600 transition p-2"
                      aria-label="Remove"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-white">
            <Link
              to="/wishlist"
              onClick={onClose}
              className="block w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl text-center transition shadow-md"
            >
              View Full Wishlist
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;