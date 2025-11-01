import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import VendorProduct from '@/models/VendorProduct';

export async function GET() {
  try {
    await dbConnect();
    
    const homeProducts = await VendorProduct.find({ 
      category: 'Home',
      status: 'active'
    }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: homeProducts,
      count: homeProducts.length
    });
  } catch (error) {
    console.error('Error fetching home products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch home products' },
      { status: 500 }
    );
  }
}