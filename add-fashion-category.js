const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const dbName = 'photos-test';

async function addFashionCategory() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('categories');
    
    const fashionCategory = {
      name: 'Fashion',
      slug: 'fashion',
      image: '/images/placeholder.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(fashionCategory);
    console.log('Fashion category added:', result.insertedId);
    
  } catch (error) {
    console.error('Error adding Fashion category:', error);
  } finally {
    await client.close();
  }
}

addFashionCategory();