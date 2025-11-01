// Test profile mixing issue
async function testProfileMixing() {
  console.log('🧪 Testing Profile Mixing Issue...\n')
  
  const vendors = [
    'dhananjay.win2004@gmail.com',
    'dhananjay.win2008@gmail.com', 
    'shipmydealsexpress@gmail.com'
  ]
  
  for (const email of vendors) {
    console.log(`\n📧 Testing login for: ${email}`)
    
    try {
      const response = await fetch('http://localhost:3000/api/vendor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json()
      
      if (data.success) {
        console.log(`✅ Login successful`)
        console.log(`   Business: ${data.vendor.businessName}`)
        console.log(`   Email: ${data.vendor.email}`)
        console.log(`   Vendor ID: ${data.vendor.vendorId}`)
        console.log(`   MongoDB ID: ${data.vendor._id}`)
        
        // Verify email matches
        if (data.vendor.email === email) {
          console.log(`✅ Email verification passed`)
        } else {
          console.log(`❌ EMAIL MISMATCH! Expected: ${email}, Got: ${data.vendor.email}`)
        }
      } else {
        console.log(`❌ Login failed: ${data.error}`)
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`)
    }
    
    console.log('---')
  }
  
  console.log('\n🎯 SOLUTION:')
  console.log('1. Clear browser localStorage completely')
  console.log('2. Use incognito/private browsing for each vendor')
  console.log('3. Or use different browsers for different vendors')
  console.log('4. The fix ensures fresh data fetch on each login')
}

testProfileMixing().catch(console.error)