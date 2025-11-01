'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tech',
    subcategory: '',
    tertiaryCategory: '',
    price: '',
    description: '',
    image: '',
    stock: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      console.log('Submitting product:', formData)
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          subcategory: formData.subcategory,
          tertiaryCategory: formData.tertiaryCategory,
          price: parseInt(formData.price),
          description: formData.description,
          image: formData.image,
          stock: parseInt(formData.stock)
        })
      })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.success) {
        alert('Product added successfully!')
        setFormData({
          name: '',
          category: 'Tech',
          subcategory: '',
          tertiaryCategory: '',
          price: '',
          description: '',
          image: '',
          stock: ''
        })
      } else {
        console.error('API Error:', data.error)
        alert('Error: ' + (data.error || 'Unknown error occurred'))
      }
    } catch (error) {
      console.error('Network Error:', error)
      alert('Network error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products">
          <button className="text-gray-600 hover:text-gray-800">← Back</button>
        </Link>
        <h1 className="text-3xl font-bold">➕ Add New Product</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Tech">Tech</option>
                <option value="Home">Home</option>
                <option value="Fashion">Fashion</option>
                <option value="Ayurvedic">Ayurvedic</option>
                <option value="Beauty">Beauty</option>
                <option value="Groceries">Groceries</option>
                <option value="Pooja">Pooja</option>
                <option value="Food & Drinks">Food & Drinks</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subcategory *</label>
              <select
                name="subcategory"
                value={formData.subcategory || ''}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Subcategory</option>
                {formData.category === 'Fashion' && (
                  <>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </>
                )}
                {formData.category === 'Tech' && (
                  <>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Accessories">Accessories</option>
                  </>
                )}
                {formData.category === 'Home' && (
                  <>
                    <option value="Decor">Decor</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Kitchenware">Kitchenware</option>
                    <option value="Appliances">Appliances</option>
                  </>
                )}
              </select>
            </div>
            
            {formData.category === 'Fashion' && formData.subcategory && (
              <div>
                <label className="block text-sm font-medium mb-2">Product Type *</label>
                <select
                  name="tertiaryCategory"
                  value={formData.tertiaryCategory || ''}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Type</option>
                  {formData.subcategory === 'Men' && (
                    <>
                      <option value="Formal-Shirts">Formal Shirts</option>
                      <option value="Casual-Shirts">Casual Shirts</option>
                      <option value="T-Shirts">T-Shirts</option>
                      <option value="Polo-T-Shirts">Polo T-Shirts</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Formal-Shoes">Formal Shoes</option>
                      <option value="Casual-Shoes">Casual Shoes</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Hoodies">Hoodies</option>
                      <option value="Watches">Watches</option>
                    </>
                  )}
                  {formData.subcategory === 'Women' && (
                    <>
                      <option value="Dresses">Dresses</option>
                      <option value="Sarees">Sarees</option>
                      <option value="Kurtis">Kurtis</option>
                      <option value="Tops">Tops</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Leggings">Leggings</option>
                      <option value="Skirts">Skirts</option>
                      <option value="Heels">Heels</option>
                      <option value="Flats">Flats</option>
                      <option value="Sandals">Sandals</option>
                      <option value="Handbags">Handbags</option>
                      <option value="Jewelry">Jewelry</option>
                    </>
                  )}
                  {formData.subcategory === 'Kids' && (
                    <>
                      <option value="Boys-T-Shirts">Boys T-Shirts</option>
                      <option value="Girls-Dresses">Girls Dresses</option>
                      <option value="Boys-Shirts">Boys Shirts</option>
                      <option value="Girls-Tops">Girls Tops</option>
                      <option value="Kids-Jeans">Kids Jeans</option>
                      <option value="Kids-Shorts">Kids Shorts</option>
                      <option value="Kids-Shoes">Kids Shoes</option>
                      <option value="School-Uniforms">School Uniforms</option>
                      <option value="Party-Wear">Party Wear</option>
                      <option value="Sleepwear">Sleepwear</option>
                      <option value="Winter-Wear">Winter Wear</option>
                      <option value="Accessories">Accessories</option>
                    </>
                  )}
                  {formData.subcategory === 'Accessories' && (
                    <>
                      <option value="Watches">Watches</option>
                      <option value="Sunglasses">Sunglasses</option>
                      <option value="Belts">Belts</option>
                      <option value="Wallets">Wallets</option>
                      <option value="Bags">Bags</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Caps-Hats">Caps & Hats</option>
                      <option value="Scarves">Scarves</option>
                      <option value="Ties">Ties</option>
                      <option value="Hair-Accessories">Hair Accessories</option>
                      <option value="Phone-Cases">Phone Cases</option>
                      <option value="Perfumes">Perfumes</option>
                    </>
                  )}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            <Link href="/admin/products">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}