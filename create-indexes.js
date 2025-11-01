const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = process.env.MONGODB_DB_NAME || 'photos-test';

async function createIndexes() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Create indexes for VendorOrder collection
    const vendorOrdersCollection = db.collection('vendororders');
    await vendorOrdersCollection.createIndex({ vendorId: 1 });
    await vendorOrdersCollection.createIndex({ vendorId: 1, status: 1 });
    await vendorOrdersCollection.createIndex({ vendorId: 1, createdAt: -1 });
    console.log('✅ VendorOrder indexes created');
    
    // Create indexes for VendorProduct collection
    const vendorProductsCollection = db.collection('vendorproductnews');
    await vendorProductsCollection.createIndex({ vendorId: 1 });
    await vendorProductsCollection.createIndex({ vendorId: 1, status: 1 });
    await vendorProductsCollection.createIndex({ vendorId: 1, createdAt: -1 });
    console.log('✅ VendorProduct indexes created');
    
    // Create indexes for Vendor collection
    const vendorsCollection = db.collection('vendors');
    await vendorsCollection.createIndex({ email: 1 });
    await vendorsCollection.createIndex({ vendorId: 1 });
    await vendorsCollection.createIndex({ status: 1 });
    console.log('✅ Vendor indexes created');
    
    // Create indexes for VendorNotification collection
    const vendorNotificationsCollection = db.collection('vendornotifications');
    await vendorNotificationsCollection.createIndex({ vendorId: 1, createdAt: -1 });
    await vendorNotificationsCollection.createIndex({ vendorId: 1, read: 1 });
    console.log('✅ VendorNotification indexes created');
    
    console.log('🎉 All indexes created successfully!');
    
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  } finally {
    await client.close();
  }
}

createIndexes();