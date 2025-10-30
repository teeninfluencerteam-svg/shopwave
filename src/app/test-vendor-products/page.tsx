'use client'
import { useState, useEffect } from 'react'
import { Package, CheckCircle, Clock, XCircle, Bug } from 'lucide-react'

export default function TestVendorProductsPage() {
  const [products, setProducts] = useState([])
  const [debugInfo, setDebugInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
    fetchDebugInfo()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      
      // Filter only vendor products
      const vendorProducts = data.filter(product => product.isVendorProduct)
      setProducts(vendorProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/api/debug-vendor-products')
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      console.error('Error fetching debug info:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vendor Products on Website</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{products.length} vendor products visible</span>
          <button
            onClick={() => {
              fetchProducts()
              fetchDebugInfo()
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendor products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Vendor Products</h3>
          <p className="text-gray-500">No approved vendor products are currently visible on the website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package className="h-16 w-16" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStatusIcon(product.status)}
                    <span className="ml-1">{product.status}</span>
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Vendor Product
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">₹{product.price?.discounted || product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stock:</span>
                    <span>{product.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendor ID:</span>
                    <span className="font-mono text-xs">{product.vendorId}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t text-xs text-gray-400">
                  Added: {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {debugInfo && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Debug Information
          </h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <div>Total vendor products in database: <strong>{debugInfo.totalVendorProducts}</strong></div>
            <div>Active vendor products in database: <strong>{debugInfo.activeVendorProducts}</strong></div>
            <div>Vendor products showing on website: <strong>{products.length}</strong></div>
            
            {debugInfo.activeProducts && debugInfo.activeProducts.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Active Products in Database:</h4>
                <div className="space-y-1">
                  {debugInfo.activeProducts.map(p => (
                    <div key={p.id} className="text-xs bg-yellow-100 p-2 rounded">
                      {p.name} - Status: {p.status} - Price: ₹{p.price}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">How Vendor Product Approval Works:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>1. Vendors submit products with status "pending"</li>
          <li>2. Admin reviews products in Admin Panel → Pending Products</li>
          <li>3. Admin clicks "Approve" to change status to "active"</li>
          <li>4. Only "active" vendor products show on the website</li>
          <li>5. Users can see and purchase approved vendor products</li>
        </ul>
      </div>
    </div>
  )
}