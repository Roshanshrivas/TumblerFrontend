// src/pages/admin/services/dashboardService.js
export const dashboardService = {
  fetchDashboardData: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalSales: 1245890,
      totalOrders: 1842,
      totalCustomers: 1256,
      avgOrderValue: 675,
      totalReviews: 568,
      salesGrowth: 18.6,
      ordersGrowth: 14.2,
      customersGrowth: 12.5,
      avgOrderGrowth: 8.4,
      reviewsGrowth: 9.7,
      salesChart: [
        { day: "Mon", thisWeek: 145000, lastWeek: 128000 },
        { day: "Tue", thisWeek: 178000, lastWeek: 152000 },
        { day: "Wed", thisWeek: 162000, lastWeek: 148000 },
        { day: "Thu", thisWeek: 198000, lastWeek: 165000 },
        { day: "Fri", thisWeek: 245000, lastWeek: 210000 },
        { day: "Sat", thisWeek: 289000, lastWeek: 242000 },
        { day: "Sun", thisWeek: 312000, lastWeek: 275000 },
      ],
      recentOrders: [
  {
    id: "ORD1256",
    customer: "John Smith",
    status: "Delivered",
    total: 1299,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188733/categryone-Photoroom_odwr1b.png",
  },
  {
    id: "ORD1255",
    customer: "Emily Johnson",
    status: "Processing",
    total: 2498,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188926/categrytwo-removebg-preview_xci0l8.png",
  },
  {
    id: "ORD1254",
    customer: "Michael Brown",
    status: "Shipped",
    total: 1899,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188925/boottle-removebg-preview_irowts.png",
  },
  {
    id: "ORD1253",
    customer: "Sarah Davis",
    status: "Delivered",
    total: 899,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779188734/bottle-Photoroom_pqzvhc.png",
  },
  {
    id: "ORD1252",
    customer: "David Wilson",
    status: "Cancelled",
    total: 1599,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779189010/imgi_1143_8901372268703_3-removebg-preview_nnm2vx.png",
  },
],
      topProducts: [
        { name: "Premium Insulated Tumblers", sold: 458, revenue: 245680 },
        { name: "Custom Name Tumbler", sold: 332, revenue: 162140 },
        { name: "Stainless Steel Coffee Mug", sold: 278, revenue: 111220 },
        { name: "Sports Water Bottle", sold: 215, revenue: 96450 },
        { name: "Kids Sipper Bottle", sold: 198, revenue: 72960 },
      ],
      orderStatus: [
        { name: "Delivered", value: 924, color: "#10B981" },
        { name: "Processing", value: 386, color: "#F59E0B" },
        { name: "Shipped", value: 312, color: "#3B82F6" },
        { name: "Cancelled", value: 120, color: "#EF4444" },
        { name: "Pending", value: 100, color: "#8B5CF6" },
      ],
      storeAnalytics: {
        visitors: 18742,
        visitorsGrowth: 16.3,
        conversionRate: 3.62,
        conversionGrowth: 5.5,
        totalRevenue: 1245890,
        revenueGrowth: 18.6,
        newCustomers: 256,
        newCustomersGrowth: 11.2,
      },
      recentActivities: [
        { action: "New order #ORD1256", time: "2 minutes ago", icon: "order" },
        { action: 'Product "Custom Tumbler" updated by Admin', time: "1 hour ago", icon: "product" },
        { action: "New customer registered – Emily Johnson", time: "3 hours ago", icon: "customer" },
        { action: "Order #ORD1255 marked as shipped", time: "5 hours ago", icon: "shipped" },
        { action: "New review received for Premium Tumbler", time: "1 day ago", icon: "review" },
      ],
    };
  },
};