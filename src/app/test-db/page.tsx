'use client'
import { useState } from 'react'

export default function TestDB() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testVendorAPI = async () => {
    setLoading(true)
    setResult('Testing...')
    
    try {
      // Test fetching vendors
      const response = await fetch('/api/admin/vendors')
      const data = await response.json()
      
      setResult(`
📊 VENDOR API TEST RESULTS:
Status: ${response.ok ? '✅ Success' : '❌ Failed'}
Response: ${JSON.stringify(data, null, 2)}
      `)
    } catch (error) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testVendorRegistration = async () => {
    setLoading(true)
    setResult('Testing registration...')
    
    try {
      const testData = {
        email: `test${Date.now()}@vendor.com`,
        name: 'Test Vendor',
        businessName: 'Test Business',
        phone: '9876543210',
        businessType: 'Individual',
        address: {
          street: 'Test Street',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456'
        }
      }
      
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })
      
      const data = await response.json()
      
      setResult(`
📝 VENDOR REGISTRATION TEST:
Status: ${response.ok ? '✅ Success' : '❌ Failed'}
Response: ${JSON.stringify(data, null, 2)}
      `)
    } catch (error) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testVendorLogin = async () => {
    setLoading(true)
    setResult('Testing login...')
    
    try {
      const response = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@vendor.com' })
      })
      
      const data = await response.json()
      
      setResult(`
🔐 VENDOR LOGIN TEST:
Status: ${response.ok ? '✅ Success' : '❌ Failed'}
Response: ${JSON.stringify(data, null, 2)}
      `)
    } catch (error) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🧪 Database & API Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={testVendorAPI}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Test Vendor API
        </button>
        
        <button
          onClick={testVendorRegistration}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Test Registration
        </button>
        
        <button
          onClick={testVendorLogin}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Test Login
        </button>
      </div>
      
      {result && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
          <pre className="whitespace-pre-wrap text-sm overflow-auto max-h-96">
            {result}
          </pre>
        </div>
      )}
      
      <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">🎯 Quick Test Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Test Vendor API" to check if vendors are being fetched</li>
          <li>Click "Test Registration" to create a new test vendor</li>
          <li>Click "Test Login" to test login functionality</li>
          <li>Go to <a href="/admin/vendors" className="text-blue-600 underline">/admin/vendors</a> to see if vendors appear</li>
          <li>Go to <a href="/vendor/login" className="text-blue-600 underline">/vendor/login</a> to test actual login</li>
        </ol>
      </div>
    </div>
  )
}