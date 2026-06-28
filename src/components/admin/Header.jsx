// src/components/admin/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  Settings,
  ChevronDown,
  Search,
  Moon,
  Sun,
  LogOut,
  Menu,
  Maximize2,
  Minimize2,
  Package,
  Heart,
  Clock,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

const Header = ({ onMobileMenuClick, darkMode, setDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profileDropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Real-time clock (India time)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check initial fullscreen state on mount
  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", checkFullscreen);
    return () => document.removeEventListener("fullscreenchange", checkFullscreen);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) return "Dashboard";
    if (path.includes("/admin/products")) return "Products";
    if (path.includes("/admin/categories")) return "Categories";
    if (path.includes("/admin/orders")) return "Orders";
    if (path.includes("/admin/custom-designs")) return "Custom Designs";
    if (path.includes("/admin/users")) return "Users";
    if (path.includes("/admin/analytics")) return "Analytics";
    if (path.includes("/admin/coupons")) return "Coupons";
    if (path.includes("/admin/banners")) return "Banners";
    if (path.includes("/admin/reviews")) return "Reviews";
    if (path.includes("/admin/settings")) return "Settings";
    if (path.includes("/admin/broadcast")) return "Broadcast";
    return "Dashboard";
  };

  const initials = user?.firstName?.charAt(0) || user?.name?.charAt(0) || "A";
  const userName = user?.firstName || user?.name || "Admin";
  const userRole = user?.role === "admin" ? "Administrator" : "Customer";

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.1 } },
  };

  const notifications = [
    { id: 1, title: "New order #ORD1256", time: "2 min ago", read: false },
    { id: 2, title: "Product 'Custom Tumbler' updated", time: "1 hour ago", read: true },
    { id: 3, title: "New customer registered", time: "3 hours ago", read: true },
  ];

  // Format time & date for IST
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };
  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left side: page title + mobile menu button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {getPageTitle()}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>{getGreeting()}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline font-medium text-gray-700 dark:text-gray-300">
                {userName}
              </span>
            </p>
          </div>
        </div>

        {/* Right side: date/time + actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Date/Time (desktop - horizontal format) */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400 dark:text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatTime(currentTime)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400 dark:text-gray-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(currentTime)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
              IST
            </span>
          </div>

          {/* Mobile date/time (simplified) */}
          <div className="lg:hidden flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mr-1">
            <Clock size={12} className="text-gray-400" />
            <span>{formatTime(currentTime)}</span>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 transition-colors focus-within:ring-2 focus-within:ring-orange-500/30 focus-within:bg-white dark:focus-within:bg-gray-900">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent ml-2 outline-none text-sm w-52 text-gray-700 dark:text-gray-300 placeholder-gray-400"
            />
            <span className="text-[10px] text-gray-400 ml-2 hidden xl:block">⌘K</span>
          </div>

          {/* Dark mode toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-600" />}
          </motion.button>

          {/* Fullscreen toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={18} className="text-gray-600 dark:text-gray-400" /> : <Maximize2 size={18} className="text-gray-600 dark:text-gray-400" />}
          </motion.button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell size={18} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                >
                  <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <span className="text-[10px] text-orange-600 font-medium">3 new</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                          !notif.read ? "bg-orange-50/50 dark:bg-orange-900/10 border-l-2 border-l-orange-500" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-800 dark:text-white">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-gray-200 dark:border-gray-800">
                    <button className="text-xs text-orange-600 hover:underline font-medium">View all notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-orange-200/50 flex-shrink-0 group-hover:ring-orange-300 transition-all">
                  {initials}
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                    {userName}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                    {userRole}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                >
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-orange-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center text-sm font-bold shadow-md flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">{userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email || "admin@tumbler.com"}</p>
                      <span className="inline-block mt-0.5 text-[10px] font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                        {userRole}
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link to="/admin/profile" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                        <User size={16} /> Profile
                      </button>
                    </Link>
                    {/* <Link to="/admin/orders" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                        <Package size={16} /> My Orders
                      </button>
                    </Link>
                    <Link to="/admin/wishlist" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                        <Heart size={16} /> Wishlist
                      </button>
                    </Link> */}
                    <Link to="/admin/settings" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors">
                        <Settings size={16} /> Settings
                      </button>
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;