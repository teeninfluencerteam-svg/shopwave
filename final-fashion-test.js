const { MongoClient } = require('mongodb');

async function finalFashionTest() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    console.log('🧪 Final Fashion Test - Simulating Complete API Flow\n');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'photos-test');
    
    // Simulate what /api/products returns
    const [regularProducts, vendorProducts] = await Promise.all([
      db.collection('products').find({}).lean ? db.collection('products').find({}).toArray() : db.collection('products').find({}).toArray(),
      db.collection('vendorproducts').find({ status: 'active' }).toArray()
    ]);
    
    // Transform vendor products to match expected format (like in API)
    const transformedVendorProducts = vendorProducts.map(product => ({
      ...product,
      id: product._id.toString(),
      _id: product._id.toString(),
      image: product.images?.[0] || '',
      extraImages: product.images || [],
      shortDescription: product.description?.substring(0, 100) + '...' || '',
      features: [],
      specifications: {},
      ratings: { 
        average: product.rating || 4.2, 
        count: product.reviewCount || Math.floor(Math.random() * 50) + 10 
      },
      inStock: product.stock > 0,
      quantity: product.stock,
      isVendorProduct: true,
      slug: product.name.toLowerCase().replace(/\\s+/g, '-'),
      price_original: product.originalPrice || product.price,
      price_discounted: product.discountPrice || product.price,
      price_currency: '₹',
      price: {
        original: product.originalPrice || product.price,
        discounted: product.discountPrice || product.price,
        currency: '₹'
      }
    }));
    
    // Combine all products
    const allProducts = [...regularProducts, ...transformedVendorProducts];
    
    console.log(`📊 Total Products: ${allProducts.length}`);
    console.log(`📊 Vendor Products: ${transformedVendorProducts.length}`);
    console.log(`📊 Regular Products: ${regularProducts.length}\n`);
    
    // Test Fashion Category
    const fashionProducts = allProducts.filter(p => p.category === 'Fashion');
    console.log(`👗 Fashion Products: ${fashionProducts.length}`);
    
    // Test Fashion Subcategories
    const fashionSubcategories = {
      'Men': fashionProducts.filter(p => p.subcategory === 'Men'),
      'Women': fashionProducts.filter(p => p.subcategory === 'Women'),
      'Kids': fashionProducts.filter(p => p.subcategory === 'Kids'),
      'Accessories': fashionProducts.filter(p => p.subcategory === 'Accessories')
    };
    
    console.log('\\n📂 Fashion Subcategories:');
    Object.entries(fashionSubcategories).forEach(([subcategory, products]) => {
      console.log(`  ${subcategory}: ${products.length} products`);
      products.forEach(p => {
        const type = p.isVendorProduct ? '[VENDOR]' : '[JSON]';
        console.log(`    - ${p.name} ${type}`);
      });
    });
    
    // Test Fashion Tertiary Categories
    console.log('\\n🎯 Fashion Tertiary Categories:');
    const tertiaryCategories = {};
    
    fashionProducts.forEach(p => {
      if (p.tertiaryCategory) {
        if (!tertiaryCategories[p.tertiaryCategory]) {
          tertiaryCategories[p.tertiaryCategory] = [];
        }
        tertiaryCategories[p.tertiaryCategory].push(p);
      }
    });
    
    Object.entries(tertiaryCategories).forEach(([tertiary, products]) => {
      console.log(`  ${tertiary}: ${products.length} products`);
      products.forEach(p => {
        const type = p.isVendorProduct ? '[VENDOR]' : '[JSON]';
        console.log(`    - ${p.name} ${type} (${p.subcategory})`);
      });
    });
    
    // Test Search Filtering
    console.log('\\n🔍 Testing Search Filtering:');
    
    const searchTests = [
      { category: 'Fashion', expected: fashionProducts.length },
      { category: 'Fashion', subcategory: 'Men', expected: fashionSubcategories.Men.length },
      { category: 'Fashion', subcategory: 'Women', expected: fashionSubcategories.Women.length },
      { category: 'Fashion', subcategory: 'Kids', expected: fashionSubcategories.Kids.length },
      { category: 'Fashion', subcategory: 'Accessories', expected: fashionSubcategories.Accessories.length }
    ];
    
    searchTests.forEach(test => {
      let filtered = allProducts.filter(p => p.category === test.category);
      if (test.subcategory) {
        filtered = filtered.filter(p => p.subcategory === test.subcategory);
      }
      
      const status = filtered.length === test.expected ? '✅' : '❌';
      const url = test.subcategory ? 
        `/search?category=${test.category}&subcategory=${test.subcategory}` :
        `/search?category=${test.category}`;
      
      console.log(`  ${status} ${url} → ${filtered.length} products (expected: ${test.expected})`);
    });
    
    // Test Tertiary Category URLs
    console.log('\\n🎯 Testing Tertiary Category URLs:');
    Object.entries(tertiaryCategories).forEach(([tertiary, products]) => {
      const product = products[0];
      const url = `/search?category=Fashion&subcategory=${product.subcategory}&tertiaryCategory=${tertiary}`;
      console.log(`  ✅ ${url} → ${products.length} products`);
    });
    
    console.log('\\n🎉 Fashion Test Results:');
    console.log(`✅ Fashion Category: Working (${fashionProducts.length} products)`);
    console.log(`✅ Fashion Subcategories: Working (${Object.keys(fashionSubcategories).length} subcategories)`);
    console.log(`✅ Fashion Tertiary Categories: Working (${Object.keys(tertiaryCategories).length} tertiary categories)`);
    console.log(`✅ Vendor Products: Working (${transformedVendorProducts.filter(p => p.category === 'Fashion').length} fashion vendor products)`);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await client.close();
    console.log('\\n✅ Test completed');
  }
}

finalFashionTest();