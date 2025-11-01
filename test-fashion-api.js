const fetch = require('node-fetch');

async function testFashionAPI() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Fashion API endpoints...\n');
    
    // Test main products API
    console.log('1. Testing /api/products (should include fashion vendor products)');
    const allProductsRes = await fetch(`${baseUrl}/api/products`);
    const allProducts = await allProductsRes.json();
    
    const fashionProducts = allProducts.filter(p => p.category === 'Fashion');
    console.log(`✅ Found ${fashionProducts.length} fashion products in main API`);
    
    // Test fashion categories
    const categories = {
      'Men': fashionProducts.filter(p => p.subcategory === 'Men'),
      'Women': fashionProducts.filter(p => p.subcategory === 'Women'), 
      'Kids': fashionProducts.filter(p => p.subcategory === 'Kids'),
      'Accessories': fashionProducts.filter(p => p.subcategory === 'Accessories')
    };
    
    console.log('\n📊 Fashion Categories:');
    Object.entries(categories).forEach(([category, products]) => {
      console.log(`${category}: ${products.length} products`);
      products.forEach(p => {
        const isVendor = p.isVendorProduct ? '(Vendor)' : '(JSON)';
        console.log(`  - ${p.name} ${isVendor} → ${p.tertiaryCategory || 'No tertiary'}`);
      });
    });
    
    // Test tertiary categories
    console.log('\n🎯 Testing Tertiary Categories:');
    
    const tertiaryCategories = {
      'T-Shirts': fashionProducts.filter(p => p.tertiaryCategory === 'T-Shirts'),
      'Dresses': fashionProducts.filter(p => p.tertiaryCategory === 'Dresses'),
      'Boys-T-Shirts': fashionProducts.filter(p => p.tertiaryCategory === 'Boys-T-Shirts'),
      'Watches': fashionProducts.filter(p => p.tertiaryCategory === 'Watches')
    };
    
    Object.entries(tertiaryCategories).forEach(([category, products]) => {
      console.log(`${category}: ${products.length} products`);
      products.forEach(p => {
        const isVendor = p.isVendorProduct ? '(Vendor)' : '(JSON)';
        console.log(`  - ${p.name} ${isVendor}`);
      });
    });
    
    // Test search URLs
    console.log('\n🔍 Testing Search URLs:');
    
    const searchTests = [
      '/search?category=Fashion',
      '/search?category=Fashion&subcategory=Men',
      '/search?category=Fashion&subcategory=Men&tertiaryCategory=T-Shirts',
      '/search?category=Fashion&subcategory=Women&tertiaryCategory=Dresses',
      '/search?category=Fashion&subcategory=Kids&tertiaryCategory=Boys-T-Shirts',
      '/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Watches'
    ];
    
    for (const url of searchTests) {
      try {
        const response = await fetch(`${baseUrl}${url}`);
        const status = response.ok ? '✅' : '❌';
        console.log(`${status} ${url} - Status: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${url} - Error: ${error.message}`);
      }
    }
    
    console.log('\n✅ Fashion API test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFashionAPI();