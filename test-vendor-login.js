// Quick test for your existing vendor account
const testVendorLogin = async () => {
  const baseUrl = 'http://localhost:3000';
  const email = 'dhananjay.win2004@gmail.com';
  
  console.log('🔐 Testing vendor login...');
  
  try {
    const response = await fetch(`${baseUrl}/api/vendor/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log(`   Vendor ID: ${data.vendor.vendorId}`);
      console.log(`   Name: ${data.vendor.name}`);
      console.log(`   Status: ${data.vendor.status}`);
      console.log('\n🎯 Now you can access all vendor pages');
    } else {
      console.log('❌ Login failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
};

testVendorLogin();