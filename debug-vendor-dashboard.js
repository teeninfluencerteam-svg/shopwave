const { MongoClient } = require('mongodb');

async function debugVendorDashboard() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('🔍 Debugging vendor dashboard stats...\n');
    
    // Get the first vendor
    const vendor = await db.collection('vendors').findOne({});
    console.log('📋 Vendor:', {
      _id: vendor._id,
      email: vendor.email,
      vendorId: vendor.vendorId,
      businessName: vendor.businessName
    });
    
    // Check orders with different vendorId formats
    console.log('\n🛒 Checking orders with different vendorId formats:');
    
    const ordersWithMongoId = await db.collection('vendororders').find({ vendorId: vendor._id.toString() }).toArray();
    console.log('Orders with MongoDB _id:', ordersWithMongoId.length);
    
    const ordersWithCustomId = await db.collection('vendororders').find({ vendorId: vendor.vendorId }).toArray();
    console.log('Orders with custom vendorId:', ordersWithCustomId.length);
    
    const ordersWithEmail = await db.collection('vendororders').find({ vendorId: vendor.email }).toArray();
    console.log('Orders with email:', ordersWithEmail.length);
    
    // Show actual orders
    const allOrders = await db.collection('vendororders').find({}).toArray();
    console.log('\n📊 All vendor orders:');
    allOrders.forEach(order => {
      console.log(`- Order ${order.orderId}: vendorId=${order.vendorId}, status=${order.status}, total=${order.vendorTotal}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

debugVendorDashboard();