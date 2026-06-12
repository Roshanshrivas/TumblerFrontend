// src/components/admin/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, Package, ShoppingCart, Users, Palette, BarChart2,
  Tag, Image, Star, Settings, LogOut, ChevronDown, ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

const Sidebar = ({ isExpanded, onMouseEnter, onMouseLeave, isMobile, onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});

  // Auto‑expand parent menus if a child route is active
  useEffect(() => {
    const newOpenMenus = { ...openMenus };
    navItems.forEach(item => {
      if (item.children) {
        const anyChildActive = item.children.some(child => location.pathname === child.path);
        if (anyChildActive && !newOpenMenus[item.name]) {
          newOpenMenus[item.name] = true;
        }
      }
    });
    setOpenMenus(newOpenMenus);
  }, [location.pathname]);

  const toggleSubMenu = (itemName) => {
    setOpenMenus(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home size={20} />, section: "main" },
    { 
      name: "Products", 
      icon: <Package size={20} />, 
      section: "main",
      children: [
        { name: "All Products", path: "/admin/products", icon: null },
        { name: "Categories", path: "/admin/categories", icon: null },
        // { name: "Add New Product", path: "/admin/products/add", icon: null },
      ]
    },
    { 
      name: "Orders", 
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />, 
      section: "main",
    },
    { name: "Custom Designs", path: "/admin/custom-designs", icon: <Palette size={20} />, section: "main" },
    { name: "Users", path: "/admin/users", icon: <Users size={20} />, section: "main" },
    { name: "Analytics", path: "/admin/analytics", icon: <BarChart2 size={20} />, section: "main" },
    { name: "Coupons", path: "/admin/coupons", icon: <Tag size={20} />, section: "management" },
    { name: "Banners", path: "/admin/banners", icon: <Image size={20} />, section: "management" },
    { name: "Reviews", path: "/admin/reviews", icon: <Star size={20} />, section: "management" },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} />, section: "management" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.firstName || user?.name || "Admin User";
  const userEmail = user?.email || "superadmin@tumbler.com";

  const shouldShowDivider = (index) => {
    if (!isExpanded) return false;
    return navItems[index].section === "main" &&
      index < navItems.length - 1 &&
      navItems[index + 1]?.section === "management";
  };

  const isAnyChildActive = (children) => {
    return children?.some(child => location.pathname === child.path);
  };

  const NavLinkItem = ({ item, onClick, showDivider }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = !hasChildren && location.pathname === item.path;
    const isParentActive = hasChildren && isAnyChildActive(item.children);
    const isOpen = openMenus[item.name];

    // Parent with children (expandable)
    if (hasChildren) {
      const parentClasses = `
        group relative flex items-center rounded-lg mb-1 cursor-pointer
        ${isExpanded ? "justify-start px-3 py-2.5" : "justify-center py-2.5"}
        ${isExpanded ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-800 w-10 mx-auto"}
      `;
      return (
        <>
          <div
            className={parentClasses}
            onClick={() => toggleSubMenu(item.name)}
            title={!isExpanded ? item.name : ""}
          >
            {/* Left border indicator for active parent (expanded) */}
            {isParentActive && isExpanded && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`
                  flex items-center justify-center transition-all duration-200
                  ${isParentActive && !isExpanded ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg p-2" : "text-gray-700 dark:text-gray-300"}
                `}>
                  {item.icon}
                </span>
                {isExpanded && (
                  <span className={`text-sm font-medium ${isParentActive ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                    {item.name}
                  </span>
                )}
              </div>
              {isExpanded && (
                <span className="ml-auto text-gray-500">
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              )}
            </div>
          </div>
          {/* Submenu (only when expanded and open) */}
          {isExpanded && isOpen && (
            <div className="ml-8 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-1 mt-1 mb-2">
              {item.children.map(child => (
                <NavLinkItem
                  key={child.path}
                  item={{ ...child, icon: null }}
                  onClick={onClick}
                />
              ))}
            </div>
          )}
        </>
      );
    }

    // Leaf item (no children)
    return (
      <>
        <Link
          to={item.path}
          onClick={onClick}
          className={`
            group relative flex items-center transition-all duration-200 rounded-lg mb-1
            ${isExpanded ? "justify-start px-3 py-2.5" : "justify-center py-2.5"}
            ${isExpanded ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-800 w-10 mx-auto"}
          `}
          title={!isExpanded ? item.name : ""}
        >
          {isActive && isExpanded && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full" />
          )}
          <span className={`
            flex items-center justify-center transition-all duration-200
            ${isActive && !isExpanded ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg p-2" : "text-gray-700 dark:text-gray-300"}
          `}>
            {item.icon || (item.name === "All Products" ? <Package size={16} /> : null)}
          </span>
          {isExpanded && (
            <span className={`
              ml-3 text-sm font-medium transition-colors duration-200
              ${isActive ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}
            `}>
              {item.name}
            </span>
          )}
        </Link>
        {showDivider && <div className="my-2 border-t border-gray-200 dark:border-gray-800" />}
      </>
    );
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        {isExpanded ? (
          <span className="text-xl font-bold">
            <span className="text-orange-600">Tumbler</span>
            <span className="text-gray-800 dark:text-white">Admin</span>
          </span>
        ) : (
          <span className="text-2xl font-bold text-orange-600">T</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide py-4">
        <div className="flex flex-col px-2">
          {navItems.map((item, idx) => (
            <NavLinkItem
              key={item.name}
              item={item}
              onClick={isMobile ? onMobileClose : undefined}
              showDivider={shouldShowDivider(idx)}
            />
          ))}
        </div>
      </nav>

      {/* User & Logout */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3">
        {isExpanded && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`
            flex items-center transition-all duration-200 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20
            ${isExpanded ? "justify-start px-3 py-2" : "justify-center py-2"}
          `}
          title={!isExpanded ? "Logout" : ""}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {isExpanded && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  if (isMobile) {
    return <aside className="h-full w-64 bg-white dark:bg-gray-900 shadow-xl">{content}</aside>;
  }

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed left-0 top-0 h-full z-30 bg-white dark:bg-gray-900 shadow-xl transition-[width] duration-300 ease-out hidden lg:block"
      style={{ width: isExpanded ? "240px" : "72px" }}
    >
      {content}
    </aside>
  );
};

export default Sidebar;