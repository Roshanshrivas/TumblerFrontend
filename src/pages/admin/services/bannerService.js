// src/services/bannerService.js
import toast from "react-hot-toast";

const STORAGE_KEY = "adminBanners";

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

// Load banners from localStorage
const loadBanners = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save banners to localStorage
const saveBanners = (banners) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
};

// Mock data (default banners)
const defaultBanners = [
  {
    id: generateId(),
    title: "Summer Sale 2026",
    subtitle: "Up to 50% off on all tumblers",
    image: "https://picsum.photos/seed/summer/1200/400",
    link: "/products?category=summer",
    position: "homepage",
    status: "active",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    createdAt: new Date().toISOString(),
    priority: 1,
  },
  {
    id: generateId(),
    title: "New Arrivals",
    subtitle: "Explore our latest collection",
    image: "https://picsum.photos/seed/new/1200/400",
    link: "/products?sort=newest",
    position: "homepage",
    status: "active",
    startDate: "2026-06-15",
    endDate: "2026-12-31",
    createdAt: new Date().toISOString(),
    priority: 2,
  },
  {
    id: generateId(),
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
    image: "https://picsum.photos/seed/shipping/1200/400",
    link: "/products",
    position: "category",
    status: "scheduled",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    createdAt: new Date().toISOString(),
    priority: 3,
  },
];

// Initialize with default data if empty
const initializeBanners = () => {
  const existing = loadBanners();
  if (existing.length === 0) {
    saveBanners(defaultBanners);
  }
};
initializeBanners();

export const bannerService = {
  // Fetch banners with filters & pagination
  fetchBanners: async ({ search = "", status = "all", position = "all", page = 1, limit = 10 } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let banners = loadBanners();
    if (search) {
      const s = search.toLowerCase();
      banners = banners.filter(b => 
        b.title.toLowerCase().includes(s) || 
        b.subtitle?.toLowerCase().includes(s) ||
        b.link?.toLowerCase().includes(s)
      );
    }
    if (status !== "all") {
      const now = new Date();
      if (status === "active") {
        banners = banners.filter(b => b.status === "active" && new Date(b.endDate) >= now);
      } else if (status === "expired") {
        banners = banners.filter(b => b.status === "expired" || new Date(b.endDate) < now);
      } else if (status === "scheduled") {
        banners = banners.filter(b => b.status === "scheduled" || (b.status === "active" && new Date(b.startDate) > now));
      } else if (status === "inactive") {
        banners = banners.filter(b => b.status === "inactive");
      }
    }
    if (position !== "all") {
      banners = banners.filter(b => b.position === position);
    }
    // Sort by priority (ascending)
    banners.sort((a, b) => (a.priority || 999) - (b.priority || 999));
    const total = banners.length;
    const start = (page - 1) * limit;
    const paginated = banners.slice(start, start + limit);
    return { banners: paginated, total, page, limit };
  },

  // Get single banner
  getBanner: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const banners = loadBanners();
    return banners.find(b => b.id === id) || null;
  },

  // Create banner
  createBanner: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const banners = loadBanners();
    const newBanner = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      priority: banners.length + 1,
    };
    banners.push(newBanner);
    saveBanners(banners);
    toast.success("Banner created successfully");
    return newBanner;
  },

  // Update banner
  updateBanner: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const banners = loadBanners();
    const index = banners.findIndex(b => b.id === id);
    if (index === -1) throw new Error("Banner not found");
    banners[index] = { ...banners[index], ...updates };
    saveBanners(banners);
    toast.success("Banner updated");
    return banners[index];
  },

  // Delete banner
  deleteBanner: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let banners = loadBanners();
    banners = banners.filter(b => b.id !== id);
    saveBanners(banners);
    toast.success("Banner deleted");
  },

  // Toggle status
  toggleStatus: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const banners = loadBanners();
    const banner = banners.find(b => b.id === id);
    if (!banner) throw new Error("Banner not found");
    const newStatus = banner.status === "active" ? "inactive" : "active";
    banner.status = newStatus;
    saveBanners(banners);
    toast.success(`Banner ${newStatus === "active" ? "activated" : "deactivated"}`);
    return banner;
  },

  // Reorder banners (update priority)
  reorderBanners: async (orderedIds) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const banners = loadBanners();
    orderedIds.forEach((id, index) => {
      const banner = banners.find(b => b.id === id);
      if (banner) banner.priority = index + 1;
    });
    saveBanners(banners);
    toast.success("Banner order updated");
    return banners;
  },

  // Get stats
  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const banners = loadBanners();
    const now = new Date();
    const total = banners.length;
    const active = banners.filter(b => b.status === "active" && new Date(b.endDate) >= now).length;
    const scheduled = banners.filter(b => b.status === "scheduled" || (b.status === "active" && new Date(b.startDate) > now)).length;
    const expired = banners.filter(b => b.status === "expired" || new Date(b.endDate) < now).length;
    const inactive = banners.filter(b => b.status === "inactive").length;
    return { total, active, scheduled, expired, inactive };
  },
};