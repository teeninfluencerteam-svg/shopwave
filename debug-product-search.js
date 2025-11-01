const { MongoClient } = require('mongodb');

async function debugProductSearch() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    const searchSlug = 'portable-mobile-phone-holder-fan-–-handheld,-multi-function-(battery-not-include)';
    const searchName = searchSlug.replace(/-/g, ' ');
    
    console.log('=== SEARCHING FOR PRODUCT ===');
    console.log('URL slug:', searchSlug);
    console.log('Converted name:', searchName);
    
    console.log('\n=== ALL VENDOR PRODUCTS ===');
    const allProducts = await db.collection('vendorproducts').find({}).toArray();
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. "${product.name}" - ID: ${product._id}`);
    });
    
    console.log('\n=== SEARCHING BY NAME PATTERN ===');
    const byName = await db.collection('vendorproducts').find({
      name: { $regex: new RegExp(searchName, 'i') }
    }).toArray();
    console.log(`Found ${byName.length} products by name pattern`);
    byName.forEach(p => console.log(`- ${p.name}`));
    
    console.log('\n=== SEARCHING FOR SIMILAR NAMES ===');
    const similar = await db.collection('vendorproducts').find({
      name: { $regex: /portable.*mobile.*phone.*holder/i }
    }).toArray();
    console.log(`Found ${similar.length} products with similar names`);
    similar.forEach(p => console.log(`- ${p.name}`));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

debugProductSearch();