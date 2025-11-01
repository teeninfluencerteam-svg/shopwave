const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://dhananjaywin15112004:ec2cY3Gk2HxizdS2@cluster.4jkps.mongodb.net/?retryWrites=true&w=majority&appName=photos-test';
const DB_NAME = 'photos-test';

async function fixVendorIssues() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const vendorsCollection = db.collection('vendors');
    
    // 1. Check current vendors
    console.log('\n📊 CURRENT VENDOR STATUS:');
    const allVendors = await vendorsCollection.find({}).toArray();
    console.log(`Total vendors found: ${allVendors.length}`);
    
    if (allVendors.length === 0) {
      console.log('❌ No vendors found! Creating test vendors...');
      
      // Create multiple test vendors for testing
      const testVendors = [
        {
          email: 'vendor1@test.com',
          password: 'vendor123',
          name: 'Rajesh Kumar',
          businessName: 'Kumar Fashion Store',
          phone: '9876543210',
          businessType: 'Individual',
          address: {
            street: '123 Main Street',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110001',
            country: 'India'
          },
          status: 'approved',
          commission: 15,
          totalEarnings: 0,
          totalProducts: 0,
          totalOrders: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          approvedAt: new Date()
        },
        {
          email: 'vendor2@test.com',
          password: 'vendor123',
          name: 'Priya Sharma',
          businessName: 'Sharma Electronics',
          phone: '9876543211',
          businessType: 'Partnership',
          address: {
            street: '456 Market Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            country: 'India'
          },
          status: 'pending',
          commission: 15,
          totalEarnings: 0,
          totalProducts: 0,
          totalOrders: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'vendor3@test.com',
          password: 'vendor123',
          name: 'Amit Singh',
          businessName: 'Singh Handicrafts',
          phone: '9876543212',
          businessType: 'Private Limited',
          address: {
            street: '789 Craft Lane',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302001',
            country: 'India'
          },
          status: 'approved',
          commission: 12,
          totalEarnings: 5000,
          totalProducts: 5,
          totalOrders: 10,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          updatedAt: new Date(),
          approvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        }
      ];
      
      for (const vendor of testVendors) {
        // Generate vendorId
        vendor.vendorId = 'VND' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
        
        const result = await vendorsCollection.insertOne(vendor);
        console.log(`✅ Created vendor: ${vendor.businessName} (${vendor.email}) - ID: ${result.insertedId}`);
      }
      
      console.log(`✅ Created ${testVendors.length} test vendors`);
    }
    
    // 2. Fix missing vendorIds
    console.log('\n🔧 FIXING MISSING VENDOR IDs:');
    const vendorsWithoutId = await vendorsCollection.find({ vendorId: { $exists: false } }).toArray();
    
    if (vendorsWithoutId.length > 0) {
      console.log(`Found ${vendorsWithoutId.length} vendors without vendorId`);
      
      for (const vendor of vendorsWithoutId) {
        const newVendorId = 'VND' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
        
        await vendorsCollection.updateOne(
          { _id: vendor._id },
          { 
            $set: { 
              vendorId: newVendorId,
              updatedAt: new Date()
            }
          }
        );
        
        console.log(`✅ Generated vendorId for ${vendor.email}: ${newVendorId}`);
      }
    } else {
      console.log('✅ All vendors have vendorId');
    }
    
    // 3. Fix missing required fields
    console.log('\n🔧 FIXING MISSING REQUIRED FIELDS:');
    const vendorsToFix = await vendorsCollection.find({}).toArray();
    
    for (const vendor of vendorsToFix) {
      const updates = {};
      
      // Ensure password exists
      if (!vendor.password) {
        updates.password = 'vendor123';
      }
      
      // Ensure commission exists
      if (!vendor.commission) {
        updates.commission = 15;
      }
      
      // Ensure numeric fields exist
      if (!vendor.totalEarnings) updates.totalEarnings = 0;
      if (!vendor.totalProducts) updates.totalProducts = 0;
      if (!vendor.totalOrders) updates.totalOrders = 0;
      if (!vendor.totalRevenue) updates.totalRevenue = 0;
      if (!vendor.rating) updates.rating = 0;
      if (!vendor.reviewCount) updates.reviewCount = 0;
      
      // Ensure address structure
      if (!vendor.address) {
        updates.address = {
          street: 'Not provided',
          city: 'Not provided',
          state: 'Not provided',
          pincode: '000000',
          country: 'India'
        };
      }
      
      // Ensure timestamps
      if (!vendor.updatedAt) {
        updates.updatedAt = new Date();
      }
      
      if (Object.keys(updates).length > 0) {
        await vendorsCollection.updateOne(
          { _id: vendor._id },
          { $set: updates }
        );
        console.log(`✅ Fixed fields for ${vendor.email}:`, Object.keys(updates));
      }
    }
    
    // 4. Remove duplicates
    console.log('\n🔧 REMOVING DUPLICATE VENDORS:');
    const pipeline = [
      {
        $group: {
          _id: '$email',
          count: { $sum: 1 },
          docs: { $push: '$$ROOT' }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ];
    
    const duplicates = await vendorsCollection.aggregate(pipeline).toArray();
    
    if (duplicates.length > 0) {
      console.log(`Found ${duplicates.length} duplicate email groups`);
      
      for (const group of duplicates) {
        console.log(`\nProcessing duplicates for: ${group._id}`);
        
        // Keep the most recent approved vendor, or the first one if none approved
        const sortedDocs = group.docs.sort((a, b) => {
          if (a.status === 'approved' && b.status !== 'approved') return -1;
          if (b.status === 'approved' && a.status !== 'approved') return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        const keepVendor = sortedDocs[0];
        const removeVendors = sortedDocs.slice(1);
        
        console.log(`  Keeping: ${keepVendor._id} (${keepVendor.status})`);
        
        for (const vendor of removeVendors) {
          await vendorsCollection.deleteOne({ _id: vendor._id });
          console.log(`  Removed: ${vendor._id} (${vendor.status})`);
        }
      }
    } else {
      console.log('✅ No duplicate vendors found');
    }
    
    // 5. Final verification
    console.log('\n📊 FINAL VERIFICATION:');
    const finalVendors = await vendorsCollection.find({}).toArray();
    console.log(`Total vendors after cleanup: ${finalVendors.length}`);
    
    const statusCounts = {};
    finalVendors.forEach(vendor => {
      statusCounts[vendor.status] = (statusCounts[vendor.status] || 0) + 1;
    });
    
    console.log('Status distribution:');
    Object.keys(statusCounts).forEach(status => {
      console.log(`  ${status}: ${statusCounts[status]}`);
    });
    
    // 6. Display sample vendor for testing
    if (finalVendors.length > 0) {
      const sampleVendor = finalVendors.find(v => v.status === 'approved') || finalVendors[0];
      console.log('\n🧪 SAMPLE VENDOR FOR TESTING:');
      console.log(`Email: ${sampleVendor.email}`);
      console.log(`Password: ${sampleVendor.password}`);
      console.log(`Business: ${sampleVendor.businessName}`);
      console.log(`Status: ${sampleVendor.status}`);
      console.log(`Vendor ID: ${sampleVendor.vendorId}`);
      console.log(`MongoDB ID: ${sampleVendor._id}`);
    }
    
    console.log('\n✅ ALL VENDOR ISSUES FIXED!');
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Go to /admin/vendors to see all vendors');
    console.log('2. Test vendor login with sample credentials above');
    console.log('3. Test vendor registration with new email');
    console.log('4. Check if vendors appear in admin panel');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the fix
fixVendorIssues().catch(console.error);