const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = 'photos-test';

async function updateAllVendors() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const vendorsCollection = db.collection('vendors');
    
    const vendors = await vendorsCollection.find({ status: 'approved' }).toArray();
    console.log(`\n🔧 Updating ${vendors.length} approved vendors with sample data...\n`);
    
    for (let i = 0; i < vendors.length; i++) {
      const vendor = vendors[i];
      
      // Generate random but realistic data
      const totalProducts = Math.floor(Math.random() * 50) + 5; // 5-55 products
      const totalOrders = Math.floor(Math.random() * 200) + 10; // 10-210 orders
      const totalRevenue = Math.floor(Math.random() * 100000) + 10000; // 10k-110k revenue
      const totalEarnings = Math.floor(totalRevenue * 0.7); // 70% of revenue
      const pendingPayments = Math.floor(totalRevenue * 0.1); // 10% pending
      const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0 rating
      const reviewCount = Math.floor(Math.random() * 100) + 5; // 5-105 reviews
      
      await vendorsCollection.updateOne(
        { _id: vendor._id },
        {
          $set: {
            totalEarnings,
            pendingPayments,
            totalRevenue,
            totalProducts,
            totalOrders,
            rating: parseFloat(rating),
            reviewCount,
            updatedAt: new Date()
          }
        }
      );
      
      console.log(`${i + 1}. ${vendor.businessName}:`);
      console.log(`   Products: ${totalProducts}, Orders: ${totalOrders}`);
      console.log(`   Revenue: ₹${totalRevenue.toLocaleString()}, Rating: ${rating}`);
    }
    
    console.log('\n✅ All vendors updated with sample data!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed');
  }
}

updateAllVendors().catch(console.error);