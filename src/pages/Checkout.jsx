// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Loader2,
  MapPin,
  CreditCard,
  IndianRupee,
  CheckCircle,
  ChevronLeft,
  ShoppingBag,
  Truck,
  Wallet,
  Building,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock address service (replace with real API)
const addressService = {
  fetchAddresses: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        label: 'Home',
        address: '123, Green Park, New Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110017',
        isDefault: true,
      },
      {
        id: 2,
        label: 'Office',
        address: '8th Floor, Cyber City, Gurugram',
        city: 'Gurugram',
        state: 'Haryana',
        pincode: '122002',
        isDefault: false,
      },
    ];
  },
};

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cartItems, setCartItems] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Load cart and addresses
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    addressService
      .fetchAddresses()
      .then((data) => {
        setAddresses(data);
        const defaultAddr = data.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      })
      .catch(() => toast.error('Failed to load addresses'))
      .finally(() => setLoading(false));
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  // Handle place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a shipping address');
      return;
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        items: cartItems,
        address: selectedAddress,
        paymentMethod,
        total,
      };

      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Order placed successfully!');
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      navigate(`/order-success/${Date.now()}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-orange-500" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-md p-12">
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add items to proceed to checkout.</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Checkout Header – simple, no navbar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Cart</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Address + Payment */}
          <div className="flex-1 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MapPin size={20} className="text-orange-500" />
                    Shipping Address
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600 transition"
                  >
                    + Add New
                  </button>
                </div>
              </div>

              <div className="p-6">
                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-sm">No addresses saved. Please add one.</p>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`block p-4 rounded-xl border-2 cursor-pointer transition ${
                          selectedAddressId === addr.id
                            ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="sr-only"
                        />
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800">{addr.label}</span>
                              {addr.isDefault && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                            <p className="text-sm text-gray-600">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                              selectedAddressId === addr.id
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedAddressId === addr.id && (
                              <CheckCircle size={12} className="text-white" />
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard size={20} className="text-orange-500" />
                  Payment Method
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', icon: IndianRupee, desc: 'Pay when you receive' },
                    { value: 'upi', label: 'UPI', icon: Wallet, desc: 'Google Pay, PhonePe, etc.' },
                    { value: 'razorpay', label: 'Card / Netbanking', icon: CreditCard, desc: 'Secure online payment' },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 cursor-pointer transition ${
                        paymentMethod === method.value
                          ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="sr-only"
                      />
                      <method.icon size={24} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-800">{method.label}</span>
                      <span className="text-xs text-gray-400 text-center">{method.desc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              {/* Itemized list */}
              <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{item.title}</p>
                      <p className="text-gray-500">₹{item.price} × {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={submitting || !selectedAddress || !paymentMethod}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl mt-6 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                By placing an order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {showAddressModal && (
          <AddressModal onClose={() => setShowAddressModal(false)} onAdd={setAddresses} />
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------
// Address Modal (unchanged, but included for completeness)
// ----------------------------------------------
const AddressModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    label: 'Home',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newAddress = { ...formData, id: Date.now(), isDefault: false };
    onAdd((prev) => [...prev, newAddress]);
    toast.success('Address added successfully!');
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Address</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
            <select
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-sm"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition flex items-center justify-center"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : 'Save Address'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Checkout;