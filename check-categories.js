const { MongoClient } = require('mongodb');

async function checkCategories() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('🔍 Checking categories...\n');
    
    const categories = await db.collection('categories').find({}).toArray();
    console.log('📊 Total categories:', categories.length);
    
    if (categories.length > 0) {
      console.log('\n📋 Categories found:');
      categories.forEach(cat => {
        console.log(`- ${cat.name} (Order: ${cat.order}, Active: ${cat.isActive})`);
        console.log(`  Subcategories: ${cat.subcategories.join(', ')}`);
      });
    } else {
      console.log('❌ No categories found in database');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkCategories();