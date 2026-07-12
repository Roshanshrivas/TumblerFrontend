// src/services/addressService.js
import toast from "react-hot-toast";

// ─── Mock Data ────────────────────────────────────
let mockAddresses = [
  {
    id: "addr_1",
    label: "Home",
    fullName: 'John Doe',
    phoneNumber: '+91 98765 43210',
    address: "123 Main Street",
    city: "Kolkata",
    state: "West Bengal",
    pinCode: "700001",
    country: "India",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Office",
    fullName: 'John Doe',
    phoneNumber: '+91 98765 43210',
    address: "456 Tech Park, Sector 62",
    city: "Noida",
    state: "Uttar Pradesh",
    pinCode: "201301",
    country: "India",
    isDefault: false,
  },
  {
    id: "addr_3",
    label: "Other",
    fullName: 'John Doe',
    phoneNumber: '+91 98765 43210',
    address: "789 Lake View Apartments",
    city: "Bangalore",
    state: "Karnataka",
    pinCode: "560001",
    country: "India",
    isDefault: false,
  },
];

// ─── Helper to generate new ID ────────────────────
const generateId = () => `addr_${Date.now()}`;

// ─── Service ──────────────────────────────────────
export const addressService = {
  // Fetch all addresses for the current user
  fetchAddresses: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...mockAddresses];
  },

  // Get a single address by ID
  getAddressById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const address = mockAddresses.find((a) => a.id === id);
    if (!address) throw new Error("Address not found");
    return { ...address };
  },

  // Create a new address
  createAddress: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newAddress = {
      id: generateId(),
      ...data,
    };
    // If this is set as default, update others
    if (newAddress.isDefault) {
      mockAddresses = mockAddresses.map((a) => ({
        ...a,
        isDefault: false,
      }));
    }
    mockAddresses.push(newAddress);
    toast.success("Address added successfully");
    return newAddress;
  },

  // Update an existing address
  updateAddress: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let index = mockAddresses.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Address not found");
    const updated = { ...mockAddresses[index], ...data };
    // If this is set as default, update others
    if (updated.isDefault) {
      mockAddresses = mockAddresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }));
    }
    mockAddresses[index] = updated;
    toast.success("Address updated successfully");
    return updated;
  },

  // Delete an address
  deleteAddress: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockAddresses.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Address not found");
    const isDefault = mockAddresses[index].isDefault;
    mockAddresses.splice(index, 1);
    // If deleted address was default, set the first remaining as default (if any)
    if (isDefault && mockAddresses.length > 0) {
      mockAddresses[0].isDefault = true;
    }
    toast.success("Address deleted successfully");
  },

  // Set a specific address as default
  setDefaultAddress: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const address = mockAddresses.find((a) => a.id === id);
    if (!address) throw new Error("Address not found");
    mockAddresses = mockAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    toast.success("Default address updated");
    return { ...address, isDefault: true };
  },
};