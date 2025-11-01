const { MongoClient } = require('mongodb');

async function testFashionVendorProducts() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'photos-test');
    
    // Get vendor ID
    const vendorsCollection = db.collection('vendors');
    const vendor = await vendorsCollection.findOne({ email: 'dhananjay.win2004@gmail.com' });
    
    if (!vendor) {
      console.log('❌ Vendor not found');
      return;
    }
    
    console.log('✅ Found vendor:', vendor.businessName);
    
    // Test products to add
    const testProducts = [
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}1`,
        name: 'Test Men T-Shirt',
        category: 'Fashion',
        subcategory: 'Men',
        tertiaryCategory: 'T-Shirts',
        price: 599,
        originalPrice: 999,
        discountPrice: 599,
        description: 'Test men t-shirt for fashion category',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        stock: 10,
        length: 25,
        width: 20,
        height: 2,
        weight: 200,
        brand: vendor.businessName || 'Test Brand',
        rating: 4.2,
        reviewCount: 15,
        status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}2`,
        name: 'Test Women Dress',
        category: 'Fashion',
        subcategory: 'Women',
        tertiaryCategory: 'Dresses',
        price: 899,
        originalPrice: 1499,
        discountPrice: 899,
        description: 'Test women dress for fashion category',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        stock: 8,
        length: 30,
        width: 25,
        height: 3,
        weight: 300,
        brand: vendor.businessName || 'Test Brand',
        rating: 4.5,
        reviewCount: 22,
        status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}3`,
        name: 'Test Kids T-Shirt',
        category: 'Fashion',
        subcategory: 'Kids',
        tertiaryCategory: 'Boys-T-Shirts',
        price: 399,
        originalPrice: 599,
        discountPrice: 399,
        description: 'Test kids t-shirt for fashion category',
        images: ['https://images.unsplash.com/photo-1503944168849-4d4b47e4b1b6?w=400'],
        stock: 15,
        length: 20,
        width: 15,
        height: 2,
        weight: 150,
        brand: vendor.businessName || 'Test Brand',
        rating: 4.3,
        reviewCount: 18,
        status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}4`,
        name: 'Test Fashion Watch',
        category: 'Fashion',
        subcategory: 'Accessories',
        tertiaryCategory: 'Watches',
        price: 1299,
        originalPrice: 1999,
        discountPrice: 1299,
        description: 'Test fashion watch for accessories category',
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400'],
        stock: 5,
        length: 10,
        width: 8,
        height: 1,
        weight: 100,
        brand: vendor.businessName || 'Test Brand',
        rating: 4.6,
        reviewCount: 35,
        status: 'active'
      }
    ];
    
    // Add test products
    const vendorProductsCollection = db.collection('vendorproducts');
    
    for (const product of testProducts) {
      const result = await vendorProductsCollection.insertOne(product);
      console.log(`✅ Added ${product.name} (${product.subcategory} → ${product.tertiaryCategory})`);
    }
    
    console.log('\n📊 Testing API response...');
    
    // Test API response
    const allVendorProducts = await vendorProductsCollection.find({ 
      vendorId: vendor._id.toString(),
      status: 'active',
      category: 'Fashion'
    }).toArray();
    
    console.log(`\n✅ Found ${allVendorProducts.length} fashion vendor products:`);
    
    allVendorProducts.forEach(product => {
      console.log(`- ${product.name} (${product.subcategory} → ${product.tertiaryCategory}) - Stock: ${product.stock}`);
    });
    
    // Test each category
    const categories = ['Men', 'Women', 'Kids', 'Accessories'];
    
    for (const category of categories) {
      const categoryProducts = allVendorProducts.filter(p => p.subcategory === category);
      console.log(`\n${category}: ${categoryProducts.length} products`);
      categoryProducts.forEach(p => console.log(`  - ${p.name} (${p.tertiaryCategory})`));
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n✅ Test completed');
  }
}

testFashionVendorProducts();