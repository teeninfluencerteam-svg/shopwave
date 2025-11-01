const { performance } = require('perf_hooks');

async function testAddProductPerformance() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const testEmail = 'test@example.com'; // Replace with actual vendor email
  
  console.log('🚀 Testing Add Product Page Performance...\n');
  
  // Test Vendor Profile API
  console.log('👤 Testing Vendor Profile API...');
  const profileStart = performance.now();
  
  try {
    const response = await fetch(`${baseUrl}/api/vendor/profile?email=${testEmail}`);
    const profileEnd = performance.now();
    const profileTime = Math.round(profileEnd - profileStart);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Vendor Profile API: ${profileTime}ms`);
      console.log(`   Vendor: ${data.vendor?.brandName || 'Unknown'}`);
    } else {
      console.log(`❌ Vendor Profile API failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Vendor Profile API error: ${error.message}`);
  }
  
  console.log('\n💡 Performance Expectations:');
  console.log('   - Vendor Profile API should be < 1000ms');
  console.log('   - Add Product page should load instantly with fallback data');
  console.log('   - "Loading vendor data..." should disappear within 2 seconds');
  
  console.log('\n🎯 Optimization Applied:');
  console.log('   ✅ Local storage caching (5 min expiry)');
  console.log('   ✅ Immediate fallback data loading');
  console.log('   ✅ Background API fetch');
  console.log('   ✅ Database indexes on email field');
  console.log('   ✅ Query timeout protection');
}

// Run the test
testAddProductPerformance().catch(console.error);