const fs = require('fs');
const path = require('path');

const fashionFilePath = path.join(__dirname, 'src', 'lib', 'data', 'fashion.ts');

// Read the file
let content = fs.readFileSync(fashionFilePath, 'utf8');

// Replace all price objects with both formats
content = content.replace(/price: { original: (\d+), discounted: (\d+) },/g, (match, original, discounted) => {
  return `price: { original: ${original}, discounted: ${discounted} },
    price_original: ${original},
    price_discounted: ${discounted},
    price_currency: '₹',`;
});

// Write back to file
fs.writeFileSync(fashionFilePath, content);

console.log('✅ Fixed fashion product prices format');