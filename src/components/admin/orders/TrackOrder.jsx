// src/pages/TrackOrder.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Package,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  MapPin,
  Calendar,
  IndianRupee,
} from "lucide-react";
import { orderService } from "../../../pages/admin/services/orderService";

// ---------- Status Timeline Configuration ----------
const STATUS_STEPS = [
  { key: "Pending", label: "Order Placed", icon: Clock, color: "text-yellow-500" },
  { key: "Processing", label: "Processing", icon: Package, color: "text-blue-500" },
  { key: "Shipped", label: "Shipped", icon: Truck, color: "text-purple-500" },
  { key: "Delivered", label: "Delivered", icon: CheckCircle, color: "text-green-500" },
];

const STATUS_COLORS = {
  Pending: "border-yellow-500 bg-yellow-50 text-yellow-700",
  Processing: "border-blue-500 bg-blue-50 text-blue-700",
  Shipped: "border-purple-500 bg-purple-50 text-purple-700",
  Delivered: "border-green-500 bg-green-50 text-green-700",
  Cancelled: "border-red-500 bg-red-50 text-red-700",
};

// ---------- Main Component ----------
const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        // 🔁 Replace with public API later: `/api/orders/${id}/status`
        const data = await orderService.getOrder(id);
        setOrder(data);
      } catch (err) {
        setError("Order not found. Please check your tracking number.");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadOrder();
  }, [id]);

  // ----- Loading State -----
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading your order...</p>
      </div>
    );
  }

  // ----- Error State -----
  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <XCircle size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Order Not Found</h2>
        <p className="text-gray-500 mt-2">{error || "We couldn't find that order."}</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
          Return to Shop
        </Link>
      </div>
    );
  }

  const currentStatus = order.status || "Pending";
  const statusIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);
  const isCancelled = currentStatus === "Cancelled";

  // ----- Main View -----
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Order</h1>
              <p className="text-sm text-gray-500 mt-1">
                Order #{order.id} • Placed on {new Date(order.createdAt || order.date).toLocaleDateString()}
              </p>
            </div>
            <div className={`px-4 py-1.5 rounded-full border text-sm font-medium ${STATUS_COLORS[currentStatus] || "border-gray-300 bg-gray-50 text-gray-600"}`}>
              {currentStatus}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-6">Order Progress</h2>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200">
              <div
                className="w-full bg-orange-500 transition-all duration-500"
                style={{
                  height: isCancelled ? "0%" : `${(statusIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-8 relative">
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= statusIndex && !isCancelled;
                const isActive = idx === statusIndex && !isCancelled;
                const Icon = step.icon;

                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10
                        ${isCompleted ? "bg-orange-500 text-white" : ""}
                        ${isActive ? "bg-orange-100 border-2 border-orange-500 text-orange-500" : ""}
                        ${!isCompleted && !isActive ? "bg-gray-100 text-gray-400" : ""}
                        ${isCancelled && idx === statusIndex ? "bg-red-100 border-2 border-red-500 text-red-500" : ""}
                      `}
                    >
                      {isCompleted ? <CheckCircle size={18} /> : <Icon size={18} />}
                    </div>
                    <div className="pt-1">
                      <p className={`font-medium ${isCompleted || isActive ? "text-gray-900" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      {isActive && (
                        <p className="text-sm text-orange-600 font-medium">Currently in progress</p>
                      )}
                      {isCancelled && idx === statusIndex && (
                        <p className="text-sm text-red-600 font-medium">Order was cancelled</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer & Shipping */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">
              Customer Details
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{order.customer}</p>
              <p className="text-sm text-gray-600">{order.email}</p>
              <p className="text-sm text-gray-600">{order.phone}</p>
              <div className="flex items-start gap-2 mt-2 pt-3 border-t border-gray-100">
                <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{order.address || order.shippingAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-medium">{order.paymentMethod || "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Status</span>
                <span className={`font-medium ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>
                  {order.paymentStatus || "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tracking Number</span>
                <span className="font-mono text-sm">{order.trackingNumber || "Not assigned"}</span>
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹{order.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-4">
            Items ({order.items?.length || 0})
          </h3>
          <div className="divide-y divide-gray-100">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://placehold.co/48x48/f3f4f6/9ca3af?text=No"}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">SKU: {item.sku || "—"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="font-medium">₹{item.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            to="/"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-sm"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            🖨️ Print This Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;