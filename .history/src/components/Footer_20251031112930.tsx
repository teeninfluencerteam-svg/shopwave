import Link from 'next/link';
import Image from 'next/image';
import { Youtube, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <>
      {/* Fashion Categories Section */}
      <section className="bg-white py-8 md:py-12 border-t">
        <div className="container px-4">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-8">Fashion Categories</h2>
          
          {/* Men's Fashion */}
          <div className="mb-8 md:mb-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-6 md:mb-8">
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Men's Fashion</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Shirts, Jeans, T-Shirts & More</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Formal-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Formal Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Casual-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Casual Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=T-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">T-Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Polo-T-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Polo T-Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Jeans" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Jeans</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Trousers" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Trousers</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Formal-Shoes" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Formal Shoes</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Casual-Shoes" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Casual Shoes</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Sneakers" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Sneakers</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Jackets" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Jackets</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Hoodies" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Hoodies</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Men&tertiaryCategory=Watches" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Watches</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt="Men's Fashion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Women's Fashion */}
          <div className="mb-8 md:mb-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-6 md:mb-8">
              <div className="order-2 md:order-1 relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400"
                  alt="Women's Fashion"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Women's Fashion</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Dresses, Sarees, Kurtis & More</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Dresses" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Dresses</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Sarees" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Sarees</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Kurtis" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Kurtis</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Tops" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Tops</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Jeans" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Jeans</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Leggings" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Leggings</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Skirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Skirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Heels" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Heels</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Flats" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Flats</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Sandals" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Sandals</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Handbags" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Handbags</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Women&tertiaryCategory=Jewelry" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Jewelry</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Kids Fashion */}
          <div className="mb-8 md:mb-12">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-6 md:mb-8">
              <div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Kids Fashion</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Cute & Comfortable Clothing</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Boys-T-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Boys T-Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Girls-Dresses" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Girls Dresses</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Boys-Shirts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Boys Shirts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Girls-Tops" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Girls Tops</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Kids-Jeans" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Kids Jeans</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Kids-Shorts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Kids Shorts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Kids-Shoes" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Kids Shoes</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=School-Uniforms" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">School Uniforms</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Party-Wear" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Party Wear</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Sleepwear" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Sleepwear</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Winter-Wear" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Winter Wear</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Kids&tertiaryCategory=Accessories" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Accessories</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400"
                  alt="Kids Fashion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Fashion Accessories */}
          <div className="mb-6 md:mb-8">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="order-2 md:order-1 relative h-48 md:h-64 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
                  alt="Fashion Accessories"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">Fashion Accessories</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">Complete Your Look</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Watches" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Watches</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Sunglasses" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Sunglasses</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Belts" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Belts</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Wallets" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Wallets</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Bags" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Bags</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Jewelry" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Jewelry</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Caps-Hats" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Caps & Hats</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Scarves" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Scarves</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Ties" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Ties</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Hair-Accessories" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Hair Accessories</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Phone-Cases" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Phone Cases</span>
                    </div>
                  </Link>
                  <Link href="/search?category=Fashion&subcategory=Accessories&tertiaryCategory=Perfumes" className="text-center group">
                    <div className="bg-gray-100 rounded-lg p-2 md:p-3 group-hover:bg-gray-200 transition-colors">
                      <span className="text-xs md:text-sm font-medium">Perfumes</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-white">ShopWave</h3>
            <p className="text-sm text-gray-400 mt-2">Your one-stop shop for tech and home products.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link href="/search" className="text-gray-400 hover:text-white">Search</Link></li>
              <li><Link href="/orders" className="text-gray-400 hover:text-white">My Orders</Link></li>
              <li><Link href="/account" className="text-gray-400 hover:text-white">Account</Link></li>
              <li><Link href="/vendor/login" className="text-gray-400 hover:text-white">Vendor Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Help</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="text-gray-400 hover:text-white">Return Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Follow Us</h3>
            <div className="flex items-center gap-4 mt-2">
              <Link href="https://www.youtube.com/channel/UCz1ekjeE4g9f5Ad_vXdoN1A" target="_blank" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </Link>
              <Link href="https://www.instagram.com/dhananjay.2004" target="_blank" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="https://wa.me/919157499884" target="_blank" className="text-gray-400 hover:text-white">
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}