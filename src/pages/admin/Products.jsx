// src/pages/admin/Products.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Package, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

// Reusable components
import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import FilterBar from "../../components/admin/FilterBar";

// Page‑specific components
import ProductTabs from "../../components/admin/products/ProductTabs";
import ProductTable from "../../components/admin/products/ProductTable";
import ProductModal from "../../components/admin/products/ProductModal";

// Service
import { productService } from "./services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
    }
  }, [currentPage, search, tab, filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct({ ...editingProduct, ...productData });
      } else {
        await productService.addProduct(productData);
      }
      setOpenModal(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await productService.deleteProduct(id);
      loadProducts();
    }
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

  // Stats using actual icon components
  const stats = [
    { title: "Total Products", value: products.length, icon: Package, color: "blue" },
    { title: "Active Products", value: products.filter(p => p.status === "Active").length, icon: CheckCircle, color: "green" },
    { title: "Out of Stock", value: products.filter(p => p.stock === 0).length, icon: XCircle, color: "red" },
    { title: "Low Stock (≤10)", value: products.filter(p => p.stock > 0 && p.stock <= 10).length, icon: AlertTriangle, color: "orange" },
  ];

  // Filter definitions for the FilterBar (category and status)
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsGrid stats={stats} />
      {/* Filter Bar */}
      <FilterBar
        title="Products"
        subtitle="Manage your product catalog"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name..."
        filters={filterConfigs}
        onClearFilters={() => setFilters({ category: "", status: "", minPrice: "", maxPrice: "" })}
        addButton={{ label: "Add Product", onClick: () => { setEditingProduct(null); setOpenModal(true); } }}
        exportButton={{ label: "Export", onClick: handleExport }}
      />

      {/* Main Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <ProductTabs
          products={products}
          activeTab={tab}
          setActiveTab={(newTab) => { setTab(newTab); setCurrentPage(1); }}
        />
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={loading}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>

      {/* Add/Edit Modal */}
      <ProductModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setEditingProduct(null); }}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default Products;