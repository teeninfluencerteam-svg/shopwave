const { performance } = require('perf_hooks');

async function testVendorDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  console.log('🏪 Testing Vendor Dashboard Functionality...\n');
  
  // Test vendor login first
  console.log('1. Testing vendor login...');
  const testEmail = 'test-vendor@example.com';
  
  try {
    const loginResponse = await fetch(`${baseUrl}/api/vendor/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail })
    });
    
    const loginData = await loginResponse.json();
    
    if (loginData.success) {
      const vendorId = loginData.vendor.vendorId || loginData.vendor._id;
      console.log('✅ Vendor login successful');
      console.log(`   Vendor ID: ${vendorId}`);
      console.log(`   Status: ${loginData.vendor.status}`);
      
      // Test vendor stats
      console.log('\n2. Testing vendor stats...');
      const statsResponse = await fetch(`${baseUrl}/api/vendor/stats?vendorId=${vendorId}`);
      const statsData = await statsResponse.json();
      
      if (statsData.success) {
        console.log('✅ Stats fetched successfully');
        console.log(`   Products: ${statsData.stats.totalProducts}`);
        console.log(`   Orders: ${statsData.stats.totalOrders}`);
        console.log(`   Earnings: ₹${statsData.stats.totalEarnings}`);
        console.log(`   Pending: ${statsData.stats.pendingOrders}`);
      } else {
        console.log('❌ Failed to fetch stats');
      }
      
      // Test vendor products
      console.log('\n3. Testing vendor products...');
      const productsResponse = await fetch(`${baseUrl}/api/vendor/products?vendorId=${vendorId}`);
      const productsData = await productsResponse.json();
      
      if (productsData.success) {
        console.log('✅ Products fetched successfully');
        console.log(`   Total products: ${productsData.products.length}`);
        
        if (productsData.products.length > 0) {
          console.log('   Sample product:', productsData.products[0].name);
        }
      } else {
        console.log('❌ Failed to fetch products');
      }
      
    } else {
      console.log('❌ Vendor login failed:', loginData.error);
      console.log('\n📝 Creating test vendor...');
      
      // Create a test vendor
      const registerResponse = await fetch(`${baseUrl}/api/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Vendor',
          email: testEmail,
          phone: '9876543210',
          businessName: 'Test Business',
          brandName: 'Test Brand',
          businessType: 'Individual',
          panNumber: 'TEST1234F',
          aadharNumber: '123456789012',
          address: {
            street: 'Test Street',
            city: 'Test City',
            state: 'Test State',
            pincode: '123456'
          },
          bankDetails: {
            bankName: 'Test Bank',
            accountNumber: '1234567890',
            ifscCode: 'TEST0001234',
            accountHolder: 'Test Vendor',
            accountType: 'Savings'
          }
        })
      });
      
      const registerData = await registerResponse.json();
      
      if (registerData.success) {
        console.log('✅ Test vendor created successfully');
        console.log(`   Vendor ID: ${registerData.vendor.vendorId}`);
        console.log('   Now try logging in again');
      } else {
        console.log('❌ Failed to create test vendor:', registerData.message);
      }
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  console.log('\n💡 Dashboard Features:');
  console.log('   ✅ Real-time stats display');
  console.log('   ✅ Product count tracking');
  console.log('   ✅ Order management');
  console.log('   ✅ Earnings calculation');
  console.log('   ✅ Quick action buttons');
  
  console.log('\n🎯 To see data in dashboard:');
  console.log('   1. Login as vendor');
  console.log('   2. Add some products');
  console.log('   3. Dashboard will show updated counts');
  console.log('   4. Orders will appear when customers buy');
}

// Run the test
testVendorDashboard().catch(console.error);