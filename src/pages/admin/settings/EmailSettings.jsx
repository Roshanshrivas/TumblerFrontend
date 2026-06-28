// src/pages/admin/settings/EmailSettings.jsx
import React, { useState } from "react";
import { Mail, Save } from "lucide-react";
import { SectionCard, SettingRow } from "./SettingsHelpers";

const EmailSettings = ({ data, onSave }) => {
  // ✅ Safe fallback
  const [formData, setFormData] = useState(data || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SectionCard title="Email Settings" icon={<Mail size={18} />}>
        <SettingRow label="Mail Driver">
          <select
            name="driver"
            value={formData.driver || "SMTP"}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
          >
            <option value="SMTP">SMTP</option>
            <option value="Sendmail">Sendmail</option>
            <option value="Mailgun">Mailgun</option>
            <option value="SES">SES</option>
          </select>
        </SettingRow>
        <SettingRow label="Mail Host">
          <input
            type="text"
            name="host"
            value={formData.host || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
          />
        </SettingRow>
        <SettingRow label="Mail Port">
          <input
            type="text"
            name="port"
            value={formData.port || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-32"
          />
        </SettingRow>
        <SettingRow label="Mail Username">
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
          />
        </SettingRow>
        <SettingRow label="Mail Password">
          <div className="flex items-center gap-2">
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
            />
            <span className="text-xs text-gray-400">********</span>
          </div>
        </SettingRow>
        <SettingRow label="Mail Encryption">
          <select
            name="encryption"
            value={formData.encryption || "TLS"}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-full sm:w-72"
          >
            <option value="TLS">TLS</option>
            <option value="SSL">SSL</option>
            <option value="none">None</option>
          </select>
        </SettingRow>
      </SectionCard>
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm transition"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>
    </form>
  );
};

export default EmailSettings;