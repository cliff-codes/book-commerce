'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button, Badge } from '../design-system';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCartStore } from '@/app/cartStore';
import { useWishlistStore } from '@/app/wishlistStore';
import SearchBox from '../utilityComponents/SearchBox';
import UserProfileModal from '../modals/UserProfileModal';

const StickyHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { getNumberOfPersistedBooks, getTotalCost } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const cartItemCount = getNumberOfPersistedBooks();
  const cartTotal = getTotalCost();
  const wishlistCount = getWishlistCount();

  // Determine if we're on the home page (where transparent header works)
  const isHomePage = pathname === '/';
  
  // Determine header styling based on page and scroll state
  const getHeaderStyles = () => {
    if (isHomePage) {
      // Home page: transparent when not scrolled, solid when scrolled
      return {
        header: isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200' 
          : 'bg-transparent',
        textColor: isScrolled ? 'text-neutral-900' : 'text-white',
        textColorMuted: isScrolled ? 'text-neutral-600' : 'text-white/80',
        textColorHover: isScrolled ? 'text-neutral-900' : 'text-white',
        logoBg: isScrolled ? 'bg-primary-500' : 'bg-white/20 backdrop-blur-sm',
        logoText: 'text-white',
        activeLink: isScrolled ? 'text-primary-600' : 'text-white'
      };
    } else {
      // Other pages: always solid background
      return {
        header: 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200',
        textColor: 'text-neutral-900',
        textColorMuted: 'text-neutral-600',
        textColorHover: 'text-neutral-900',
        logoBg: 'bg-primary-500',
        logoText: 'text-white',
        activeLink: 'text-primary-600'
      };
    }
  };

  const styles = getHeaderStyles();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/Shop' },
    { name: 'Categories', href: '/Shop?category=all' },
    { name: 'About', href: '/About' },
  ];

  return (
    <>
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${styles.header}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${styles.logoBg}`}>
                <span className={`font-bold text-xl ${styles.logoText}`}>B</span>
              </div>
              <span className={`font-bold text-xl transition-colors duration-300 ${styles.textColor}`}>
                Bdocs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-200 hover:scale-105 ${
                    pathname === item.href
                      ? styles.activeLink
                      : `${styles.textColorMuted} hover:${styles.textColorHover}`
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`transition-colors duration-200 ${styles.textColorMuted} hover:${styles.textColorHover}`}
              >
                <FiSearch className="w-5 h-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative transition-colors duration-200 ${styles.textColorMuted} hover:${styles.textColorHover}`}
                >
                  <FiHeart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      size="sm" 
                      className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs"
                    >
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative transition-colors duration-200 ${styles.textColorMuted} hover:${styles.textColorHover}`}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      size="sm" 
                      className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {session?.user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsProfileModalOpen(true)}
                  className={`transition-colors duration-200 ${styles.textColorMuted} hover:${styles.textColorHover}`}
                >
                  <FiUser className="w-5 h-5" />
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    variant={isScrolled || !isHomePage ? "outline" : "ghost"}
                    size="sm"
                    className={`transition-all duration-200 ${
                      isScrolled || !isHomePage
                        ? 'text-primary-600 border-primary-600 hover:bg-primary-50' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-colors duration-200 ${styles.textColorMuted} hover:${styles.textColorHover}`}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 animate-slide-down">
              <SearchBox variant="compact" />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-lg font-semibold text-neutral-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiX className="w-6 h-6" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 p-6">
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        pathname === item.href
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Search */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-neutral-500 mb-3">Search</h3>
                  <SearchBox variant="mobile" />
                </div>
              </nav>

              {/* Mobile Actions */}
              <div className="p-6 border-t border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Cart Items</span>
                  <Badge variant="outline">{cartItemCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total</span>
                  <span className="font-semibold text-neutral-900">${cartTotal}</span>
                </div>
                
                {session?.user ? (
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => setIsProfileModalOpen(true)}
                  >
                    <FiUser className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                ) : (
                  <Link href="/login" className="block">
                    <Button fullWidth>
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default StickyHeader;
