// src/pages/admin/services/settingsService.js
import toast from "react-hot-toast";

const STORAGE_PREFIX = "adminSettings_";

const defaultSettings = {
  general: {
    storeName: "Tumbler Store",
    storeEmail: "support@tumbler.com",
    storePhone: "+91 987 654 3210",
    storeAddress: "123, Tumbler Street, Kolkata, West Bengal, India - 700001",
    storeLanguage: "English",
    currency: "INR",
    currencySymbol: "₹",
    timezone: "Asia/Kolkata (GMT+05:30)",
    dateFormat: "DD MMM YYYY",
    timeFormat: "12 Hours",
    maintenanceMode: false,
  },
  email: {
    driver: "SMTP",
    host: "smtp.tumbler.com",
    port: "587",
    username: "support@tumbler.com",
    password: "********",
    encryption: "TLS",
  },
  sms: {
    provider: "Twilio",
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXX",
    authToken: "**************",
    fromNumber: "+91 987 654 3210",
  },
  seo: {
    metaTitle: "Tumbler Store - Premium Quality Tumblers",
    metaDescription: "Buy premium quality tumblers online at best prices. Custom designs, fast delivery and secure payments.",
    metaKeywords: "tumbler, water bottle, custom tumbler, travel mug, thermos",
  },
  security: {
    twoFactor: false,
    loginNotification: false,
    strongPassword: false,
    sessionTimeout: false,
  },
  backup: {
    dbLastBackup: "18 May 2025, 03:30 AM",
    fileLastBackup: "18 May 2025, 03:30 AM",
    systemVersion: "2.4.1",
  },
};

const loadSettings = (section) => {
  const key = STORAGE_PREFIX + section;
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(defaultSettings[section]));
  return defaultSettings[section];
};

const saveSettings = (section, data) => {
  const key = STORAGE_PREFIX + section;
  localStorage.setItem(key, JSON.stringify(data));
  toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings updated`);
};

export const settingsService = {
  getGeneral: () => loadSettings("general"),
  saveGeneral: (data) => saveSettings("general", data),

  getEmail: () => loadSettings("email"),
  saveEmail: (data) => saveSettings("email", data),

  getSms: () => loadSettings("sms"),
  saveSms: (data) => saveSettings("sms", data),

  getSeo: () => loadSettings("seo"),
  saveSeo: (data) => saveSettings("seo", data),

  getSecurity: () => loadSettings("security"),
  saveSecurity: (data) => saveSettings("security", data),

  getBackup: () => loadSettings("backup"),
  saveBackup: (data) => saveSettings("backup", data),

  getAll: () => {
    const sections = ["general", "email", "sms", "seo", "security", "backup"];
    return sections.reduce((acc, sec) => {
      try {
        acc[sec] = loadSettings(sec);
      } catch {
        acc[sec] = defaultSettings[sec];
      }
      return acc;
    }, {});
  },

  resetAll: () => {
    Object.keys(defaultSettings).forEach((section) => {
      localStorage.setItem(STORAGE_PREFIX + section, JSON.stringify(defaultSettings[section]));
    });
    toast.success("All settings reset to default");
  },
};