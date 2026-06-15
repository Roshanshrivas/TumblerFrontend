import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

// Mock user data – in real app, fetch from API/localStorage
const getMockUsers = () => {
  // Combine existing users from localStorage (if any) with mock defaults
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const defaultUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+919876543210", status: "active", lastActive: "2026-06-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+919876543211", status: "active", lastActive: "2026-06-09" },
    { id: 3, name: "Admin User", email: "admin@tumbler.com", phone: "+919876543212", status: "active", lastActive: "2026-06-10" },
  ];
  return [...defaultUsers, ...storedUsers];
};

const segmentOptions = [
  { value: "all", label: "All Users", filter: (users) => users },
  { value: "active", label: "Active Users", filter: (users) => users.filter(u => u.status === "active") },
  { value: "recent", label: "Recent (last 7 days)", filter: (users) => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return users.filter(u => new Date(u.lastActive) >= sevenDaysAgo);
    }
  },
];

const broadcastHistoryKey = "broadcastHistory";

const AdminBroadcast = () => {
  const [users, setUsers] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadUsers();
    loadHistory();
  }, []);

  const loadUsers = () => {
    const allUsers = getMockUsers();
    setUsers(allUsers);
  };

  const loadHistory = () => {
    const saved = localStorage.getItem(broadcastHistoryKey);
    if (saved) setHistory(JSON.parse(saved));
  };

  const saveHistory = (newEntry) => {
    const updated = [newEntry, ...history.slice(0, 19)]; // keep last 20
    setHistory(updated);
    localStorage.setItem(broadcastHistoryKey, JSON.stringify(updated));
  };

  const getSelectedUsers = () => {
    const segment = segmentOptions.find(s => s.value === selectedSegment);
    return segment ? segment.filter(users) : users;
  };

  const handleEmailSend = async () => {
    if (!messageSubject.trim() || !messageBody.trim()) {
      toast.error("Please fill both subject and message body");
      return;
    }
    const targetUsers = getSelectedUsers();
    if (targetUsers.length === 0) {
      toast.error("No users in selected segment");
      return;
    }
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In demo, we open email client for each user? Too many – instead show mock success.
    // Production: call backend email API.
    console.log("Sending email to:", targetUsers.map(u => u.email));
    console.log("Subject:", messageSubject);
    console.log("Body:", messageBody);
    
    saveHistory({
      id: Date.now(),
      type: "email",
      segment: selectedSegment,
      subject: messageSubject,
      recipients: targetUsers.length,
      sentAt: new Date().toISOString(),
    });
    toast.success(`Email sent to ${targetUsers.length} users (demo)`);
    setMessageSubject("");
    setMessageBody("");
    setIsSending(false);
  };

  const handleWhatsAppSend = async () => {
    if (!whatsappMessage.trim()) {
      toast.error("Please enter WhatsApp message");
      return;
    }
    const targetUsers = getSelectedUsers();
    if (targetUsers.length === 0) {
      toast.error("No users in selected segment");
      return;
    }
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, we can open WhatsApp Web with pre-filled message for the first user (or batch)
    // But to avoid spamming, we just log and show success.
    console.log("Sending WhatsApp to:", targetUsers.map(u => u.phone));
    console.log("Message:", whatsappMessage);
    
    saveHistory({
      id: Date.now(),
      type: "whatsapp",
      segment: selectedSegment,
      message: whatsappMessage,
      recipients: targetUsers.length,
      sentAt: new Date().toISOString(),
    });
    toast.success(`WhatsApp message queued for ${targetUsers.length} users (demo)`);
    setWhatsappMessage("");
    setIsSending(false);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Broadcast & Notifications</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Send promotional messages, offers, and updates to your customers via Email or WhatsApp.
        </p>
      </div>

      {/* Two‑column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Broadcast Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Email Broadcast</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Audience
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm"
              >
                {segmentOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {getSelectedUsers().length} user(s) will receive this broadcast.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                placeholder="Special Offer: 20% off on all tumblers!"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message Body
              </label>
              <textarea
                rows="5"
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Hey there, we have an exclusive offer for you! Use code TUMBLER20 at checkout..."
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm resize-none"
              />
            </div>
            <button
              onClick={handleEmailSend}
              disabled={isSending}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Send size={18} />
              {isSending ? "Sending..." : "Send Email Broadcast"}
            </button>
          </div>
        </motion.div>

        {/* WhatsApp Broadcast Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
        >
          <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">WhatsApp Broadcast</h2>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Audience
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm"
              >
                {segmentOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {getSelectedUsers().length} user(s) with phone numbers.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                WhatsApp Message
              </label>
              <textarea
                rows="5"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                placeholder="Hello! Check out our new summer collection – up to 30% off. Click here to shop: https://tumbler.com/sale"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm resize-none"
              />
            </div>
            <button
              onClick={handleWhatsAppSend}
              disabled={isSending}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Send size={18} />
              {isSending ? "Sending..." : "Send WhatsApp Broadcast"}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              * Demo mode: messages are logged to console. In production, integrate WhatsApp Business API.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Broadcast History */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Broadcasts</h2>
        </div>
        <div className="overflow-x-auto">
          {history.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No broadcasts sent yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Type</th>
                  <th className="px-5 py-3 text-left">Segment</th>
                  <th className="px-5 py-3 text-left">Recipients</th>
                  <th className="px-5 py-3 text-left">Message Preview</th>
                  <th className="px-5 py-3 text-left">Sent At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                    <td className="px-5 py-3">
                      {item.type === "email" ? (
                        <span className="inline-flex items-center gap-1"><Mail size={14} /> Email</span>
                      ) : (
                        <span className="inline-flex items-center gap-1"><MessageCircle size={14} /> WhatsApp</span>
                      )}
                    </td>
                    <td className="px-5 py-3 capitalize">{item.segment}</td>
                    <td className="px-5 py-3">{item.recipients}</td>
                    <td className="px-5 py-3 max-w-xs truncate">
                      {item.type === "email" ? item.subject : item.message?.slice(0, 50)}
                    </td>
                    <td className="px-5 py-3 text-xs">{formatDate(item.sentAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminBroadcast;