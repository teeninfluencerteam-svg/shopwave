import Link from 'next/link';
import Image from 'next/image';
import { Youtube, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <>

      
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