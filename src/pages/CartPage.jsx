import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
    // Listen for cart updates from other components (e.g., product card)
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // Save cart to localStorage and notify
  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    // Dispatch custom event to update navbar count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updated);
    toast.success("Cart updated", { duration: 1500 });
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    saveCart(updated);
    toast.success("Item removed", { duration: 1500 });
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  // Proceed to checkout (placeholder)
  const handleCheckout = () => {
    toast.success("Proceeding to checkout (demo)", { duration: 2000 });
    // Redirect to checkout page when ready
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-md p-12">
            <FiShoppingCart className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
            <Link to="/allproducts">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-600 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                    {/* Product Image & Name */}
                    <div className="flex-1 flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                      />
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-semibold text-gray-800 hover:text-orange-500 transition">
                            {item.title}
                          </h3>
                        </Link>
                        {item.color && (
                          <p className="text-xs text-gray-500 mt-1">Color: {item.color}</p>
                        )}
                        {item.size && (
                          <p className="text-xs text-gray-500">Size: {item.size}</p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 text-xs flex items-center gap-1 mt-2 hover:text-red-600"
                        >
                          <FiTrash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:w-32 text-center">
                      <span className="font-medium text-gray-700">₹{item.price}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:w-32 flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="md:w-32 text-right font-bold text-gray-800">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-6">
              <Link to="/allproducts" className="text-orange-500 hover:underline flex items-center gap-1">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">₹{total}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl mt-6 transition"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-400 text-center mt-4">
                Free shipping on orders above ₹999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;