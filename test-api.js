const testAPI = async () => {
  try {
    console.log('Testing API...');
    const response = await fetch('http://localhost:3000/api/vendor/profile?email=dhananjay.win2004@gmail.com');
    const data = await response.json();
    console.log('API Response:', data);
  } catch (error) {
    console.error('API Error:', error);
  }
};

testAPI();