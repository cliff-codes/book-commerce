'use client';

import React from 'react';
import { useWishlistStore } from '@/app/wishlistStore';
import { Card, Button, Badge } from '../components/design-system';
import { FiHeart, FiShoppingCart, FiTrash2, FiEye, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-neutral-300'
        }`}
      />
    ));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
            <FiHeart className="w-12 h-12 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Start building your reading list by adding books you&apos;d like to read later.
          </p>
          <Link href="/Shop">
            <Button variant="primary" size="lg">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-neutral-600">
            {items.length} {items.length === 1 ? 'book' : 'books'} in your wishlist
          </p>
        </div>
        <Button
          variant="outline"
          onClick={clearWishlist}
          className="flex items-center gap-2"
        >
          <FiTrash2 className="w-4 h-4" />
          Clear All
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden group">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Link href={`/${item._id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                        >
                          <FiEye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-neutral-700"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </Button>

                  {/* Rating */}
                  {item.rating && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center gap-1">
                        {renderStars(item.rating)}
                        <span className="text-xs font-medium text-neutral-700 ml-1">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Author */}
                  <p className="text-sm text-neutral-600 mb-1">
                    {item.author || 'Unknown Author'}
                  </p>
                  
                  {/* Title */}
                  <Link href={`/${item._id}`}>
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  
                  {/* Description */}
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">
                      ${item.price.toFixed(2)}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromWishlist(item._id)}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State (if all items removed) */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
            <FiHeart className="w-12 h-12 text-neutral-400" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Wishlist Cleared
          </h2>
          <p className="text-neutral-600 mb-8">
            Your wishlist has been cleared. Start adding new books!
          </p>
          <Link href="/Shop">
            <Button variant="primary">
              Browse Books
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default WishlistPage;
