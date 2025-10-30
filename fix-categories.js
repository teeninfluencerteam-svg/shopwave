const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const dbName = 'photos-test';

async function fixCategories() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('categories');
    
    // Update all categories to have isActive: true
    const result = await collection.updateMany(
      {},
      { 
        $set: { 
          isActive: true,
          order: 0
        }
      }
    );
    
    console.log('Updated categories:', result.modifiedCount);
    
    // Add basic categories if none exist
    const count = await collection.countDocuments();
    if (count === 0) {
      const basicCategories = [
        { name: 'Tech', slug: 'tech', image: '/images/placeholder.jpg', isActive: true, order: 1 },
        { name: 'Home', slug: 'home', image: '/images/placeholder.jpg', isActive: true, order: 2 },
        { name: 'Fashion', slug: 'fashion', image: '/images/placeholder.jpg', isActive: true, order: 3 },
        { name: 'New Arrivals', slug: 'new-arrivals', image: '/images/placeholder.jpg', isActive: true, order: 4 }
      ];
      
      await collection.insertMany(basicCategories);
      console.log('Added basic categories');
    }
    
  } catch (error) {
    console.error('Error fixing categories:', error);
  } finally {
    await client.close();
  }
}

fixCategories();