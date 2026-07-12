// src/services/orderService.js
import toast from "react-hot-toast";

// ─── Mock Data ────────────────────────────────────
let mockOrders = [
  {
    _id: "ord_1",
    orderNumber: "ORD-ABC123",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    shippingAddress: {
      address: "123 Main St",
      city: "Kolkata",
      state: "West Bengal",
      pinCode: "700001",
      country: "India"
    },
    items: [
      { name: "Matte Black Tumbler", sku: "TMB-001", quantity: 2, price: 799, image:'https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg' },
      { name: "Stainless Straw", sku: "STR-002", quantity: 1, price: 199, image:'https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg' }
    ],
    subtotal: 1797,
    shipping: 50,
    tax: 0,
    discount: 0,
    total: 1847,
    paymentMethod: "COD",
    paymentStatus: "Unpaid",
    status: "Pending",
    fulfillmentStatus: "Pending",
    trackingNumber: "TRK-123456",
    createdAt: "2026-07-01T10:30:00.000Z",
    updatedAt: "2026-07-01T10:30:00.000Z"
  },
  {
    _id: "ord_2",
    orderNumber: "ORD-DEF456",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 87654 32109",
    shippingAddress: {
      address: "456 Oak Ave",
      city: "Delhi",
      state: "Delhi",
      pinCode: "110001",
      country: "India"
    },
    items: [
      { name: "Coral Pink Tumbler", sku: "TMB-002", quantity: 1, price: 899, image: 'https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg' }
    ],
    subtotal: 899,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 899,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Shipped",
    fulfillmentStatus: "Shipped",
    trackingNumber: "TRK-123456",
    createdAt: "2026-06-28T14:20:00.000Z",
    updatedAt: "2026-06-29T09:00:00.000Z"
  }
];

// ─── Service ──────────────────────────────────────
export const userOrderService = {
  // Fetch all orders for the current user
  fetchMyOrders: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // Return copy sorted by newest first
    return [...mockOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Get a single order by ID
  getOrderById: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = mockOrders.find(o => o._id === orderId);
    if (!order) throw new Error("Order not found");
    return { ...order };
  },

  // Cancel an order
  cancelOrder: async (orderId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = mockOrders.find(o => o._id === orderId);
    if (!order) throw new Error("Order not found");
    if (order.status !== "Pending" && order.status !== "Processing") {
      throw new Error("Order cannot be cancelled at this stage");
    }
    order.status = "Cancelled";
    order.cancellationReason = reason || "Customer requested cancellation";
    toast.success("Order cancelled successfully");
    return { ...order };
  }
};