import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const StoreAnalytics = ({ analytics, formatCurrency, itemVariants }) => (
  <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-all">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Store Analytics</h3>
    <div className="space-y-4">
      {[
        { label: "Visitors", value: analytics.visitors.toLocaleString(), growth: analytics.visitorsGrowth },
        { label: "Conversion Rate", value: `${analytics.conversionRate}%`, growth: analytics.conversionGrowth },
        { label: "Total Revenue", value: formatCurrency(analytics.totalRevenue), growth: analytics.revenueGrowth },
        { label: "New Customers", value: analytics.newCustomers, growth: analytics.newCustomersGrowth }
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold dark:text-white">{item.value}</p>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
            <TrendingUp size={14} /> {item.growth}%
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default StoreAnalytics;