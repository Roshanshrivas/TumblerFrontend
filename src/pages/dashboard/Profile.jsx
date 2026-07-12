// src/pages/dashboard/Profile.jsx – Fully Responsive, Production-Ready
import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  Edit3,
  Calendar,
  Briefcase,
  ShieldCheck,
  ChevronRight,
  MapPin,
  CreditCard,
  Bell,
  Award,
  ShoppingBag,
  IndianRupee,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmDialog from '../../components/ConfirmDialog';

// ─── Brand Colors ───────────────────────────────────
const BRAND_PRIMARY = '#14C6D8';
const BRAND_HOVER = '#0FB2C3';
const BRAND_DARK = '#18212A';
const BRAND_TEXT = '#5F6C7B';
const BRAND_BORDER = '#E8EEF2';
const BRAND_SECTION = '#F8FBFC';
const BRAND_LIGHT_BG = '#E6F9FA';
const BRAND_SUCCESS = '#22C55E';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Delete account confirmation dialog state
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    isLoading: false,
  });

  // Profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    altEmail: 'john.doe@gmail.com',
    countryCode: '+91',
    phone: '98765 43210',
    occupation: 'Software Developer',
    dob: '1995-08-15',
    anniversary: '',
    gender: 'Male',
    bio: '',
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Save profile
  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success('Profile updated successfully!');
    setLoading(false);
    setIsEditing(false);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  // Delete account handlers
  const handleDeleteAccount = () => {
    setDeleteConfirm({ isOpen: true, isLoading: false });
  };

  const confirmDeleteAccount = async () => {
    setDeleteConfirm((prev) => ({ ...prev, isLoading: true }));
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.error('Account deletion requested. This action cannot be undone.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setDeleteConfirm({ isOpen: false, isLoading: false });
    }
  };

  const cancelDeleteAccount = () => {
    setDeleteConfirm({ isOpen: false, isLoading: false });
  };

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfo profile={profile} onChange={handleInputChange} isEditing={isEditing} />;
      case 'security':
        return <Security />;
      case 'preferences':
        return <Preferences />;
      default:
        return null;
    }
  };

  // Quick actions with navigation
  const quickActions = [
    { label: 'Change Password', icon: Lock, path: '/dashboard/change-password' },
    { label: 'Manage Addresses', icon: MapPin, path: '/dashboard/addresses' },
    { label: 'Payment Methods', icon: CreditCard, path: '/dashboard/payment-methods' },
    { label: 'Notification Settings', icon: Bell, path: '/dashboard/notifications' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8EEF2] dark:border-[#18212A]/30 pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#18212A] dark:text-white">My Profile</h1>
          <p className="text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mt-0.5">
            Manage your personal information and account settings.
          </p>
        </div>
        <button
          onClick={toggleEdit}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-[#14C6D8] hover:bg-[#0FB2C3] text-white font-semibold rounded-xl text-sm transition shadow-sm disabled:opacity-70"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isEditing ? (
            <Save size={18} />
          ) : (
            <Edit3 size={18} />
          )}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column: Tab Navigation + Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 border-b border-[#E8EEF2] dark:border-[#18212A]/30 pb-1 overflow-x-auto scrollbar-hide">
            {[
              { id: 'personal', label: 'Personal Information' },
              { id: 'security', label: 'Security' },
              { id: 'preferences', label: 'Preferences' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#14C6D8]'
                      : 'text-[#5F6C7B] hover:text-[#18212A] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="profileTabLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14C6D8] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Summary & Quick Actions */}
        <div className="space-y-6">
          {/* Account Summary */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-[#18212A] dark:text-white uppercase tracking-wider">
              Account Summary
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B]">
                  <Calendar size={18} className="text-[#14C6D8]" />
                  <span>Member Since</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#18212A] dark:text-white">20 May, 2025</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B]">
                  <ShoppingBag size={18} className="text-[#14C6D8]" />
                  <span>Total Orders</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#18212A] dark:text-white">12</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B]">
                  <IndianRupee size={18} className="text-[#14C6D8]" />
                  <span>Total Spent</span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#18212A] dark:text-white">₹12,450</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#E8EEF2] dark:border-[#18212A]/30 pt-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B]">
                  <Award size={18} className="text-[#14C6D8]" />
                  <span>Reward Points</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#18212A] dark:text-white">250 pts</span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 text-center shadow-sm">
            <div className="flex justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 rounded-full flex items-center justify-center border border-[#22C55E]/30 dark:border-[#22C55E]/30">
                <ShieldCheck size={28} className="text-[#22C55E]" />
              </div>
            </div>
            <h4 className="mt-3 text-xs sm:text-sm font-semibold text-[#18212A] dark:text-white">
              Account Verified
            </h4>
            <p className="text-xs text-[#5F6C7B] dark:text-[#5F6C7B] mt-1">
              Your identity has been confirmed.
            </p>
            <span className="inline-block mt-2 px-2.5 sm:px-3 py-1 bg-[#22C55E]/10 dark:bg-[#22C55E]/20 text-[#22C55E] dark:text-[#22C55E] text-[10px] sm:text-xs font-medium rounded-full border border-[#22C55E]/30 dark:border-[#22C55E]/30">
              ✓ Verified
            </span>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-[#18212A] dark:text-white uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="mt-3 space-y-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between px-2 sm:px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#5F6C7B] dark:text-[#5F6C7B] hover:bg-[#F8FBFC] dark:hover:bg-[#18212A]/50 transition group"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Icon size={18} className="text-[#5F6C7B]/60 group-hover:text-[#14C6D8] transition" />
                      <span>{action.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-[#5F6C7B]/40 group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
            <h3 className="text-xs sm:text-sm font-semibold text-[#EF4444] uppercase tracking-wider">
              Delete Account
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mt-1">
              Once you delete your account, there is no going back.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="mt-3 px-4 py-2 border border-[#EF4444]/30 text-[#EF4444] hover:bg-[#FEE2E2] dark:hover:bg-[#EF4444]/20 rounded-xl text-xs sm:text-sm font-semibold transition"
            >
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* ConfirmDialog for Delete Account */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={cancelDeleteAccount}
        onConfirm={confirmDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, orders, and personal information will be removed."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="danger"
        isLoading={deleteConfirm.isLoading}
      />
    </div>
  );
};

// ----------------------------------------------
// Personal Information Tab
// ----------------------------------------------
const PersonalInfo = ({ profile, onChange, isEditing }) => {
  return (
    <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold text-[#18212A] dark:text-white mb-4 sm:mb-5">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => onChange('name', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
                isEditing
                  ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                  : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
              }`}
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => onChange('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
                isEditing
                  ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                  : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
              }`}
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center justify-center space-y-2 bg-[#F8FBFC] dark:bg-[#18212A]/30 rounded-2xl p-4 border border-dashed border-[#E8EEF2] dark:border-[#18212A]/30">
          <span className="text-[10px] sm:text-xs font-medium text-[#5F6C7B] dark:text-[#5F6C7B] uppercase tracking-wider">
            Profile Photo
          </span>
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E6F9FA] dark:bg-[#14C6D8]/20 text-[#14C6D8] font-bold flex items-center justify-center text-xl sm:text-2xl border-2 border-[#14C6D8]/30 dark:border-[#14C6D8]/30 shadow-sm">
              JD
            </div>
            <div className="absolute bottom-0 right-0 bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 text-[#5F6C7B] p-1.5 rounded-full shadow-md group-hover:bg-[#14C6D8] group-hover:text-white transition-colors">
              <Camera size={14} />
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-[#5F6C7B]">Click camera to change</p>
        </div>
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* Mobile */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <select
              value={profile.countryCode}
              onChange={(e) => onChange('countryCode', e.target.value)}
              disabled={!isEditing}
              className={`px-2 sm:px-3 py-2.5 rounded-xl text-sm font-medium text-[#18212A] dark:text-white outline-none transition ${
                isEditing
                  ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8]'
                  : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
              }`}
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              disabled={!isEditing}
              className={`flex-1 px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
                isEditing
                  ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                  : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
              }`}
            />
          </div>
        </div>

        {/* Alternate Email */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Alternate Email (Optional)
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            value={profile.altEmail}
            onChange={(e) => onChange('altEmail', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
              isEditing
                ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
            }`}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={profile.dob}
            onChange={(e) => onChange('dob', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
              isEditing
                ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
            }`}
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Occupation (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Designer, Engineer"
            value={profile.occupation}
            onChange={(e) => onChange('occupation', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
              isEditing
                ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
            }`}
          />
        </div>

        {/* Anniversary */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Anniversary (Optional)
          </label>
          <input
            type="date"
            value={profile.anniversary}
            onChange={(e) => onChange('anniversary', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm text-[#18212A] dark:text-white transition ${
              isEditing
                ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
            }`}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Gender
          </label>
          <div className="flex items-center gap-4 sm:gap-6 pt-1.5">
            {['Male', 'Female', 'Other'].map((g) => (
              <label key={g} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#18212A] dark:text-white cursor-pointer">
                <input
                  type="radio"
                  name="genderRadio"
                  value={g}
                  checked={profile.gender === g}
                  onChange={() => onChange('gender', g)}
                  disabled={!isEditing}
                  className="w-4 h-4 text-[#14C6D8] focus:ring-[#14C6D8] accent-[#14C6D8] disabled:opacity-50"
                />
                {g}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6">
        <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
          About You <span className="text-[#5F6C7B]">(Optional)</span>
        </label>
        <div className="relative">
          <textarea
            rows={3}
            maxLength={200}
            value={profile.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3 sm:px-4 py-3 rounded-xl text-sm text-[#18212A] dark:text-white transition resize-none ${
              isEditing
                ? 'bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none'
                : 'bg-[#F8FBFC] dark:bg-[#18212A]/50 border border-[#E8EEF2] dark:border-[#18212A]/30 cursor-not-allowed opacity-75'
            }`}
            placeholder="Tell us something about yourself..."
          />
          <span className="absolute bottom-3 right-4 text-[10px] sm:text-xs text-[#5F6C7B] font-mono">
            {profile.bio.length}/200
          </span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------
// Security Tab
// ----------------------------------------------
const Security = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Password updated successfully!');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold text-[#18212A] dark:text-white mb-4 sm:mb-5">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-xl text-sm text-[#18212A] dark:text-white focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-xl text-sm text-[#18212A] dark:text-white focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none transition"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#18212A] dark:text-white mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 bg-white dark:bg-[#18212A] border border-[#E8EEF2] dark:border-[#18212A]/30 rounded-xl text-sm text-[#18212A] dark:text-white focus:ring-2 focus:ring-[#14C6D8] focus:border-transparent outline-none transition"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 sm:px-6 py-2.5 bg-[#14C6D8] hover:bg-[#0FB2C3] text-white text-sm font-semibold rounded-xl transition shadow-sm disabled:opacity-70 flex items-center gap-2"
        >
          {loading && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

// ----------------------------------------------
// Preferences Tab
// ----------------------------------------------
const Preferences = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    shippingUpdates: true,
    offersDeals: true,
    coupons: true,
    accountAlerts: true,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    toast.success('Preferences saved successfully!');
  };

  return (
    <div className="bg-white dark:bg-[#18212A] rounded-2xl border border-[#E8EEF2] dark:border-[#18212A]/30 p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-semibold text-[#18212A] dark:text-white mb-2">
        Notification Preferences
      </h2>
      <p className="text-xs sm:text-sm text-[#5F6C7B] dark:text-[#5F6C7B] mb-5">
        Choose what you want to be notified about.
      </p>

      <div className="space-y-4 max-w-lg">
        {[
          { key: 'orderUpdates', label: 'Order Updates', desc: 'Get alerts for order status changes' },
          { key: 'shippingUpdates', label: 'Shipping Updates', desc: 'Get alerts for shipping & delivery' },
          { key: 'offersDeals', label: 'Offers & Deals', desc: 'Receive offers and promotions' },
          { key: 'coupons', label: 'Coupons', desc: 'Get notified about new coupons' },
          { key: 'accountAlerts', label: 'Account Alerts', desc: 'Important account notifications' },
        ].map((pref) => (
          <div key={pref.key} className="flex items-center justify-between gap-4 border-b border-[#E8EEF2] dark:border-[#18212A]/30 pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#18212A] dark:text-white">{pref.label}</p>
              <p className="text-[10px] sm:text-xs text-[#5F6C7B]">{pref.desc}</p>
            </div>
            <button
              onClick={() => togglePreference(pref.key)}
              className={`w-10 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                preferences[pref.key] ? 'bg-[#14C6D8]' : 'bg-[#E8EEF2] dark:bg-[#18212A]/30'
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${
                  preferences[pref.key] ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-4 sm:px-6 py-2.5 bg-[#14C6D8] hover:bg-[#0FB2C3] text-white text-sm font-semibold rounded-xl transition shadow-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Profile;