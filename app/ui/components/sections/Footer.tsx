import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='w-full bg-neutral-900 text-white'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>B</span>
              </div>
              <span className='text-xl font-bold'>Bdocs</span>
            </div>
            <p className='text-neutral-400 text-sm leading-relaxed'>
              Your gateway to endless reading adventures. Discover, explore, and immerse yourself in the world of books.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Quick Links</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link href="/" className='text-neutral-400 hover:text-white transition-colors'>Home</Link></li>
              <li><Link href="/Shop" className='text-neutral-400 hover:text-white transition-colors'>Shop</Link></li>
              <li><Link href="/About" className='text-neutral-400 hover:text-white transition-colors'>About</Link></li>
              <li><Link href="/cart" className='text-neutral-400 hover:text-white transition-colors'>Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Categories</h3>
            <ul className='space-y-2 text-sm'>
              <li><Link href="/Shop?category=fiction" className='text-neutral-400 hover:text-white transition-colors'>Fiction</Link></li>
              <li><Link href="/Shop?category=non-fiction" className='text-neutral-400 hover:text-white transition-colors'>Non-Fiction</Link></li>
              <li><Link href="/Shop?category=science" className='text-neutral-400 hover:text-white transition-colors'>Science</Link></li>
              <li><Link href="/Shop?category=history" className='text-neutral-400 hover:text-white transition-colors'>History</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Contact</h3>
            <ul className='space-y-2 text-sm'>
              <li className='text-neutral-400'>support@bdocs.com</li>
              <li className='text-neutral-400'>+1 (555) 123-4567</li>
              <li className='text-neutral-400'>123 Book Street, Reading City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <div className='text-sm text-neutral-400'>
            © 2024 Bdocs. All rights reserved.
          </div>
          <div className='flex items-center space-x-4 text-sm'>
            <span className='text-neutral-400'>Designed and Developed by</span>
            <span className='text-primary-400 font-medium'>Clifford Gyan</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer