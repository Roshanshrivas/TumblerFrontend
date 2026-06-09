// src/pages/admin/Categories.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import FilterBar from "../../components/admin/FilterBar";
import CategoryTable from "../../components/admin/categories/CategoryTable";
import CategoryModal from "../../components/admin/categories/CategoryModal";
import { categoryService } from "./services/categoryService";
import { Tag, CheckCircle, XCircle, Package } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 10;

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoryService.fetchCategories({ page: currentPage, limit: itemsPerPage, search });
      setCategories(res.categories);
      setTotalPages(Math.ceil(res.total / itemsPerPage));
      setTotalItems(res.total);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSave = async (data) => {
    if (editingCategory) {
      await categoryService.updateCategory({ ...editingCategory, ...data });
    } else {
      await categoryService.addCategory(data);
    }
    setOpenModal(false);
    setEditingCategory(null);
    loadCategories();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await categoryService.deleteCategory(id);
      loadCategories();
    }
  };

  const total = categories.length;
  const active = categories.filter(c => c.status === "Active").length;
  const inactive = categories.filter(c => c.status !== "Active").length;
  const totalProducts = categories.reduce((sum, c) => sum + c.products, 0);

  const stats = [
    { title: "Total Categories", value: total, icon: Tag, color: "blue" },
    { title: "Active Categories", value: active, icon: CheckCircle, color: "green" },
    { title: "Inactive Categories", value: inactive, icon: XCircle, color: "red" },
    { title: "Total Products", value: totalProducts, icon: Package, color: "orange" },
  ];

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <FilterBar
        title="Categories"
        subtitle="Manage your product categories"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search categories..."
        filters={[]}
        onClearFilters={() => setSearch("")}
        addButton={{ label: "Add Category", onClick: () => { setEditingCategory(null); setOpenModal(true); } }}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <CategoryTable
          categories={categories}
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

      <CategoryModal
        isOpen={openModal}
        onClose={() => { setOpenModal(false); setEditingCategory(null); }}
        category={editingCategory}
        onSave={handleSave}
      />
    </div>
  );
};

export default Categories;