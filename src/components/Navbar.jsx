import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa6';
import { HiOutlineShoppingBag, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid layout: 3 columns – logo | centered nav | right icons */}
          <div className="relative flex items-center h-16 md:h-20">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-gray-800 hover:text-orange-500 transition">
                Tumbler
              </a>
            </div>

            {/* Center: Desktop Navigation (absolutely positioned for perfect centering) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex space-x-6 font-medium text-gray-700">
                <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
                <li><a href="/shop" className="hover:text-orange-500 transition">Shop</a></li>
                <li><a href="/customize" className="hover:text-orange-500 transition">Customize</a></li>
                <li><a href="/about" className="hover:text-orange-500 transition">About us</a></li>
                <li><a href="/contact" className="hover:text-orange-500 transition">Contact</a></li>
              </ul>
            </div>

            {/* Right: Icons + button */}
            <div className="hidden md:flex items-center gap-5 ml-auto">
              <IoSearchSharp className="text-xl cursor-pointer hover:text-orange-500 transition" />
              <FaHeart className="text-xl cursor-pointer hover:text-orange-500 transition" />
              <HiOutlineShoppingBag className="text-xl cursor-pointer hover:text-orange-500 transition" />
              <button className="ml-4 bg-[#FE5700] text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4 ml-auto">
              <HiOutlineShoppingBag className="text-2xl cursor-pointer" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu (unchanged) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button onClick={closeMenu} className="text-gray-600" aria-label="Close menu">
              <HiX className="text-2xl" />
            </button>
          </div>
          <ul className="flex flex-col p-4 space-y-4 text-gray-700 font-medium">
            <li><a href="/" onClick={closeMenu} className="block hover:text-orange-500">Home</a></li>
            <li><a href="/shop" onClick={closeMenu} className="block hover:text-orange-500">Shop</a></li>
            <li><a href="/customize" onClick={closeMenu} className="block hover:text-orange-500">Customize</a></li>
            <li><a href="/about" onClick={closeMenu} className="block hover:text-orange-500">About us</a></li>
            <li><a href="/contact" onClick={closeMenu} className="block hover:text-orange-500">Contact</a></li>
          </ul>
          <div className="mt-auto p-4 border-t">
            <div className="flex justify-around mb-4">
              <IoSearchSharp className="text-2xl cursor-pointer hover:text-orange-500" />
              <FaHeart className="text-2xl cursor-pointer hover:text-orange-500" />
            </div>
            <button className="w-full bg-[#FE5700] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;