// src/pages/admin/BroadcastCenter.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Calendar,
  Download,
  Eye,
  Edit,
  Mail,
  MessageCircle,
  Smartphone,
  Bell,
  Users,
  Send,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Clock as ClockIcon,
  Award,
  BarChart3,
  Activity,
  ThumbsUp,
  ShoppingBag,
  Gift,
  Rocket,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BroadcastTable from "../../components/admin/broadcast/BroadcastTable";

// ==============================================
// MOCK DATA
// ==============================================

const campaignsData = [
  {
    id: 1,
    name: "Summer Sale 2025",
    channel: "email",
    audience: "All Customers",
    audienceCount: 86320,
    sentCount: 86320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "completed",
    sent: "22 May 2025",
    delivered: 85430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=RS",
  },
  {
    id: 2,
    name: "Winter Sale 2025",
    channel: "email",
    audience: "All Customers",
    audienceCount: 6320,
    sentCount: 76320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "running",
    sent: "22 May 2025",
    delivered: 8430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=RR",
  },
  {
    id: 3,
    name: "Flash Sale",
    channel: "sms",
    audience: "All Customers",
    audienceCount: 6320,
    sentCount: 76320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "completed",
    sent: "22 May 2025",
    delivered: 8430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=PP",
  },
  {
    id: 4,
    name: "Weekend Special",
    channel: "push",
    audience: "All Customers",
    audienceCount: 6320,
    sentCount: 76320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "completed",
    sent: "22 May 2025",
    delivered: 8430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=NS",
  },
  {
    id: 5,
    name: "Custom Design Promo",
    channel: "email",
    audience: "All Customers",
    audienceCount: 6320,
    sentCount: 76320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "running",
    sent: "22 May 2025",
    delivered: 8430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=SS",
  },
  {
    id: 6,
    name: "Holiday Collection",
    channel: "whatsapp",
    audience: "All Customers",
    audienceCount: 6320,
    sentCount: 76320,
    message: "Get 30% off on all summer collection items! Use code SUMMER30",
    status: "scheduled",
    sent: "22 May 2025",
    delivered: 8430,
    ctr: 12.8,
    created: "18 May 2025",
    thumbnailImage: "https://placehold.co/40x40/FF6B35/fff?text=SS",
  },
];

const statsData = [
  {
    id: 1,
    label: "Total Campaigns",
    value: 128,
    change: 18.6,
    icon: Send,
    color: "blue",
  },
  {
    id: 2,
    label: "Audience Reach",
    value: "86,320",
    change: 22.4,
    icon: Users,
    color: "green",
  },
  {
    id: 3,
    label: "Messages Sent",
    value: "154,280",
    change: 15.8,
    icon: Mail,
    color: "purple",
  },
  {
    id: 4,
    label: "Open Rate",
    value: "42.6%",
    change: 5.2,
    icon: Eye,
    color: "orange",
  },
  {
    id: 5,
    label: "Click Rate",
    value: "12.8%",
    change: 2.1,
    icon: TrendingUp,
    color: "emerald",
  },
];

const bestPractices = [
  {
    id: 1,
    title: "Target Audience",
    description: "Segment your audience for better engagement and higher conversion rates.",
    icon: Target,
    color: "blue",
  },
  {
    id: 2,
    title: "Keep Messages Short",
    description: "Concise messages get more attention. Aim for 150-200 characters.",
    icon: MessageCircle,
    color: "green",
  },
  {
    id: 3,
    title: "Best Time To Send",
    description: "Send campaigns between 10 AM - 12 PM for optimal open rates.",
    icon: ClockIcon,
    color: "orange",
  },
  {
    id: 4,
    title: "Track Performance",
    description: "Monitor CTR and conversion rates to optimize future campaigns.",
    icon: BarChart3,
    color: "purple",
  },
];

const tabs = [
  { id: "all", label: "All Campaigns" },
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "sms", label: "SMS" },
  { id: "push", label: "Push Notification" },
];

// ==============================================
// REUSABLE COMPONENTS
// ==============================================

const StatsCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const isPositive = stat.change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-lg transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {stat.label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1.5 tracking-tight">
            {stat.value}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`text-xs font-semibold ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {isPositive ? "↑" : "↓"} {Math.abs(stat.change)}%
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">from last month</span>
          </div>
        </div>
        <div className={`
          w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
          bg-${stat.color}-100 dark:bg-${stat.color}-900/30
          group-hover:scale-110 transition-transform duration-300
        `}>
          <Icon size={20} className={`text-${stat.color}-500 dark:text-${stat.color}-400`} />
        </div>
      </div>
    </motion.div>
  );
};

// ==============================================
// MAIN COMPONENT
// ==============================================

const BroadcastCenter = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaignsData.filter((camp) => {
      const matchesTab = activeTab === "all" || camp.channel === activeTab;
      const matchesSearch = camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           camp.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAudience = audienceFilter === "all" || camp.audience === audienceFilter;
      const matchesStatus = statusFilter === "all" || camp.status === statusFilter;
      return matchesTab && matchesSearch && matchesAudience && matchesStatus;
    });
  }, [activeTab, searchTerm, audienceFilter, statusFilter]);

  const handleAction = (action, campaign) => {
    if (action === "edit") {
      navigate(`/admin/broadcast/${campaign.id}/edit`);
      return;
    }
    const messages = {
      view: `Viewing campaign: ${campaign.name}`,
      duplicate: `Duplicating campaign: ${campaign.name}`,
      delete: `Deleting campaign: ${campaign.name}`,
      analytics: `Viewing analytics for: ${campaign.name}`,
    };
    toast.success(messages[action] || `Action: ${action}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Broadcast Center
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Create and manage marketing campaigns across multiple channels.
          </p>
        </div>
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/admin/broadcast/create")}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md flex-shrink-0"
        >
          <Plus size={18} />
          Create Broadcast
        </motion.button>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsData.map((stat, idx) => (
          <StatsCard key={stat.id} stat={stat} index={idx} />
        ))}
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          >
            <option value="all">All Audiences</option>
            <option value="All Customers">All Customers</option>
            <option value="Active Users">Active Users</option>
            <option value="App Users">App Users</option>
            <option value="Design Enthusiasts">Design Enthusiasts</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="scheduled">Scheduled</option>
            <option value="draft">Draft</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />

          <button
            onClick={() => toast.success("Exporting campaign data...")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-all"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* ===== TABLE CARD WITH TABS ===== */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Tabs Row */}
        <div className="flex items-center gap-1 p-3 border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab.id
                  ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
            {filteredCampaigns.length} campaigns
          </span>
        </div>

        {/* Table */}
        <BroadcastTable campaigns={filteredCampaigns} onAction={handleAction} />
      </div>

      {/* ===== BROADCAST BEST PRACTICES ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Broadcast Best Practices</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestPractices.map((practice) => {
            const Icon = practice.icon;
            const colorClasses = {
              blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-500",
              green: "bg-green-50 dark:bg-green-900/20 text-green-500",
              orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-500",
              purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-500",
            };
            return (
              <motion.div
                key={practice.id}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${colorClasses[practice.color]} flex items-center justify-center mb-3`}>
                  <Icon size={18} />
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">{practice.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{practice.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BroadcastCenter;