// src/pages/admin/Orders.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Package, DollarSign, TrendingUp, Users, RefreshCw,
  Search, Calendar, Filter, ChevronDown, X
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import OrderTable from "../../components/admin/orders/OrderTable";
import OrderModal from "../../components/admin/orders/OrderModal";
import { orderService } from "../admin/services/orderService";

const Orders = () => {
  // Data state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const itemsPerPage = 10;

  // Modal
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0,
    totalRevenue: 0, avgOrderValue: 0, totalCustomers: 0,
    salesGrowth: 0, avgOrderGrowth: 0, customersGrowth: 0, refunds: 0, refundsGrowth: 0,
  });

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Load orders with all filters
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await orderService.fetchOrders({
        page: currentPage,
        limit: itemsPerPage,
        search,
        statusFilter,
        paymentStatusFilter,
        fulfillmentFilter,
        startDate,
        endDate,
      });
      setOrders(res.orders);
      setTotalPages(Math.ceil(res.total / itemsPerPage));
      setTotalItems(res.total);
      setSelectedOrders([]);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter, paymentStatusFilter, fulfillmentFilter, startDate, endDate]);

  const loadStats = useCallback(async () => {
    try {
      const statsData = await orderService.getOrderStats();
      setStats(statsData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadOrders();
    loadStats();
  }, [loadOrders, loadStats]);

  const handleUpdateStatus = async (id, newStatus, trackingNumber = null) => {
    await orderService.updateOrderStatus(id, newStatus, trackingNumber);
    loadOrders();
    loadStats();
  };

  const handleViewDetails = (id) => {
    setSelectedOrderId(id);
    setModalOpen(true);
  };

  const handleExport = async () => {
    try {
      const allOrders = await orderService.fetchAllOrders({
        search,
        statusFilter,
        paymentStatusFilter,
        fulfillmentFilter,
        startDate,
        endDate,
      });
      if (!allOrders.length) {
        toast.error("No orders to export");
        return;
      }
      const headers = ["Order ID", "Customer", "Email", "Date", "Time", "Total", "Status", "Payment Method", "Payment Status"];
      const csvRows = [
        headers.join(","),
        ...allOrders.map((o) => [
          o.id,
          `"${o.customer}"`,
          o.email,
          o.date,
          o.time,
          o.total,
          o.status,
          o.paymentMethod,
          o.paymentStatus,
        ].join(",")),
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orders_export_${new Date().toISOString().slice(0, 19)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${allOrders.length} orders`);
    } catch (err) {
      toast.error("Export failed");
    }
  };

  const clearAllFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setFulfillmentFilter("all");
    setDateRange([null, null]);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search !== "" ||
    statusFilter !== "all" ||
    paymentStatusFilter !== "all" ||
    fulfillmentFilter !== "all" ||
    startDate ||
    endDate;

  const tabs = [
    { key: "all", label: "All Orders", count: stats.total || 0 },
    { key: "Pending", label: "Pending", count: stats.pending || 0 },
    { key: "Processing", label: "Processing", count: stats.processing || 0 },
    { key: "Shipped", label: "Shipped", count: stats.shipped || 0 },
    { key: "Delivered", label: "Delivered", count: stats.delivered || 0 },
    { key: "Cancelled", label: "Cancelled", count: stats.cancelled || 0 },
  ];

  const statsCards = [
    { title: "Total Orders", value: stats.total || 0, icon: Package, color: "blue", growth: stats.salesGrowth },
    { title: "Total Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "green", growth: stats.salesGrowth },
    { title: "Average Order Value", value: `₹${(stats.avgOrderValue || 0).toLocaleString()}`, icon: TrendingUp, color: "yellow", growth: stats.avgOrderGrowth },
    { title: "Total Customers", value: stats.totalCustomers || 0, icon: Users, color: "purple", growth: stats.customersGrowth },
    { title: "Refunds", value: `₹${(stats.refunds || 0).toLocaleString()}`, icon: RefreshCw, color: "red", growth: stats.refundsGrowth, negative: true },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-orange-600">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 dark:text-white font-medium">Orders</span>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={statsCards} />

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* ROW 1: Tabs + Action Buttons */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  statusFilter === tab.key
                    ? "bg-orange-50 text-orange-600 dark:bg-orange-900/20"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {tab.label}
                <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-2 sm:mt-0">
            <button
              onClick={handleExport}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Export
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
              + Create Order
            </button>
          </div>
        </div>

        {/* ROW 2: Search + Filters (inline on desktop) */}
        <div className="px-6 py-4 bg-gray-50/40 dark:bg-gray-800/20">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search input */}
            <div className="relative flex-grow min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by ID, customer or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
              />
            </div>

            {/* Date Range Picker */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 rounded-lg">
              <Calendar size={14} className="text-gray-400" />
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => setDateRange(update)}
                placeholderText="Date range"
                className="text-sm bg-transparent outline-none w-36"
                dateFormat="MMM d, yyyy"
              />
              {startDate && (
                <button onClick={() => setDateRange([null, null])} className="text-gray-400 hover:text-gray-600">
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Order Status Dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 bg-white dark:bg-gray-900 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="all">Order Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Payment Status Dropdown */}
            <div className="relative">
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 bg-white dark:bg-gray-900 border border-gray-200 rounded-lg text-sm"
              >
                <option value="all">Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Refunded">Refunded</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Fulfillment Status Dropdown */}
            <div className="relative">
              <select
                value={fulfillmentFilter}
                onChange={(e) => setFulfillmentFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 bg-white dark:bg-gray-900 border border-gray-200 rounded-lg text-sm"
              >
                <option value="all">Fulfillment Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* More Filters Toggle */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition ${
                showMoreFilters
                  ? "bg-orange-50 text-orange-600 border border-orange-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Filter size={14} /> More
            </button>

            {/* Clear Filters (only if active) */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1 px-2 py-2"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* Expanded More Filters Panel */}
          {showMoreFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Customer Group</label>
                  <select className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white dark:bg-gray-800">
                    <option>All customers</option>
                    <option>New customers</option>
                    <option>Returning customers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Product Category</label>
                  <select className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white dark:bg-gray-800">
                    <option>All categories</option>
                    <option>Tumblers</option>
                    <option>Bottles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Order Value Range</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-1.5 border rounded-lg text-sm" />
                    <input type="number" placeholder="Max" className="w-full px-3 py-1.5 border rounded-lg text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <OrderTable
          orders={orders}
          onViewDetails={handleViewDetails}
          isLoading={loading}
          onUpdateStatus={handleUpdateStatus}
          onEditOrder={(id) => toast.success(`Edit order ${id}`)}
          onDuplicateOrder={(id) => toast.success(`Duplicated order ${id}`)}
          onDeleteOrder={(id) => toast.success(`Deleted order ${id}`)}
          onSendEmail={(id) => toast.success(`Email sent for order ${id}`)}
          onCancelOrder={(id) => handleUpdateStatus(id, "Cancelled")}
          onPrintInvoice={(id) => window.print()}
          selectedOrders={selectedOrders}
          onSelectOrder={(id) =>
            setSelectedOrders((prev) =>
              prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
            )
          }
          onSelectAll={(selectAll) =>
            setSelectedOrders(selectAll ? orders.map((o) => o.id) : [])
          }
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        orderId={selectedOrderId}
        orderService={orderService}
        onStatusUpdate={handleUpdateStatus}
      />
    </div>
  );
};

export default Orders;