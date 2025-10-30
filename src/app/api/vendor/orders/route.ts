import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import VendorOrder from '@/models/VendorOrder'

export const dynamic = 'force-dynamic'
export const maxDuration = 15

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!vendorId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Vendor ID required' 
      })
    }

    // Get orders with optimized query
    const orders = await VendorOrder.find({ vendorId })
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 50))
      .maxTimeMS(5000)
      .lean()

    // Simplified response without heavy customer lookup for dashboard
    const simplifiedOrders = orders.map(order => ({
      _id: order._id,
      orderId: order.orderId,
      customerEmail: order.customerId,
      vendorTotal: order.vendorTotal,
      status: order.status,
      createdAt: order.createdAt,
      items: order.items || []
    }))

    return NextResponse.json({ 
      success: true, 
      orders: simplifiedOrders 
    })

  } catch (error) {
    console.error('Error fetching vendor orders:', error)
    return NextResponse.json({ 
      success: true,
      orders: []
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { orderId, status } = await request.json()

    // Update order status
    const order = await VendorOrder.findByIdAndUpdate(
      orderId,
      { 
        status, 
        updatedAt: new Date(),
        ...(status === 'shipped' && { shippedAt: new Date() }),
        ...(status === 'delivered' && { deliveredAt: new Date() }),
        ...(status === 'cancelled' && { cancelledAt: new Date() })
      },
      { new: true }
    )

    if (!order) {
      return NextResponse.json({ 
        success: false, 
        error: 'Order not found' 
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: `Order ${status} successfully`,
      order 
    })

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update order' 
    })
  }
}