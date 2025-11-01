const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = 'photos-test';

async function checkVendorData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const vendorsCollection = db.collection('vendors');
    
    // Get all vendors
    const vendors = await vendorsCollection.find({}).toArray();
    console.log(`\n📊 Found ${vendors.length} vendors\n`);
    
    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ${vendor.businessName} (${vendor.email})`);
      console.log(`   Status: ${vendor.status}`);
      console.log(`   Total Earnings: ₹${vendor.totalEarnings || 0}`);
      console.log(`   Pending Payments: ₹${vendor.pendingPayments || 0}`);
      console.log(`   Total Revenue: ₹${vendor.totalRevenue || 0}`);
      console.log(`   Total Products: ${vendor.totalProducts || 0}`);
      console.log(`   Total Orders: ${vendor.totalOrders || 0}`);
      console.log(`   Rating: ${vendor.rating || 'N/A'}`);
      console.log(`   Review Count: ${vendor.reviewCount || 0}`);
      console.log(`   Commission: ${vendor.commission || 15}%`);
      console.log(`   Created: ${vendor.createdAt}`);
      console.log('   ---');
    });
    
    // Update sample data for testing
    if (vendors.length > 0) {
      const sampleVendor = vendors[0];
      console.log(`\n🔧 Updating sample data for: ${sampleVendor.businessName}`);
      
      await vendorsCollection.updateOne(
        { _id: sampleVendor._id },
        {
          $set: {
            totalEarnings: 25000,
            pendingPayments: 5000,
            totalRevenue: 30000,
            totalProducts: 15,
            totalOrders: 45,
            rating: 4.5,
            reviewCount: 23,
            updatedAt: new Date()
          }
        }
      );
      
      console.log('✅ Sample data updated!');
      
      // Verify update
      const updatedVendor = await vendorsCollection.findOne({ _id: sampleVendor._id });
      console.log('\n📈 Updated Stats:');
      console.log(`   Total Earnings: ₹${updatedVendor.totalEarnings}`);
      console.log(`   Pending Payments: ₹${updatedVendor.pendingPayments}`);
      console.log(`   Total Revenue: ₹${updatedVendor.totalRevenue}`);
      console.log(`   Total Products: ${updatedVendor.totalProducts}`);
      console.log(`   Total Orders: ${updatedVendor.totalOrders}`);
      console.log(`   Rating: ${updatedVendor.rating}`);
      console.log(`   Review Count: ${updatedVendor.reviewCount}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed');
  }
}

checkVendorData().catch(console.error);