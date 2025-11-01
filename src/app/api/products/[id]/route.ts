import { NextResponse, type NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const { db } = await connectToDatabase();
    let product = null;
    
    // Try to find by ObjectId first
    if (ObjectId.isValid(id)) {
      const [regularProduct, vendorProduct] = await Promise.all([
        db.collection('Product').findOne({ _id: new ObjectId(id) }),
        db.collection('VendorProduct').findOne({ _id: new ObjectId(id) })
      ]);
      product = regularProduct || vendorProduct;
    }
    
    // If not found by ID, try by slug
    if (!product) {
      const [regularProduct, vendorProduct] = await Promise.all([
        db.collection('Product').findOne({ slug: id }),
        db.collection('VendorProduct').findOne({ slug: id })
      ]);
      product = regularProduct || vendorProduct;
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Transform product for frontend
    const transformedProduct = {
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
      specifications: product.specifications || {},
      isCustomizable: product.isCustomizable || false,
      weight: product.weight || 0
    };

    return NextResponse.json(transformedProduct);
    
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT - update product
// PUT - update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await dbConnect();

    try {
        const updateData = await request.json();
        
        const product = await Product.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        ).lean();
        
        if (!product) {
            return NextResponse.json({ 
                success: false, 
                error: 'Product not found' 
            }, { status: 404 });
        }

        const transformedProduct = {
            ...product,
            id: product._id.toString(),
            _id: product._id.toString()
        };

        return NextResponse.json({ 
            success: true,
            data: transformedProduct 
        });
        
    } catch (error) {
        console.error('Error in PUT /api/products/[id]:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Failed to update product' 
        }, { status: 500 });
    }
}

// POST is not supported for this endpoint
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbConnect();

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product not found' 
      }, { status: 404 });
    }


    return NextResponse.json({ 
      success: true, 
      message: 'Product and its reviews deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/products/[id]:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete product' 
    }, { status: 500 });
  }
}