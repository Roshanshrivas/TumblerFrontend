// src/pages/admin/services/reviewService.js
import toast from "react-hot-toast";

const STORAGE_KEY = "adminReviews";

// Mock initial data with images and SKUs
const defaultReviews = [
  {
    id: 1,
    product: "Matte Black Tumbler",
    productImage: "https://placehold.co/400x400/2d2d2d/ffffff?text=Matte+Black",
    sku: "TMB-MBLK-500",
    customer: "Rohit Sharma",
    email: "rohit@example.com",
    rating: 5,
    title: "Amazing quality!",
    comment: "Amazing quality and keeps my coffee hot for hours!",
    status: "approved",
    date: "2025-05-18",
    time: "10:30 AM",
    reply: null,
    helpful: 12,
    notHelpful: 2,
  },
  {
    id: 2,
    product: "Arctic White Tumbler",
    productImage: "https://placehold.co/400x400/f0f0f0/333333?text=Arctic+White",
    sku: "TMB-AWHT-500",
    customer: "Priya Patel",
    email: "priya@example.com",
    rating: 4,
    title: "Good quality but pricey",
    comment: "Good quality but a bit expensive.",
    status: "pending",
    date: "2025-05-18",
    time: "09:15 AM",
    reply: null,
    helpful: 8,
    notHelpful: 1,
  },
  {
    id: 3,
    product: "Blush Pink Tumbler",
    productImage: "https://placehold.co/400x400/f8d7da/880000?text=Blush+Pink",
    sku: "TMB-BPNK-500",
    customer: "Amit Verma",
    email: "amit@example.com",
    rating: 5,
    title: "Love the color!",
    comment: "Love the color and design. Highly recommended!",
    status: "approved",
    date: "2025-05-17",
    time: "08:45 PM",
    reply: null,
    helpful: 20,
    notHelpful: 0,
  },
  {
    id: 4,
    product: "Navy Blue Tumbler",
    productImage: "https://placehold.co/400x400/1a237e/ffffff?text=Navy+Blue",
    sku: "TMB-NBLU-500",
    customer: "Sneha Reddy",
    email: "sneha@example.com",
    rating: 3,
    title: "Not very durable",
    comment: "It's okay, not very durable.",
    status: "rejected",
    date: "2025-05-17",
    time: "06:20 PM",
    reply: null,
    helpful: 5,
    notHelpful: 3,
  },
  {
    id: 5,
    product: "Olive Green Tumbler",
    productImage: "https://placehold.co/400x400/4a7c59/ffffff?text=Olive+Green",
    sku: "TMB-OLIV-500",
    customer: "Karan Mehta",
    email: "karan@example.com",
    rating: 5,
    title: "Perfect for gym!",
    comment: "Perfect for gym and office use. Great product!",
    status: "approved",
    date: "2025-05-17",
    time: "05:10 PM",
    reply: null,
    helpful: 15,
    notHelpful: 1,
  },
  {
    id: 6,
    product: "Custom Design Tumbler",
    productImage: "https://placehold.co/400x400/ff6b00/ffffff?text=Custom",
    sku: "CD-TMB-500",
    customer: "Neha Singh",
    email: "neha@example.com",
    rating: 5,
    title: "Custom print perfect!",
    comment: "Custom print came out perfect. Very happy!",
    status: "approved",
    date: "2025-05-16",
    time: "11:35 AM",
    reply: null,
    helpful: 25,
    notHelpful: 0,
  },
  {
    id: 7,
    product: "Gradient Tumbler",
    productImage: "https://placehold.co/400x400/ff9a9e/fecfef?text=Gradient",
    sku: "TMB-GRAD-500",
    customer: "Vikas Singh",
    email: "vikas@example.com",
    rating: 4,
    title: "Nice product",
    comment: "Nice product. The lid could be better.",
    status: "pending",
    date: "2025-05-16",
    time: "09:50 AM",
    reply: null,
    helpful: 3,
    notHelpful: 2,
  },
  {
    id: 8,
    product: "Matte Black Tumbler",
    productImage: "https://placehold.co/400x400/2d2d2d/ffffff?text=Matte+Black",
    sku: "TMB-MBLK-600",
    customer: "Ananya Gupta",
    email: "ananya@example.com",
    rating: 5,
    title: "Best tumbler ever",
    comment: "Best tumbler ever. Keeps cold for 24 hours!",
    status: "approved",
    date: "2025-05-15",
    time: "03:20 PM",
    reply: null,
    helpful: 18,
    notHelpful: 0,
  },
];

// Load from localStorage or init
const loadReviews = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
  return defaultReviews;
};

const saveReviews = (reviews) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
};

export const reviewService = {
  fetchReviews: async ({ search = "", status = "all", rating = "all", page = 1, limit = 10 } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let reviews = loadReviews();

    if (search) {
      reviews = reviews.filter(r =>
        r.product.toLowerCase().includes(search.toLowerCase()) ||
        r.customer.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== "all") {
      reviews = reviews.filter(r => r.status === status);
    }
    if (rating !== "all") {
      reviews = reviews.filter(r => r.rating === parseInt(rating));
    }

    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    const total = reviews.length;
    const start = (page - 1) * limit;
    const paginated = reviews.slice(start, start + limit);
    return { reviews: paginated, total, page, limit };
  },

  fetchAllReviews: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return loadReviews();
  },

  getStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const reviews = loadReviews();
    const total = reviews.length;
    const pending = reviews.filter(r => r.status === "pending").length;
    const approved = reviews.filter(r => r.status === "approved").length;
    const rejected = reviews.filter(r => r.status === "rejected" || r.status === "flagged").length;
    const avgRating = total > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total) : 0;
    return { total, pending, approved, flagged: rejected, avgRating: parseFloat(avgRating.toFixed(1)) };
  },

  updateReview: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const reviews = loadReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) throw new Error("Review not found");
    reviews[index] = { ...reviews[index], ...updates };
    saveReviews(reviews);
    toast.success("Review updated");
    return reviews[index];
  },

  deleteReview: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let reviews = loadReviews();
    reviews = reviews.filter(r => r.id !== id);
    saveReviews(reviews);
    toast.success("Review deleted");
  },

  toggleStatus: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const reviews = loadReviews();
    const review = reviews.find(r => r.id === id);
    if (!review) throw new Error("Review not found");
    const statusMap = { pending: "approved", approved: "rejected", rejected: "pending", flagged: "pending" };
    review.status = statusMap[review.status] || "pending";
    saveReviews(reviews);
    toast.success(`Review ${review.status}`);
    return review;
  },

  replyReview: async (id, reply) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const reviews = loadReviews();
    const review = reviews.find(r => r.id === id);
    if (!review) throw new Error("Review not found");
    review.reply = reply;
    review.status = "approved";
    saveReviews(reviews);
    toast.success("Reply added");
    return review;
  },
};