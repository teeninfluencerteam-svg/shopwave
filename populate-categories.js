const { MongoClient } = require('mongodb');

const categories = [
  { name: 'Mobile Accessories', subcategories: ['Phone Cases', 'Screen Protectors', 'Chargers', 'Power Banks'], order: 1 },
  { name: 'Computer Accessories', subcategories: ['Keyboards', 'Mouse', 'Webcams', 'Speakers'], order: 2 },
  { name: 'Audio', subcategories: ['Headphones', 'Earbuds', 'Speakers', 'Microphones'], order: 3 },
  { name: 'Lighting', subcategories: ['LED Strips', 'Desk Lamps', 'Smart Bulbs', 'Ring Lights'], order: 4 },
  { name: 'Power & Cables', subcategories: ['USB Cables', 'HDMI Cables', 'Power Adapters', 'Extension Cords'], order: 5 },
  { name: 'Fans & Cooling', subcategories: ['CPU Coolers', 'Case Fans', 'Laptop Cooling Pads', 'Thermal Paste'], order: 6 },
  { name: 'LED Lights', subcategories: ['RGB Strips', 'Gaming Lights', 'Ambient Lighting', 'Smart Lights'], order: 7 },
  { name: 'Car Accessories', subcategories: ['Phone Mounts', 'Chargers', 'Dash Cams', 'Air Fresheners'], order: 8 },
  { name: 'Kitchen Appliances', subcategories: ['Blenders', 'Coffee Makers', 'Toasters', 'Air Fryers'], order: 9 },
  { name: 'Cables & Chargers', subcategories: ['Lightning Cables', 'USB-C Cables', 'Wireless Chargers', 'Car Chargers'], order: 10 },
  { name: 'Gifts', subcategories: ['Tech Gifts', 'Gadgets', 'Accessories', 'Gift Cards'], order: 11 },
  { name: 'Customise Product', subcategories: ['Custom Cases', 'Personalized Items', 'Engraving', 'Custom Prints'], order: 12 }
];

async function populateCategories() {
  const client = new MongoClient('mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    const db = client.db('photos-test');
    
    console.log('🔄 Populating categories...');
    
    for (const category of categories) {
      const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      await db.collection('categories').insertOne({
        name: category.name,
        slug: slug,
        image: '/images/placeholder.jpg',
        subcategories: category.subcategories,
        isActive: true,
        order: category.order,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log(`✅ Added: ${category.name}`);
    }
    
    console.log('🎉 All categories added successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

populateCategories();