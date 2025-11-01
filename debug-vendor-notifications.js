const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = process.env.MONGODB_DB_NAME || 'photos-test';

async function debugVendorNotifications() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Check vendors
    const vendorsCollection = db.collection('vendors');
    const vendors = await vendorsCollection.find({}).toArray();
    console.log(`\n📊 Found ${vendors.length} vendors:`);
    
    vendors.forEach((vendor, index) => {
      console.log(`${index + 1}. ID: ${vendor._id}`);
      console.log(`   Email: ${vendor.email}`);
      console.log(`   VendorId: ${vendor.vendorId || 'N/A'}`);
      console.log('   ---');
    });
    
    // Check notifications
    const notificationsCollection = db.collection('vendornotifications');
    const notifications = await notificationsCollection.find({}).toArray();
    console.log(`\n🔔 Found ${notifications.length} notifications:`);
    
    notifications.forEach((notif, index) => {
      console.log(`${index + 1}. VendorId: ${notif.vendorId}`);
      console.log(`   Title: ${notif.title}`);
      console.log(`   Message: ${notif.message}`);
      console.log(`   Read: ${notif.read}`);
      console.log(`   Created: ${new Date(notif.createdAt).toLocaleString()}`);
      console.log('   ---');
    });
    
    // Check if vendorIds match
    if (vendors.length > 0 && notifications.length > 0) {
      console.log('\n🔍 Checking vendorId matches:');
      const vendorIds = vendors.map(v => v._id.toString());
      const notificationVendorIds = notifications.map(n => n.vendorId);
      
      console.log('Vendor _ids:', vendorIds);
      console.log('Notification vendorIds:', notificationVendorIds);
      
      const matches = notificationVendorIds.filter(nId => vendorIds.includes(nId));
      console.log(`✅ ${matches.length} notifications have matching vendorIds`);
      
      if (matches.length === 0) {
        console.log('❌ No matching vendorIds found!');
        console.log('💡 This means notifications are not linked to vendors correctly');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

debugVendorNotifications();