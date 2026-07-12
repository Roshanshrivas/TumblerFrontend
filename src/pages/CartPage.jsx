// src/pages/CartPage.jsx – Production-Ready with Integrated Address Management
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiArrowLeft,
  FiHeart,
  FiCheckCircle,
  FiLock,
  FiTruck,
  FiRotateCcw,
  FiShield,
  FiCheck,
  FiInfo,
  FiX,
  FiMapPin,
  FiEdit2,
} from "react-icons/fi";
import { Snowflake, Droplets, Leaf, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Brand Color
const BRAND_CYAN = "#00C2D6";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Address State – aligned with Addresses component structure
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    isDefault: false,
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Load cart and addresses from localStorage
  const loadCartAndData = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      const defaultDemo = [
        {
          id: "demo-tumbler-1",
          title: "SmoothSip Stainless Steel Tumbler 40oz",
          color: "Ocean Blue",
          price: 1299,
          quantity: 2,
          inStock: true,
          image:
            "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_45_33_AM_vsusu1.png",
        },
      ];
      setCartItems(defaultDemo);
      localStorage.setItem("cart", JSON.stringify(defaultDemo));
    } else {
      setCartItems(cart);
    }

    // Load addresses from localStorage – same key as Addresses component
    const addresses = JSON.parse(localStorage.getItem("addresses") || "[]");
    if (addresses.length > 0) {
      setSavedAddresses(addresses);
      // Prefer default address
      const defaultAddr = addresses.find((a) => a.isDefault);
      setSelectedAddress(defaultAddr || addresses[0]);
    } else if (user) {
      // Mock initial address for demo
      const initialAddr = {
        id: "addr-1",
        label: "Home",
        fullName: user.name || "John Doe",
        phoneNumber: "+91 98765 43210",
        address: "123 Green Park Street, Malviya Nagar",
        city: "New Delhi",
        state: "Delhi",
        pinCode: "110017",
        country: "India",
        isDefault: true,
      };
      setSavedAddresses([initialAddr]);
      setSelectedAddress(initialAddr);
      localStorage.setItem("addresses", JSON.stringify([initialAddr]));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCartAndData();
    window.addEventListener("cartUpdated", loadCartAndData);
    return () => window.removeEventListener("cartUpdated", loadCartAndData);
  }, []);

  // Cart operations
  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updated);
    toast.success("Cart updated", { duration: 1200 });
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
    toast.success("Item removed", { duration: 1200 });
  };

  const moveToWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (!wishlist.some((w) => w.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    }
    removeItem(item.id);
    toast.success("Moved to Wishlist!");
  };

  // Address management – same as Addresses component
  const handleSaveAddress = (e) => {
    e.preventDefault();
    const required = ["fullName", "phoneNumber", "address", "city", "state", "pinCode"];
    for (const field of required) {
      if (!newAddress[field]?.trim()) {
        toast.error(`Please enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return;
      }
    }
    if (newAddress.phoneNumber.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (newAddress.pinCode.replace(/\D/g, "").length !== 6) {
      toast.error("Enter a 6-digit pin code");
      return;
    }

    const created = {
      ...newAddress,
      id: `addr-${Date.now()}`,
      isDefault: savedAddresses.length === 0,
    };
    const updatedList = [...savedAddresses, created];
    setSavedAddresses(updatedList);
    setSelectedAddress(created);
    localStorage.setItem("addresses", JSON.stringify(updatedList));
    setIsAddingAddress(false);
    toast.success("Address saved!");
    // Reset form
    setNewAddress({
      label: "Home",
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "India",
      isDefault: false,
    });
  };

  // Calculations
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = 300;
  const totalSavings = 300;
  const freeShippingThreshold = 499;
  const shipping = rawSubtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 49;
  const total = Math.max(0, rawSubtotal - discountAmount + shipping);
  const freeShippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please sign in to proceed");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    if (!selectedAddress) {
      toast.error("Please add a delivery address first");
      setIsAddingAddress(true);
      return;
    }
    navigate("/checkout", { state: { address: selectedAddress, total } });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50/50 font-sans">
        <div className="w-10 h-10 border-4 border-[#00C2D6] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-sm font-medium text-gray-400">Loading your shopping cart…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 font-sans text-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        {/* Step Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm mx-auto">
          <div className="flex items-center justify-between relative px-2 sm:px-12">
            <div className="absolute top-4 left-8 right-8 sm:left-16 sm:right-16 h-[2px] bg-gray-100 -z-0" />
            <div
              className="absolute top-4 left-8 sm:left-16 h-[2px] bg-[#00C2D6] transition-all duration-500 -z-0"
              style={{ width: selectedAddress ? "50%" : "0%" }}
            />
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-2 cursor-pointer group" onClick={() => setIsAddingAddress(true)}>
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold shadow-sm transition ${
                selectedAddress ? "border-[#00C2D6] bg-white text-[#00C2D6]" : "border-gray-200 text-gray-400"
              }`}>
                {selectedAddress ? <FiCheck size={16} strokeWidth={3} /> : "1"}
              </div>
              <span className={`text-xs sm:text-sm font-semibold ${selectedAddress ? "text-gray-900" : "text-gray-400"}`}>Address</span>
              <span className="text-[11px] text-gray-400 font-medium hidden sm:block">
                {selectedAddress ? "✓ Verified" : "Delivery address"}
              </span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00C2D6] text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-sm">
                2
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-900">Order Summary</span>
              <span className="text-[11px] text-gray-400 font-medium hidden sm:block">Review items</span>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1.5 relative z-10 bg-white px-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-200 bg-white text-gray-400 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-400">Payment</span>
              <span className="text-[11px] text-gray-400 font-medium hidden sm:block">Secure payment</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] tracking-tight">
            Your Shopping Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty cart */
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E6F9FA] text-[#00C2D6] flex items-center justify-center mx-auto">
              <FiShoppingCart size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-sm text-gray-400 font-medium">Looks like you haven't added any tumblers yet.</p>
            <Link to="/allproducts">
              <button className="px-6 py-3 bg-[#00C2D6] hover:bg-[#00A0B0] text-white font-bold text-sm rounded-xl transition shadow-sm">
                Explore All Products
              </button>
            </Link>
          </div>
        ) : (
          /* Main Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Product Table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 bg-white px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <div className="col-span-6">PRODUCT</div>
                  <div className="col-span-2 text-center">PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-right">TOTAL</div>
                </div>
                <div className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                      >
                        <div className="md:col-span-6 flex items-start gap-4">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#E6F9FA] border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                          </div>
                          <div className="space-y-1.5 min-w-0">
                            <h3 className="font-bold text-[#1E293B] text-sm sm:text-base leading-snug">
                              {item.title}
                            </h3>
                            {item.color && <p className="text-sm text-gray-500 font-medium">{item.color}</p>}
                            <div className="flex items-center gap-1 text-[#00C2D6] text-xs font-semibold pt-0.5">
                              <FiCheckCircle size={14} className="fill-[#00C2D6] text-white" />
                              <span className="text-emerald-600 font-semibold">In Stock</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold pt-2 text-gray-400">
                              <button onClick={() => moveToWishlist(item)} className="hover:text-gray-700 transition flex items-center gap-1">
                                <FiHeart size={14} /> Move to Wishlist
                              </button>
                              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600 transition flex items-center gap-1">
                                <FiTrash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2 text-left md:text-center flex md:block justify-between items-center border-t md:border-t-0 pt-2 md:pt-0 border-gray-50">
                          <span className="md:hidden text-xs text-gray-400 font-bold">Price:</span>
                          <span className="font-bold text-gray-900 text-sm sm:text-base">₹{item.price}</span>
                        </div>
                        <div className="md:col-span-2 flex justify-between md:justify-center items-center border-t md:border-t-0 pt-2 md:pt-0 border-gray-50">
                          <span className="md:hidden text-xs text-gray-400 font-bold">Qty:</span>
                          <div className="flex items-center bg-[#F8FAFC] border border-gray-200 rounded-xl overflow-hidden p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition text-xs font-bold"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition text-xs font-bold"
                            >
                              <FiPlus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="md:col-span-2 text-right flex md:block justify-between items-center border-t md:border-t-0 pt-2 md:pt-0 border-gray-50">
                          <span className="md:hidden text-xs text-gray-400 font-bold">Total:</span>
                          <span className="font-bold text-[#00C2D6] text-base sm:text-lg">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="bg-[#FAFDFD] border-t border-gray-100 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6F9FA] text-[#00C2D6] flex items-center justify-center flex-shrink-0">
                      <FiShield size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Secure Checkout</h4>
                      <p className="text-sm text-gray-400 font-medium">100% safe & secure payments</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-6">
                    <div className="w-10 h-10 rounded-full bg-[#E6F9FA] text-[#00C2D6] flex items-center justify-center flex-shrink-0">
                      <FiTruck size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">Free Shipping</h4>
                      <p className="text-sm text-gray-400 font-medium">On orders above ₹499</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Shopping */}
              <div>
                <Link to="/allproducts" className="text-sm font-bold text-[#00C2D6] hover:text-[#00A0B0] flex items-center gap-1.5 transition">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Address Section – same structure as Addresses component */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-900">
                    <FiMapPin className="text-[#00C2D6]" size={20} />
                    <h3 className="font-bold text-base sm:text-lg">Delivery Address</h3>
                  </div>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="text-sm font-semibold text-[#00C2D6] hover:underline flex items-center gap-1"
                  >
                    <FiEdit2 size={16} /> {selectedAddress ? "Change Address" : "Add Address"}
                  </button>
                </div>

                {selectedAddress && !isAddingAddress && (
                  <div className="p-4 rounded-xl bg-[#E6F9FA]/60 border border-[#00C2D6]/20 text-sm space-y-1">
                    <p className="font-bold text-gray-900">
                      {selectedAddress.fullName}{" "}
                      <span className="font-normal text-gray-500">({selectedAddress.phoneNumber})</span>
                    </p>
                    <p className="text-gray-700">
                      {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
                    </p>
                    {selectedAddress.isDefault && (
                      <span className="inline-block text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Default
                      </span>
                    )}
                  </div>
                )}

                {isAddingAddress && (
                  <form onSubmit={handleSaveAddress} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:border-[#00C2D6] bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Phone Number *"
                        value={newAddress.phoneNumber}
                        onChange={(e) => setNewAddress({ ...newAddress, phoneNumber: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:border-[#00C2D6] bg-white"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address (Street, Area) *"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#00C2D6] bg-white"
                      required
                    />
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <input
                        type="text"
                        placeholder="City *"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:border-[#00C2D6] bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State *"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:border-[#00C2D6] bg-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Pincode *"
                        value={newAddress.pinCode}
                        onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                        className="p-3 border border-gray-200 rounded-xl outline-none focus:border-[#00C2D6] bg-white"
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#00C2D6] hover:bg-[#00A0B0] text-white font-bold text-sm rounded-xl transition shadow-sm"
                      >
                        Save & Use Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-sm space-y-5 sticky top-24">
                <h2 className="text-lg font-extrabold text-gray-900">Order Summary</h2>
                <div className="space-y-3.5 text-sm font-semibold text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemsCount} items)</span>
                    <span className="font-bold text-gray-900">₹{rawSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      Shipping <FiInfo size={14} className="text-gray-300" />
                    </span>
                    <span className="font-bold text-emerald-600">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount (SIP50)</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-extrabold text-gray-900">
                    <span>Total</span>
                    <span className="text-2xl font-black text-[#00C2D6]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                  <FiCheckCircle size={16} className="text-emerald-500" /> You saved ₹{totalSavings} on this order
                </div>
                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-[#00C2D6] hover:bg-[#00A0B0] text-white font-bold text-sm rounded-xl transition shadow-md shadow-[#00C2D6]/20 flex items-center justify-center gap-2"
                  >
                    <FiLock size={16} /> Proceed to Checkout
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold text-sm rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    Checkout with <span className="font-black italic text-blue-900">Razorpay</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-gray-100 text-xs font-bold text-gray-400">
                  <div className="space-y-1">
                    <FiRotateCcw className="mx-auto text-gray-400" size={18} />
                    <p>7 Days Return</p>
                  </div>
                  <div className="space-y-1">
                    <FiShield className="mx-auto text-gray-400" size={18} />
                    <p>Secure Payment</p>
                  </div>
                  <div className="space-y-1">
                    <FiCheckCircle className="mx-auto text-gray-400" size={18} />
                    <p>100% Genuine</p>
                  </div>
                </div>
                <div className="bg-[#E6F9FA] border border-[#00C2D6]/20 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 text-sm font-bold">
                    <FiCheckCircle size={16} className="text-[#00C2D6]" />
                    <span>
                      {rawSubtotal >= freeShippingThreshold
                        ? "Yay! You're eligible for FREE shipping"
                        : `Add ₹${freeShippingThreshold - rawSubtotal} more for free shipping`}
                    </span>
                  </div>
                  <div className="w-full bg-white h-2.5 rounded-full overflow-hidden p-0.5 border border-[#00C2D6]/10">
                    <div
                      className="bg-[#00C2D6] h-full rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 font-semibold text-center">
                    {rawSubtotal >= freeShippingThreshold
                      ? "🎉 Free shipping unlocked!"
                      : `₹${freeShippingThreshold - rawSubtotal} away from free shipping!`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Value Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 items-center shadow-sm">
          {[
            { icon: Shield, label: "Premium Quality", desc: "Top‑grade materials" },
            { icon: Snowflake, label: "24H Cold • 12H Hot", desc: "Advanced insulation" },
            { icon: Droplets, label: "Leak Proof", desc: "100% reliable" },
            { icon: Leaf, label: "BPA Free", desc: "Safe & non‑toxic" },
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center gap-3 justify-center md:justify-start ${idx > 0 ? "border-l border-gray-100 pl-4" : ""}`}>
              <div className="w-10 h-10 rounded-full bg-[#E6F9FA] text-[#00C2D6] flex items-center justify-center flex-shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{item.label}</h4>
                <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;