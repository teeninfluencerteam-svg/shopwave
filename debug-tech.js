const { MongoClient } = require('mongodb');

async function checkTechProducts() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('=== CHECKING ALL CATEGORIES ===');
    const allCategories = await db.collection('vendorproducts').distinct('category');
    console.log('All categories found:', allCategories);
    
    console.log('\n=== PRODUCTS WITH "tech" CATEGORY ===');
    const techLower = await db.collection('vendorproducts').find({ category: 'tech' }).toArray();
    console.log(`Found ${techLower.length} products with category "tech":`);
    techLower.forEach(p => console.log(`- ${p.name} (${p.subcategory})`));
    
    console.log('\n=== PRODUCTS WITH "Tech" CATEGORY ===');
    const techUpper = await db.collection('vendorproducts').find({ category: 'Tech' }).toArray();
    console.log(`Found ${techUpper.length} products with category "Tech":`);
    techUpper.forEach(p => console.log(`- ${p.name} (${p.subcategory})`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkTechProducts();