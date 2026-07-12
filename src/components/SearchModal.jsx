import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiX, FiSearch, FiArrowRight } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

// Mock product data – replace with your actual product source (API, context, etc.)
const getAllProducts = () => {
  const stored = localStorage.getItem("allProducts");
  if (stored) return JSON.parse(stored);
  return [
    { id: 1, title: "Matte Black 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg" },
    { id: 2, title: "Royal Purple 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg" },
    { id: 3, title: "Luxury Black 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg" },
    { id: 4, title: "Sky Blue 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg" },
    { id: 5, title: "Coral Red 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg" },
    { id: 6, title: "Olive Green 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg" },
    { id: 7, title: "Ocean Blue 24oz", price: 600, image: "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg" },
    { id: 8, title: "Soft Pink 24oz", price: 600, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400" },
    { id: 9, title: "Forest Green 24oz", price: 600, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400" },
  ];
};

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const products = getAllProducts();
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleProductClick = () => {
    onClose();
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Modal container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Search Products</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Search input */}
          <div className="p-5 border-b border-gray-100">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for tumblers..."
                className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:border-[#14C6D8] focus:ring-2 focus:ring-[#09B0BE] outline-none transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IoCloseOutline size={20} />
                </button>
              )}
            </div>
            {query && (
              <p className="text-xs text-gray-500 mt-2">
                {loading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
              </p>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-5 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 && query ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500">No products found for "{query}"</p>
                <button
                  onClick={() => setQuery("")}
                  className="mt-4 text-orange-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={handleProductClick}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg bg-white"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-orange-600 font-bold mt-1">₹{product.price}</p>
                  </div>
                  <FiArrowRight className="text-gray-400 self-center" />
                </Link>
              ))
            )}
          </div>

          {/* Footer hint */}
          {results.length > 0 && (
            <div className="border-t border-gray-100 p-4 text-center text-xs text-gray-400">
              Click any result to view product
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;