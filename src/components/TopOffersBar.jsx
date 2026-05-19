import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const TopOffersBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Check localStorage on component mount
  useEffect(() => {
    const dismissed = localStorage.getItem('topOffersDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('topOffersDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-[#FE5700] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          {/* Optional icon */}
          <span className="text-sm sm:text-base">🔥</span>

          {/* Offer text */}
          <p className="text-xs sm:text-sm font-semibold tracking-wide">
            50% OFF + Use Code: SIP50 | Free Shipping on Orders Above ₹499
          </p>

          {/* Optional CTA */}
          <a
            href="/shop"
            className="hidden sm:inline-block text-xs font-bold text-white underline hover:no-underline transition ml-2"
          >
            Shop Now →
          </a>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 sm:right-4 text-white/80 hover:text-white transition p-1"
            aria-label="Close"
          >
            <IoClose size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopOffersBar;