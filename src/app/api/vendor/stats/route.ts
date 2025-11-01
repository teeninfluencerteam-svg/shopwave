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
    
    console.log('📊 Fetching stats for vendorId:', vendorId)
    await dbConnect()

    // Get vendor details to find the correct vendorId used in products and orders
    const mongoose = require('mongoose')
    const Vendor = require('@/models/Vendor').default
    
    let actualVendorId = vendorId
    let vendor = null
    
    try {
      vendor = await Vendor.findById(vendorId).lean()
      if (vendor && vendor.vendorId) {
        actualVendorId = vendor.vendorId
      }
      console.log('🔍 Vendor found:', { _id: vendorId, vendorId: vendor?.vendorId, email: vendor?.email })
    } catch (e) {
      console.log('Error fetching vendor details:', e.message)
    }
    
    // Count products for this vendor (try multiple vendorId formats)
    console.log('Counting products for actualVendorId:', actualVendorId)
    
    let productStats = await VendorProduct.countDocuments({ vendorId: actualVendorId }).maxTimeMS(3000)
    console.log('Product count with actualVendorId:', productStats)
    
    // If no products found, try with original vendorId or email
    if (productStats === 0) {
      productStats = await VendorProduct.countDocuments({ vendorId }).maxTimeMS(3000)
      console.log('Product count with original vendorId:', productStats)
      
      if (productStats === 0 && vendor && vendor.email) {
        productStats = await VendorProduct.countDocuments({ vendorId: vendor.email }).maxTimeMS(3000)
        console.log('Product count with email vendorId:', productStats)
      }
    }
    
    // Use the same actualVendorId for orders
    
    // Try all possible vendorId formats and combine results
    const vendorIdFormats = [actualVendorId, vendorId]
    if (vendor && vendor.email) vendorIdFormats.push(vendor.email)
    
    let totalOrders = 0
    let pendingOrders = 0
    let totalEarnings = 0
    
    for (const vid of vendorIdFormats) {
      const orders = await VendorOrder.countDocuments({ vendorId: vid }).maxTimeMS(3000)
      const pending = await VendorOrder.countDocuments({ vendorId: vid, status: 'pending' }).maxTimeMS(3000)
      
      if (orders > 0) {
        totalOrders += orders
        pendingOrders += pending
        
        const earningsResult = await VendorOrder.aggregate([
          { $match: { vendorId: vid, status: { $ne: 'pending' } } },
          { $group: { _id: null, totalEarnings: { $sum: '$netAmount' } } }
        ]).maxTimeMS(3000)
        
        totalEarnings += earningsResult[0]?.totalEarnings || 0
      }
    }
    
    console.log('📊 Order stats found:', { totalOrders, pendingOrders, totalEarnings, actualVendorId })
    
    const stats = {
      totalProducts: productStats,
      totalOrders: totalOrders,
      totalEarnings: totalEarnings,
      pendingOrders: pendingOrders
    }

    console.log('📊 Final vendor stats:', stats)
    console.log('📊 VendorId used for queries:', vendorId)

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