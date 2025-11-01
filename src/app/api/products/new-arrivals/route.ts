import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Fetch products from both Product and VendorProduct collections with category "New Arrivals"
    const [products, vendorProducts] = await Promise.all([
      db.collection('Product').find({ 
        category: 'New Arrivals',
        quantity: { $gt: 0 }
      }).toArray(),
      db.collection('VendorProduct').find({ 
        category: 'New Arrivals',
        quantity: { $gt: 0 }
      }).toArray()
    ]);

    // Combine and format products
    const allProducts = [...products, ...vendorProducts].map(product => ({
      id: product._id.toString(),
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
      extraImages: product.extraImages || [],
      description: product.description,
      shortDescription: product.shortDescription,
      features: product.features || [],
      ratings: product.ratings || { average: 0, count: 0 },
      taxPercent: product.taxPercent || 18,
      sku: product.sku,
      specifications: product.specifications || {}
    }));

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error fetching new arrivals:', error);
    return NextResponse.json({ error: 'Failed to fetch new arrivals' }, { status: 500 });
  }
}