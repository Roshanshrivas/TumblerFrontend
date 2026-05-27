import React, { useState, useEffect } from "react";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiHeart,
} from "react-icons/fi";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";

// ========== PRODUCT DATA (same as before) ==========
const allProducts = [
  {
    id: 1,
    title: "Matte Black 24oz",
    price: 600,
    oldPrice: 750,
    discount: 20,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779190990/imgi_1001_8901372268840_2_p0mioc.jpg",
    bg: "#FFEFE8",
    tag: "TRENDING",
    rating: 4.8,
    reviews: 128,
    color: "Black",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 2,
    title: "Royal Purple 24oz",
    price: 600,
    oldPrice: 750,
    discount: 15,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg",
    bg: "#F3E9FF",
    tag: "BEST SELLER",
    rating: 4.9,
    reviews: 98,
    color: "Purple",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 3,
    title: "Luxury Black 24oz",
    price: 600,
    oldPrice: 750,
    discount: 10,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg",
    bg: "#F5F5F5",
    tag: "TRENDING",
    rating: 4.7,
    reviews: 142,
    color: "Black",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 4,
    title: "Sky Blue 24oz",
    price: 600,
    oldPrice: 750,
    discount: 20,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg",
    bg: "#E9F8FF",
    tag: "TRENDING",
    rating: 4.8,
    reviews: 110,
    color: "Blue",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 5,
    title: "Coral Red 24oz",
    price: 600,
    oldPrice: 750,
    discount: 15,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779253894/imgi_1246_8901372268628_4_nr99c0.jpg",
    bg: "#FFF0F0",
    tag: "BEST SELLER",
    rating: 4.9,
    reviews: 106,
    color: "Red",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 6,
    title: "Olive Green 24oz",
    price: 600,
    oldPrice: 750,
    discount: 10,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg",
    bg: "#EEF5EA",
    tag: "TRENDING",
    rating: 4.7,
    reviews: 87,
    color: "Green",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 7,
    title: "Ocean Blue 24oz",
    price: 600,
    oldPrice: 750,
    discount: 20,
    image:
      "https://res.cloudinary.com/dbkpwluh0/image/upload/v1779191481/imgi_994_8901372268826_3_kftifx.jpg",
    bg: "#E9F8FF",
    tag: null,
    rating: 4.8,
    reviews: 95,
    color: "Blue",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 8,
    title: "Soft Pink 24oz",
    price: 600,
    oldPrice: 750,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800&auto=format&fit=crop",
    bg: "#FFF1F6",
    tag: "BEST SELLER",
    rating: 4.9,
    reviews: 112,
    color: "Pink",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
  {
    id: 9,
    title: "Forest Green 24oz",
    price: 600,
    oldPrice: 750,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop",
    bg: "#EEF5EA",
    tag: null,
    rating: 4.7,
    reviews: 76,
    color: "Green",
    size: "24oz",
    material: "Stainless Steel",
    inStock: true,
  },
];

// Filter configuration
const filterSections = {
  "Quick Filters": [
    "Leak Proof",
    "Hot & Cold",
    "Double Wall",
    "BPA Free",
    "Cup Holder Friendly",
  ],
  Color: ["Black", "Purple", "Blue", "Red", "Green", "Pink"],
  "Size Range": ["16oz", "20oz", "24oz", "30oz", "40oz"],
  Material: ["Stainless Steel", "Ceramic", "Plastic"],
  Personalization: ["Yes", "No"],
  Availability: ["In Stock", "Out of Stock"],
};

const getTagLabel = (tag) => {
  if (tag === "BEST SELLER") return "Best Seller";
  if (tag === "TRENDING") return "Trending";
  return null;
};

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const savedCart = localStorage.getItem("tumblerCart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("tumblerCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`Added ${product.title} to cart`, {
      duration: 2000,
      style: { background: "#ff6b00", color: "#fff" },
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
    toast.success(
      wishlist.includes(productId)
        ? "Removed from wishlist"
        : "Added to wishlist",
      {
        duration: 1500,
      },
    );
  };

  const handleFilterChange = (section, value, checked) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || [];
      if (checked) {
        return { ...prev, [section]: [...current, value] };
      } else {
        return { ...prev, [section]: current.filter((v) => v !== value) };
      }
    });
    setCurrentPage(1);
  };

  const getFilteredProducts = () => {
    let filtered = [...allProducts];
    if (priceRange[1] < 3500) {
      filtered = filtered.filter((p) => p.price <= priceRange[1]);
    }
    if (selectedFilters.Color?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.Color.includes(p.color),
      );
    }
    if (selectedFilters["Size Range"]?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters["Size Range"].includes(p.size),
      );
    }
    if (selectedFilters.Material?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.Material.includes(p.material),
      );
    }
    if (selectedFilters.Availability?.length) {
      filtered = filtered.filter((p) =>
        selectedFilters.Availability.includes(
          p.inStock ? "In Stock" : "Out of Stock",
        ),
      );
    }
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            ★
          </span>
        ))}
        {half && <span className="text-yellow-400">½</span>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Compact Header */}
        <div className="mb-16">
          {/* Breadcrumb – left aligned */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <a
              href="/"
              className="flex items-center gap-1 text-gray-500 transition hover:text-orange-500"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </a>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-gray-700">Products</span>
          </div>

          {/* Heading & Subheading – centered, compact */}
          <div className="text-center">
            <h1 className="text-4xl mb-2 md:mb-5 font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              All Products
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-5 md:w-8 bg-slate-200" />
              <p className="text-xs sm:text-sm md:text-base text-slate-500 font-normal tracking-wide">
                Every sip, designed for you
              </p>
              <span className="h-px w-5 md:w-8 bg-slate-200" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-80 bg-white rounded-2xl shadow-md border border-gray-100 p-6 h-fit sticky top-24">
            <SidebarContent
              selectedFilters={selectedFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleFilterChange={handleFilterChange}
              filteredCount={filteredProducts.length}
            />
          </aside>

          {/* Mobile filter button */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl shadow-md border border-gray-200 font-medium text-gray-700 hover:bg-gray-50"
            >
              <FiFilter /> Filters
            </button>
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1">
            {/* Top bar – sorting & view */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-500 bg-gray-100 px-4 py-1.5 rounded-full">
                Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
                products
              </div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2 bg-white text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 hidden sm:inline">
                    View:
                  </span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <FiList size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products grid / list */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    tag={getTagLabel(product.tag)}
                    onAddToCart={() => addToCart(product)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col sm:flex-row gap-5 hover:shadow-xl transition duration-300"
                  >
                    <div className="relative w-full sm:w-44 h-44 bg-gray-50 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-extrabold text-orange-500">
                            ₹{product.price}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.oldPrice}
                          </span>
                          {product.discount && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                              -{product.discount}%
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(product.rating)}
                          <span className="text-gray-400 text-xs">
                            ({product.reviews} reviews)
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-3 max-w-md">
                          Premium stainless steel tumbler with vacuum
                          insulation. Keeps drinks hot or cold for hours.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-5">
                        <button
                          onClick={() => addToCart(product)}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                        >
                          <FiShoppingCart size={18} /> Add to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                        >
                          <FiHeart
                            className={
                              wishlist.includes(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                            }
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition"
                >
                  <FiChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full font-medium transition ${
                          currentPage === page
                            ? "bg-orange-500 text-white shadow-md"
                            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === 2 && currentPage > 3) {
                    return (
                      <span
                        key="ellipsis1"
                        className="w-10 h-10 flex items-center justify-center text-gray-400"
                      >
                        ...
                      </span>
                    );
                  } else if (
                    page === totalPages - 1 &&
                    currentPage < totalPages - 2
                  ) {
                    return (
                      <span
                        key="ellipsis2"
                        className="w-10 h-10 flex items-center justify-center text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating cart button with animation */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <FiShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-pulse">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6 shadow-xl animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-12">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-5 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-gray-100 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.title}
                        </h4>
                        <div className="text-orange-500 font-bold mt-1">
                          ₹{item.price}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <FiPlus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-500 hover:text-red-600"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">₹{cartTotal}</span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-3 rounded-xl mt-5 font-semibold hover:bg-orange-600 transition shadow-md">
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filters</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <SidebarContent
              selectedFilters={selectedFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleFilterChange={handleFilterChange}
              filteredCount={filteredProducts.length}
            />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full bg-orange-500 text-white py-3 rounded-xl mt-6 font-semibold hover:bg-orange-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ========== SIDEBAR CONTENT (professional & reusable) ==========
const SidebarContent = ({
  selectedFilters,
  priceRange,
  setPriceRange,
  handleFilterChange,
  filteredCount,
}) => {
  const [openSections, setOpenSections] = useState({
    "Quick Filters": true,
    Color: true,
    "Size Range": true,
    Material: true,
    Personalization: false,
    Availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setPriceRange([0, 3500]);
    // Reset all selected filters
    Object.keys(selectedFilters).forEach((section) => {
      selectedFilters[section] = [];
    });
    window.location.reload(); // quick reset; better to implement proper state reset
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="font-semibold text-gray-600">{filteredCount} products</p>
        <button
          onClick={handleReset}
          className="text-xs text-orange-500 hover:underline font-medium"
        >
          Reset all
        </button>
      </div>

      {/* Price Range – custom styled */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-lg mb-3">Price</h3>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="3500"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between mt-3">
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
              ₹{priceRange[0]}
            </span>
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg">
              ₹{priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Filter sections */}
      {Object.entries(filterSections).map(([section, options]) => (
        <div key={section} className="border-t border-gray-100 pt-4 mb-4">
          <button
            onClick={() => toggleSection(section)}
            className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-orange-500 transition"
          >
            <span>{section}</span>
            <span className="text-gray-400 text-xl">
              {openSections[section] ? "−" : "+"}
            </span>
          </button>
          {openSections[section] && (
            <div className="space-y-2 pl-2 mt-3">
              {options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-500 transition"
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleFilterChange(section, opt, e.target.checked)
                    }
                    checked={selectedFilters[section]?.includes(opt) || false}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-400 focus:ring-1"
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductsPage;
