const { MongoClient } = require('mongodb');

async function fixCategories() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('=== FIXING CATEGORY NAMES ===');
    
    // Update tech to Tech
    const techResult = await db.collection('vendorproducts').updateMany(
      { category: 'tech' },
      { $set: { category: 'Tech' } }
    );
    console.log(`Updated ${techResult.modifiedCount} products from "tech" to "Tech"`);
    
    // Update home to Home
    const homeResult = await db.collection('vendorproducts').updateMany(
      { category: 'home' },
      { $set: { category: 'Home' } }
    );
    console.log(`Updated ${homeResult.modifiedCount} products from "home" to "Home"`);
    
    // Update fashion to Fashion
    const fashionResult = await db.collection('vendorproducts').updateMany(
      { category: 'fashion' },
      { $set: { category: 'Fashion' } }
    );
    console.log(`Updated ${fashionResult.modifiedCount} products from "fashion" to "Fashion"`);
    
    console.log('\n=== CHECKING UPDATED CATEGORIES ===');
    const allCategories = await db.collection('vendorproducts').distinct('category');
    console.log('All categories now:', allCategories);
    
    const techProducts = await db.collection('vendorproducts').find({ category: 'Tech' }).toArray();
    console.log(`\nTech products (${techProducts.length}):`);
    techProducts.forEach(p => console.log(`- ${p.name} (${p.subcategory})`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixCategories();