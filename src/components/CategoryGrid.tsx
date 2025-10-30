'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface CategoryGridProps {
  buttonColor?: string
}

const defaultCategories = [
  { _id: '1', name: 'Mobile Accessories', slug: 'mobile-accessories', image: '/images/placeholder.jpg' },
  { _id: '2', name: 'Computer Accessories', slug: 'computer-accessories', image: '/images/placeholder.jpg' },
  { _id: '3', name: 'Audio', slug: 'audio', image: '/images/placeholder.jpg' },
  { _id: '4', name: 'Lighting', slug: 'lighting', image: '/images/placeholder.jpg' },
  { _id: '5', name: 'Power & Cables', slug: 'power-cables', image: '/images/placeholder.jpg' },
  { _id: '6', name: 'Kitchen Appliances', slug: 'kitchen-appliances', image: '/images/placeholder.jpg' }
]

export default function CategoryGrid({ buttonColor }: CategoryGridProps) {
  const [categories, setCategories] = useState(defaultCategories)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.categories.length > 0) {
          setCategories(data.categories)
        }
      })
      .catch(() => {
        // Keep default categories on error
      })
  }, [])

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link key={category._id} href={`/category/${category.slug}`} className="group block">
            <div className="relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300">
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3 md:p-4">
                <h3 className="text-white text-md md:text-xl font-semibold">{category.name}</h3>
                <Button size="sm" className={cn("mt-2 h-8 px-3 text-xs", buttonColor)}>
                  Shop Now
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
