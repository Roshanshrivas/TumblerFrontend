// src/components/admin/orders/OrderTable.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  MoreVertical,
  Package,
  Edit,
  Copy,
  Trash2,
  Send,
  Ban,
} from "lucide-react";

const rowVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15 } },
};

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors = {
  Pending: "bg-orange-50 text-orange-600 border-orange-200",
  Processing: "bg-blue-50 text-blue-600 border-blue-200",
  Shipped: "bg-purple-50 text-purple-600 border-purple-200",
  Delivered: "bg-green-50 text-green-600 border-green-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

const paymentColors = {
  Paid: "text-green-600",
  Unpaid: "text-red-600",
  Refunded: "text-gray-500",
};

const fulfillmentColors = {
  Delivered: "text-green-600",
  Processing: "text-blue-600",
  Shipped: "text-purple-600",
  Pending: "text-orange-600",
  Cancelled: "text-red-600",
};

// Fixed helper: product name from 'items', product image from 'products'
const getFirstProduct = (order) => {
  // Get product name from first item
  const items = order.items || [];
  const firstItem = items[0];
  const productName = firstItem?.name || "Product";

  // Get product image from first product in products array
  const products = order.products || [];
  const firstProduct = products[0];
  const productImage = firstProduct?.image || null;

  return { name: productName, image: productImage };
};

const OrderTable = ({
  orders,
  isLoading,
  onViewDetails,
  onUpdateStatus,
  onEditOrder,
  onDuplicateOrder,
  onDeleteOrder,
  onSendEmail,
  onCancelOrder,
  onPrintInvoice,
  selectedOrders = [],
  onSelectOrder,
  onSelectAll,
}) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  const allSelected = orders.length > 0 && selectedOrders.length === orders.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = useCallback(async (id, newStatus) => {
    if (newStatus === "Cancelled") {
      const confirm = window.confirm("Are you sure you want to cancel this order?");
      if (!confirm) return;
    }
    try {
      setUpdatingId(id);
      await onUpdateStatus?.(id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  }, [onUpdateStatus]);

  const handleMenuAction = useCallback((action, order) => {
    setOpenMenuId(null);
    switch (action) {
      case "edit":
        onEditOrder?.(order.id);
        break;
      case "duplicate":
        onDuplicateOrder?.(order.id);
        break;
      case "delete":
        if (window.confirm(`Delete order ${order.id}? This action cannot be undone.`)) {
          onDeleteOrder?.(order.id);
        }
        break;
      case "email":
        onSendEmail?.(order.id);
        break;
      case "cancel":
        if (window.confirm(`Cancel order ${order.id}?`)) {
          onCancelOrder?.(order.id);
        }
        break;
      case "print":
        onPrintInvoice?.(order.id);
        break;
      default:
        break;
    }
  }, [onEditOrder, onDuplicateOrder, onDeleteOrder, onSendEmail, onCancelOrder, onPrintInvoice]);

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-gray-500">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-12 text-center text-gray-500">
        <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <p>No orders found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[900px] table-auto">
        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-3 w-10">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll?.(e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Payment</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Fulfillment</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">Product</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500 w-16">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            const { name: productName, image: productImage } = getFirstProduct(order);
            return (
              <motion.tr
                key={order.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => onSelectOrder?.(order.id)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                </td>
                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => onViewDetails?.(order.id)}
                >
                  <span className="font-mono font-medium text-orange-600 hover:underline">#{order.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{order.customer}</div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                  <div className="text-xs text-gray-400">{order.phone || "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900">{order.date}</div>
                  <div className="text-xs text-gray-400">{order.time || "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">₹{order.total?.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">{order.paymentMethod}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-700">{order.paymentMethod}</div>
                  <div className={`text-xs font-medium ${paymentColors[order.paymentStatus] || "text-gray-500"}`}>
                    {order.paymentStatus}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className={`text-sm font-medium ${fulfillmentColors[order.fulfillmentStatus] || "text-gray-500"}`}>
                    {order.fulfillmentStatus}
                  </div>
                  <div className="text-xs text-gray-400">
                    {order.fulfillmentDate || order.shippedDate || order.deliveredDate || "—"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`
                      px-2 py-1 pr-6 rounded-md border text-xs font-medium cursor-pointer outline-none bg-white
                      ${statusColors[order.status] || "bg-gray-50 text-gray-600 border-gray-200"}
                      ${updatingId === order.id ? "opacity-50 cursor-wait" : ""}
                    `}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={productName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML = '<svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M9 9h6v6H9z"/><line x1="9" y1="15" x2="15" y2="9"/></svg>';
                          }}
                        />
                      ) : (
                        <Package size={14} className="text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-700 truncate max-w-[120px]" title={productName}>
                      {productName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onPrintInvoice?.(order.id)}
                      className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                      title="Print invoice"
                    >
                      <Printer size={15} />
                    </button>
                    <div className="relative" ref={menuRef}>
                      <button
                        onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                        title="More actions"
                      >
                        <MoreVertical size={15} />
                      </button>
                      <AnimatePresence>
                        {openMenuId === order.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden"
                          >
                            <button
                              onClick={() => handleMenuAction("edit", order)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit size={14} /> Edit Order
                            </button>
                            <button
                              onClick={() => handleMenuAction("duplicate", order)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Copy size={14} /> Duplicate
                            </button>
                            <button
                              onClick={() => handleMenuAction("email", order)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Send size={14} /> Email Invoice
                            </button>
                            {order.status !== "Cancelled" && (
                              <button
                                onClick={() => handleMenuAction("cancel", order)}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Ban size={14} /> Cancel Order
                              </button>
                            )}
                            <hr className="my-1" />
                            <button
                              onClick={() => handleMenuAction("delete", order)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;