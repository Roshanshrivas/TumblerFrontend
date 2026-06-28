// src/pages/admin/services/productService.js
import toast from "react-hot-toast";

const STORAGE_KEY = "adminProducts";

// Mock product data
const defaultProducts = [
  {
    id: 1,
    name: "Matte Black 24oz",
    category: "Insulated",
    price: 1299,
    stock: 45,
    status: "Active",
    color: "Black",
    description: "Premium matte black tumbler with vacuum insulation. Keeps drinks hot for 12 hours.",
    image: "https://images.unsplash.com/photo-1590736969951-ea1251f2f0d2?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Royal Purple 24oz",
    category: "Travel",
    price: 1499,
    stock: 32,
    status: "Active",
    color: "Purple",
    description: "Elegant purple tumbler perfect for travel. Includes spill-proof lid.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-16T14:20:00Z"
  },
  {
    id: 3,
    name: "Sky Blue 24oz",
    category: "Coffee",
    price: 1099,
    stock: 8,
    status: "Active",
    color: "Blue",
    description: "Beautiful sky blue tumbler ideal for your daily coffee.",
    image: "https://images.unsplash.com/photo-1583705396171-3e5d82cf0ce4?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-17T09:15:00Z"
  },
  {
    id: 4,
    name: "Custom Name Tumbler",
    category: "Sports",
    price: 1999,
    stock: 15,
    status: "Active",
    color: "White",
    description: "Personalized tumbler with custom name engraving. Great gift idea!",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-18T16:45:00Z"
  },
  {
    id: 5,
    name: "Insulated Coffee Mug",
    category: "Coffee",
    price: 899,
    stock: 0,
    status: "Active",
    color: "Silver",
    description: "Classic insulated coffee mug with secure lid.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-19T11:00:00Z"
  },
  {
    id: 6,
    name: "Travel Tumbler 20oz",
    category: "Travel",
    price: 1199,
    stock: 28,
    status: "Draft",
    color: "Green",
    description: "Compact travel tumbler perfect for on-the-go.",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop",
    createdAt: "2026-05-20T08:30:00Z"
  },
];

// Load from localStorage or init
const loadProducts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return defaultProducts;
};

const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  fetchProducts: async ({ page = 1, limit = 10, search = "", tab = "all", filters = {} }) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    let products = loadProducts();
    
    // Filter by tab
    if (tab === "active") {
      products = products.filter(p => p.status === "Active");
    } else if (tab === "draft") {
      products = products.filter(p => p.status === "Draft");
    } else if (tab === "outofstock") {
      products = products.filter(p => p.stock === 0);
    }
    
    // Search
    if (search) {
      products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    // Additional filters
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.status) {
      products = products.filter(p => p.status === filters.status);
    }
    if (filters.minPrice) {
      products = products.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    const total = products.length;
    const start = (page - 1) * limit;
    const paginated = products.slice(start, start + limit);
    return { products: paginated, total };
  },

  fetchAllFiltered: async ({ search = "", tab = "all", filters = {} }) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    let products = loadProducts();
    if (tab === "active") products = products.filter(p => p.status === "Active");
    else if (tab === "draft") products = products.filter(p => p.status === "Draft");
    else if (tab === "outofstock") products = products.filter(p => p.stock === 0);
    if (search) products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (filters.category) products = products.filter(p => p.category === filters.category);
    if (filters.status) products = products.filter(p => p.status === filters.status);
    return products;
  },

  getProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = loadProducts();
    const product = products.find(p => p.id === parseInt(id));
    if (!product) throw new Error("Product not found");
    return product;
  },

  addProduct: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = loadProducts();
    const newProduct = {
      id: Date.now(),
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    saveProducts(products);
    toast.success("Product added");
    return newProduct;
  },

  updateProduct: async ({ id, ...updates }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = loadProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error("Product not found");
    products[index] = {
      ...products[index],
      ...updates,
      price: parseFloat(updates.price) || products[index].price,
      stock: parseInt(updates.stock) || products[index].stock,
    };
    saveProducts(products);
    toast.success("Product updated");
    return products[index];
  },

  deleteProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let products = loadProducts();
    products = products.filter(p => p.id !== parseInt(id));
    saveProducts(products);
    toast.success("Product deleted");
  },
};