const { MongoClient } = require('mongodb');

async function debugVendorStats() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('🔍 Debugging vendor stats...\n');
    
    // Check vendors
    const vendors = await db.collection('vendors').find({}).toArray();
    console.log('📊 Total vendors:', vendors.length);
    if (vendors.length > 0) {
      console.log('📋 First vendor:', {
        _id: vendors[0]._id,
        email: vendors[0].email,
        businessName: vendors[0].businessName
      });
    }
    
    // Check vendor products
    const vendorProducts = await db.collection('vendorproducts').find({}).toArray();
    console.log('📦 Total vendor products:', vendorProducts.length);
    if (vendorProducts.length > 0) {
      console.log('📋 First vendor product:', {
        _id: vendorProducts[0]._id,
        vendorId: vendorProducts[0].vendorId,
        name: vendorProducts[0].name
      });
    }
    
    // Check vendor orders
    const vendorOrders = await db.collection('vendororders').find({}).toArray();
    console.log('🛒 Total vendor orders:', vendorOrders.length);
    if (vendorOrders.length > 0) {
      console.log('📋 First vendor order:', {
        _id: vendorOrders[0]._id,
        orderId: vendorOrders[0].orderId,
        vendorId: vendorOrders[0].vendorId,
        customerId: vendorOrders[0].customerId,
        vendorTotal: vendorOrders[0].vendorTotal,
        status: vendorOrders[0].status
      });
    }
    
    // Check admin orders
    const adminOrders = await db.collection('adminorders').find({}).toArray();
    console.log('📋 Total admin orders:', adminOrders.length);
    if (adminOrders.length > 0) {
      console.log('📋 First admin order:', {
        _id: adminOrders[0]._id,
        orderId: adminOrders[0].orderId,
        userId: adminOrders[0].userId,
        total: adminOrders[0].total,
        status: adminOrders[0].status
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

debugVendorStats();