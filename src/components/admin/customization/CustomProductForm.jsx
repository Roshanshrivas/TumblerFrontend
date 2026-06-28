// src/components/admin/customization/CustomProductForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Package, Upload, X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { customProductService } from "../../../pages/admin/services/customProductService";

// ---------- Helper: Convert File to Base64 ----------
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CustomProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    basePrice: 0,
    color: "#1a1a1a",
    mainImage: "",
    status: "Draft",
    description: "",
    customization: {
      text: { enabled: false, maxLength: 20, defaultText: "Your Name" },
      logo: { enabled: false, maxFileSize: 2, allowedFormats: ["png", "jpg"] },
      font: { enabled: false, options: ["Poppins", "Arial"] },
    },
    salesCount: 0,
  });

  useEffect(() => {
    if (isEditing) {
      const loadProduct = async () => {
        try {
          const product = await customProductService.getCustomProductById(id);
          setFormData(product);
          if (product.mainImage) {
            setImagePreview(product.mainImage);
          }
        } catch (error) {
          toast.error("Failed to load product");
          navigate("/admin/custom-products");
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEditing, navigate]);

  // ---------- Handle Image Selection ----------
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, WEBP, or SVG images are allowed.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    setUploading(true);
    try {
      const base64 = await toBase64(file);
      setImagePreview(base64);
      setFormData((prev) => ({ ...prev, mainImage: base64 }));
      setImageFile(file);
    } catch (error) {
      toast.error("Failed to read image file.");
    } finally {
      setUploading(false);
    }
  };

  // ---------- Remove Image ----------
  const handleRemoveImage = () => {
    setImagePreview("");
    setImageFile(null);
    setFormData((prev) => ({ ...prev, mainImage: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ---------- Trigger file input ----------
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ---------- Form Change Handlers ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        customization: {
          ...prev.customization,
          [name]: { ...prev.customization[name], enabled: checked },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCustomizationChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        [section]: { ...prev.customization[section], [field]: value },
      },
    }));
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (formData.basePrice <= 0) {
      toast.error("Base price must be greater than 0");
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing) {
        await customProductService.updateCustomProduct(id, formData);
        toast.success("Product updated successfully");
      } else {
        await customProductService.createCustomProduct(formData);
        toast.success("Product created successfully");
      }
      navigate("/admin/custom-products");
    } catch (error) {
      toast.error(error.message || "Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin/custom-products" className="hover:text-orange-600 flex items-center gap-1">
          <ArrowLeft size={16} /> Custom Products
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">
          {isEditing ? `Edit "${formData.name}"` : "Create New Product"}
        </span>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
          <Package size={20} className="text-orange-500" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {isEditing ? "Edit Custom Tumbler" : "Create New Custom Tumbler"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="e.g. Matte Black Tumbler"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Base Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="basePrice"
                value={formData.basePrice}
                onChange={handleChange}
                min="0"
                step="50"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="e.g. 799"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tumbler Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* ---------- IMAGE UPLOAD ---------- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {/* Upload Button */}
              <button
                type="button"
                onClick={handleUploadClick}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all duration-200 text-gray-600 dark:text-gray-400"
              >
                <Upload size={18} />
                {uploading ? "Uploading..." : "Choose Image"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleImageChange}
                className="hidden"
              />
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {!imagePreview && (
                <div className="w-20 h-20 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400">
                  <ImageIcon size={24} />
                </div>
              )}
              <span className="text-xs text-gray-500">PNG, JPG, WEBP, SVG (max 5MB)</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              placeholder="Describe the product and its customization options..."
            />
          </div>

          {/* Customization Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Customization Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["text", "logo", "font"].map((section) => (
                <div
                  key={section}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={section}
                      checked={formData.customization[section]?.enabled}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <label className="font-medium capitalize text-gray-700 dark:text-gray-300">
                      {section}
                    </label>
                  </div>

                  {formData.customization[section]?.enabled && (
                    <div className="mt-3 space-y-2 pl-6">
                      {section === "text" && (
                        <>
                          <input
                            type="number"
                            placeholder="Max length"
                            value={formData.customization.text.maxLength}
                            onChange={(e) =>
                              handleCustomizationChange("text", "maxLength", parseInt(e.target.value))
                            }
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Default text"
                            value={formData.customization.text.defaultText}
                            onChange={(e) =>
                              handleCustomizationChange("text", "defaultText", e.target.value)
                            }
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </>
                      )}
                      {section === "logo" && (
                        <>
                          <input
                            type="number"
                            placeholder="Max size (MB)"
                            value={formData.customization.logo.maxFileSize}
                            onChange={(e) =>
                              handleCustomizationChange("logo", "maxFileSize", parseInt(e.target.value))
                            }
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Formats (comma separated)"
                            value={formData.customization.logo.allowedFormats?.join(", ")}
                            onChange={(e) =>
                              handleCustomizationChange("logo", "allowedFormats", e.target.value.split(", "))
                            }
                            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                          />
                        </>
                      )}
                      {section === "font" && (
                        <input
                          type="text"
                          placeholder="Font options (comma separated)"
                          value={formData.customization.font.options?.join(", ")}
                          onChange={(e) =>
                            handleCustomizationChange("font", "options", e.target.value.split(", "))
                          }
                          className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/admin/custom-products"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomProductForm;