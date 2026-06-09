// src/pages/admin/components/products/ProductTable.jsx
import React, { memo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12 } },
};

// Status badge component
const StatusBadge = ({ status }) => {
  const config = {
    Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  const className = config[status] || config.Active;
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{status}</span>;
};

// Stock badge component
const StockBadge = ({ stock }) => {
  if (stock === 0) return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Out of Stock</span>;
  if (stock < 10) return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Low Stock</span>;
  return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Stock</span>;
};

// Skeleton row for loading
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" /></td>
    <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" /></td>
    <td className="px-6 py-4"><div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" /></td>
    <td className="px-6 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" /></td>
    <td className="px-6 py-4"><div className="flex gap-2"><div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" /><div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded" /></div></td>
  </tr>
);

const ProductTable = ({ products, onEdit, onDelete, onView, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {[...Array(5)].map((_, i) => <SkeletonRow key={i} />)}
          </tbody>
        </table>
      </div>
    );
  }

  if (!products.length) {
    return <div className="p-8 text-center text-gray-500">No products found</div>;
  }

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 sticky top-0">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {products.map((product) => (
            <motion.tr
              key={product.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-100 dark:border-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{product.color || "—"}</p>
                  </div>
                </div>
               </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">TMB-{String(product.id).padStart(4, '0')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm"><StockBadge stock={product.stock} /></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={product.status || "Active"} /></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.createdAt || "—"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  {onView && (
                    <button
                      onClick={() => onView(product)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => onEdit(product)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
                    title="Edit product"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    title="Delete product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
       </table>
    </div>
  );
};

export default memo(ProductTable);