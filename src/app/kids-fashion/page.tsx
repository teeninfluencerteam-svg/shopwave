'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Gift, Sparkles, ShoppingBag, Filter, Grid, List } from 'lucide-react';

const kidsProducts = [
  {
    id: 1,
    name: "Cute Rainbow T-Shirt",
    price: 599,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400",
    category: "Boys",
    age: "3-8 years",
    rating: 4.8,
    reviews: 124,
    isNew: true
  },
  {
    id: 2,
    name: "Princess Party Dress",
    price: 1299,
    originalPrice: 1899,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400",
    category: "Girls",
    age: "2-6 years",
    rating: 4.9,
    reviews: 89,
    isBestseller: true
  },
  {
    id: 3,
    name: "Superhero Hoodie",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
    category: "Boys",
    age: "4-10 years",
    rating: 4.7,
    reviews: 156,
    isNew: false
  },
  {
    id: 4,
    name: "Unicorn Pajama Set",
    price: 799,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400",
    category: "Girls",
    age: "1-5 years",
    rating: 4.6,
    reviews: 78,
    isNew: false
  }
];

const ageGroups = ["All Ages", "0-2 years", "3-5 years", "6-8 years", "9-12 years"];
const categories = ["All", "Boys", "Girls", "Baby", "Unisex"];

export default function KidsFashionPage() {
  const [selectedAge, setSelectedAge] = useState("All Ages");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-yellow-500 animate-bounce" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Kids Fashion Paradise
            </h1>
            <Heart className="w-10 h-10 text-pink-500 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the cutest and most comfortable clothing for your little ones! 
            <span className="text-pink-500 font-semibold"> Safe materials • Trendy designs • Affordable prices</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <span className="text-green-600 font-semibold">✓ 100% Safe Materials</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <span className="text-blue-600 font-semibold">✓ Free Shipping</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <span className="text-purple-600 font-semibold">✓ Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white/70 backdrop-blur-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filters:</span>
              </div>
              
              <select 
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>

              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {kidsProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          New! ✨
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          Bestseller 🔥
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-pink-500" />
                    </button>

                    {/* Discount Badge */}
                    <div className="absolute bottom-3 right-3 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {product.age}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-pink-600">₹{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 transform hover:scale-105">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 text-white text-center shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gift className="w-8 h-8 animate-bounce" />
              <h2 className="text-3xl font-bold">Special Kids Collection Sale!</h2>
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <p className="text-xl mb-6 opacity-90">
              Get up to 60% OFF on all kids fashion items + Free shipping on orders above ₹999
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/search?category=Boys"
                className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Shop Boys Collection
              </Link>
              <Link 
                href="/search?category=Girls"
                className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Shop Girls Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}