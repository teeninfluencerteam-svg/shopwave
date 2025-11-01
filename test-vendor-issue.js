const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = 'photos-test';

async function testVendorIssue() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const vendorsCollection = db.collection('vendors');
    
    // 1. Check all vendors in database
    console.log('\n📊 CHECKING ALL VENDORS IN DATABASE:');
    const allVendors = await vendorsCollection.find({}).toArray();
    console.log(`Total vendors found: ${allVendors.length}`);
    
    if (allVendors.length === 0) {
      console.log('❌ No vendors found in database!');
      
      // Create a test vendor
      console.log('\n🔧 Creating test vendor...');
      const testVendor = {
        email: 'test@vendor.com',
        password: 'vendor123',
        name: 'Test Vendor',
        businessName: 'Test Business',
        phone: '9876543210',
        address: {
          street: 'Test Street',
          city: 'Test City',
          state: 'Test State',
          pincode: '123456'
        },
        status: 'approved',
        commission: 15,
        totalEarnings: 0,
        totalProducts: 0,
        totalOrders: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await vendorsCollection.insertOne(testVendor);
      console.log('✅ Test vendor created:', result.insertedId);
      
      // Re-fetch vendors
      const updatedVendors = await vendorsCollection.find({}).toArray();
      console.log(`Updated vendor count: ${updatedVendors.length}`);
    }
    
    // 2. Display vendor details
    console.log('\n👥 VENDOR DETAILS:');
    allVendors.forEach((vendor, index) => {
      console.log(`\n${index + 1}. Vendor Details:`);
      console.log(`   - ID: ${vendor._id}`);
      console.log(`   - Vendor ID: ${vendor.vendorId || 'NOT GENERATED'}`);
      console.log(`   - Email: ${vendor.email}`);
      console.log(`   - Password: ${vendor.password || 'NOT SET'}`);
      console.log(`   - Business Name: ${vendor.businessName}`);
      console.log(`   - Owner Name: ${vendor.name}`);
      console.log(`   - Status: ${vendor.status}`);
      console.log(`   - Phone: ${vendor.phone || 'Not provided'}`);
      console.log(`   - Created: ${vendor.createdAt}`);
      console.log(`   - Commission: ${vendor.commission || 15}%`);
    });
    
    // 3. Check for duplicate profiles issue
    console.log('\n🔍 CHECKING FOR DUPLICATE PROFILES:');
    const emailGroups = {};
    allVendors.forEach(vendor => {
      if (!emailGroups[vendor.email]) {
        emailGroups[vendor.email] = [];
      }
      emailGroups[vendor.email].push(vendor);
    });
    
    let duplicatesFound = false;
    Object.keys(emailGroups).forEach(email => {
      if (emailGroups[email].length > 1) {
        console.log(`❌ DUPLICATE FOUND for email: ${email}`);
        console.log(`   Found ${emailGroups[email].length} profiles:`);
        emailGroups[email].forEach((vendor, i) => {
          console.log(`   ${i + 1}. ID: ${vendor._id}, Status: ${vendor.status}, Created: ${vendor.createdAt}`);
        });
        duplicatesFound = true;
      }
    });
    
    if (!duplicatesFound) {
      console.log('✅ No duplicate profiles found');
    }
    
    // 4. Check vendor ID generation
    console.log('\n🆔 CHECKING VENDOR ID GENERATION:');
    const vendorsWithoutId = allVendors.filter(v => !v.vendorId);
    if (vendorsWithoutId.length > 0) {
      console.log(`❌ ${vendorsWithoutId.length} vendors missing vendorId`);
      
      // Fix missing vendor IDs
      for (const vendor of vendorsWithoutId) {
        const newVendorId = 'VND' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
        await vendorsCollection.updateOne(
          { _id: vendor._id },
          { $set: { vendorId: newVendorId, updatedAt: new Date() } }
        );
        console.log(`✅ Generated vendorId for ${vendor.email}: ${newVendorId}`);
      }
    } else {
      console.log('✅ All vendors have vendorId');
    }
    
    // 5. Test login flow
    console.log('\n🔐 TESTING LOGIN FLOW:');
    if (allVendors.length > 0) {
      const testEmail = allVendors[0].email;
      console.log(`Testing login for: ${testEmail}`);
      
      const loginVendor = await vendorsCollection.findOne({ email: testEmail });
      if (loginVendor) {
        console.log('✅ Vendor found for login');
        console.log(`   - Status: ${loginVendor.status}`);
        console.log(`   - Vendor ID: ${loginVendor.vendorId}`);
        console.log(`   - MongoDB _id: ${loginVendor._id}`);
        
        if (loginVendor.status === 'approved') {
          console.log('✅ Vendor is approved - login should work');
        } else {
          console.log(`❌ Vendor status is '${loginVendor.status}' - login will show pending message`);
        }
      } else {
        console.log('❌ Vendor not found for login');
      }
    }
    
    // 6. Check admin API compatibility
    console.log('\n🔧 ADMIN API COMPATIBILITY CHECK:');
    console.log('Checking if vendors have all required fields for admin display...');
    
    allVendors.forEach((vendor, index) => {
      console.log(`\nVendor ${index + 1} (${vendor.email}):`);
      const requiredFields = ['email', 'name', 'businessName', 'status', 'createdAt'];
      const missingFields = requiredFields.filter(field => !vendor[field]);
      
      if (missingFields.length > 0) {
        console.log(`   ❌ Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log('   ✅ All required fields present');
      }
      
      // Check address structure
      if (!vendor.address || !vendor.address.city) {
        console.log('   ⚠️  Address structure incomplete');
      } else {
        console.log('   ✅ Address structure OK');
      }
    });
    
    // 7. Summary and recommendations
    console.log('\n📋 SUMMARY & RECOMMENDATIONS:');
    console.log(`✅ Total vendors in database: ${allVendors.length}`);
    console.log(`✅ Approved vendors: ${allVendors.filter(v => v.status === 'approved').length}`);
    console.log(`⏳ Pending vendors: ${allVendors.filter(v => v.status === 'pending').length}`);
    console.log(`❌ Rejected vendors: ${allVendors.filter(v => v.status === 'rejected').length}`);
    
    if (allVendors.length === 0) {
      console.log('\n🔧 ISSUE IDENTIFIED: No vendors in database');
      console.log('   - Users registering as vendors but data not saving');
      console.log('   - Check vendor registration API endpoint');
      console.log('   - Check database connection in registration flow');
    }
    
    if (duplicatesFound) {
      console.log('\n🔧 ISSUE IDENTIFIED: Duplicate vendor profiles');
      console.log('   - Same user showing same profile data');
      console.log('   - Need to clean up duplicate entries');
    }
    
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Test vendor registration: /vendor/register');
    console.log('2. Test vendor login: /vendor/login');
    console.log('3. Check admin vendors page: /admin/vendors');
    console.log('4. Verify API endpoints are working');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test
testVendorIssue().catch(console.error);