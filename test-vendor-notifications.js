const { performance } = require('perf_hooks');

async function testVendorNotifications() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const testVendorId = '68fc896a722d94a0967f2329'; // Use actual vendor ObjectId from database
  
  console.log('🔔 Testing Vendor Notification System...\n');
  
  // Test sending notification from admin
  console.log('📤 Testing admin sending notification...');
  const sendStart = performance.now();
  
  try {
    const response = await fetch(`${baseUrl}/api/admin/vendor-notification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorId: testVendorId,
        title: 'Test Notification',
        message: 'This is a test notification from admin to vendor.',
        type: 'system'
      })
    });
    
    const sendEnd = performance.now();
    const sendTime = Math.round(sendEnd - sendStart);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Notification sent successfully: ${sendTime}ms`);
      console.log(`   Notification ID: ${data.notification?._id}`);
      console.log(`   Title: ${data.notification?.title}`);
      console.log(`   Message: ${data.notification?.message}`);
      
      // Test fetching notifications for vendor
      console.log('\n📥 Testing vendor fetching notifications...');
      const fetchStart = performance.now();
      
      const fetchResponse = await fetch(`${baseUrl}/api/vendor/notifications?vendorId=${testVendorId}`);
      const fetchEnd = performance.now();
      const fetchTime = Math.round(fetchEnd - fetchStart);
      
      if (fetchResponse.ok) {
        const fetchData = await fetchResponse.json();
        console.log(`✅ Notifications fetched successfully: ${fetchTime}ms`);
        console.log(`   Total notifications: ${fetchData.notifications?.length || 0}`);
        
        if (fetchData.notifications && fetchData.notifications.length > 0) {
          console.log('   Recent notifications:');
          fetchData.notifications.slice(0, 3).forEach((notif, index) => {
            console.log(`   ${index + 1}. ${notif.title} - ${notif.read ? 'Read' : 'Unread'}`);
          });
        }
      } else {
        console.log(`❌ Failed to fetch notifications: ${fetchResponse.status}`);
      }
      
    } else {
      console.log(`❌ Failed to send notification: ${response.status}`);
      const errorData = await response.json();
      console.log(`   Error: ${errorData.error}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
  
  console.log('\n💡 Notification System Features:');
  console.log('   ✅ Admin can send notifications to specific vendors');
  console.log('   ✅ Vendors can view notifications in dashboard');
  console.log('   ✅ Read/unread status tracking');
  console.log('   ✅ Different notification types (system, order, etc.)');
  
  console.log('\n🎯 How to test:');
  console.log('   1. Go to admin panel: /admin/vendors');
  console.log('   2. Click on a vendor to view details');
  console.log('   3. Click "Send Notice" button');
  console.log('   4. Enter title and message');
  console.log('   5. Check vendor dashboard for notification');
}

// Run the test
testVendorNotifications().catch(console.error);