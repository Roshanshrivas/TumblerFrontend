import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag, HiMenu, HiX } from "react-icons/hi";
import {
  FiLogOut,
  FiUser,
  FiPackage,
  FiHeart as FiHeartOutline,
  FiChevronDown,
} from "react-icons/fi";
import CartDrawer from "./CartDrawer";
import WishlistDrawer from "./WishlistDrawer";
import SearchModal from "./SearchModal";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  const mobileDropdownRef = useRef(null);

  const loadUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("userUpdated", loadUser);
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCartCount();
    updateWishlistCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);
  const closeUserDropdown = () => setIsUserDropdownOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userUpdated"));
    toast.success("Logged out successfully");
    navigate("/");
    closeUserDropdown();
    closeMenu();
  };

  const handleOpenCart = () => {
    if (isMenuOpen) closeMenu();
    setIsCartOpen(true);
  };

  const handleOpenWishlist = () => {
    if (isMenuOpen) closeMenu();
    setIsWishlistOpen(true);
  };

  const handleOpenSearch = () => {
    if (isMenuOpen) closeMenu();
    setIsSearchOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);
  const closeWishlist = () => setIsWishlistOpen(false);
  const closeSearch = () => setIsSearchOpen(false);

  const navLinkClass = ({ isActive }) =>
    `hover:text-orange-500 transition ${isActive ? "text-orange-500 font-semibold" : "text-gray-700"}`;

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-800 hover:text-orange-500 transition"
              >
                Tumbler
              </Link>
            </div>

            {/* Desktop Navigation (centered) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex space-x-6 font-medium">
                <li>
                  <NavLink to="/" className={navLinkClass} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/allproducts" className={navLinkClass}>
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/customize" className={navLinkClass}>
                    Customize
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={navLinkClass}>
                    About us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={navLinkClass}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Right icons + user area (Desktop) */}
            <div className="hidden md:flex items-center gap-5 ml-auto">
              <button
                onClick={handleOpenSearch}
                aria-label="Search"
                className="text-xl cursor-pointer hover:text-orange-500 transition"
              >
                <IoSearchSharp />
              </button>
              <button onClick={handleOpenWishlist} className="relative">
                <FaHeart className="text-xl cursor-pointer hover:text-orange-500 transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button onClick={handleOpenCart} className="relative">
                <HiOutlineShoppingBag className="text-xl cursor-pointer hover:text-orange-500 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Avatar / Sign In (Desktop) */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none group"
                    aria-label="User menu"
                  >
                    <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-md ring-2 ring-orange-200 group-hover:ring-orange-300 transition">
                      {getUserInitials()}
                    </div>
                  </button>
                  {isUserDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={closeUserDropdown}
                      />
                      <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex flex-col items-center justify-center font-bold shadow-md ring-2 ring-orange-200 group-hover:ring-orange-300 transition">
                            {getUserInitials()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={closeUserDropdown}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiUser size={16} /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={closeUserDropdown}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiPackage size={16} /> My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={closeUserDropdown}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiHeartOutline size={16} /> Wishlist
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
                        >
                          <FiLogOut size={16} /> Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="ml-4 bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-sm">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* ========== MOBILE NAVBAR FIXED: Logo left, Cart/Profile/Hamburger right ========== */}
            <div className="flex md:hidden items-center justify-end w-full">
              {/* Right icons group */}
              <div className="flex items-center gap-4">
                {/* Cart Icon */}
                <button onClick={handleOpenCart} className="relative">
                  <HiOutlineShoppingBag className="text-2xl text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Profile Circle / Sign In */}
                {user ? (
                  <div className="relative" ref={mobileDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md focus:outline-none"
                      aria-label="User menu"
                    >
                      {getUserInitials()}
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <div>
                            <button
                              onClick={() =>
                                setIsUserDropdownOpen(!isUserDropdownOpen)
                              }
                              className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-md focus:outline-none"
                              aria-label="User menu"
                            >
                              {getUserInitials()}
                            </button>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => {
                            closeUserDropdown();
                            closeMenu();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiUser size={16} /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => {
                            closeUserDropdown();
                            closeMenu();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiPackage size={16} /> My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => {
                            closeUserDropdown();
                            closeMenu();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                        >
                          <FiHeartOutline size={16} /> Wishlist
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => {
                            handleLogout();
                            closeUserDropdown();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"
                        >
                          <FiLogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="px-4 py-1.5 bg-orange-500 text-white text-sm rounded-lg font-semibold">
                      Sign In
                    </button>
                  </Link>
                )}

                {/* Hamburger Menu */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 focus:outline-none"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? (
                    <HiX className="text-2xl" />
                  ) : (
                    <HiMenu className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawers & Modal */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={closeWishlist} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />

      {/* Mobile Side Drawer (Hamburger Menu) – Navigation only */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <span className="text-xl font-bold text-gray-800">Menu</span>
            <button
              onClick={closeMenu}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <HiX className="text-2xl" />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto py-6 px-5 space-y-5">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allproducts"
                onClick={closeMenu}
                className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/customize"
                onClick={closeMenu}
                className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                Customize
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Optional quick action icons */}
          <div className="border-t border-gray-100 p-5">
            <div className="flex justify-around items-center">
              <button
                onClick={handleOpenSearch}
                className="flex flex-col items-center gap-1"
              >
                <IoSearchSharp className="text-2xl text-gray-600 hover:text-orange-500 transition" />
                <span className="text-xs text-gray-500">Search</span>
              </button>
              <button
                onClick={handleOpenWishlist}
                className="relative flex flex-col items-center gap-1"
              >
                <FaHeart className="text-2xl text-gray-600 hover:text-orange-500 transition" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-xs text-gray-500">Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
