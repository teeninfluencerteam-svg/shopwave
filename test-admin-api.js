// Test script to check admin vendor-products API
const testAdminAPI = async () => {
  try {
    console.log('Testing admin vendor-products API...')
    
    // First, get some products to test with
    const getResponse = await fetch('http://localhost:3000/api/admin/vendor-products')
    const getData = await getResponse.json()
    
    console.log('GET Response:', {
      status: getResponse.status,
      success: getData.success,
      productsCount: getData.products?.length || 0
    })
    
    if (getData.products && getData.products.length > 0) {
      const testProduct = getData.products[0]
      console.log('Testing with product:', testProduct._id)
      
      // Test PUT request
      const putResponse = await fetch('http://localhost:3000/api/admin/vendor-products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: testProduct._id, 
          status: 'active' 
        })
      })
      
      const putData = await putResponse.json()
      
      console.log('PUT Response:', {
        status: putResponse.status,
        success: putData.success,
        message: putData.message
      })
    } else {
      console.log('No products found to test with')
    }
    
  } catch (error) {
    console.error('Test failed:', error.message)
  }
}

testAdminAPI()