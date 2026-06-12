// src/services/orderService.js
import toast from "react-hot-toast";

let mockOrders = [
  {
    id: "ORD1256",
    customer: "John Smith",
    email: "johnsmith@gmail.com",
    date: "May 18, 2025",
    time: "11:30 AM",
    total: 1299,
    status: "Delivered",
    fulfillmentStatus: "Delivered",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    items: [
      {
        name: "Matte Black 24oz",
        quantity: 1,
        price: 600,
        customizations: {
          text: "Happy Birthday Mom",
          font: "Poppins",
          textColor: "#ff0000"
        }
      }
    ],
    shippingAddress: "123 Main St, Mumbai",
    trackingNumber: "TRK123456",
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: true,   // ← because it has customizations
  },
  {
    id: "ORD1255",
    customer: "Emily Johnson",
    email: "emily.johnson@gmail.com",
    date: "May 18, 2025",
    time: "10:15 AM",
    total: 2598,
    status: "Processing",
    fulfillmentStatus: "Processing",
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    items: [
      { name: "Royal Purple 24oz", quantity: 2, price: 600 },
      { name: "Coral Red 24oz", quantity: 1, price: 600 },
    ],
    shippingAddress: "456 Oak Ave, Delhi",
    trackingNumber: null,
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: false,
  },
  {
    id: "ORD1254",
    customer: "Michael Brown",
    email: "michael.brown@gmail.com",
    date: "May 18, 2025",
    time: "09:45 AM",
    total: 1899,
    status: "Shipped",
    fulfillmentStatus: "Shipped",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    items: [{ name: "Sky Blue 24oz", quantity: 3, price: 600 }],
    shippingAddress: "789 Pine Rd, Bangalore",
    trackingNumber: "TRK789012",
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: false,
  },
  {
    id: "ORD1253",
    customer: "Sarah Davis",
    email: "sarah.davis@gmail.com",
    date: "May 17, 2025",
    time: "07:10 PM",
    total: 1499,
    status: "Cancelled",
    fulfillmentStatus: "Cancelled",
    paymentMethod: "UPI",
    paymentStatus: "Unpaid",
    items: [{ name: "Custom Name Tumbler", quantity: 1, price: 1499 }],
    shippingAddress: "101 Elm St, Chennai",
    trackingNumber: null,
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: false,
  },
  {
    id: "ORD1252",
    customer: "David Wilson",
    email: "david.wilson@gmail.com",
    date: "May 17, 2025",
    time: "06:30 PM",
    total: 1199,
    status: "Pending",
    fulfillmentStatus: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Unpaid",
    items: [
      { name: "Kids Sipper Bottle", quantity: 1, price: 899 },
      { name: "Stainless Steel Straw", quantity: 2, price: 150 },
    ],
    shippingAddress: "202 Birch Ln, Hyderabad",
    trackingNumber: null,
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: false,
  },
  {
    id: "ORD1251",
    customer: "James Taylor",
    email: "james.taylor@gmail.com",
    date: "May 16, 2025",
    time: "05:25 PM",
    total: 799,
    status: "Delivered",
    fulfillmentStatus: "Delivered",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    items: [{ name: "Insulated Water Bottle", quantity: 1, price: 799 }],
    shippingAddress: "303 Cedar Way, Pune",
    trackingNumber: "TRK998877",
    products: [
      {
        image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779963032/blacktumbler_dbd4a2.png",
      },
    ],
    hasCustomization: false,
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

export const orderService = {
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

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customer.toLowerCase().includes(search.toLowerCase()) ||
          o.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Order status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    // Payment status filter (if your orders store this)
    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter((o) => o.paymentStatus === paymentStatusFilter);
    }

    // Fulfillment status filter
    if (fulfillmentFilter !== "all") {
      filtered = filtered.filter((o) => o.fulfillmentStatus === fulfillmentFilter);
    }

    // Date range filter
    if (startDate || endDate) {
      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.date);
        if (startDate && orderDate < startDate) return false;
        if (endDate && orderDate > endDate) return false;
        return true;
      });
    }

    // Order type filter (custom / standard / all)
    if (orderType === "custom") {
      filtered = filtered.filter((o) => o.hasCustomization === true);
    }
    if (orderType === "standard") {
      filtered = filtered.filter((o) => o.hasCustomization === false);
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    return { orders: paginated, total, page, limit };
  },

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
    if (newStatus === "Delivered" && order.paymentMethod === "COD")
      order.paymentStatus = "Paid";
    toast.success(`Order ${id} status updated to ${newStatus}`);
    return order;
  },

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

  getOrderById: async (id) => mockOrders.find((o) => o.id === id) || null,

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
    const refunds =
      mockOrders.filter((o) => o.status === "Returned").reduce((sum, o) => sum + o.total, 0) +
      48760; // mock extra refunds
    const refundsGrowth = -3.2;
    const avgOrderValue = total ? totalRevenue / total : 0;
    const totalCustomers = 1256; // mock
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

  fetchAllOrders: async ({
    search = "",
    statusFilter = "all",
    paymentStatusFilter = "all",
    fulfillmentFilter = "all",
    startDate = null,
    endDate = null,
    orderType = "all",
  } = {}) => {
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
    if (startDate || endDate) {
      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.date);
        if (startDate && orderDate < startDate) return false;
        if (endDate && orderDate > endDate) return false;
        return true;
      });
    }
    if (orderType === "custom") {
      filtered = filtered.filter((o) => o.hasCustomization === true);
    }
    if (orderType === "standard") {
      filtered = filtered.filter((o) => o.hasCustomization === false);
    }
    return filtered;
  },
};