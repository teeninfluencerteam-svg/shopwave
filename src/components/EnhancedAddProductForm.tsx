'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import SmartCategorySelector from './SmartCategorySelector';

const fashionTertiaryCategories = {
  "Men": ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Shoes", "Accessories"],
  "Women": ["Dresses", "Tops", "Jeans", "Skirts", "Shoes", "Accessories", "Sarees"],
  "Kids": ["T-Shirts", "Dresses", "Shorts", "Shoes", "School Uniforms", "Party Wear"]
};

export default function EnhancedAddProductForm() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subcategory: '',
    tertiaryCategory: '',
    originalPrice: '',
    discountPrice: '',
    stock: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    description: '',
    images: [] as File[]
  });

  const [dragActive, setDragActive] = useState(false);

  // Load saved form data on component mount
  useEffect(() => {
    const saved = localStorage.getItem('productFormData');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...parsedData }));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const dataToSave = { ...formData };
    delete dataToSave.images; // Don't save images to localStorage
    localStorage.setItem('productFormData', JSON.stringify(dataToSave));
  }, [formData]);

  // Clear localStorage form data when component unmounts or navigates away
  useEffect(() => {
    return () => {
      // Only clear if form is empty (user navigated away)
      if (!formData.productName && !formData.originalPrice) {
        localStorage.removeItem('productFormData');
      }
    };
  }, [formData.productName, formData.originalPrice]);

  const handleCategorySelect = (category: string, subcategory: string, tertiaryCategory?: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      subcategory,
      tertiaryCategory: tertiaryCategory || ''
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const required = ['productName', 'category', 'subcategory', 'originalPrice', 'stock'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      alert(`कृपया ये fields भरें: ${missing.join(', ')}`);
      return;
    }

    console.log('Product Data:', formData);
    alert('Product successfully added!');
    
    // Save current category as last used
    const currentCategory = {
      name: `${formData.subcategory} ${formData.category}`,
      category: formData.category,
      subcategory: formData.subcategory,
      tertiaryCategory: formData.tertiaryCategory
    };
    localStorage.setItem('lastUsedCategory', JSON.stringify(currentCategory));
    
    // Clear form but keep category selection
    setFormData({
      productName: '',
      category: formData.category,
      subcategory: formData.subcategory,
      tertiaryCategory: formData.tertiaryCategory,
      originalPrice: '',
      discountPrice: '',
      stock: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      description: '',
      images: []
    });
  };

  const getTertiaryCategories = () => {
    if (formData.category === 'Fashion' && formData.subcategory) {
      return fashionTertiaryCategories[formData.subcategory as keyof typeof fashionTertiaryCategories] || [];
    }
    return [];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="w-6 h-6 text-blue-500" />
        <h2 className="text-3xl font-bold">Add New Product</h2>
      </div>

      {/* Smart Category Selector */}
      <SmartCategorySelector
        onCategorySelect={handleCategorySelect}
        selectedCategory={formData.category}
        selectedSubcategory={formData.subcategory}
        selectedTertiaryCategory={formData.tertiaryCategory}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Fashion">Fashion</option>
              <option value="Tech">Tech</option>
              <option value="Home">Home</option>
              <option value="New Arrivals">New Arrivals</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium mb-2">Subcategory *</label>
            <select
              value={formData.subcategory}
              onChange={(e) => handleInputChange('subcategory', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subcategory</option>
              {formData.category === 'Fashion' && (
                <>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </>
              )}
              {formData.category === 'Tech' && (
                <>
                  <option value="Accessories">Accessories</option>
                  <option value="Audio">Audio</option>
                </>
              )}
              {formData.category === 'Home' && (
                <>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Bathroom-Accessories">Bathroom Accessories</option>
                </>
              )}
            </select>
          </div>

          {/* Tertiary Category (Fashion only) */}
          {formData.category === 'Fashion' && formData.subcategory && (
            <div>
              <label className="block text-sm font-medium mb-2">Tertiary Category</label>
              <select
                value={formData.tertiaryCategory}
                onChange={(e) => handleInputChange('tertiaryCategory', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Tertiary Category</option>
                {getTertiaryCategories().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Prices */}
          <div>
            <label className="block text-sm font-medium mb-2">Original Price *</label>
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => handleInputChange('originalPrice', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="₹ 0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Discount Price</label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) => handleInputChange('discountPrice', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="₹ 0"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              required
            />
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium mb-2">Length (cm)</label>
            <input
              type="number"
              value={formData.length}
              onChange={(e) => handleInputChange('length', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Width (cm)</label>
            <input
              type="number"
              value={formData.width}
              onChange={(e) => handleInputChange('width', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleInputChange('height', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight (grams)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 250"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Product Images *</label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag & drop images or click to browse</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
            >
              Choose Images
            </label>
          </div>

          {/* Image Preview */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}