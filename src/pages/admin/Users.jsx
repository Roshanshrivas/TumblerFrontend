// src/pages/admin/Users.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Users as UsersIcon, UserCheck, UserX, Calendar, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import StatsGrid from "../../components/admin/StatsGrid";
import Pagination from "../../components/admin/Pagination";
import FilterBar from "../../components/admin/FilterBar";
import UserTable from "../../components/admin/users/UserTable";
import UserModal from "../../components/admin/users/UserModal";
import { userService } from "./services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const itemsPerPage = 10;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.fetchUsers({
        page: currentPage,
        limit: itemsPerPage,
        search,
        roleFilter,
        statusFilter,
      });
      setUsers(res.users);
      setTotalPages(Math.ceil(res.total / itemsPerPage));
      setTotalItems(res.total);
      setSelectedUsers([]); // clear selection on page/filter change
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, roleFilter, statusFilter]);

  const loadStats = useCallback(async () => {
    try {
      const statsData = await userService.getUserStats();
      setStats(statsData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadUsers();
    loadStats();
  }, [loadUsers, loadStats]);

  const handleSave = async (updates) => {
    await userService.updateUser(selectedUser.id, updates);
    setModalOpen(false);
    setSelectedUser(null);
    loadUsers();
    loadStats();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user? This action cannot be undone.")) {
      await userService.deleteUser(id);
      loadUsers();
      loadStats();
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (window.confirm(`Delete ${selectedUsers.length} users?`)) {
      await userService.bulkDeleteUsers(selectedUsers);
      setSelectedUsers([]);
      loadUsers();
      loadStats();
    }
  };

  const handleExport = async () => {
    try {
      const allUsers = await userService.exportUsers({ search, roleFilter, statusFilter });
      if (!allUsers.length) {
        toast.error("No users to export");
        return;
      }
      const headers = ["ID", "Name", "Email", "Role", "Status", "Joined", "Orders Count"];
      const csvRows = [
        headers.join(","),
        ...allUsers.map(u => [
          u.id,
          `"${u.name}"`,
          u.email,
          u.role,
          u.status,
          u.joined,
          u.ordersCount,
        ].join(",")),
      ];
      const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `users_export_${new Date().toISOString().slice(0,19)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${allUsers.length} users`);
    } catch (err) {
      toast.error("Export failed");
    }
  };

  const statsCards = [
    { title: "Total Users", value: stats.total || 0, icon: UsersIcon, color: "blue" },
    { title: "Active Users", value: stats.active || 0, icon: UserCheck, color: "green" },
    { title: "Blocked Users", value: stats.blocked || 0, icon: UserX, color: "red" },
    { title: "Inactive Users", value: stats.inactive || 0, icon: AlertCircle, color: "gray" },
    { title: "New This Month", value: stats.newThisMonth || 0, icon: Calendar, color: "orange" },
  ];

  const filterConfigs = [
    {
      key: "role",
      label: "Role",
      options: [
        { value: "all", label: "All Roles" },
        { value: "admin", label: "Admin" },
        { value: "customer", label: "Customer" },
      ],
      value: roleFilter,
      onChange: setRoleFilter,
    },
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Blocked", label: "Blocked" },
      ],
      value: statusFilter,
      onChange: setStatusFilter,
    },
  ];

  return (
    <div className="space-y-6">
      <StatsGrid stats={statsCards} />
      <FilterBar
        title="Users"
        subtitle="Manage user accounts"
        searchTerm={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name or email..."
        filters={filterConfigs}
        onClearFilters={() => { setSearch(""); setRoleFilter("all"); setStatusFilter("all"); setCurrentPage(1); }}
        addButton={{ label: "Create User", onClick: () => { setSelectedUser(null); setModalOpen(true); } }}
        exportButton={{ label: "Export", onClick: handleExport }}
      />

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <span className="text-sm text-gray-600">{selectedUsers.length} users selected</span>
          <button onClick={handleBulkDelete} className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">Delete Selected</button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={(user) => { setSelectedUser(user); setModalOpen(true); }}
          isLoading={loading}
          selectedUsers={selectedUsers}
          onSelectUser={(id) => setSelectedUsers(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
          onSelectAll={(selectAll) => setSelectedUsers(selectAll ? users.map(u => u.id) : [])}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>

      <UserModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedUser(null); }}
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
};

export default Users;