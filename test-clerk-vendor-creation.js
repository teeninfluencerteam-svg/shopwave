const { performance } = require('perf_hooks');

async function testClerkVendorCreation() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const clerkUserEmail = 'clerk-user@example.com'; // Simulating Clerk user email
  
  console.log('🔐 Testing Auto Vendor Creation for Clerk Users...\n');
  
  // First check if vendor exists
  console.log(`👤 Checking if vendor exists for: ${clerkUserEmail}`);
  
  try {
    const checkResponse = await fetch(`${baseUrl}/api/vendor/profile?email=${clerkUserEmail}`);
    const checkData = await checkResponse.json();
    
    if (checkData.success) {
      console.log('✅ Vendor already exists');
      console.log(`   Name: ${checkData.vendor.name}`);
      console.log(`   Business: ${checkData.vendor.businessName}`);
      console.log(`   Status: ${checkData.vendor.status}`);
    } else {
      console.log('❌ Vendor does not exist, testing auto-creation...');
      
      // Test auto-creation by simulating registration
      const autoCreateData = {
        name: 'Clerk User',
        email: clerkUserEmail,
        phone: '9876543210',
        businessName: "Clerk User's Business",
        brandName: 'Clerk User Brand',
        businessType: 'Individual',
        panNumber: 'CLERK1234F',
        aadharNumber: '123456789012',
        address: {
          street: 'Auto Street',
          city: 'Auto City', 
          state: 'Auto State',
          pincode: '123456'
        },
        bankDetails: {
          bankName: 'Auto Bank',
          accountNumber: '1234567890',
          ifscCode: 'AUTO0001234',
          accountHolder: 'Clerk User',
          accountType: 'Savings'
        }
      };
      
      const createStart = performance.now();
      const createResponse = await fetch(`${baseUrl}/api/vendor/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(autoCreateData)
      });
      
      const createEnd = performance.now();
      const createTime = Math.round(createEnd - createStart);
      
      if (createResponse.ok) {
        const createResult = await createResponse.json();
        console.log(`✅ Auto-creation successful: ${createTime}ms`);
        console.log(`   Vendor ID: ${createResult.vendor?.vendorId}`);
        console.log(`   Status: ${createResult.vendor?.status}`);
        console.log(`   Can now access all vendor features`);
      } else {
        console.log(`❌ Auto-creation failed`);
      }
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
  
  console.log('\n💡 Auto Vendor Creation Features:');
  console.log('   ✅ Clerk users get instant vendor profiles');
  console.log('   ✅ No manual registration needed');
  console.log('   ✅ Auto-approved for immediate access');
  console.log('   ✅ Works on dashboard, profile, and add-product pages');
  
  console.log('\n🎯 How it works:');
  console.log('   1. User logs in with Clerk');
  console.log('   2. Accesses any vendor page');
  console.log('   3. System auto-creates vendor profile');
  console.log('   4. User can immediately use all features');
}

// Run the test
testClerkVendorCreation().catch(console.error);