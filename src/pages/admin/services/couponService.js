import toast from "react-hot-toast";

const STORAGE_KEY = "adminCoupons";

// Helper to generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

// Load from localStorage
const loadCoupons = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save to localStorage
const saveCoupons = (coupons) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
};

export const couponService = {
  // Fetch all coupons with filters
  fetchCoupons: async ({ search = "", status = "all", page = 1, limit = 10 } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // simulate API
    let coupons = loadCoupons();
    
    // Filter by search (code or description)
    if (search) {
      coupons = coupons.filter(c => 
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Filter by status
    if (status !== "all") {
      const now = new Date();
      if (status === "active") {
        coupons = coupons.filter(c => c.status === "active" && new Date(c.expiryDate) > now);
      } else if (status === "expired") {
        coupons = coupons.filter(c => c.status === "expired" || new Date(c.expiryDate) <= now);
      } else if (status === "disabled") {
        coupons = coupons.filter(c => c.status === "disabled");
      }
    }
    // Sort by creation date descending
    coupons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const total = coupons.length;
    const start = (page - 1) * limit;
    const paginated = coupons.slice(start, start + limit);
    return { coupons: paginated, total, page, limit };
  },

  // Get coupon by ID
  getCoupon: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const coupons = loadCoupons();
    return coupons.find(c => c.id === id) || null;
  },

  // Create a new coupon
  createCoupon: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const coupons = loadCoupons();
    const newCoupon = {
      id: generateId(),
      ...data,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      status: data.status || "active",
    };
    coupons.unshift(newCoupon);
    saveCoupons(coupons);
    toast.success("Coupon created successfully");
    return newCoupon;
  },

  // Update a coupon
  updateCoupon: async (id, updates) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const coupons = loadCoupons();
    const index = coupons.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Coupon not found");
    coupons[index] = { ...coupons[index], ...updates };
    saveCoupons(coupons);
    toast.success("Coupon updated");
    return coupons[index];
  },

  // Delete a coupon
  deleteCoupon: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let coupons = loadCoupons();
    coupons = coupons.filter(c => c.id !== id);
    saveCoupons(coupons);
    toast.success("Coupon deleted");
  },

  // Toggle status (active/disabled)
  toggleStatus: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const coupons = loadCoupons();
    const coupon = coupons.find(c => c.id === id);
    if (!coupon) throw new Error("Coupon not found");
    coupon.status = coupon.status === "active" ? "disabled" : "active";
    saveCoupons(coupons);
    toast.success(`Coupon ${coupon.status === "active" ? "activated" : "disabled"}`);
    return coupon;
  },

  // Get stats for dashboard summary
  getStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const coupons = loadCoupons();
    const now = new Date();
    const total = coupons.length;
    const active = coupons.filter(c => c.status === "active" && new Date(c.expiryDate) > now).length;
    const expired = coupons.filter(c => c.status === "expired" || new Date(c.expiryDate) <= now).length;
    const disabled = coupons.filter(c => c.status === "disabled").length;
    const totalUsage = coupons.reduce((sum, c) => sum + (c.usageCount || 0), 0);
    return { total, active, expired, disabled, totalUsage };
  },
};