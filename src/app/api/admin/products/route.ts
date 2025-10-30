import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import AdminProduct from '@/models/AdminProduct'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const products = await AdminProduct.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ 
      success: true, 
      products 
    })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch products' 
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const { productId, status } = await request.json()

    if (!productId || !status) {
      return NextResponse.json({ 
        success: false, 
        message: 'Product ID and status required' 
      }, { status: 400 })
    }

    const product = await AdminProduct.findByIdAndUpdate(
      productId,
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!product) {
      return NextResponse.json({ 
        success: false, 
        message: 'Product not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      message: `Product ${status} successfully` 
    })
  } catch (error) {
    console.error('Error updating product status:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update product status' 
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect()
    
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Product ID required' 
      }, { status: 400 })
    }

    const product = await AdminProduct.findByIdAndDelete(productId)

    if (!product) {
      return NextResponse.json({ 
        success: false, 
        message: 'Product not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete product' 
    }, { status: 500 })
  }
}