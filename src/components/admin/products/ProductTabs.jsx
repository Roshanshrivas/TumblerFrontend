// src/pages/admin/components/products/ProductTabs.jsx
import React from "react";

const ProductTabs = ({ products, activeTab, setActiveTab }) => {
  const tabs = [
    { key: "all", label: `All Products (${products.length})` },
    { key: "active", label: `Active (${products.filter(p => p.stock > 10).length})` },
    { key: "draft", label: `Draft (${products.filter(p => p.status === "Draft").length})` },
    { key: "out", label: `Out Of Stock (${products.filter(p => p.stock === 0).length})` },
  ];

  return (
    <div className="flex flex-wrap gap-6 border-b border-gray-200 dark:border-gray-800 px-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.key
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;