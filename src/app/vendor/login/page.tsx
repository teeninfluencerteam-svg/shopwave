'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VendorLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Clear any existing session on component mount
  useState(() => {
    localStorage.clear()
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Clear localStorage before login attempt
    localStorage.clear()

    try {
      const response = await fetch('/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      
      if (data.success) {
        if (data.vendor.status === 'approved') {
          // Create server session
          const sessionResponse = await fetch('/api/vendor/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.vendor.email })
          })
          
          if (sessionResponse.ok) {
            toast({ title: "Success", description: `Welcome ${data.vendor.businessName}!` })
            router.push('/vendor/dashboard')
          } else {
            toast({ title: "Error", description: "Session creation failed" })
          }
        } else {
          toast({ title: "Pending", description: "Your account is pending admin approval" })
        }
      } else {
        toast({ title: "Error", description: data.error })
      }
    } catch (error) {
      console.error('Login error:', error)
      localStorage.clear()
      toast({ title: "Error", description: "Login failed" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">🏪 Vendor Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="mt-4 text-center space-y-2">
          <Link href="/vendor/register" className="block text-blue-600 hover:underline">
            New vendor? Register here
          </Link>
          <Link href="/" className="block text-gray-600 hover:underline">
            Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}