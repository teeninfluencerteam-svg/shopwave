const { MongoClient } = require('mongodb');

async function activatePendingProducts() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'photos-test');
    const vendorProductsCollection = db.collection('vendorproducts');
    
    // Find all pending products
    const pendingProducts = await vendorProductsCollection.find({ status: 'pending' }).toArray();
    console.log(`Found ${pendingProducts.length} pending products`);
    
    if (pendingProducts.length > 0) {
      // Update all pending products to active
      const result = await vendorProductsCollection.updateMany(
        { status: 'pending' },
        { $set: { status: 'active' } }
      );
      
      console.log(`✅ Activated ${result.modifiedCount} products`);
      
      // Show some examples
      const activatedProducts = await vendorProductsCollection.find({ status: 'active' }).limit(5).toArray();
      console.log('\nSample activated products:');
      activatedProducts.forEach(product => {
        console.log(`- ${product.name} (${product.category})`);
      });
    } else {
      console.log('No pending products found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

activatePendingProducts();