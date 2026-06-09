// src/pages/admin/services/productService.js
import toast from "react-hot-toast";

// Mock data – replace with real API calls
let mockProducts = [
  { id: 1, name: "Matte Black 24oz", price: 600, stock: 45, category: "Insulated", status: "Active", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg", color: "Black", createdAt: "2025-05-18" },
  { id: 2, name: "Royal Purple 24oz", price: 600, stock: 32, category: "Travel", status: "Active", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg", color: "Purple", createdAt: "2025-05-18" },
  { id: 3, name: "Sky Blue 24oz", price: 600, stock: 18, category: "Coffee", status: "Active", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg", color: "Blue", createdAt: "2025-05-18" },
  { id: 4, name: "Coral Red 24oz", price: 600, stock: 5, category: "Insulated", status: "Active", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg", color: "Red", createdAt: "2025-05-18" },
  { id: 5, name: "Olive Green 24oz", price: 600, stock: 0, category: "Sports", status: "Draft", image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg", color: "Green", createdAt: "2025-05-18" },
];

const applyFilters = (products, { search, tab, filters }) => {
  let filtered = [...products];
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (tab === "active") filtered = filtered.filter(p => p.stock > 10);
  if (tab === "out") filtered = filtered.filter(p => p.stock === 0);
  if (tab === "draft") filtered = filtered.filter(p => p.status === "Draft");
  if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
  if (filters.status) filtered = filtered.filter(p => p.status === filters.status);
  if (filters.minPrice) filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
  return filtered;
};

export const productService = {
  fetchProducts: async ({ page = 1, limit = 10, search = "", tab = "all", filters = {} } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const filtered = applyFilters(mockProducts, { search, tab, filters });
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return { products: paginated, total, page, limit };
  },

  fetchAllFiltered: async ({ search = "", tab = "all", filters = {} } = {}) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return applyFilters(mockProducts, { search, tab, filters });
  },

  addProduct: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct = { id: Date.now(), ...product, status: "Active", createdAt: new Date().toISOString().slice(0,10) };
    mockProducts.push(newProduct);
    toast.success("Product added");
    return newProduct;
  },

  updateProduct: async (product) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProducts.findIndex(p => p.id === product.id);
    if (index !== -1) mockProducts[index] = { ...mockProducts[index], ...product };
    toast.success("Product updated");
    return product;
  },

  deleteProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockProducts = mockProducts.filter(p => p.id !== id);
    toast.success("Product deleted");
    return id;
  },
};