const { MongoClient } = require('mongodb');

async function checkVendors() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db();
    const vendors = await db.collection('vendors').find({}).limit(5).toArray();
    
    console.log('📊 Vendor Database Check:');
    console.log(`Total vendors found: ${vendors.length}`);
    
    if (vendors.length > 0) {
      console.log('\n🏪 Existing vendors:');
      vendors.forEach((vendor, index) => {
        console.log(`${index + 1}. ${vendor.name} (${vendor.email}) - Status: ${vendor.status}`);
      });
      console.log('\n✅ You can login with any of these emails at /vendor/login');
    } else {
      console.log('\n❌ No vendors found in database');
      console.log('✅ You need to register first at /vendor/register');
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('💡 Make sure your MongoDB is running and MONGODB_URI is set correctly');
  } finally {
    await client.close();
  }
}

checkVendors();