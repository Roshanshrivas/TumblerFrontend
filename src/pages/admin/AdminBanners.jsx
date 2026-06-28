// src/pages/admin/AdminBanners.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  X,
  CheckCircle,
  Clock,
  Calendar,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { bannerService } from "../../pages/admin/services/bannerService";
import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import FilterBar from "../../components/admin/FilterBar";
import BannerFormModal from "../../components/admin/Banners/BannerFormModal";
import DeleteConfirmModal from "../../components/admin/ConfirmDialog";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    scheduled: 0,
    expired: 0,
    inactive: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const itemsPerPage = 10;

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [bannersRes, statsRes] = await Promise.all([
        bannerService.fetchBanners({
          search,
          status: statusFilter,
          position: positionFilter,
          page: currentPage,
          limit: itemsPerPage,
        }),
        bannerService.getStats(),
      ]);
      setBanners(bannersRes.banners);
      setTotalItems(bannersRes.total);
      setTotalPages(Math.ceil(bannersRes.total / itemsPerPage));
      setStats(statsRes);
    } catch (err) {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, positionFilter, currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // CRUD handlers
  const handleCreate = async (data) => {
    await bannerService.createBanner(data);
    setModalOpen(false);
    loadData();
  };

  const handleUpdate = async (data) => {
    await bannerService.updateBanner(editingBanner.id, data);
    setModalOpen(false);
    setEditingBanner(null);
    loadData();
  };

  const handleDelete = (id) => {
    setDeleteTargetId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      bannerService.deleteBanner(deleteTargetId);
      setDeleteModalOpen(false);
      setDeleteTargetId(null);
      loadData();
    }
  };

  const handleToggleStatus = (id) => {
    bannerService.toggleStatus(id);
    loadData();
  };

  const openEditModal = (id) => {
    const banner = banners.find(b => b.id === id);
    setEditingBanner(banner);
    setModalOpen(true);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPositionFilter("all");
    setCurrentPage(1);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getStatusConfig = (banner) => {
    const now = new Date();
    const endDate = new Date(banner.endDate);
    const startDate = new Date(banner.startDate);
    if (banner.status === "inactive") return { color: "text-gray-600", dot: "bg-gray-500", label: "Inactive" };
    if (banner.status === "scheduled" || (banner.status === "active" && startDate > now)) {
      return { color: "text-blue-600", dot: "bg-blue-500", label: "Scheduled" };
    }
    if (endDate < now) return { color: "text-red-600", dot: "bg-red-500", label: "Expired" };
    return { color: "text-green-600", dot: "bg-green-500", label: "Active" };
  };

  // Stats cards
  const statsCards = [
    { title: "Total Banners", value: stats.total, icon: Image, color: "orange", growth: 0 },
    { title: "Active", value: stats.active, icon: CheckCircle, color: "green", growth: 0 },
    { title: "Scheduled", value: stats.scheduled, icon: Clock, color: "blue", growth: 0 },
    { title: "Expired", value: stats.expired, icon: Calendar, color: "red", growth: 0 },
    { title: "Inactive", value: stats.inactive, icon: PowerOff, color: "gray", growth: 0 },
  ];

  // Filter options for FilterBar
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active", dot: "bg-green-500" },
    { value: "scheduled", label: "Scheduled", dot: "bg-blue-500" },
    { value: "expired", label: "Expired", dot: "bg-red-500" },
    { value: "inactive", label: "Inactive", dot: "bg-gray-500" },
  ];

  const positionOptions = [
    { value: "all", label: "All Positions" },
    { value: "homepage", label: "Homepage" },
    { value: "category", label: "Category" },
    { value: "product", label: "Product" },
    { value: "promo", label: "Promo" },
    { value: "footer", label: "Footer" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsGrid stats={statsCards} />
      {/* FilterBar - with search, filters, and create button */}
      <FilterBar
        title="Banners"
        subtitle="Manage your promotional banners"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search banners..."
        filters={[
          {
            key: "status",
            label: "Status",
            icon: null,
            options: statusOptions,
            value: statusFilter,
            onChange: setStatusFilter,
          },
          {
            key: "position",
            label: "Position",
            icon: null,
            options: positionOptions,
            value: positionFilter,
            onChange: setPositionFilter,
          },
        ]}
        onClearFilters={clearFilters}
        addButton={{
          label: "Create Banner",
          onClick: () => { setEditingBanner(null); setModalOpen(true); },
          icon: <Plus size={18} />,
        }}
        // exportButton={{ label: "Export", onClick: () => toast.success("Export demo") }}
        containerClassName="mb-0"
      />

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent" />
            </div>
          ) : banners.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No banners found. Create your first banner!</div>
          ) : (
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-3 py-3 text-left w-[12%]">Banner</th>
                  <th className="px-3 py-3 text-left w-[18%]">Title</th>
                  <th className="px-3 py-3 text-left w-[12%]">Position</th>
                  <th className="px-3 py-3 text-left w-[20%]">Validity</th>
                  <th className="px-3 py-3 text-left w-[10%]">Status</th>
                  <th className="px-3 py-3 text-center w-[8%]">Priority</th>
                  <th className="px-3 py-3 text-center w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {banners.map((banner) => {
                  const statusConfig = getStatusConfig(banner);
                  const startDate = formatDate(banner.startDate);
                  const endDate = formatDate(banner.endDate);
                  const validity = startDate && endDate ? `${startDate} → ${endDate}` : "—";
                  return (
                    <tr key={banner.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                      <td className="px-3 py-3">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-16 h-10 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                        />
                      </td>
                      <td className="px-3 py-3 font-medium text-gray-800 dark:text-white">{banner.title}</td>
                      <td className="px-3 py-3 capitalize text-xs">{banner.position}</td>
                      <td className="px-3 py-3 text-xs whitespace-nowrap">{validity}</td>
                      <td className="px-3 py-3">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></span>
                          <span className={statusConfig.color}>{statusConfig.label}</span>
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">{banner.priority || "—"}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => { setSelectedBanner(banner); setDetailModalOpen(true); }}
                            className="text-gray-400 hover:text-blue-500 p-1 rounded hover:bg-blue-50"
                            title="View"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => openEditModal(banner.id)}
                            className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(banner.id)}
                            className={`p-1 rounded hover:bg-gray-100 ${
                              banner.status === "active" || banner.status === "scheduled"
                                ? "text-gray-400 hover:text-orange-500"
                                : "text-gray-400 hover:text-green-500"
                            }`}
                            title={banner.status === "active" || banner.status === "scheduled" ? "Deactivate" : "Activate"}
                          >
                            {banner.status === "active" || banner.status === "scheduled" ? <PowerOff size={15} /> : <Power size={15} />}
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-2 text-sm text-gray-500">
            <span>
              Showing {banners.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              simple
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <BannerFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingBanner(null); }}
        onSave={editingBanner ? handleUpdate : handleCreate}
        initialData={editingBanner}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeleteTargetId(null); }}
        onConfirm={confirmDelete}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
      />

      {/* Detail Modal */}
      {detailModalOpen && selectedBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Banner Details</h3>
              <button onClick={() => setDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <img
                src={selectedBanner.image}
                alt={selectedBanner.title}
                className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200"
              />
              <div className="grid grid-cols-2 gap-4">
                <div><span className="font-medium">Title:</span> {selectedBanner.title}</div>
                <div><span className="font-medium">Subtitle:</span> {selectedBanner.subtitle || "—"}</div>
                <div className="col-span-2">
                  <span className="font-medium">Link:</span>{" "}
                  <a href={selectedBanner.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">
                    {selectedBanner.link}
                  </a>
                </div>
                <div><span className="font-medium">Position:</span> {selectedBanner.position}</div>
                <div><span className="font-medium">Priority:</span> {selectedBanner.priority || "—"}</div>
                <div className="col-span-2">
                  <span className="font-medium">Validity:</span> {formatDate(selectedBanner.startDate)} → {formatDate(selectedBanner.endDate)}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusConfig(selectedBanner).color} bg-${getStatusConfig(selectedBanner).dot.replace('bg-', '')}/10`}>
                    {getStatusConfig(selectedBanner).label}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => setDetailModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition">
                Close
              </button>
              <button
                onClick={() => { setDetailModalOpen(false); openEditModal(selectedBanner.id); }}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Edit Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBanners;