// src/services/customProductService.js
import toast from "react-hot-toast";

// Helper functions (simulate API delay)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for customizable products
let customProducts = [
  {
    id: "prod_1",
    name: "Matte Black Tumbler",
    basePrice: 1224,
    color: "#1a1a1a",
    mainImage: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
    customization: {
      text: { enabled: true, maxLength: 20, defaultText: "Your Name" },
      logo: { enabled: true, maxFileSize: 2, allowedFormats: ["png","jpg"] },
      font: { enabled: true, options: ["Poppins", "Arial", "Brush Script MT"] }
    }
  },
  {
    id: "prod_2",
    name: "Royal Purple Tumbler",
    basePrice: 1024,
    color: "#6a0dad",
    mainImage: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963036/tumblerorangee_ijh3os.png",
    customization: {
      text: { enabled: true, maxLength: 20, defaultText: "Your Name" },
      logo: { enabled: false },
      font: { enabled: true, options: ["Poppins", "Arial"] }
    }
  },
  {
    id: "prod_3",
    name: "Royal Purple Tumbler",
    basePrice: 1024,
    color: "#6a0dad",
    mainImage: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963036/tumblerorangee_ijh3os.png",
    customization: {
      text: { enabled: true, maxLength: 20, defaultText: "Your Name" },
      logo: { enabled: false },
      font: { enabled: true, options: ["Poppins", "Arial"] }
    }
  },
  {
    id: "prod_4",
    name: "Royal Purple Tumbler",
    basePrice: 1024,
    color: "#6a0dad",
    mainImage: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963036/tumblerorangee_ijh3os.png",
    customization: {
      text: { enabled: true, maxLength: 20, defaultText: "Your Name" },
      logo: { enabled: false },
      font: { enabled: true, options: ["Poppins", "Arial"] }
    }
  }
];

export const customProductService = {
  fetchCustomProducts: async () => {
    await delay(300);
    return [...customProducts];   // return a copy
  },

  getCustomProductById: async (id) => {
    await delay(200);
    return customProducts.find(p => p.id === id) || null;
  },

  createCustomProduct: async (productData) => {
    await delay(500);
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...productData,
      basePrice: parseFloat(productData.basePrice)
    };
    customProducts.push(newProduct);
    toast.success("Custom product created");
    return newProduct;
  },

  updateCustomProduct: async (id, productData) => {
    await delay(500);
    const index = customProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    customProducts[index] = { ...customProducts[index], ...productData, basePrice: parseFloat(productData.basePrice) };
    toast.success("Custom product updated");
    return customProducts[index];
  },

  deleteCustomProduct: async (id) => {
    await delay(500);
    const index = customProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    customProducts.splice(index, 1);
    toast.success("Custom product deleted");
    return id;
  }
};