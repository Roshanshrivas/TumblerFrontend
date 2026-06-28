// src/components/admin/Reviews/ReviewDetailModal.jsx
import React, { useState } from "react";
import {
  X,
  Star,
  StarHalf,
  User,
  Package,
  Calendar,
  Reply,
  CheckCircle,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Power,
  PowerOff,
  Trash2,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const ReviewDetailModal = ({ isOpen, onClose, review, onReply, onToggleStatus, onDelete }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  if (!isOpen || !review) return null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: "text-blue-600", bg: "bg-blue-100", label: "Pending", icon: Clock },
      approved: { color: "text-green-600", bg: "bg-green-100", label: "Approved", icon: CheckCircle },
      flagged: { color: "text-red-600", bg: "bg-red-100", label: "Flagged", icon: AlertCircle },
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(review.status);
  const StatusIcon = statusConfig.icon;

  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    setIsReplying(true);
    onReply(review.id, replyText);
    setReplyText("");
    setIsReplying(false);
    toast.success("Reply added");
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <MessageCircle size={18} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Review Details</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-5">
          {/* Product & Customer */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
              <Package size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Product</p>
                <p className="font-medium">{review.product}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
              <User size={16} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="font-medium">{review.customer}</p>
                <p className="text-xs text-gray-400">{review.email}</p>
              </div>
            </div>
          </div>

          {/* Rating & Date */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">{renderStars(review.rating)}</div>
            <span className="text-sm font-medium">{review.rating}.0</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={14} /> {formatDate(review.date)}
            </span>
            <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
              <StatusIcon size={12} />
              {statusConfig.label}
            </span>
          </div>

          {/* Title & Comment */}
          <div>
            <h4 className="font-semibold text-gray-800">{review.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
          </div>

          {/* Helpful */}
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-500">
              <ThumbsUp size={14} /> {review.helpful || 0}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <ThumbsDown size={14} /> {review.notHelpful || 0}
            </span>
          </div>

          {/* Reply Section */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <h4 className="font-semibold flex items-center gap-2 mb-3">
              <Reply size={16} /> Reply to Review
            </h4>
            {review.reply ? (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <span className="font-medium text-sm">Admin</span>
                  <span className="text-xs text-gray-400">• {formatDate(review.date)}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{review.reply}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply to this customer..."
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
                <button
                  onClick={handleReplySubmit}
                  disabled={isReplying}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm transition disabled:opacity-50"
                >
                  <Send size={16} /> {isReplying ? "Sending..." : "Send Reply"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={() => onDelete(review.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => onToggleStatus(review.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                review.status === "approved"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {review.status === "approved" ? <PowerOff size={16} /> : <Power size={16} />}
              {review.status === "approved" ? "Flag" : "Approve"}
            </button>
            <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;