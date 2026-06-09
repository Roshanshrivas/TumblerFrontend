import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Package, Users, Truck, Eye, Clock, Activity } from "lucide-react";

const getActivityIcon = (type) => {
  switch (type) {
    case "order": return <ShoppingCart size={14} className="text-blue-500" />;
    case "product": return <Package size={14} className="text-purple-500" />;
    case "customer": return <Users size={14} className="text-green-500" />;
    case "shipped": return <Truck size={14} className="text-orange-500" />;
    case "review": return <Eye size={14} className="text-pink-500" />;
    default: return <Clock size={14} className="text-gray-500" />;
  }
};

const RecentActivities = ({ activities, itemVariants }) => (
  <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-all">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
    <div className="space-y-4">
      {activities.map((activity, idx) => (
        <div key={idx} className="flex items-start gap-3 group">
          <div className="mt-0.5 transition-transform group-hover:scale-110">
            {getActivityIcon(activity.icon)}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-800 dark:text-gray-200">{activity.action}</p>
            <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
      <Link to="/admin/activities" className="text-sm text-orange-600 hover:underline flex items-center gap-1">
        View all activities <Activity size={14} />
      </Link>
    </div>
  </motion.div>
);

export default RecentActivities;