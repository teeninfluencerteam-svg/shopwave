'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, GripVertical } from 'lucide-react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    subcategories: '',
    isActive: true,
    order: 0
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const response = await fetch('/api/admin/categories')
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      if (data.success) {
        setCategories(data.categories)
        console.log('Categories set:', data.categories.length)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const subcategoriesArray = formData.subcategories.split(',').map(s => s.trim()).filter(s => s)
      
      const response = await fetch('/api/admin/categories', {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subcategories: subcategoriesArray,
          ...(editingCategory && { id: editingCategory._id })
        })
      })
      
      if (response.ok) {
        fetchCategories()
        resetForm()
        alert(editingCategory ? 'Category updated!' : 'Category created!')
      }
    } catch (error) {
      alert('Error saving category')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', image: '', subcategories: '', isActive: true, order: 0 })
    setEditingCategory(null)
    setShowForm(false)
  }

  const editCategory = (category) => {
    setFormData({
      name: category.name,
      image: category.image,
      subcategories: category.subcategories.join(', '),
      isActive: category.isActive,
      order: category.order
    })
    setEditingCategory(category)
    setShowForm(true)
  }

  const moveCategory = async (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return
    
    const newCategories = [...categories]
    const [movedCategory] = newCategories.splice(fromIndex, 1)
    newCategories.splice(toIndex, 0, movedCategory)
    
    const updatedCategories = newCategories.map((cat, index) => ({
      ...cat,
      order: index + 1
    }))
    
    setCategories(updatedCategories)
    
    try {
      await Promise.all(
        updatedCategories.map(cat => 
          fetch('/api/admin/categories', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: cat._id, order: cat.order })
          })
        )
      )
    } catch (error) {
      console.error('Error updating order:', error)
      fetchCategories()
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subcategories (comma separated)</label>
              <input
                type="text"
                value={formData.subcategories}
                onChange={(e) => setFormData({...formData, subcategories: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Mobile Cases, Screen Protectors, Chargers"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  className="w-20 p-2 border rounded"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label className="text-sm">Active</label>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingCategory ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Categories ({categories.length})</h2>
        </div>
        <div className="divide-y">
          {categories.map((category, index) => (
            <div key={category._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <button
                  className="cursor-move p-1 text-gray-400 hover:text-gray-600"
                  onClick={() => moveCategory(index, index > 0 ? index - 1 : categories.length - 1)}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-600">
                    Subcategories: {category.subcategories.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">Order: {category.order}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveCategory(index, Math.max(0, index - 1))}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    disabled={index === 0}
                  >
                    UP
                  </button>
                  <button
                    onClick={() => moveCategory(index, Math.min(categories.length - 1, index + 1))}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    disabled={index === categories.length - 1}
                  >
                    DN
                  </button>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => editCategory(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}