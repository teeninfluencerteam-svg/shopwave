const { MongoClient } = require('mongodb');

async function checkFashionDB() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'photos-test');
    
    // Check vendor products
    const vendorProductsCollection = db.collection('vendorproducts');
    const fashionVendorProducts = await vendorProductsCollection.find({ 
      category: 'Fashion',
      status: 'active'
    }).toArray();
    
    console.log(`\n✅ Found ${fashionVendorProducts.length} fashion vendor products:`);
    
    fashionVendorProducts.forEach(product => {
      console.log(`- ${product.name}`);
      console.log(`  Category: ${product.category}`);
      console.log(`  Subcategory: ${product.subcategory}`);
      console.log(`  Tertiary: ${product.tertiaryCategory}`);
      console.log(`  Status: ${product.status}`);
      console.log(`  Stock: ${product.stock}`);
      console.log(`  Price: ${product.price} (Original: ${product.originalPrice})`);
      console.log('---');
    });
    
    // Check regular products
    const productsCollection = db.collection('products');
    const fashionProducts = await productsCollection.find({ 
      category: 'Fashion'
    }).toArray();
    
    console.log(`\n✅ Found ${fashionProducts.length} regular fashion products`);
    
    // Test what API should return
    console.log('\n🔍 Simulating API response...');
    
    // This is what the API should return
    const apiResponse = [
      ...fashionProducts.map(p => ({ ...p, isVendorProduct: false })),
      ...fashionVendorProducts.map(p => ({ 
        ...p, 
        id: p._id.toString(),
        isVendorProduct: true,
        inStock: p.stock > 0,
        quantity: p.stock
      }))
    ];
    
    console.log(`Total fashion products API should return: ${apiResponse.length}`);
    
    const categories = {
      'Men': apiResponse.filter(p => p.subcategory === 'Men'),
      'Women': apiResponse.filter(p => p.subcategory === 'Women'),
      'Kids': apiResponse.filter(p => p.subcategory === 'Kids'),
      'Accessories': apiResponse.filter(p => p.subcategory === 'Accessories')
    };
    
    Object.entries(categories).forEach(([category, products]) => {
      console.log(`${category}: ${products.length} products`);
      products.forEach(p => {
        const type = p.isVendorProduct ? '(Vendor)' : '(Regular)';
        console.log(`  - ${p.name} ${type} → ${p.tertiaryCategory || 'No tertiary'}`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkFashionDB();