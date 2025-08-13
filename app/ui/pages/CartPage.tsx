'use client';

import React from 'react';
import { useCartStore } from '@/app/cartStore';
import { Card, Button, Badge } from '../design-system';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiLock, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
  const { 
    books, 
    removeFromCart, 
    increaseQty, 
    decreaseQty, 
    getTotalCost,
    getNumberOfPersistedBooks,
    clearCart 
  } = useCartStore();

  const cartItems = books;
  const totalItems = getNumberOfPersistedBooks();
  const totalCost = getTotalCost();
  const shippingCost = totalCost > 50 ? 0 : 5.99;
  const tax = totalCost * 0.08; // 8% tax
  const finalTotal = totalCost + shippingCost + tax;

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
            <FiShoppingCart className="w-12 h-12 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any books to your cart yet. Start shopping to discover amazing reads!
          </p>
          <Link href="/Shop">
            <Button variant="primary" size="lg">
              Continue Shopping
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
            Shopping Cart
          </h1>
          <p className="text-neutral-600">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Button
          variant="outline"
          onClick={clearCart}
          className="flex items-center gap-2"
        >
          <FiTrash2 className="w-4 h-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex gap-4">
                      {/* Book Image */}
                      <div className="relative w-20 h-28 flex-shrink-0">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover rounded-md"
                          sizes="80px"
                        />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-2">
                              {item.author || 'Unknown Author'}
                            </p>
                            <p className="text-lg font-bold text-primary-600">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item._id)}
                            className="text-neutral-400 hover:text-red-500"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => decreaseQty(item._id)}
                              disabled={item.qty <= 1}
                              className="w-8 h-8 p-0"
                            >
                              <FiMinus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.qty}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => increaseQty(item._id)}
                              className="w-8 h-8 p-0"
                            >
                              <FiPlus className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-neutral-600">Subtotal</p>
                            <p className="font-semibold text-neutral-900">
                              ${(item.price * item.qty).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Order Summary
            </h2>

            {/* Summary Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">${totalCost.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {shippingCost > 0 && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  <p className="font-medium">Free shipping on orders over $50!</p>
                  <p className="text-xs mt-1">
                    Add ${(50 - totalCost).toFixed(2)} more to get free shipping
                  </p>
                </div>
              )}
              
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Including tax and shipping
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/checkout" className="block">
                <Button 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  className="flex items-center justify-center gap-2"
                >
                  <FiLock className="w-4 h-4" />
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link href="/Shop" className="block">
                <Button 
                  variant="outline" 
                  fullWidth
                  className="flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FiLock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-neutral-900">Secure Checkout</span>
              </div>
              <p className="text-xs text-neutral-600">
                Your payment information is encrypted and secure. We never store your credit card details.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;