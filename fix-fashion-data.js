const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/data/fashion.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the old structure with new structure
content = content.replace(/{\s*id: '([^']+)',\s*name: '([^']+)',\s*price: (\d+),\s*originalPrice: (\d+),\s*image: '([^']+)',\s*category: '([^']+)',\s*subcategory: '([^']+)',\s*quantity: (\d+),\s*description: '([^']+)',\s*rating: ([\d.]+),\s*reviews: (\d+)\s*}/g, 
  (match, id, name, price, originalPrice, image, category, subcategory, quantity, description, rating, reviews) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return `{
    id: '${id}',
    slug: '${slug}',
    name: '${name}',
    brand: 'ShopWave',
    price: { original: ${originalPrice}, discounted: ${price} },
    image: '${image}',
    category: '${category}',
    subcategory: '${subcategory}',
    quantity: ${quantity},
    description: '${description}',
    ratings: { average: ${rating}, count: ${reviews} }
  }`;
});

fs.writeFileSync(filePath, content);
console.log('Fashion data structure fixed!');