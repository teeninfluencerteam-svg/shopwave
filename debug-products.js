const { MongoClient } = require('mongodb');

async function checkProducts() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('=== CHECKING VENDOR PRODUCTS ===');
    const vendorProducts = await db.collection('vendorproducts').find({}).toArray();
    console.log(`Found ${vendorProducts.length} vendor products:`);
    
    vendorProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Category: ${product.category}, Subcategory: ${product.subcategory}, Status: ${product.status}`);
    });
    
    console.log('\n=== TECH PRODUCTS SPECIFICALLY ===');
    const techProducts = await db.collection('vendorproducts').find({ category: 'Tech' }).toArray();
    console.log(`Found ${techProducts.length} tech products:`);
    
    techProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - Subcategory: ${product.subcategory}, Status: ${product.status}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkProducts();