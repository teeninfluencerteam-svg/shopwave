import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VendorProduct from '@/models/VendorProduct';

export async function GET() {
  try {
    await dbConnect();
    
    const techProducts = await VendorProduct.find({ 
      category: 'Tech',
      status: 'active'
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: techProducts,
      count: techProducts.length
    });
  } catch (error) {
    console.error('Error fetching tech products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tech products' },
      { status: 500 }
    );
  }
}