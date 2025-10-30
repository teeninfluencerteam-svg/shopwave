'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VendorPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to vendor dashboard
    router.push('/vendor/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirecting to vendor dashboard...</p>
      </div>
    </div>
  )
}