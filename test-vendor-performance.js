const { performance } = require('perf_hooks');

async function testVendorAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const testVendorId = 'test-vendor-123'; // Replace with actual vendor ID
  
  console.log('🚀 Testing Vendor API Performance...\n');
  
  // Test Stats API
  console.log('📊 Testing Stats API...');
  const statsStart = performance.now();
  
  try {
    const response = await fetch(`${baseUrl}/api/vendor/stats?vendorId=${testVendorId}`);
    const statsEnd = performance.now();
    const statsTime = Math.round(statsEnd - statsStart);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Stats API: ${statsTime}ms`);
      console.log(`   Response: ${JSON.stringify(data.stats)}`);
    } else {
      console.log(`❌ Stats API failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Stats API error: ${error.message}`);
  }
  
  // Test Notifications API
  console.log('\n🔔 Testing Notifications API...');
  const notifStart = performance.now();
  
  try {
    const response = await fetch(`${baseUrl}/api/vendor/notifications?vendorId=${testVendorId}&limit=5`);
    const notifEnd = performance.now();
    const notifTime = Math.round(notifEnd - notifStart);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Notifications API: ${notifTime}ms`);
      console.log(`   Count: ${data.notifications?.length || 0} notifications`);
    } else {
      console.log(`❌ Notifications API failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Notifications API error: ${error.message}`);
  }
  
  // Test Orders API
  console.log('\n📦 Testing Orders API...');
  const ordersStart = performance.now();
  
  try {
    const response = await fetch(`${baseUrl}/api/vendor/orders?vendorId=${testVendorId}&limit=5`);
    const ordersEnd = performance.now();
    const ordersTime = Math.round(ordersEnd - ordersStart);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Orders API: ${ordersTime}ms`);
      console.log(`   Count: ${data.orders?.length || 0} orders`);
    } else {
      console.log(`❌ Orders API failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Orders API error: ${error.message}`);
  }
  
  console.log('\n🎉 Performance test completed!');
  console.log('\n💡 Optimization Tips:');
  console.log('   - Stats API should be < 2000ms');
  console.log('   - Notifications API should be < 1000ms');
  console.log('   - Orders API should be < 3000ms');
}

// Run the test
testVendorAPI().catch(console.error);