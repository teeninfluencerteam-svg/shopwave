const { MongoClient } = require('mongodb');

async function debugNewArrivals() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('=== NEW ARRIVALS PRODUCTS ===');
    const newArrivals = await db.collection('vendorproducts').find({ 
      category: { $in: ['New Arrivals', 'newArrivals'] }
    }).toArray();
    
    console.log(`Found ${newArrivals.length} New Arrivals products:`);
    newArrivals.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}"`);
      console.log(`   ID: ${product._id}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Images: ${product.images?.length || 0}`);
      console.log('');
    });
    
    if (newArrivals.length > 0) {
      const testProduct = newArrivals[0];
      console.log('=== TEST PRODUCT DETAILS ===');
      console.log('Name:', testProduct.name);
      console.log('Slug:', testProduct.slug);
      console.log('Features:', testProduct.features);
      console.log('All fields:', Object.keys(testProduct));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugNewArrivals();