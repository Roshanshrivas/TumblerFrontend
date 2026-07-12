// src/pages/dashboard/Notifications.jsx – Teal Theme, Production-Ready, Fully Responsive
import React, { useState, useEffect, useMemo } from 'react';
import {
  Bell,
  Package,
  Truck,
  CheckCircle,
  Tag,
  X,
  CheckCheck,
  Trash2,
  Loader2,
  Flame,
  Ticket,
  User,
  Check,
  Star,
  Percent,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Brand Colors ───────────────────────────────────
const BRAND_PRIMARY = '#14C6D8';
const BRAND_HOVER = '#0FB2C3';
const BRAND_DARK = '#18212A';
const BRAND_TEXT = '#5F6C7B';
const BRAND_BORDER = '#E8EEF2';
const BRAND_SECTION = '#F8FBFC';
const BRAND_LIGHT_BG = '#E6F9FA';

// ----------------------------------------------
// Mock Service (Enriched data)
// ----------------------------------------------
const notificationService = {
  fetchNotifications: async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [
      {
        id: 1,
        type: 'order',
        title: 'Your order has been delivered',
        message: 'Order ID: ORD-ABC123 has been delivered successfully.',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        isRead: false,
        icon: Package,
        color: 'text-green-600 bg-green-50 dark:bg-green-900/30',
      },
      {
        id: 2,
        type: 'promotion',
        title: 'Flash Sale is Live! 🔥',
        message: 'Get flat 40% OFF on all tumblers. Hurry up!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        isRead: false,
        icon: Flame,
        color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/30',
      },
      {
        id: 3,
        type: 'coupon',
        title: 'Coupon Unlocked 🎁',
        message: 'You have unlocked a special coupon SAVE200.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        isRead: false,
        icon: Ticket,
        color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
      },
      {
        id: 4,
        type: 'shipping',
        title: 'Out for Delivery',
        message: 'Your order ORD-DEF456 is out for delivery.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        isRead: false,
        icon: Truck,
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
      },
      {
        id: 5,
        type: 'order',
        title: 'Thank you for your purchase!',
        message: 'We appreciate your trust in SmoothSip.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        isRead: true,
        icon: CheckCircle,
        color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30',
      },
      {
        id: 6,
        type: 'system',
        title: 'Rate your product',
        message: 'How was your experience with Premium Insulated Tumbler?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        isRead: true,
        icon: Star,
        color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
      },
      {
        id: 7,
        type: 'promotion',
        title: 'Weekend Special Offer',
        message: 'Extra 10% OFF on prepaid orders above ₹999.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
        isRead: true,
        icon: Percent,
        color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/30',
      },
      {
        id: 8,
        type: 'system',
        title: 'Profile Updated Successfully',
        message: 'Your profile information has been updated.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        isRead: true,
        icon: User,
        color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30',
      },
    ];
  },
  markAsRead: async (id) => ({ success: true }),
  markAllRead: async () => ({ success: true }),
  deleteNotification: async (id) => ({ success: true }),
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const [preferences, setPreferences] = useState({
    order: true,
    shipping: true,
    offers: true,
    coupons: true,
    account: true,
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.fetchNotifications();
      setNotifications(data);
    } catch {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notification deleted');
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredNotifications = useMemo(() => {
    if (filter === 'all') return notifications;
    if (filter === 'offers') return notifications.filter((n) => n.type === 'promotion');
    if (filter === 'coupons') return notifications.filter((n) => n.type === 'coupon');
    return notifications.filter((n) => n.type === filter);
  }, [notifications, filter]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const formatTime = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length, icon: Bell },
    { value: 'order', label: 'Orders', count: notifications.filter((n) => n.type === 'order').length, icon: Package },
    { value: 'offers', label: 'Offers', count: notifications.filter((n) => n.type === 'promotion').length, icon: Tag },
    { value: 'shipping', label: 'Shipping', count: notifications.filter((n) => n.type === 'shipping').length, icon: Truck },
    { value: 'coupons', label: 'Coupons', count: notifications.filter((n) => n.type === 'coupon').length, icon: Ticket },
    { value: 'system', label: 'Account', count: notifications.filter((n) => n.type === 'system').length, icon: User },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 size={32} className="animate-spin text-[#14C6D8]" />
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8EEF2] dark:border-[#18212A]/30 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#18212A] dark:text-white tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mt-1">
            Stay updated with your orders, offers and account activity.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs sm:text-sm font-bold text-[#14C6D8] hover:text-[#0FB2C3] transition flex items-center gap-1"
        >
          <CheckCheck size={16} /> Mark all as read
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left – Notifications list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter tabs */}
          <div className="bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-2xl p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {filterOptions.map((option) => {
              const isActive = filter === option.value;
              const TabIcon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 sm:gap-2 relative whitespace-nowrap outline-none ${
                    isActive
                      ? 'text-[#14C6D8] bg-[#E6F9FA] dark:bg-[#14C6D8]/20'
                      : 'text-[#5F6C7B] dark:text-[#5F6C7B] hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/50'
                  }`}
                >
                  <TabIcon size={14} className={isActive ? 'text-[#14C6D8]' : 'text-[#5F6C7B]/60'} />
                  <span className="hidden xs:inline">{option.label}</span>
                  {option.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#14C6D8]/20 text-[#14C6D8]'
                          : 'bg-[#F8FBFC] dark:bg-[#18212A]/30 text-[#5F6C7B]'
                      }`}
                    >
                      {option.count}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="tabMarkerLine"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#14C6D8] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Notification list */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 divide-y divide-[#E8EEF2] dark:divide-[#18212A]/30 shadow-sm">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <Bell size={40} className="mx-auto text-[#5F6C7B]/40 dark:text-[#5F6C7B]/30 mb-2" />
                <h3 className="text-sm font-bold text-[#18212A] dark:text-white">All caught up!</h3>
                <p className="text-xs text-[#5F6C7B] mt-1">No activities found in this filter.</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {filteredNotifications.map((notification) => {
                  const IconComponent = notification.icon || Bell;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 sm:p-5 flex items-start justify-between gap-3 sm:gap-4 group hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        <div className={`p-2.5 rounded-full flex-shrink-0 ${notification.color}`}>
                          <IconComponent size={18} strokeWidth={2} />
                        </div>
                        <div className="space-y-0.5 text-xs sm:text-sm">
                          <h4 className="font-bold text-[#18212A] dark:text-white flex items-center gap-2">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="inline-block w-2 h-2 bg-[#14C6D8] rounded-full" />
                            )}
                          </h4>
                          <p className="text-[#5F6C7B] dark:text-[#5F6C7B] leading-relaxed max-w-xl">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 self-start mt-1 flex-shrink-0">
                        <span className="text-[11px] text-[#5F6C7B]/60 font-medium whitespace-nowrap">
                          {formatTime(notification.timestamp)}
                        </span>
                        <div className="w-5 flex justify-end">
                          {!notification.isRead ? (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="w-2 h-2 bg-[#14C6D8] rounded-full group-hover:scale-125 transition-transform"
                              title="Mark as read"
                            />
                          ) : (
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-[#5F6C7B]/40 hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Remove"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
          <p className="text-xs text-[#5F6C7B]/60 font-medium pl-1">
            Showing {filteredNotifications.length} of {filteredNotifications.length} notifications
          </p>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Summary */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-[#18212A] dark:text-white uppercase tracking-wide">
              Notification Summary
            </h3>
            <div className="mt-4 space-y-3 text-xs font-semibold text-[#5F6C7B] dark:text-[#5F6C7B]">
              <div className="flex justify-between">
                <span>Unread Notifications</span>
                <span className="text-[#14C6D8] text-sm font-bold">{unreadCount}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-2.5">
                <span>Total Notifications</span>
                <span className="text-[#18212A] dark:text-white">{notifications.length}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-2.5">
                <span>This Week</span>
                <span className="text-[#18212A] dark:text-white">12</span>
              </div>
              <div className="flex justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-2.5">
                <span>This Month</span>
                <span className="text-[#18212A] dark:text-white">24</span>
              </div>
            </div>
            <button
              onClick={markAllRead}
              className="w-full mt-4 py-2 border border-[#14C6D8]/30 text-[#14C6D8] hover:bg-[#E6F9FA] dark:hover:bg-[#14C6D8]/20 rounded-xl text-xs font-bold transition"
            >
              Mark all as read
            </button>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-5 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-[#18212A] dark:text-white uppercase tracking-wide">
                Notification Preferences
              </h3>
              <p className="text-[11px] text-[#5F6C7B] mt-0.5">Choose what you want to be notified about.</p>
            </div>
            <div className="mt-4 space-y-3.5">
              {[
                { key: 'order', label: 'Order Updates', desc: 'Get alerts for order status changes' },
                { key: 'shipping', label: 'Shipping Updates', desc: 'Get alerts for shipping & delivery' },
                { key: 'offers', label: 'Offers & Deals', desc: 'Receive offers and promotions' },
                { key: 'coupons', label: 'Coupons', desc: 'Get notified about new coupons' },
                { key: 'account', label: 'Account Updates', desc: 'Important account notifications' },
              ].map((pref) => (
                <div key={pref.key} className="flex items-center justify-between gap-4">
                  <div className="text-xs">
                    <p className="font-bold text-[#18212A] dark:text-white">{pref.label}</p>
                    <p className="text-[10px] text-[#5F6C7B]">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => togglePreference(pref.key)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                      preferences[pref.key] ? 'bg-[#14C6D8]' : 'bg-[#E8EEF2] dark:bg-[#18212A]/30'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${
                        preferences[pref.key] ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => toast.success('Preferences updated successfully')}
              className="w-full mt-4 py-2 border border-[#E8EEF2] dark:border-[#18212A]/30 text-[#5F6C7B] hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/30 rounded-xl text-xs font-bold transition"
            >
              Manage Preferences
            </button>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-br from-[#E6F9FA] to-[#D6F5F8] dark:from-[#14C6D8]/20 dark:to-[#14C6D8]/10 rounded-2xl border border-[#14C6D8]/20 p-5 flex items-center gap-4 relative overflow-hidden">
            <div className="flex-1 space-y-1 z-10">
              <h4 className="text-xs sm:text-sm font-bold text-[#18212A] dark:text-white">Never miss an update!</h4>
              <p className="text-[10px] sm:text-xs text-[#5F6C7B] leading-normal max-w-[140px]">
                Enable push notifications to stay fully informed.
              </p>
              <button
                onClick={() => toast.success('Push notifications enabled')}
                className="mt-2 px-3 py-1.5 bg-white hover:bg-[#F8FBFC] border border-[#14C6D8]/30 text-[#14C6D8] rounded-lg text-[10px] font-bold transition shadow-sm"
              >
                Enable Now
              </button>
            </div>
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#14C6D8] to-[#0FB2C3] rounded-full flex items-center justify-center text-white shadow-md shadow-[#14C6D8]/20 animate-pulse">
                <Bell size={28} strokeWidth={1.5} className="animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;