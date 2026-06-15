// src/pages/admin/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfoCard from "../../components/profile/PersonalInfoCard";
import SecurityCenterCard from "../../components/profile/SecurityCenterCard";
import QuickActionsCard from "../../components/profile/QuickActionsCard";
import NotificationCard from "../../components/profile/NotificationCard";
import StoreSettingsCard from "../../components/profile/StoreSettingsCard";
import MarketingCard from "../../components/profile/MarketingCard";
import RecentActivityCard from "../../components/profile/RecentActivityCard";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 1248,
    totalOrders: 8520,
    totalUsers: 12458,
    revenueGenerated: "24,58,620",
    pendingOrders: 156,
  });

  useEffect(() => {
    // Load admin from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
      return;
    }
    setAdmin(storedUser);

    // Load saved stats (if any)
    const savedStats = localStorage.getItem("adminStats");
    if (savedStats) setStats(JSON.parse(savedStats));
  }, [navigate]);

  const handleProfileUpdate = (updatedAdmin) => {
    localStorage.setItem("user", JSON.stringify(updatedAdmin));
    setAdmin(updatedAdmin);
    window.dispatchEvent(new Event("userUpdated"));
  };

  const handleStatsUpdate = (newStats) => {
    setStats(newStats);
    localStorage.setItem("adminStats", JSON.stringify(newStats));
  };

  if (!admin) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {/* Header with avatar, name, stats */}
        <ProfileHeader
          admin={admin}
          stats={stats}
          onProfileUpdate={handleProfileUpdate}
          onStatsUpdate={handleStatsUpdate}
        />

        {/* Row 1: Personal Info, Security, Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <PersonalInfoCard admin={admin} onUpdate={handleProfileUpdate} />
          <SecurityCenterCard admin={admin} />
          <QuickActionsCard />
        </div>

        {/* Row 2: Notifications, Store Settings, Marketing */}
        <div className="grid lg:grid-cols-3 gap-6">
          <NotificationCard />
          <StoreSettingsCard />
          <MarketingCard />
        </div>

        {/* Recent Activity */}
        <RecentActivityCard />
      </div>
    </div>
  );
};

export default AdminProfile;