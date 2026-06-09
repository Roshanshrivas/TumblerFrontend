import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const OrderStatusPie = ({ data, itemVariants }) => (
  <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-all">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Orders Status</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v} orders`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-4">
      {data.map((status, idx) => (
        <div key={idx} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
            <span className="text-gray-600 dark:text-gray-400">{status.name}</span>
          </div>
          <span className="font-semibold dark:text-white">{status.value}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default OrderStatusPie;