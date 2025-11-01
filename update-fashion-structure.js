const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/data/fashion.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define the mapping of products to Men/Women categories
const productMapping = {
  'Cotton T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'Graphic T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'V-Neck T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'Polo T-Shirt': { subcategory: 'Men', tertiaryCategory: 'Polo-T-Shirts' },
  'Long Sleeve T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'Striped T-Shirt': { subcategory: 'Women', tertiaryCategory: 'Tops' },
  'Henley T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'Pocket T-Shirt': { subcategory: 'Men', tertiaryCategory: 'T-Shirts' },
  'Tank Top': { subcategory: 'Women', tertiaryCategory: 'Tops' },
  'Oversized T-Shirt': { subcategory: 'Women', tertiaryCategory: 'Tops' },
  
  'Slim Fit Jeans': { subcategory: 'Men', tertiaryCategory: 'Jeans' },
  'Straight Fit Jeans': { subcategory: 'Men', tertiaryCategory: 'Jeans' },
  'Skinny Jeans': { subcategory: 'Women', tertiaryCategory: 'Jeans' },
  'Bootcut Jeans': { subcategory: 'Women', tertiaryCategory: 'Jeans' },
  'Ripped Jeans': { subcategory: 'Women', tertiaryCategory: 'Jeans' },
  'High Waist Jeans': { subcategory: 'Women', tertiaryCategory: 'Jeans' },
  'Relaxed Fit Jeans': { subcategory: 'Men', tertiaryCategory: 'Jeans' },
  'Dark Wash Jeans': { subcategory: 'Men', tertiaryCategory: 'Jeans' },
  'Light Wash Jeans': { subcategory: 'Women', tertiaryCategory: 'Jeans' },
  'Black Jeans': { subcategory: 'Men', tertiaryCategory: 'Jeans' },
  
  'Casual Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Formal Shirt': { subcategory: 'Men', tertiaryCategory: 'Formal-Shirts' },
  'Checkered Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Denim Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Linen Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Striped Shirt': { subcategory: 'Men', tertiaryCategory: 'Formal-Shirts' },
  'Hawaiian Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Oxford Shirt': { subcategory: 'Men', tertiaryCategory: 'Formal-Shirts' },
  'Flannel Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  'Short Sleeve Shirt': { subcategory: 'Men', tertiaryCategory: 'Casual-Shirts' },
  
  'Summer Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Maxi Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Cocktail Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Casual Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Floral Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'A-Line Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Wrap Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Bodycon Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Midi Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  'Shift Dress': { subcategory: 'Women', tertiaryCategory: 'Dresses' },
  
  'Sports Shoes': { subcategory: 'Men', tertiaryCategory: 'Sneakers' },
  'Casual Sneakers': { subcategory: 'Men', tertiaryCategory: 'Sneakers' },
  'Formal Shoes': { subcategory: 'Men', tertiaryCategory: 'Formal-Shoes' },
  'Boots': { subcategory: 'Men', tertiaryCategory: 'Casual-Shoes' },
  'Sandals': { subcategory: 'Women', tertiaryCategory: 'Shoes' },
  'Loafers': { subcategory: 'Men', tertiaryCategory: 'Casual-Shoes' },
  'High Heels': { subcategory: 'Women', tertiaryCategory: 'Shoes' },
  'Canvas Shoes': { subcategory: 'Men', tertiaryCategory: 'Casual-Shoes' },
  'Slip-on Shoes': { subcategory: 'Men', tertiaryCategory: 'Casual-Shoes' },
  'Running Shoes': { subcategory: 'Men', tertiaryCategory: 'Sneakers' },
  
  'Leather Belt': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Wrist Watch': { subcategory: 'Men', tertiaryCategory: 'Watches' },
  'Sunglasses': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Baseball Cap': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Leather Wallet': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Scarf': { subcategory: 'Women', tertiaryCategory: 'Accessories' },
  'Backpack': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Handbag': { subcategory: 'Women', tertiaryCategory: 'Accessories' },
  'Tie': { subcategory: 'Men', tertiaryCategory: 'Accessories' },
  'Jewelry Set': { subcategory: 'Women', tertiaryCategory: 'Accessories' }
};

// Update the content
Object.entries(productMapping).forEach(([productName, mapping]) => {
  const regex = new RegExp(`(name: '${productName}',[\\s\\S]*?)subcategory: '[^']*',`, 'g');
  content = content.replace(regex, `$1subcategory: '${mapping.subcategory}',\n    tertiaryCategory: '${mapping.tertiaryCategory}',`);
});

fs.writeFileSync(filePath, content);
console.log('Fashion products updated with proper subcategory structure!');