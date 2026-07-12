// CartDrawer.jsx – Production-Ready, Teal Theme, Responsive
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load items from localStorage
  const loadCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    } catch (error) {
      console.error("Failed parsing cart collection records:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleUpdate = () => loadCart();
    window.addEventListener("cartUpdated", handleUpdate);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, [isOpen]);

  // Save cart with multi-variant support
  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update quantity using unique key (id + color + size)
  const updateQuantity = (uniqueKey, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    const updated = cartItems.map((item) => {
      const itemKey = `${item.id}-${item.color || ""}-${item.size || ""}`;
      return itemKey === uniqueKey ? { ...item, quantity: newQuantity } : item;
    });
    saveCart(updated);
  };

  const removeItem = (uniqueKey) => {
    const updated = cartItems.filter((item) => {
      const itemKey = `${item.id}-${item.color || ""}-${item.size || ""}`;
      return itemKey !== uniqueKey;
    });
    saveCart(updated);
    toast.error("Item removed from cart", {
      duration: 1500,
      style: { background: "#1a1a1a", color: "#fff", fontSize: "12px", fontWeight: "600" },
    });
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingThreshold = 999;
  const freeShippingProgress = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              Your Cart{" "}
              <span className="text-xs bg-[#E6F9FA] text-[#00C2D6] px-2.5 py-0.5 rounded-full font-bold">
                {itemCount} items
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition duration-200 active:scale-90"
            aria-label="Close cart"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        {cartItems.length > 0 && (
          <div className="bg-[#E6F9FA]/40 border-b border-[#00C2D6]/20 px-5 py-3">
            <p className="text-xs font-semibold text-gray-700">
              {subtotal >= shippingThreshold ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  🎉 You qualify for Free Shipping!
                </span>
              ) : (
                <>
                  Add <span className="text-[#00C2D6] font-bold">₹{shippingThreshold - subtotal}</span> more to unlock free shipping
                </>
              )}
            </p>
            <div className="w-full bg-gray-200/70 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#00C2D6] transition-all duration-500 ease-out rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-gray-100 scrollbar-none">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
                <FiShoppingCart size={32} />
              </div>
              <p className="text-gray-900 font-bold text-base">Your cart is feeling light</p>
              <p className="text-gray-400 text-xs max-w-[240px] mt-1 leading-normal">
                Explore our high-end insulated collections to fill it with premium performance.
              </p>
              <button
                onClick={onClose}
                className="mt-5 bg-gray-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-[#00C2D6] transition duration-200 shadow-xs uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => {
              const uniqueKey = `${item.id}-${item.color || ""}-${item.size || ""}`;
              return (
                <div key={uniqueKey} className={`flex gap-4 py-4 ${idx === 0 ? "pt-1" : ""}`}>
                  <div className="w-20 h-20 shrink-0 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden p-1 flex items-center justify-center relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight hover:text-[#00C2D6] transition">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(uniqueKey)}
                          className="text-gray-400 hover:text-red-500 p-0.5 transition shrink-0 rounded"
                          title="Remove Item"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>

                      {/* Variant badges */}
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {item.color && (
                          <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-md">
                            {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span className="text-[10px] bg-gray-100 text-gray-700 font-black px-2 py-0.5 rounded-md">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(uniqueKey, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={11} />
                        </button>
                        <span className="w-7 text-center font-bold text-gray-900 text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(uniqueKey, item.quantity, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={11} />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400 font-semibold block">
                          ₹{item.price} × {item.quantity}
                        </span>
                        <p className="font-extrabold text-gray-900 text-sm">
                          ₹{Number(item.price || 0) * item.quantity}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer – Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.02)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold text-gray-500">
                <span>Shipping</span>
                <span className={subtotal >= shippingThreshold ? "text-emerald-600 font-bold" : "text-gray-700"}>
                  {subtotal >= shippingThreshold ? "FREE" : "₹70"}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-gray-50">
                <span className="font-black text-gray-900 text-base">Total</span>
                <span className="font-black text-2xl text-[#00C2D6]">
                  ₹{subtotal + (subtotal >= shippingThreshold ? 0 : 70)}.00
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full bg-[#00C2D6] hover:bg-[#00A0B0] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-sm active:scale-99 text-sm uppercase tracking-wide"
              >
                Go to Checkout <FiChevronRight size={16} />
              </Link>
              <button
                onClick={onClose}
                className="w-full text-center text-gray-500 font-bold text-xs hover:text-gray-900 uppercase tracking-wider py-1.5 transition"
              >
                Keep Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;