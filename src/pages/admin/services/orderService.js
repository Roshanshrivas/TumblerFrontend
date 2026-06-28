// src/services/orderService.js
import toast from "react-hot-toast";

let mockOrders = [
  {
    id: "ORD1256",
    customer: "John Smith",
    email: "johnsmith@gmail.com",
    phone: "+91 98765 43210",
    date: "May 18, 2025",
    time: "11:30 AM",
    total: 1299,
    status: "Delivered",
    fulfillmentStatus: "Delivered",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    shippingAddress: "123 Main St, Mumbai",
    trackingNumber: "TRK123456",
    hasCustomization: true,
    items: [
      {
        name: "Matte Black 24oz",
        quantity: 1,
        price: 600,
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
        sku: "TMB-001",
        customizations: {
          text: "Happy Birthday Mom",
          font: "Poppins",
          textColor: "#ff0000",
        },
      },
    ],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-18T11:30:00Z",
  },
  {
    id: "ORD1255",
    customer: "Emily Johnson",
    email: "emily.johnson@gmail.com",
    phone: "+91 87654 32109",
    date: "May 18, 2025",
    time: "10:15 AM",
    total: 2598,
    status: "Processing",
    fulfillmentStatus: "Processing",
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    shippingAddress: "456 Oak Ave, Delhi",
    trackingNumber: null,
    hasCustomization: false,
    items: [
      { name: "Royal Purple 24oz", quantity: 2, price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-002" },
      { name: "Coral Red 24oz", quantity: 1, price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-003" },
    ],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-18T10:15:00Z",
  },
  {
    id: "ORD1254",
    customer: "Michael Brown",
    email: "michael.brown@gmail.com",
    phone: "+91 76543 21098",
    date: "May 18, 2025",
    time: "09:45 AM",
    total: 1899,
    status: "Shipped",
    fulfillmentStatus: "Shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    shippingAddress: "789 Pine Rd, Bangalore",
    trackingNumber: "TRK789012",
    hasCustomization: false,
    items: [{ name: "Sky Blue 24oz", quantity: 3, price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-004" }],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-18T09:45:00Z",
  },
  {
    id: "ORD1253",
    customer: "Sarah Davis",
    email: "sarah.davis@gmail.com",
    phone: "+91 65432 10987",
    date: "May 17, 2025",
    time: "07:10 PM",
    total: 1499,
    status: "Cancelled",
    fulfillmentStatus: "Cancelled",
    paymentMethod: "UPI",
    paymentStatus: "Unpaid",
    shippingAddress: "101 Elm St, Chennai",
    trackingNumber: null,
    hasCustomization: false,
    items: [{ name: "Custom Name Tumbler", quantity: 1, price: 1499, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-005" }],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-17T19:10:00Z",
  },
  {
    id: "ORD1252",
    customer: "David Wilson",
    email: "david.wilson@gmail.com",
    phone: "+91 54321 09876",
    date: "May 17, 2025",
    time: "06:30 PM",
    total: 1199,
    status: "Pending",
    fulfillmentStatus: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Unpaid",
    shippingAddress: "202 Birch Ln, Hyderabad",
    trackingNumber: null,
    hasCustomization: false,
    items: [
      { name: "Kids Sipper Bottle", quantity: 1, price: 899, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-006" },
      { name: "Stainless Steel Straw", quantity: 2, price: 150, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-007" },
    ],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-17T18:30:00Z",
  },
  {
    id: "ORD1251",
    customer: "James Taylor",
    email: "james.taylor@gmail.com",
    phone: "+91 43210 98765",
    date: "May 16, 2025",
    time: "05:25 PM",
    total: 799,
    status: "Delivered",
    fulfillmentStatus: "Delivered",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    shippingAddress: "303 Cedar Way, Pune",
    trackingNumber: "TRK998877",
    hasCustomization: false,
    items: [{ name: "Insulated Water Bottle", quantity: 1, price: 799, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png", sku: "TMB-008" }],
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    createdAt: "2025-05-16T17:25:00Z",
  },
];

// Valid status transitions
const validTransitions = {
  Pending: ["Processing", "Cancelled"],
  Processing: ["Shipped", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: ["Returned"],
  Cancelled: [],
  Returned: [],
};

const generateId = () => {
  const last = mockOrders.length;
  const num = (last + 1).toString().padStart(4, "0");
  return `ORD${num}`;
};

export const orderService = {
  // ---------- Fetch with filters ----------
  fetchOrders: async ({
    page = 1,
    limit = 10,
    search = "",
    statusFilter = "all",
    paymentStatusFilter = "all",
    fulfillmentFilter = "all",
    startDate = null,
    endDate = null,
    orderType = "all",
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filtered = [...mockOrders];

    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter((o) => o.paymentStatus === paymentStatusFilter);
    }
    if (fulfillmentFilter !== "all") {
      filtered = filtered.filter((o) => o.fulfillmentStatus === fulfillmentFilter);
    }
    if (startDate) {
      filtered = filtered.filter((o) => new Date(o.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((o) => new Date(o.date) <= new Date(endDate));
    }
    if (orderType === "custom") {
      filtered = filtered.filter((o) => o.hasCustomization === true);
    } else if (orderType === "standard") {
      filtered = filtered.filter((o) => o.hasCustomization === false);
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return { orders: paginated, total, page, limit };
  },

  // ---------- Get single order ----------
  getOrder: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    return order;
  },

  // Alias for compatibility
  getOrderById: async (id) => orderService.getOrder(id),

  // ---------- Create order ----------
  createOrder: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newId = generateId();
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newOrder = {
      id: newId,
      ...data,
      date: dateStr,
      time: timeStr,
      createdAt: now.toISOString(),
      hasCustomization: data.items?.some((item) => item.customizations) || false,
      products: data.items?.map((item) => ({ image: item.image || null })) || [],
      trackingNumber: null,
    };
    mockOrders.unshift(newOrder);
    toast.success(`Order ${newId} created`);
    return newOrder;
  },

  // ---------- Update order (partial) ----------
  updateOrder: async ({ id, ...updates }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");

    // Prevent editing items after payment is made (production rule)
    if (order.paymentStatus === "Paid" && (updates.items || updates.total)) {
      toast.error("Cannot modify items or total after payment. Please issue a refund or create a new order.");
      return order;
    }

    Object.assign(order, updates);
    toast.success(`Order ${id} updated`);
    return order;
  },

  // ---------- Delete order ----------
  deleteOrder: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = mockOrders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error("Order not found");
    mockOrders.splice(index, 1);
    toast.success(`Order ${id} deleted`);
  },

  // ---------- Duplicate order ----------
  duplicateOrder: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const original = mockOrders.find((o) => o.id === id);
    if (!original) throw new Error("Order not found");
    const newId = generateId();
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const newOrder = {
      ...JSON.parse(JSON.stringify(original)),
      id: newId,
      date: dateStr,
      time: timeStr,
      createdAt: now.toISOString(),
      status: "Pending",
      fulfillmentStatus: "Pending",
      trackingNumber: null,
    };
    mockOrders.unshift(newOrder);
    toast.success(`Order ${newId} duplicated from ${id}`);
    return newOrder;
  },

  // ---------- Update status with validation ----------
  updateOrderStatus: async (id, newStatus, trackingNumber = null) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) {
      toast.error("Order not found");
      return null;
    }
    const allowed = validTransitions[order.status] || [];
    if (!allowed.includes(newStatus)) {
      toast.error(`Cannot change status from ${order.status} to ${newStatus}`);
      return null;
    }
    order.status = newStatus;
    order.fulfillmentStatus = newStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (newStatus === "Delivered" && order.paymentMethod === "COD") {
      order.paymentStatus = "Paid";
    }
    toast.success(`Order ${id} status updated to ${newStatus}`);
    return order;
  },

  // ---------- Mark payment as paid ----------
  markPaymentAsPaid: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const order = mockOrders.find((o) => o.id === id);
    if (!order) {
      toast.error("Order not found");
      return null;
    }
    if (order.paymentStatus === "Paid") {
      toast.error("Already paid");
      return null;
    }
    order.paymentStatus = "Paid";
    toast.success(`Payment for order ${id} marked as paid`);
    return order;
  },

  // ---------- Get order statistics ----------
  getOrderStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const total = mockOrders.length;
    const pending = mockOrders.filter((o) => o.status === "Pending").length;
    const processing = mockOrders.filter((o) => o.status === "Processing").length;
    const shipped = mockOrders.filter((o) => o.status === "Shipped").length;
    const delivered = mockOrders.filter((o) => o.status === "Delivered").length;
    const cancelled = mockOrders.filter((o) => o.status === "Cancelled").length;
    const totalRevenue = mockOrders.reduce(
      (sum, o) => sum + (o.paymentStatus === "Paid" ? o.total : 0),
      0
    );
    const refunds = mockOrders
      .filter((o) => o.status === "Returned")
      .reduce((sum, o) => sum + o.total, 0) + 48760;
    const refundsGrowth = -3.2;
    const avgOrderValue = total ? totalRevenue / total : 0;
    const totalCustomers = 1256;
    const customersGrowth = 10.2;
    const salesGrowth = 18.6;
    const avgOrderGrowth = 8.4;
    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
      totalRevenue,
      avgOrderValue,
      totalCustomers,
      salesGrowth,
      avgOrderGrowth,
      customersGrowth,
      refunds,
      refundsGrowth,
    };
  },

  // ---------- Fetch all orders for export ----------
  fetchAllOrders: async ({
    search = "",
    statusFilter = "all",
    paymentStatusFilter = "all",
    fulfillmentFilter = "all",
    startDate = null,
    endDate = null,
    orderType = "all",
  } = {}) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let filtered = [...mockOrders];
    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.id.includes(search) ||
          o.customer.includes(search) ||
          o.email.includes(search)
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter((o) => o.paymentStatus === paymentStatusFilter);
    }
    if (fulfillmentFilter !== "all") {
      filtered = filtered.filter((o) => o.fulfillmentStatus === fulfillmentFilter);
    }
    if (startDate) {
      filtered = filtered.filter((o) => new Date(o.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((o) => new Date(o.date) <= new Date(endDate));
    }
    if (orderType === "custom") {
      filtered = filtered.filter((o) => o.hasCustomization === true);
    } else if (orderType === "standard") {
      filtered = filtered.filter((o) => o.hasCustomization === false);
    }
    return filtered;
  },
};