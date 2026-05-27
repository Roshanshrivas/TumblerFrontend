import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { TbHeartHandshake } from "react-icons/tb";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Customize", path: "/customize" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const supportLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns", path: "/returns" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const socialLinks = [
    { icon: <FiFacebook />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FiTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FiInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FiYoutube />, url: "https://youtube.com", label: "YouTube" },
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "PayPal", "Razorpay", "Google Pay", "PhonePe"
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">
                  Tumbler<span className="text-[#ff6b00]">Co</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium insulated tumblers designed for your daily hydration. 
              Customize your own and sip in style.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#ff6b00] hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#ff6b00] transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#ff6b00] transition text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="mt-0.5 flex-shrink-0 text-[#ff6b00]" />
                <span>123 Tumbler Street, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="flex-shrink-0 text-[#ff6b00]" />
                <a href="mailto:hello@tumblerco.com" className="hover:text-[#ff6b00]">
                  hello@tumblerco.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="flex-shrink-0 text-[#ff6b00]" />
                <a href="tel:+911234567890">+91 12345 67890</a>
              </li>
            </ul>

            {/* Simple Newsletter (inline) */}
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Subscribe for offers</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#ff6b00] text-white rounded-r-md hover:bg-orange-600 transition"
                >
                  <FiArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full"
              >
                {method}
              </span>
            ))}
          </div>
          <div className="text-center text-sm text-gray-500">
            © {currentYear} Tumbler. All rights reserved. | 
            <span className="inline-flex items-center gap-1 mx-1">
              <TbHeartHandshake size={14} className="text-red-500" />
              Designed with care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;