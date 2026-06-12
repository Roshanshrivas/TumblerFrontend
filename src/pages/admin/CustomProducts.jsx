// src/pages/admin/CustomProducts.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Package, Palette, Type, Image, FileType, ShoppingBag, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import ProductForm from "../../components/admin/customization/ProductForm";
import StatsGrid from "../../components/admin/StatsGrid";
import FilterBar from "../../components/admin/FilterBar";
import Pagination from "../../components/admin/Pagination";
import { customProductService } from "../admin/services/customProductService";

const CustomProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, draft
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  // Stats (derived from products)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    withCustomization: 0
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await customProductService.fetchCustomProducts({
        page: currentPage,
        limit: itemsPerPage,
        search,
        statusFilter
      });
      setProducts(res.data || res); // handle response structure
      // If your service returns paginated data, extract total and pages accordingly.
      // Here we assume fetchCustomProducts returns all products (for demo) – adjust as needed.
      // For real pagination, modify the service to accept page/limit.
      // We'll compute stats from full list, but for demo we use the full list.
      // To keep consistent, we'll load all for stats and filter/paginate locally.
      // Better approach: modify service to support pagination. Let's do a simple local filter.
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  // We'll refactor to fetch all and filter/paginate locally for simplicity
  // In production, your API should handle pagination.
  const [allProducts, setAllProducts] = useState([]);
  
  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await customProductService.fetchCustomProducts();
      setAllProducts(data);
      // compute stats
      const total = data.length;
      const active = data.filter(p => p.status !== "Draft").length;
      const draft = data.filter(p => p.status === "Draft").length;
      const inactivetumbler = data.filter(p => p.status === "Inactive").length;
      const revenue = data.reduce((sum, p) => sum + (p.totalSales || 0), 0); 
      setStats({ total, active, draft, inactivetumbler, revenue });
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Local filtering and pagination
  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true :
      statusFilter === "active" ? p.status !== "Draft" :
      statusFilter === "draft" ? p.status === "Draft" : true;
    return matchesSearch && matchesStatus;
  });

  const totalFiltered = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPagesCalc = Math.ceil(totalFiltered / itemsPerPage);

  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        await customProductService.updateCustomProduct(editingProduct.id, productData);
      } else {
        await customProductService.createCustomProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
      fetchAll(); // refresh list
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product permanently?")) {
      try {
        await customProductService.deleteCustomProduct(id);
        fetchAll();
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const getCustomizationIcons = (customization) => {
    const icons = [];
    if (customization.text?.enabled) icons.push({ icon: Type, label: "Text" });
    if (customization.logo?.enabled) icons.push({ icon: Image, label: "Logo" });
    if (customization.font?.enabled) icons.push({ icon: FileType, label: "Font" });
    return icons;
  };

  // Stats cards configuration
  const statsCards = [
  { title: "Total Tumblers", value: stats.total, icon: ShoppingBag, color: "blue" },
  { title: "Active Tumblers", value: stats.active, icon: Sparkles, color: "green" },
  { title: "Draft Tumblers", value: stats.draft, icon: AlertCircle, color: "yellow" },
  { title: "Inactive Tumblers", value: stats.inactivetumbler, icon: Package, color: "gray" },
  { title: "Revenue", value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: TrendingUp, color: "emerald" }
];

  // FilterBar configuration
  const filterConfig = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-orange-600">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Custom Products</span>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={statsCards} />

      {/* FilterBar + Add Button */}
      <FilterBar
        title="Customizable Tumblers"
        subtitle={`${totalFiltered} products`}
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by product name..."
        filters={filterConfig}
        onClearFilters={() => { setSearch(""); setStatusFilter("all"); setCurrentPage(1); }}
        addButton={{ label: "Add Product", onClick: () => { setEditingProduct(null); setShowForm(true); } }}
      />

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-2 text-gray-500">Loading products...</p>
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border">
          <Package className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-gray-500">No customizable products found.</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-orange-500 hover:underline">
            Add your first product
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map(p => {
              const customizationIcons = getCustomizationIcons(p.customization);
              return (
                <div key={p.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Image Container - Full image visible */}
                  <div className="relative h-56 bg-gray-100 flex items-center justify-center p-3">
                    <img
                      src={p.mainImage}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-orange-600">₹{p.basePrice}</span>
                          <span className="text-xs text-gray-400">+ customisation</span>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md flex-shrink-0"
                        style={{ backgroundColor: p.color || p.tumblerColor || "#1a1a1a" }}
                        title="Tumbler color"
                      />
                    </div>

                    {/* Customization badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {customizationIcons.map(({ icon: Icon, label }, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                          <Icon size={12} /> {label}
                        </span>
                      ))}
                      {customizationIcons.length === 0 && (
                        <span className="text-xs text-gray-400">No customisations</span>
                      )}
                    </div>

                    {/* Status badge if draft */}
                    {p.status === "Draft" && (
                      <span className="mt-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full self-start">Draft</span>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-5 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => { setEditingProduct(p); setShowForm(true); }}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-lg transition"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPagesCalc > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPagesCalc}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalFiltered}
            />
          )}
        </>
      )}

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
};

export default CustomProducts;