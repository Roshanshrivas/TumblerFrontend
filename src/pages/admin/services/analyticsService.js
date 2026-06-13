// src/admin/services/analyticsService.js
import toast from "react-hot-toast";

// Helper: generate realistic daily data
const generateDailyData = (days = 30, baseValue, variance = 0.2) => {
  const data = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const value = Math.round(baseValue * (1 + (Math.random() - 0.5) * variance));
    data.push({ date: date.toISOString().slice(0, 10), value });
  }
  return data;
};

const rawDailyRevenue = generateDailyData(30, 18500, 0.25).map(d => ({ date: d.date, revenue: d.value }));
const rawDailyOrders = generateDailyData(30, 65, 0.2).map(d => ({ date: d.date, orders: d.value }));
const rawCustomerGrowth = generateDailyData(30, 22, 0.35).map(d => ({ date: d.date, newCustomers: d.value }));

const aggregateByPeriod = (data, filter, dateKey = "date", valueKey = "value") => {
  if (filter === "daily") return data.map(item => ({ period: item[dateKey], [valueKey]: item[valueKey] }));
  const grouped = {};
  data.forEach((item) => {
    const date = new Date(item[dateKey]);
    let period;
    if (filter === "weekly") {
      const weekNumber = Math.ceil(date.getDate() / 7);
      period = `${date.getFullYear()}-W${weekNumber}`;
    } else {
      period = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }
    grouped[period] = (grouped[period] || 0) + item[valueKey];
  });
  return Object.entries(grouped).map(([period, value]) => ({ period, [valueKey]: value }));
};

const filterByDateRange = (data, startDate, endDate, dateKey = "date") => {
  if (!startDate && !endDate) return data;
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  return data.filter(item => {
    const itemDate = new Date(item[dateKey]);
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
};

// Mock data for other sections
const mockSalesByChannel = [
  { name: "Website", value: 1250000 },
  { name: "Mobile App", value: 420000 },
  { name: "Facebook Ads", value: 120000 },
  { name: "Instagram", value: 52000 },
  { name: "Other", value: 0 },
];

const mockTopProductsWithCustomers = [
  { name: "Matte Black Tumbler", sales: 418400, units: 320, customers: 746890, image: "https://picsum.photos/id/20/40/40" },
  { name: "Arctio White Tumbler", sales: 312760, units: 245, customers: 312400, image: "https://picsum.photos/id/21/40/40" },
  { name: "Navy Blue Tumbler", sales: 281490, units: 210, customers: 132100, image: "https://picsum.photos/id/22/40/40" },
  { name: "Clive Green Tumbler", sales: 212040, units: 165, customers: 55500, image: "https://picsum.photos/id/23/40/40" },
  { name: "Blush Pink Tumbler", sales: 196340, units: 150, customers: 55500, image: "https://picsum.photos/id/24/40/40" },
];

const mockCategoryRevenue = [
  { category: "Tumblers", revenue: 1245890 },
  { category: "Bottles", revenue: 312000 },
  { category: "Accessories", revenue: 98400 },
];

const mockNewVsReturning = [
  { name: "New Customers", value: 842 },
  { name: "Returning Customers", value: 414 },
];

const mockFunnel = {
  totalVisitors: 24856,
  visitorsChange: 12.4,
  productViews: 18245,
  productViewsChange: 8.2,
  addToCart: 2845,
  addToCartChange: -2.1,
  checkoutInitiated: 1856,
  checkoutInitiatedChange: 5.6,
  checkoutCompleted: 1245,
  checkoutCompletedChange: 7.3,
};

const mockOrderStatus = [
  { name: "Delivered", value: 972 },
  { name: "Processing", value: 342 },
  { name: "Shipped", value: 288 },
  { name: "Pending", value: 128 },
  { name: "Cancelled", value: 112 },
];

const mockKpis = {
  totalRevenue: 1245890,
  revenueGrowth: 18.6,
  totalOrders: 1842,
  ordersGrowth: 12.5,
  avgOrderValue: 675,
  avgOrderGrowth: 8.3,
  totalCustomers: 1256,
  customersGrowth: 10.2,
  conversionRate: 3.24,
  conversionGrowth: 8.6,
  customerOrders: 972,
  customerOrdersGrowth: 14.8,
};

export const analyticsService = {
  fetchAnalyticsData: async ({ dateRange = {}, revenueFilter = "daily", ordersFilter = "daily", topProductsFilter = "weekly" }) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Apply date range filtering to revenue, orders, and customer growth
    let filteredRevenue = filterByDateRange(rawDailyRevenue, dateRange.start, dateRange.end);
    let filteredOrders = filterByDateRange(rawDailyOrders, dateRange.start, dateRange.end);
    let filteredCustomerGrowth = filterByDateRange(rawCustomerGrowth, dateRange.start, dateRange.end);

    const revenueData = aggregateByPeriod(filteredRevenue, revenueFilter, "date", "revenue");
    const ordersData = aggregateByPeriod(filteredOrders, ordersFilter, "date", "orders");

    let topProducts = [...mockTopProductsWithCustomers];
    if (topProductsFilter === "monthly") {
      topProducts = topProducts.map(p => ({ ...p, sales: p.sales * 2, units: p.units * 2, customers: p.customers * 2 }));
    } else if (topProductsFilter === "all") {
      topProducts = topProducts.map(p => ({ ...p, sales: p.sales * 3, units: p.units * 3, customers: p.customers * 3 }));
    }

    return {
      kpis: mockKpis,
      revenueData,
      ordersData,
      salesByChannel: mockSalesByChannel,
      topProducts,
      categoryRevenue: mockCategoryRevenue,
      customerGrowth: filteredCustomerGrowth, // now filtered and with realistic values
      newVsReturning: mockNewVsReturning,
      funnel: mockFunnel,
      orderStatus: mockOrderStatus,
    };
  },

  exportReport: async (format = "csv", dateRange) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const data = await analyticsService.fetchAnalyticsData({ dateRange });
    const revenueRows = data.revenueData.map(r => [r.period, r.revenue]);
    const ordersRows = data.ordersData.map(o => [o.period, o.orders]);
    const csvContent = [
      "Period,Revenue (₹)",
      ...revenueRows.map(r => r.join(",")),
      "",
      "Period,Orders",
      ...ordersRows.map(o => o.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported");
    return true;
  },
};