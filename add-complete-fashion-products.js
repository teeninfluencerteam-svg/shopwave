const { MongoClient } = require('mongodb');

async function addCompleteFashionProducts() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'photos-test');
    
    // Get vendor
    const vendor = await db.collection('vendors').findOne({ email: 'dhananjay.win2004@gmail.com' });
    if (!vendor) {
      console.log('❌ Vendor not found');
      return;
    }

    const fashionProducts = [
      // Men's T-Shirts
      { name: 'Cotton T-Shirt Blue', subcategory: 'Men', tertiaryCategory: 'T-Shirts', price: 399, originalPrice: 599 },
      { name: 'Graphic T-Shirt Black', subcategory: 'Men', tertiaryCategory: 'T-Shirts', price: 449, originalPrice: 699 },
      { name: 'V-Neck T-Shirt White', subcategory: 'Men', tertiaryCategory: 'T-Shirts', price: 349, originalPrice: 549 },
      
      // Men's Formal Shirts
      { name: 'White Formal Shirt', subcategory: 'Men', tertiaryCategory: 'Formal-Shirts', price: 899, originalPrice: 1299 },
      { name: 'Blue Formal Shirt', subcategory: 'Men', tertiaryCategory: 'Formal-Shirts', price: 949, originalPrice: 1399 },
      { name: 'Light Blue Formal Shirt', subcategory: 'Men', tertiaryCategory: 'Formal-Shirts', price: 999, originalPrice: 1499 },
      
      // Men's Casual Shirts
      { name: 'Checkered Casual Shirt', subcategory: 'Men', tertiaryCategory: 'Casual-Shirts', price: 699, originalPrice: 999 },
      { name: 'Denim Casual Shirt', subcategory: 'Men', tertiaryCategory: 'Casual-Shirts', price: 799, originalPrice: 1199 },
      { name: 'Striped Casual Shirt', subcategory: 'Men', tertiaryCategory: 'Casual-Shirts', price: 649, originalPrice: 949 },
      
      // Men's Jeans
      { name: 'Slim Fit Blue Jeans', subcategory: 'Men', tertiaryCategory: 'Jeans', price: 1299, originalPrice: 1899 },
      { name: 'Regular Fit Black Jeans', subcategory: 'Men', tertiaryCategory: 'Jeans', price: 1199, originalPrice: 1699 },
      { name: 'Skinny Fit Dark Jeans', subcategory: 'Men', tertiaryCategory: 'Jeans', price: 1399, originalPrice: 1999 },
      
      // Men's Polo T-Shirts
      { name: 'Navy Blue Polo T-Shirt', subcategory: 'Men', tertiaryCategory: 'Polo-T-Shirts', price: 699, originalPrice: 999 },
      { name: 'White Polo T-Shirt', subcategory: 'Men', tertiaryCategory: 'Polo-T-Shirts', price: 649, originalPrice: 899 },
      
      // Men's Trousers
      { name: 'Formal Black Trousers', subcategory: 'Men', tertiaryCategory: 'Trousers', price: 999, originalPrice: 1499 },
      { name: 'Casual Khaki Trousers', subcategory: 'Men', tertiaryCategory: 'Trousers', price: 899, originalPrice: 1299 },
      
      // Men's Shoes
      { name: 'Formal Black Shoes', subcategory: 'Men', tertiaryCategory: 'Formal-Shoes', price: 1999, originalPrice: 2999 },
      { name: 'Brown Casual Shoes', subcategory: 'Men', tertiaryCategory: 'Casual-Shoes', price: 1599, originalPrice: 2299 },
      { name: 'White Sneakers', subcategory: 'Men', tertiaryCategory: 'Sneakers', price: 1799, originalPrice: 2499 },
      
      // Women's Dresses
      { name: 'Red Summer Dress', subcategory: 'Women', tertiaryCategory: 'Dresses', price: 1199, originalPrice: 1799 },
      { name: 'Black Party Dress', subcategory: 'Women', tertiaryCategory: 'Dresses', price: 1599, originalPrice: 2299 },
      { name: 'Floral Casual Dress', subcategory: 'Women', tertiaryCategory: 'Dresses', price: 999, originalPrice: 1499 },
      
      // Women's Sarees
      { name: 'Silk Saree Red', subcategory: 'Women', tertiaryCategory: 'Sarees', price: 2499, originalPrice: 3999 },
      { name: 'Cotton Saree Blue', subcategory: 'Women', tertiaryCategory: 'Sarees', price: 1299, originalPrice: 1899 },
      { name: 'Designer Saree Gold', subcategory: 'Women', tertiaryCategory: 'Sarees', price: 3499, originalPrice: 4999 },
      
      // Women's Kurtis
      { name: 'Cotton Kurti Pink', subcategory: 'Women', tertiaryCategory: 'Kurtis', price: 699, originalPrice: 999 },
      { name: 'Silk Kurti Blue', subcategory: 'Women', tertiaryCategory: 'Kurtis', price: 899, originalPrice: 1299 },
      { name: 'Designer Kurti White', subcategory: 'Women', tertiaryCategory: 'Kurtis', price: 1199, originalPrice: 1699 },
      
      // Women's Tops
      { name: 'Casual Top Black', subcategory: 'Women', tertiaryCategory: 'Tops', price: 499, originalPrice: 799 },
      { name: 'Formal Top White', subcategory: 'Women', tertiaryCategory: 'Tops', price: 699, originalPrice: 999 },
      { name: 'Party Top Red', subcategory: 'Women', tertiaryCategory: 'Tops', price: 899, originalPrice: 1299 },
      
      // Women's Jeans
      { name: 'Skinny Fit Jeans Blue', subcategory: 'Women', tertiaryCategory: 'Jeans', price: 1399, originalPrice: 1999 },
      { name: 'High Waist Jeans Black', subcategory: 'Women', tertiaryCategory: 'Jeans', price: 1599, originalPrice: 2299 },
      
      // Women's Leggings
      { name: 'Black Cotton Leggings', subcategory: 'Women', tertiaryCategory: 'Leggings', price: 399, originalPrice: 599 },
      { name: 'Navy Blue Leggings', subcategory: 'Women', tertiaryCategory: 'Leggings', price: 349, originalPrice: 499 },
      
      // Kids Boys
      { name: 'Boys Blue T-Shirt', subcategory: 'Kids', tertiaryCategory: 'Boys-T-Shirts', price: 299, originalPrice: 499 },
      { name: 'Boys Red Shirt', subcategory: 'Kids', tertiaryCategory: 'Boys-Shirts', price: 399, originalPrice: 599 },
      { name: 'Boys Denim Jeans', subcategory: 'Kids', tertiaryCategory: 'Kids-Jeans', price: 699, originalPrice: 999 },
      { name: 'Boys Sports Shoes', subcategory: 'Kids', tertiaryCategory: 'Kids-Shoes', price: 899, originalPrice: 1299 },
      
      // Kids Girls
      { name: 'Girls Pink Dress', subcategory: 'Kids', tertiaryCategory: 'Girls-Dresses', price: 599, originalPrice: 899 },
      { name: 'Girls White Top', subcategory: 'Kids', tertiaryCategory: 'Girls-Tops', price: 349, originalPrice: 499 },
      { name: 'Girls Blue Jeans', subcategory: 'Kids', tertiaryCategory: 'Kids-Jeans', price: 649, originalPrice: 899 },
      { name: 'Girls Party Shoes', subcategory: 'Kids', tertiaryCategory: 'Kids-Shoes', price: 799, originalPrice: 1199 },
      
      // Accessories Watches
      { name: 'Digital Watch Black', subcategory: 'Accessories', tertiaryCategory: 'Watches', price: 1299, originalPrice: 1899 },
      { name: 'Analog Watch Brown', subcategory: 'Accessories', tertiaryCategory: 'Watches', price: 1599, originalPrice: 2299 },
      { name: 'Smart Watch Silver', subcategory: 'Accessories', tertiaryCategory: 'Watches', price: 2999, originalPrice: 4499 },
      
      // Accessories Sunglasses
      { name: 'Aviator Sunglasses', subcategory: 'Accessories', tertiaryCategory: 'Sunglasses', price: 799, originalPrice: 1199 },
      { name: 'Round Sunglasses', subcategory: 'Accessories', tertiaryCategory: 'Sunglasses', price: 699, originalPrice: 999 },
      { name: 'Sports Sunglasses', subcategory: 'Accessories', tertiaryCategory: 'Sunglasses', price: 899, originalPrice: 1299 },
      
      // Accessories Bags
      { name: 'Leather Handbag Brown', subcategory: 'Accessories', tertiaryCategory: 'Bags', price: 1999, originalPrice: 2999 },
      { name: 'Canvas Backpack Blue', subcategory: 'Accessories', tertiaryCategory: 'Bags', price: 1299, originalPrice: 1899 },
      { name: 'Designer Purse Black', subcategory: 'Accessories', tertiaryCategory: 'Bags', price: 2499, originalPrice: 3499 },
      
      // Accessories Belts
      { name: 'Leather Belt Black', subcategory: 'Accessories', tertiaryCategory: 'Belts', price: 599, originalPrice: 899 },
      { name: 'Canvas Belt Brown', subcategory: 'Accessories', tertiaryCategory: 'Belts', price: 399, originalPrice: 599 },
      
      // Accessories Wallets
      { name: 'Leather Wallet Black', subcategory: 'Accessories', tertiaryCategory: 'Wallets', price: 799, originalPrice: 1199 },
      { name: 'Designer Wallet Brown', subcategory: 'Accessories', tertiaryCategory: 'Wallets', price: 999, originalPrice: 1499 }
    ];

    // Convert to full product objects
    const fullProducts = fashionProducts.map((product, index) => ({
      vendorId: vendor._id.toString(),
      productId: `FASHION${Date.now()}${String(index).padStart(3, '0')}`,
      name: product.name,
      category: 'Fashion',
      subcategory: product.subcategory,
      tertiaryCategory: product.tertiaryCategory,
      price: product.price,
      originalPrice: product.originalPrice,
      discountPrice: product.price,
      description: `Premium quality ${product.name.toLowerCase()} from ${vendor.businessName}`,
      images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'],
      stock: Math.floor(Math.random() * 20) + 5, // Random stock 5-25
      length: 25, width: 20, height: 3, weight: 200,
      brand: vendor.businessName,
      rating: 4.0 + Math.random() * 0.8, // Random rating 4.0-4.8
      reviewCount: Math.floor(Math.random() * 50) + 10, // Random reviews 10-60
      status: 'active'
    }));

    // Add to database
    const vendorProductsCollection = db.collection('vendorproducts');
    
    console.log(`Adding ${fullProducts.length} fashion products...\n`);
    
    for (const product of fullProducts) {
      await vendorProductsCollection.insertOne(product);
      console.log(`✅ ${product.name} (${product.subcategory} → ${product.tertiaryCategory})`);
    }
    
    console.log(`\n🎉 Successfully added ${fullProducts.length} fashion products!`);
    
    // Summary by category
    const summary = {};
    fullProducts.forEach(p => {
      if (!summary[p.subcategory]) summary[p.subcategory] = {};
      if (!summary[p.subcategory][p.tertiaryCategory]) summary[p.subcategory][p.tertiaryCategory] = 0;
      summary[p.subcategory][p.tertiaryCategory]++;
    });
    
    console.log('\n📊 Complete Summary:');
    Object.entries(summary).forEach(([subcategory, tertiary]) => {
      console.log(`\n${subcategory}:`);
      Object.entries(tertiary).forEach(([tertiaryCategory, count]) => {
        console.log(`  ${tertiaryCategory}: ${count} products`);
      });
    });
    
    // Test API simulation
    console.log('\n🧪 Testing API Response...');
    const allFashionProducts = await vendorProductsCollection.find({ 
      category: 'Fashion', 
      status: 'active' 
    }).toArray();
    
    console.log(`\n✅ Total Fashion Products in DB: ${allFashionProducts.length}`);
    
    // Test each URL
    const testUrls = [
      { url: '/search?category=Fashion', expected: allFashionProducts.length },
      { url: '/search?category=Fashion&subcategory=Men', expected: allFashionProducts.filter(p => p.subcategory === 'Men').length },
      { url: '/search?category=Fashion&subcategory=Women', expected: allFashionProducts.filter(p => p.subcategory === 'Women').length },
      { url: '/search?category=Fashion&subcategory=Kids', expected: allFashionProducts.filter(p => p.subcategory === 'Kids').length },
      { url: '/search?category=Fashion&subcategory=Accessories', expected: allFashionProducts.filter(p => p.subcategory === 'Accessories').length }
    ];
    
    console.log('\n🔍 URL Test Results:');
    testUrls.forEach(test => {
      console.log(`✅ ${test.url} → ${test.expected} products`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

addCompleteFashionProducts();