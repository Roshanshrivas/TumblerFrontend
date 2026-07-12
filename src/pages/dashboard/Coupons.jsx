// src/pages/dashboard/Coupons.jsx – Professional, Fully Responsive, Teal Theme
import React, { useState, useEffect } from 'react';
import {
  Ticket,
  Copy,
  Check,
  Percent,
  IndianRupee,
  Calendar,
  ChevronRight,
  Clock,
  Loader2,
  Info,
  ChevronLeft,
  ShoppingBag,
  Gift,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// ----------------------------------------------
// Mock Service
// ----------------------------------------------
const couponService = {
  fetchCoupons: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
      {
        id: 1,
        code: 'SAVE20',
        description: '20% OFF on orders above ₹999',
        discountType: 'percentage',
        discountValue: 20,
        minimumOrder: 999,
        validUntil: '2025-08-30',
        scope: 'SITEWIDE',
      },
      {
        id: 2,
        code: 'SMOOTHSIP300',
        description: '₹300 OFF on orders above ₹1,999',
        discountType: 'fixed',
        discountValue: 300,
        minimumOrder: 1999,
        validUntil: '2025-09-15',
        scope: 'SITEWIDE',
      },
      {
        id: 3,
        code: 'FREESHIP',
        description: 'Free Shipping on all orders',
        discountType: 'free_shipping',
        discountValue: 'FREE',
        minimumOrder: 499,
        validUntil: '2025-08-31',
        scope: 'SITEWIDE',
      },
      {
        id: 4,
        code: 'APP10',
        description: '10% OFF on orders above ₹799',
        discountType: 'percentage',
        discountValue: 10,
        minimumOrder: 799,
        validUntil: '2025-09-10',
        scope: 'APP ONLY',
      },
    ];
  },
  fetchHistory: async () => {
    return [
      { code: 'SAVE20', discount: '20% OFF', minOrder: '₹999', usedOn: '22 May, 2025', savings: '₹260', status: 'Used' },
      { code: 'SMOOTHSIP300', discount: '₹300 OFF', minOrder: '₹1,999', usedOn: '10 May, 2025', savings: '₹300', status: 'Used' },
      { code: 'FREESHIP', discount: 'Free Shipping', minOrder: '₹499', usedOn: '05 May, 2025', savings: '₹60', status: 'Used' },
      { code: 'APP10', discount: '10% OFF', minOrder: '₹799', usedOn: '28 Apr, 2025', savings: '₹115', status: 'Expired' },
      { code: 'WELCOME100', discount: '₹100 OFF', minOrder: '₹599', usedOn: '15 Apr, 2025', savings: '₹100', status: 'Expired' },
    ];
  },
};

