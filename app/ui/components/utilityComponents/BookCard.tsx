'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Badge, Button } from '../design-system';
import { FiHeart, FiStar, FiShoppingCart, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BookCardProps {
  id: string;
  title: string;
  price: number;
  coverImg: string;
  description: string;
  rating?: number;
  reviews?: number;
  author?: string;
  isNew?: boolean;
  discount?: number;
  inStock?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  price,
  coverImg,
  description,
  rating = 4.5,
  reviews = 128,
  author = 'Unknown Author',
  isNew = false,
  discount = 0,
  inStock = true
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-neutral-300'
          }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <Image
            src={coverImg}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              >
                <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Link href={`/${id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <FiEye className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge variant="success" size="sm">
                New
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="destructive" size="sm">
                -{discount}%
              </Badge>
            )}
            {!inStock && (
              <Badge variant="outline" size="sm" className="bg-white/90">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
              <span className="text-xs font-medium text-neutral-700 ml-1">
                {rating}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Author */}
          <p className="text-sm text-neutral-600 mb-1">{author}</p>

          {/* Title */}
          <Link href={`/${id}`}>
            <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
              {title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-xs text-neutral-500">
              ({reviews} reviews)
            </span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-primary-600">
                    ${discountedPrice}
                  </span>
                  <span className="text-sm text-neutral-500 line-through">
                    ${price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary-600">
                  ${price}
                </span>
              )}
            </div>

            <Button
              variant="primary"
              size="sm"
              disabled={!inStock}
              className="flex items-center gap-1"
            >
              <FiShoppingCart className="w-4 h-4" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookCard;