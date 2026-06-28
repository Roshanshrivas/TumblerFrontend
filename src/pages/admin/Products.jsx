// src/pages/admin/Products.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Package, CheckCircle, XCircle, AlertTriangle, Plus, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import FilterBar from "../../components/admin/FilterBar";
import ProductTabs from "../../components/admin/products/ProductTabs";
import ProductTable from "../../components/admin/products/ProductTable";
import { productService } from "./services/productService";

// ========== SKELETON COMPONENTS ==========
const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    ))}
  </div>
);

const TableSkeleton = () => (
  <div className="overflow-x-auto animate-pulse">
    <table className="w-full min-w-[900px]">
      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
        <tr>
          {["Product", "SKU", "Category", "Price", "Stock", "Status", "Created", "Actions"].map((heading) => (
            <th key={heading} className="px-6 py-4 text-left">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
        {[...Array(5)].map((_, i) => (
          <tr key={i}>
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
        ))}
      </tbody>
    </table>
  </div>
);

// ========== MAIN COMPONENT ==========
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filters, setFilters] = useState({ category: "", status: "", minPrice: "", maxPrice: "" });
  const itemsPerPage = 10;

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productService.fetchProducts({
        page: currentPage,
        limit: itemsPerPage,
        search,
        tab,
        filters,
      });
      setProducts(res.products);
      setTotalPages(Math.ceil(res.total / itemsPerPage));
      setTotalItems(res.total);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [currentPage, search, tab, filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleRowClick = (productId) => {
    navigate(`/admin/products/${productId}`);
  };

  const handleExport = async () => {
    try {
      const allFiltered = await productService.fetchAllFiltered({ search, tab, filters });
      if (!allFiltered.length) {
        toast.error("No products to export");
        return;
      }
      const headers = ["ID", "Name", "Category", "Price", "Stock", "Status", "Color", "Created At"];
      const csvRows = [
        headers.join(","),
        ...allFiltered.map(p => [
          p.id,
          `"${p.name.replace(/"/g, '""')}"`,
          p.category,
          p.price,
          p.stock,
          p.status,
          p.color || "",
          p.createdAt,
        ].join(",")),
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `products_export_${new Date().toISOString().slice(0, 19)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${allFiltered.length} products`);
    } catch (err) {
      toast.error("Export failed");
    }
  };

  // Stats data
  const stats = [
    { 
      title: "Total Products", 
      value: isInitialLoad ? "—" : products.length, 
      icon: Package, 
      color: "blue",
      growth: 12.5,
    },
    { 
      title: "Active Products", 
      value: isInitialLoad ? "—" : products.filter(p => p.status === "Active").length, 
      icon: CheckCircle, 
      color: "green",
      growth: 8.2,
    },
    { 
      title: "Draft Products", 
      value: isInitialLoad ? "—" : products.filter(p => p.status === "Draft").length, 
      icon: FileText, 
      color: "yellow",
      growth: -2.4,
    },
    { 
      title: "Out of Stock", 
      value: isInitialLoad ? "—" : products.filter(p => p.stock === 0).length, 
      icon: XCircle, 
      color: "red",
      growth: -5.1,
    },
    { 
      title: "Low Stock (≤10)", 
      value: isInitialLoad ? "—" : products.filter(p => p.stock > 0 && p.stock <= 10).length, 
      icon: AlertTriangle, 
      color: "orange",
      growth: 3.7,
    },
  ];

  const filterConfigs = [
    {
      key: "category",
      label: "Category",
      icon: Package,
      options: [
        { value: "", label: "All Categories" },
        { value: "Insulated", label: "Insulated" },
        { value: "Travel", label: "Travel" },
        { value: "Coffee", label: "Coffee" },
        { value: "Sports", label: "Sports" },
      ],
      value: filters.category,
      onChange: (val) => setFilters(prev => ({ ...prev, category: val })),
    },
    {
      key: "status",
      label: "Status",
      icon: CheckCircle,
      options: [
        { value: "", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Draft", label: "Draft" },
      ],
      value: filters.status,
      onChange: (val) => setFilters(prev => ({ ...prev, status: val })),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Stats Grid with Skeleton */}
      {isInitialLoad ? (
        <StatsSkeleton />
      ) : (
        <StatsGrid stats={stats} />
      )}
      
      {/* Filter Bar */}
      <FilterBar
        title="Products"
        subtitle="Manage your product catalog"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, SKU, or category..."
        filters={filterConfigs}
        onClearFilters={() => setFilters({ category: "", status: "", minPrice: "", maxPrice: "" })}
        addButton={{ 
          label: "Add Product", 
          onClick: () => navigate("/admin/products/add"),
          icon: <Plus size={18} />
        }}
        exportButton={{ label: "Export", onClick: handleExport }}
        isLoading={isInitialLoad}
      />

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <ProductTabs
          products={products}
          activeTab={tab}
          setActiveTab={(newTab) => { setTab(newTab); setCurrentPage(1); }}
        />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TableSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductTable
                products={products}
                onRowClick={handleRowClick}
                isLoading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Products;