// ----------------------------------------------
// Coupon Card Component (Enhanced, Responsive)
// ----------------------------------------------
const CouponCard = ({ coupon }) => {
  const { code, description, discountType, discountValue, minimumOrder, validUntil, scope } = coupon;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success(`Coupon code "${code}" copied to clipboard!`);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success(`Coupon code "${code}" copied!`);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleApply = () => {
    toast.success(`Coupon "${code}" applied successfully! 🎉`);
  };

  const showTerms = () => {
    toast(
      (t) => (
        <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
          <p className="font-bold text-gray-900 dark:text-white">Terms & Conditions:</p>
          <p>• Minimum order value must be met.</p>
          <p>• Cannot be combined with other offers.</p>
          <p>• Valid for a single transaction only.</p>
        </div>
      ),
      { icon: 'ℹ️', duration: 4000 }
    );
  };

  const formatValidUntil = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format discount display
  const getDiscountDisplay = () => {
    if (discountType === 'free_shipping') {
      return (
        <>
          <span className="text-xl sm:text-2xl font-black text-[#14C6D8] leading-none">FREE</span>
          <span className="text-[10px] sm:text-xs font-bold text-[#14C6D8] uppercase tracking-wider">Shipping</span>
        </>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <span className="text-2xl sm:text-3xl font-black text-[#18212A] dark:text-white leading-none">
          {discountType === 'fixed' && <span className="text-base sm:text-xl">₹</span>}
          {discountValue}
          {discountType === 'percentage' && <span className="text-base sm:text-xl">%</span>}
        </span>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#5F6C7B]">OFF</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#18212A] rounded-2xl border-2 border-[#14C6D8]/30 dark:border-[#14C6D8]/20 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row overflow-hidden min-h-[170px]"
    >
      {/* Left panel – discount badge (full width on mobile, side on larger) */}
      <div className="w-full sm:w-[130px] lg:w-[150px] bg-[#E6F9FA] dark:bg-[#14C6D8]/10 flex flex-col items-center justify-center p-3 sm:p-2 text-center border-b sm:border-b-0 sm:border-r-2 border-dashed border-[#14C6D8]/20">
        <div className="flex flex-col items-center justify-center gap-0.5">
          {getDiscountDisplay()}
        </div>
        <span className="text-[10px] font-bold text-[#5F6C7B]/60 uppercase tracking-widest mt-1">
          {scope}
        </span>
      </div>

      {/* Right panel – details & actions */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold font-mono uppercase text-[#14C6D8]">
                {code}
              </h3>
              <button
                onClick={handleCopy}
                className={`p-1.5 rounded-lg transition-colors ${
                  copied
                    ? 'bg-[#22C55E]/20 text-[#22C55E]'
                    : 'text-[#5F6C7B]/60 hover:text-[#14C6D8] hover:bg-[#E6F9FA] dark:hover:bg-[#14C6D8]/20'
                }`}
                title="Copy coupon code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-600">
              Active
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#5F6C7B] dark:text-[#5F6C7B] mt-1">
            {description}
          </p>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mt-2">
          <div className="flex items-center gap-2">
            <ShoppingBag size={15} className="text-[#5F6C7B]/60" />
            <span>Min. order <span className="font-semibold text-[#18212A] dark:text-white">₹{minimumOrder}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-[#5F6C7B]/60" />
            <span>Valid till <span className="font-semibold text-[#18212A] dark:text-white">{formatValidUntil(validUntil)}</span></span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E8EEF2] dark:border-[#18212A]/30">
          <button
            onClick={showTerms}
            className="text-xs font-medium text-[#5F6C7B]/70 hover:text-[#18212A] dark:hover:text-white transition flex items-center gap-1"
          >
            <Info size={14} /> Terms
          </button>
          <button
            onClick={handleApply}
            className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#14C6D8] hover:bg-[#0FB2C3] rounded-xl transition shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#14C6D8] focus:ring-offset-2"
          >
            Apply Coupon
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------
// Main Component
// ----------------------------------------------
const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const availableCoupons = await couponService.fetchCoupons();
        const pastHistory = await couponService.fetchHistory();
        setCoupons(availableCoupons);
        setHistory(pastHistory);
      } catch {
        toast.error('Failed to load coupons');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 size={40} className="animate-spin text-[#14C6D8]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#18212A] dark:text-white flex items-center gap-2">
            <Ticket size={28} className="text-[#14C6D8]" />
            My Coupons
          </h1>
          <p className="text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mt-0.5">
            {coupons.length} active coupon{coupons.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-[#E6F9FA] dark:bg-[#14C6D8]/10 px-3 py-1.5 rounded-full border border-[#14C6D8]/20">
          <Gift size={16} className="text-[#14C6D8]" />
          <span className="font-medium text-[#18212A] dark:text-white">
            {coupons.length} available
          </span>
        </div>
      </div>

      {/* Available Coupons Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#18212A] dark:text-white">
          Available Coupons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {coupons.map((coupon, idx) => (
            <CouponCard key={coupon.id || idx} coupon={coupon} />
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#18212A] dark:text-white">
          Applied Coupon History
        </h2>

        <div className="bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8FBFC] dark:bg-[#18212A]/50 text-[#5F6C7B] dark:text-[#5F6C7B] border-b border-[#E8EEF2] dark:border-[#18212A]/30">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Coupon Code</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Discount</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Min. Order</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Used On</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Savings</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase tracking-wider text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EEF2] dark:divide-[#18212A]/30">
                {history.map((row, index) => (
                  <tr key={index} className="hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/30 transition-colors">
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-mono font-bold text-[#18212A] dark:text-white text-sm">
                      {row.code}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-[#5F6C7B] dark:text-[#5F6C7B]">{row.discount}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-[#5F6C7B] dark:text-[#5F6C7B]">{row.minOrder}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-[#5F6C7B] dark:text-[#5F6C7B]">{row.usedOn}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-[#18212A] dark:text-white">{row.savings}</td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          row.status === 'Used'
                            ? 'bg-[#22C55E]/10 dark:bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                            : 'bg-[#EF4444]/10 dark:bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 sm:px-6 py-4 border-t border-[#E8EEF2] dark:border-[#18212A]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#5F6C7B] dark:text-[#5F6C7B]">
            <span>Showing 1 to 5 of 8 records</span>
            <div className="flex items-center gap-1.5">
              <button className="p-2 border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-lg text-[#5F6C7B]/50 cursor-not-allowed opacity-50">
                <ChevronLeft size={16} />
              </button>
              <button className="px-3.5 py-1.5 bg-[#14C6D8] text-white rounded-lg font-semibold">1</button>
              <button className="px-3.5 py-1.5 border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-lg hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/50 transition">
                2
              </button>
              <button className="p-2 border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-lg hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/50 transition">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;