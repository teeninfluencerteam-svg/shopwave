const { MongoClient } = require('mongodb');

async function testNewArrivalsProducts() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    // Add a test New Arrivals product
    const testProduct = {
      vendorId: '6900c051caaa26a28a057b05',
      productId: `PRD${Date.now()}`,
      name: 'Test New Arrivals Product',
      slug: 'test-new-arrivals-product',
      category: 'New Arrivals',
      subcategory: 'Best Selling',
      price: 299,
      originalPrice: 399,
      discountPrice: 299,
      images: ['https://via.placeholder.com/300'],
      description: 'This is a test New Arrivals product',
      features: ['Test feature 1', 'Test feature 2'],
      stock: 10,
      length: 10,
      width: 10,
      height: 10,
      weight: 100,
      brand: 'Test Brand',
      rating: 4.5,
      reviewCount: 15,
      status: 'active',
      createdAt: new Date()
    };
    
    const result = await db.collection('vendorproducts').insertOne(testProduct);
    console.log('Test product added:', result.insertedId);
    
    // Check all New Arrivals products
    const newArrivalsProducts = await db.collection('vendorproducts').find({ 
      category: 'New Arrivals'
    }).toArray();
    
    console.log(`\nFound ${newArrivalsProducts.length} New Arrivals products:`);
    newArrivalsProducts.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}"`);
      console.log(`   Slug: ${product.slug || 'NO SLUG'}`);
      console.log(`   Subcategory: ${product.subcategory}`);
      console.log(`   Features: ${product.features?.length || 0} features`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testNewArrivalsProducts();