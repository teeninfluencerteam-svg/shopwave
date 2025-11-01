const { MongoClient } = require('mongodb');

async function addFashionProducts() {
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
      // Men's Products
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}01`,
        name: 'Premium Cotton T-Shirt',
        category: 'Fashion',
        subcategory: 'Men',
        tertiaryCategory: 'T-Shirts',
        price: 499,
        originalPrice: 799,
        discountPrice: 499,
        description: 'Comfortable premium cotton t-shirt for daily wear',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        stock: 25,
        length: 28, width: 20, height: 2, weight: 180,
        brand: vendor.businessName, rating: 4.3, reviewCount: 45, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}02`,
        name: 'Formal White Shirt',
        category: 'Fashion',
        subcategory: 'Men',
        tertiaryCategory: 'Formal-Shirts',
        price: 899,
        originalPrice: 1299,
        discountPrice: 899,
        description: 'Classic formal white shirt for office wear',
        images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400'],
        stock: 15,
        length: 30, width: 22, height: 2, weight: 220,
        brand: vendor.businessName, rating: 4.5, reviewCount: 32, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}03`,
        name: 'Slim Fit Jeans',
        category: 'Fashion',
        subcategory: 'Men',
        tertiaryCategory: 'Jeans',
        price: 1299,
        originalPrice: 1999,
        discountPrice: 1299,
        description: 'Stylish slim fit denim jeans',
        images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'],
        stock: 20,
        length: 40, width: 30, height: 3, weight: 450,
        brand: vendor.businessName, rating: 4.4, reviewCount: 28, status: 'active'
      },
      
      // Women's Products
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}04`,
        name: 'Elegant Summer Dress',
        category: 'Fashion',
        subcategory: 'Women',
        tertiaryCategory: 'Dresses',
        price: 1199,
        originalPrice: 1799,
        discountPrice: 1199,
        description: 'Beautiful summer dress for special occasions',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400'],
        stock: 12,
        length: 35, width: 25, height: 3, weight: 280,
        brand: vendor.businessName, rating: 4.6, reviewCount: 38, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}05`,
        name: 'Designer Kurti',
        category: 'Fashion',
        subcategory: 'Women',
        tertiaryCategory: 'Kurtis',
        price: 799,
        originalPrice: 1199,
        discountPrice: 799,
        description: 'Traditional designer kurti with modern touch',
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400'],
        stock: 18,
        length: 32, width: 24, height: 2, weight: 250,
        brand: vendor.businessName, rating: 4.4, reviewCount: 42, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}06`,
        name: 'Stylish Top',
        category: 'Fashion',
        subcategory: 'Women',
        tertiaryCategory: 'Tops',
        price: 599,
        originalPrice: 899,
        discountPrice: 599,
        description: 'Trendy top for casual and office wear',
        images: ['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400'],
        stock: 22,
        length: 26, width: 20, height: 2, weight: 160,
        brand: vendor.businessName, rating: 4.2, reviewCount: 35, status: 'active'
      },
      
      // Kids Products
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}07`,
        name: 'Boys Cotton T-Shirt',
        category: 'Fashion',
        subcategory: 'Kids',
        tertiaryCategory: 'Boys-T-Shirts',
        price: 299,
        originalPrice: 499,
        discountPrice: 299,
        description: 'Comfortable cotton t-shirt for boys',
        images: ['https://images.unsplash.com/photo-1503944168849-4d4b47e4b1b6?w=400'],
        stock: 30,
        length: 22, width: 16, height: 2, weight: 120,
        brand: vendor.businessName, rating: 4.3, reviewCount: 25, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}08`,
        name: 'Girls Party Dress',
        category: 'Fashion',
        subcategory: 'Kids',
        tertiaryCategory: 'Girls-Dresses',
        price: 699,
        originalPrice: 999,
        discountPrice: 699,
        description: 'Beautiful party dress for girls',
        images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400'],
        stock: 15,
        length: 28, width: 20, height: 3, weight: 200,
        brand: vendor.businessName, rating: 4.5, reviewCount: 18, status: 'active'
      },
      
      // Accessories
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}09`,
        name: 'Luxury Watch',
        category: 'Fashion',
        subcategory: 'Accessories',
        tertiaryCategory: 'Watches',
        price: 1999,
        originalPrice: 2999,
        discountPrice: 1999,
        description: 'Premium luxury watch with leather strap',
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400'],
        stock: 8,
        length: 12, width: 10, height: 2, weight: 150,
        brand: vendor.businessName, rating: 4.7, reviewCount: 52, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}10`,
        name: 'Designer Sunglasses',
        category: 'Fashion',
        subcategory: 'Accessories',
        tertiaryCategory: 'Sunglasses',
        price: 899,
        originalPrice: 1299,
        discountPrice: 899,
        description: 'Stylish designer sunglasses with UV protection',
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'],
        stock: 20,
        length: 15, width: 12, height: 5, weight: 80,
        brand: vendor.businessName, rating: 4.4, reviewCount: 31, status: 'active'
      },
      {
        vendorId: vendor._id.toString(),
        productId: `PRD${Date.now()}11`,
        name: 'Leather Handbag',
        category: 'Fashion',
        subcategory: 'Accessories',
        tertiaryCategory: 'Handbags',
        price: 1599,
        originalPrice: 2299,
        discountPrice: 1599,
        description: 'Premium leather handbag for women',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
        stock: 10,
        length: 35, width: 25, height: 15, weight: 600,
        brand: vendor.businessName, rating: 4.6, reviewCount: 29, status: 'active'
      }
    ];

    // Add products to database
    const vendorProductsCollection = db.collection('vendorproducts');
    
    for (const product of fashionProducts) {
      await vendorProductsCollection.insertOne(product);
      console.log(`✅ Added: ${product.name} (${product.subcategory} → ${product.tertiaryCategory})`);
    }
    
    console.log(`\n🎉 Successfully added ${fashionProducts.length} fashion products to database!`);
    
    // Summary
    const summary = {
      'Men': fashionProducts.filter(p => p.subcategory === 'Men').length,
      'Women': fashionProducts.filter(p => p.subcategory === 'Women').length,
      'Kids': fashionProducts.filter(p => p.subcategory === 'Kids').length,
      'Accessories': fashionProducts.filter(p => p.subcategory === 'Accessories').length
    };
    
    console.log('\n📊 Summary:');
    Object.entries(summary).forEach(([category, count]) => {
      console.log(`${category}: ${count} products`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

addFashionProducts();