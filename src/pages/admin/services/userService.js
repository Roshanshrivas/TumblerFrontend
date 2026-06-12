// src/services/userService.js
import toast from "react-hot-toast";

let mockUsers = [
  { id: 1, name: "John Smith", email: "john@example.com", phone: "+91 98765 43210", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/men/1.jpg", joined: "2026-05-15", lastLogin: "2026-06-10", ordersCount: 5 },
  { id: 2, name: "Emily Johnson", email: "emily@example.com", phone: "+91 87654 32109", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/women/2.jpg", joined: "2026-05-20", lastLogin: "2026-06-09", ordersCount: 3 },
  { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "+91 76543 21098", role: "customer", status: "Blocked", avatar: "https://randomuser.me/api/portraits/men/3.jpg", joined: "2026-04-10", lastLogin: "2026-05-30", ordersCount: 0 },
  { id: 4, name: "Sarah Davis", email: "sarah@example.com", phone: "+91 65432 10987", role: "admin", status: "Active", avatar: "https://randomuser.me/api/portraits/women/4.jpg", joined: "2026-03-01", lastLogin: "2026-06-10", ordersCount: 12 },
  { id: 5, name: "David Wilson", email: "david@example.com", phone: "+91 54321 09876", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/men/5.jpg", joined: "2026-05-25", lastLogin: "2026-06-08", ordersCount: 2 },
  { id: 6, name: "Priya Sharma", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Blocked", avatar: "https://randomuser.me/api/portraits/women/6.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
  { id: 7, name: "roshan Sharma", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/women/7.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
  { id: 8, name: "lovely Sharma", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/women/8.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
  { id: 9, name: "Priya Yadav", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/women/9.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
  { id: 10, name: "mohit Sharma", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Blocked", avatar: "https://randomuser.me/api/portraits/women/10.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
  { id: 11, name: "Priya Sharma", email: "priya@example.com", phone: "+91 43210 98765", role: "customer", status: "Active", avatar: "https://randomuser.me/api/portraits/women/6.jpg", joined: "2026-04-22", lastLogin: "2026-05-28", ordersCount: 1 },
];

export const userService = {
  fetchUsers: async ({ page = 1, limit = 10, search = "", roleFilter = "all", statusFilter = "all" } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = [...mockUsers];
    if (search) {
      filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));
    }
    if (roleFilter !== "all") filtered = filtered.filter(u => u.role === roleFilter);
    if (statusFilter !== "all") filtered = filtered.filter(u => u.status === statusFilter);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return { users: paginated, total, page, limit };
  },

  updateUser: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error("User not found");
    mockUsers[index] = { ...mockUsers[index], ...updates };
    toast.success("User updated");
    return mockUsers[index];
  },

  deleteUser: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockUsers = mockUsers.filter(u => u.id !== id);
    toast.success("User deleted");
  },

  bulkDeleteUsers: async (ids) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockUsers = mockUsers.filter(u => !ids.includes(u.id));
    toast.success(`${ids.length} users deleted`);
  },

  createUser: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newUser = { id: Date.now(), ...userData, avatar: null, joined: new Date().toISOString().slice(0,10), ordersCount: 0 };
    mockUsers.push(newUser);
    toast.success("User created");
    return newUser;
  },

  getUserStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const total = mockUsers.length;
    const active = mockUsers.filter(u => u.status === "Active").length;
    const blocked = mockUsers.filter(u => u.status === "Blocked").length;
    const inactive = total - active - blocked;
    const newThisMonth = mockUsers.filter(u => u.joined >= "2026-06-01").length;
    return { total, active, blocked, inactive, newThisMonth };
  },

  exportUsers: async (filters = {}) => {
    let filtered = [...mockUsers];
    if (filters.search) filtered = filtered.filter(u => u.name.toLowerCase().includes(filters.search.toLowerCase()) || u.email.toLowerCase().includes(filters.search.toLowerCase()) || u.phone.includes(filters.search));
    if (filters.roleFilter && filters.roleFilter !== "all") filtered = filtered.filter(u => u.role === filters.roleFilter);
    if (filters.statusFilter && filters.statusFilter !== "all") filtered = filtered.filter(u => u.status === filters.statusFilter);
    return filtered;
  },
};