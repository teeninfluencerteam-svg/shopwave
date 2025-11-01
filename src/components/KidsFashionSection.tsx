'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Star, Gift } from 'lucide-react';

const kidsCategories = [
  {
    title: "Boys Collection",
    subtitle: "Cool & Trendy Outfits",
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
    href: '/search?category=Boys',
    color: 'from-blue-400 to-blue-600',
    icon: <Star className="w-5 h-5" />,
    items: ['T-Shirts', 'Shirts', 'Jeans', 'Shorts', 'Shoes']
  },
  {
    title: "Girls Collection",
    subtitle: "Pretty & Comfortable",
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400',
    href: '/search?category=Girls',
    color: 'from-pink-400 to-pink-600',
    icon: <Heart className="w-5 h-5" />,
    items: ['Dresses', 'Tops', 'Skirts', 'Leggings', 'Sandals']
  },
  {
    title: "Baby Wear",
    subtitle: "Soft & Safe for Little Ones",
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    href: '/search?category=Baby',
    color: 'from-yellow-400 to-orange-500',
    icon: <Sparkles className="w-5 h-5" />,
    items: ['Onesies', 'Rompers', 'Sleepwear', 'Bibs', 'Booties']
  },
  {
    title: "Special Occasions",
    subtitle: "Party & Festival Wear",
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    href: '/search?category=Kids%20Party',
    color: 'from-purple-400 to-purple-600',
    icon: <Gift className="w-5 h-5" />,
    items: ['Party Dresses', 'Formal Shirts', 'Ethnic Wear', 'Accessories']
  }
];

const features = [
  {
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    title: "100% Safe Materials",
    description: "Skin-friendly fabrics for your little ones"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
    title: "Trendy Designs",
    description: "Latest fashion trends for kids"
  },
  {
    icon: <Star className="w-6 h-6 text-blue-500" />,
    title: "Comfort First",
    description: "Designed for active kids"
  }
];

export default function KidsFashionSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Kids Fashion
            </h2>
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cute and comfortable clothing for children. Made with love, designed for play! 
            <span className="text-pink-500 font-semibold"> Safe • Stylish • Affordable</span>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kidsCategories.map((category, index) => (
            <div key={category.title} className="group">
              <Link 
                href={category.href}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={category.image} 
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    {category.icon}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h3 className="text-xl font-bold mb-2 text-center drop-shadow-lg">
                      {category.title}
                    </h3>
                    <p className="text-sm text-center opacity-90 drop-shadow">
                      {category.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">
              🎉 Special Kids Collection Sale! 🎉
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Up to 50% OFF on all kids fashion items. Limited time offer!
            </p>
            <Link 
              href="/search?category=Kids"
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Gift className="w-5 h-5" />
              Shop Now
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}