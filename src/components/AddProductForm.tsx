'use client';

import { useState, useEffect } from 'react';
import { Upload, X, Plus, Zap, Star, Clock } from 'lucide-react';

const categoryTemplates = [
  { name: "Men's Fashion", category: "Fashion", subcategory: "Men", tertiaryCategory: "T-Shirts", color: "bg-blue-500" },
  { name: "Women's Fashion", category: "Fashion", subcategory: "Women", tertiaryCategory: "Dresses", color: "bg-pink-500" },
  { name: "Kids Fashion", category: "Fashion", subcategory: "Kids", tertiaryCategory: "T-Shirts", color: "bg-yellow-500" },
  { name: "Electronics", category: "Tech", subcategory: "Accessories", color: "bg-purple-500" },
  { name: "Home & Kitchen", category: "Home", subcategory: "Kitchenware", color: "bg-green-500" }
];

const fashionTertiaryCategories = {
  "Men": ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Shoes", "Accessories"],
  "Women": ["Dresses", "Tops", "Jeans", "Skirts", "Shoes", "Accessories", "Sarees"],
  "Kids": ["T-Shirts", "Dresses", "Shorts", "Shoes", "School Uniforms", "Party Wear"]
};

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productName: '', category: '', subcategory: '', tertiaryCategory: '',
    originalPrice: '', discountPrice: '', stock: '', length: '', width: '', height: '', weight: '', description: '', images: [] as File[]
  });
  const [lastUsed, setLastUsed] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('lastUsedCategory');
    if (saved) setLastUsed(JSON.parse(saved));
    
    const formSaved = localStorage.getItem('productFormData');
    if (formSaved) {
      const parsedData = JSON.parse(formSaved);
      setFormData(prev => ({ ...prev, ...parsedData }));
    }
  }, []);

  useEffect(() => {
    const dataToSave = { ...formData };
    delete dataToSave.images;
    localStorage.setItem('productFormData', JSON.stringify(dataToSave));
  }, [formData]);

  const handleTemplateSelect = (template: any) => {
    setFormData(prev => ({
      ...prev,
      category: template.category,
      subcategory: template.subcategory,
      tertiaryCategory: template.tertiaryCategory || ''
    }));
    localStorage.setItem('lastUsedCategory', JSON.stringify(template));
    setLastUsed(template);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    alert('Product successfully added!');
    
    const categoryData = {
      category: formData.category,
      subcategory: formData.subcategory,
      tertiaryCategory: formData.tertiaryCategory
    };
    
    setFormData({
      productName: '', category: categoryData.category, subcategory: categoryData.subcategory,
      tertiaryCategory: categoryData.tertiaryCategory, originalPrice: '', discountPrice: '',
      stock: '', length: '', width: '', height: '', weight: '', description: '', images: []
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Plus className="w-6 h-6 text-blue-500" />
        <h2 className="text-3xl font-bold">Add New Product</h2>
      </div>

      {/* Smart Category Selector */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" />
          Quick Category Selection
        </h3>
        
        {lastUsed && (
          <div className="mb-4">
            <button
              onClick={() => handleTemplateSelect(lastUsed)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              <Clock className="w-4 h-4" />
              Use Last: {lastUsed.name}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template)}
              className={`${template.color} text-white p-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium`}
            >
              <Star className="w-4 h-4" />
              {template.name}
            </button>
          ))}
        </div>

        {formData.category && (
          <div className="mt-4 p-3 bg-white rounded-lg border">
            <div className="text-sm text-gray-600">
              <strong>Selected:</strong> {formData.category} → {formData.subcategory}
              {formData.tertiaryCategory && ` → ${formData.tertiaryCategory}`}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input type="text" value={formData.productName} onChange={(e) => handleInputChange('productName', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Category</option>
              <option value="Fashion">Fashion</option>
              <option value="Tech">Tech</option>
              <option value="Home">Home</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subcategory *</label>
            <select value={formData.subcategory} onChange={(e) => handleInputChange('subcategory', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select Subcategory</option>
              {formData.category === 'Fashion' && (
                <><option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option></>
              )}
            </select>
          </div>

          {formData.category === 'Fashion' && formData.subcategory && (
            <div>
              <label className="block text-sm font-medium mb-2">Tertiary Category</label>
              <select value={formData.tertiaryCategory} onChange={(e) => handleInputChange('tertiaryCategory', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Tertiary Category</option>
                {fashionTertiaryCategories[formData.subcategory as keyof typeof fashionTertiaryCategories]?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Original Price *</label>
            <input type="number" value={formData.originalPrice} onChange={(e) => handleInputChange('originalPrice', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Discount Price</label>
            <input type="number" value={formData.discountPrice} onChange={(e) => handleInputChange('discountPrice', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input type="number" value={formData.stock} onChange={(e) => handleInputChange('stock', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight (grams)</label>
            <input type="number" value={formData.weight} onChange={(e) => handleInputChange('weight', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="e.g. 250" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" rows={4} required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Images *</label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onDragOver={(e) => { e.preventDefault(); setDragActive(true); }} onDragLeave={() => setDragActive(false)} onDrop={handleDrop}>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Drag & drop images or click to browse</p>
            <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600">Choose Images</label>
          </div>

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold">
          Add Product
        </button>
      </form>
    </div>
  );
}