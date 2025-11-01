// Test vendor login with existing email
fetch('http://localhost:3000/api/vendor/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'dhananjay.win2004@gmail.com' })
})
.then(res => res.json())
.then(data => {
  console.log('Login Test Result:');
  console.log(JSON.stringify(data, null, 2));
})
.catch(err => console.error('Error:', err));