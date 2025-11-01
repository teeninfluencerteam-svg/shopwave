import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Vendor from '@/models/Vendor'

export const dynamic = 'force-dynamic'
export const maxDuration = 10

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    const email = searchParams.get('email')

    if (!vendorId && !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Vendor ID or email required' 
      })
    }

    const vendor = vendorId ? 
      await Vendor.findById(vendorId).maxTimeMS(3000).lean() : 
      await Vendor.findOne({ email }).maxTimeMS(3000).lean()
    
    if (!vendor) {
      return NextResponse.json({ 
        success: false, 
        error: 'Vendor not found' 
      })
    }

    return NextResponse.json({ 
      success: true, 
      vendor 
    })

  } catch (error) {
    console.error('Error fetching vendor profile:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch profile' 
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { vendorId, ...updateData } = await request.json()
    console.log('Updating vendor profile:', vendorId)

    // Add timestamp
    updateData.updatedAt = new Date()

    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      updateData,
      { new: true, maxTimeMS: 3000 }
    )

    if (!vendor) {
      console.log('Vendor not found:', vendorId)
      return NextResponse.json({ 
        success: false, 
        error: 'Vendor not found' 
      }, { status: 404 })
    }

    console.log('Vendor profile updated successfully')
    return NextResponse.json({ 
      success: true, 
      vendor,
      message: 'Profile updated successfully'
    })

  } catch (error) {
    console.error('Error updating vendor profile:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update profile',
      details: error.message
    }, { status: 500 })
  }
}