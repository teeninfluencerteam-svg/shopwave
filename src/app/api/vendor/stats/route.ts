import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import VendorProduct from '@/models/VendorProduct'
import VendorOrder from '@/models/VendorOrder'

export const dynamic = 'force-dynamic'
export const maxDuration = 10

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')

    if (!vendorId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Vendor ID required' 
      }, { status: 400 })
    }
    
    await dbConnect()

    // Use aggregation pipeline for efficient stats calculation
    const [productStats, orderStats] = await Promise.all([
      VendorProduct.countDocuments({ vendorId }).maxTimeMS(3000),
      VendorOrder.aggregate([
        { $match: { vendorId } },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalEarnings: { $sum: '$netAmount' },
            pendingOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
            }
          }
        }
      ]).maxTimeMS(3000)
    ])

    const orderData = orderStats[0] || { totalOrders: 0, totalEarnings: 0, pendingOrders: 0 }
    
    const stats = {
      totalProducts: productStats,
      totalOrders: orderData.totalOrders,
      totalEarnings: orderData.totalEarnings,
      pendingOrders: orderData.pendingOrders
    }

    return NextResponse.json({ 
      success: true, 
      stats
    })
  } catch (error) {
    console.error('❌ Error fetching vendor stats:', error)
    
    return NextResponse.json({ 
      success: true,
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalEarnings: 0,
        pendingOrders: 0
      }
    })
  }
}