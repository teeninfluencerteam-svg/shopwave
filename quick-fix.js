const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = 'photos-test';

async function quickFix() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const vendorsCollection = db.collection('vendors');
    
    // Check vendors
    const vendors = await vendorsCollection.find({}).toArray();
    console.log(`📊 Found ${vendors.length} vendors`);
    
    if (vendors.length === 0) {
      // Create test vendor
      const testVendor = {
        email: 'test@vendor.com',
        password: 'vendor123',
        vendorId: 'VND' + Date.now().toString().slice(-8),
        name: 'Test Vendor',
        businessName: 'Test Business',
        phone: '9876543210',
        businessType: 'Individual',
        address: {
          street: 'Test Street',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110001',
          country: 'India'
        },
        status: 'approved',
        commission: 15,
        totalEarnings: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        approvedAt: new Date()
      };
      
      await vendorsCollection.insertOne(testVendor);
      console.log('✅ Created test vendor');
    }
    
    // Fix missing fields
    await vendorsCollection.updateMany(
      { vendorId: { $exists: false } },
      { 
        $set: { 
          vendorId: 'VND' + Date.now().toString().slice(-8),
          updatedAt: new Date()
        }
      }
    );
    
    await vendorsCollection.updateMany(
      { password: { $exists: false } },
      { $set: { password: 'vendor123' } }
    );
    
    await vendorsCollection.updateMany(
      { commission: { $exists: false } },
      { $set: { commission: 15 } }
    );
    
    console.log('✅ Fixed missing fields');
    
    // Final check
    const finalVendors = await vendorsCollection.find({}).toArray();
    console.log(`\n📋 FINAL STATUS:`);
    console.log(`Total vendors: ${finalVendors.length}`);
    
    finalVendors.forEach((vendor, i) => {
      console.log(`${i+1}. ${vendor.businessName} (${vendor.email}) - ${vendor.status}`);
    });
    
    console.log('\n🎯 TEST THESE URLS:');
    console.log('1. http://localhost:3000/test-db - Test APIs');
    console.log('2. http://localhost:3000/admin/vendors - Admin panel');
    console.log('3. http://localhost:3000/vendor/login - Vendor login');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

quickFix().catch(console.error);