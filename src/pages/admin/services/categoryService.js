// src/pages/admin/services/categoryService.js
import toast from "react-hot-toast";

let mockCategories = [
  { id: 1, name: "Tumblers", slug: "tumblers", description: "Insulated tumblers for hot & cold beverages – perfect for daily use, keeping drinks at ideal temperature for hours. Ideal for home, office, and travel.", products: 45, status: "Active", createdAt: "2025-05-18", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_45_33_AM_vsusu1.png" },
  { id: 2, name: "Mugs", slug: "mugs", description: "Stylish mugs for everyday use – ceramic, stainless steel, and insulated options.", products: 32, status: "Active", createdAt: "2025-05-17", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188926/categrytwo-removebg-preview_xci0l8.png" },
  { id: 3, name: "Bottles", slug: "bottles", description: "Water bottles for sports & travel – leak-proof, BPA-free, and durable.", products: 20, status: "Active", createdAt: "2025-05-16", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188925/boottle-removebg-preview_irowts.png" },
  { id: 4, name: "Kids", slug: "kids", description: "Fun and safe drinkware for kids – colourful, unbreakable designs.", products: 15, status: "Active", createdAt: "2025-05-15", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188734/bottle-Photoroom_pqzvhc.png" },
  { id: 5, name: "Travel", slug: "travel", description: "Travel-friendly drinkware – compact, spill-resistant, cup-holder friendly.", products: 8, status: "Active", createdAt: "2025-05-14", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1780121820/ChatGPT_Image_May_30_2026_11_27_35_AM_usdykk.png" },
  { id: 6, name: "Coffee", slug: "coffee", description: "Perfect mugs for coffee lovers – temperature retention, stylish designs.", products: 25, status: "Active", createdAt: "2025-05-13", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779968285/ChatGPT_Image_May_28_2026_05_07_19_PM_kvbij1.png" },
  { id: 7, name: "Accessories", slug: "accessories", description: "Lids, straws, and other accessories – compatible with all tumblers.", products: 11, status: "Active", createdAt: "2025-05-12", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779189010/imgi_1143_8901372268703_3-removebg-preview_nnm2vx.png" },
];

export const categoryService = {
  fetchCategories: async ({ page = 1, limit = 10, search = "" } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    let filtered = [...mockCategories];
    if (search) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    }
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return { categories: paginated, total, page, limit };
  },

  addCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCategory = { 
      id: Date.now(), 
      ...category, 
      createdAt: new Date().toISOString().slice(0,10),
      image: category.image || "https://via.placeholder.com/50?text=No+Image"
    };
    mockCategories.push(newCategory);
    toast.success("Category added");
    return newCategory;
  },

  updateCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockCategories.findIndex(c => c.id === category.id);
    if (index !== -1) mockCategories[index] = { ...mockCategories[index], ...category };
    toast.success("Category updated");
    return category;
  },

  deleteCategory: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCategories = mockCategories.filter(c => c.id !== id);
    toast.success("Category deleted");
    return id;
  },

  // Bulk delete
  bulkDeleteCategories: async (ids) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockCategories = mockCategories.filter(c => !ids.includes(c.id));
    toast.success(`${ids.length} categories deleted`);
    return ids;
  },
};