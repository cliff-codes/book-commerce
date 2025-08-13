'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Button, Badge, Input } from '../components/design-system';
import { FiStar, FiHeart, FiShoppingCart, FiShare2, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BookDetailsPageProps {
    book: {
        _id: string;
        title: string;
        price: number;
        img: string;
        description: string;
        author?: string;
        rating?: number;
        reviews?: number;
        pages?: number;
        language?: string;
        publisher?: string;
        publicationDate?: string;
        isbn?: string;
        category?: string;
        inStock?: boolean;
        discount?: number;
    };
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'details'>('description');

    const images = [
        book.img,
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop'
    ];

    const discountedPrice = book.discount ? book.price * (1 - book.discount / 100) : book.price;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FiStar
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : i < rating
                        ? 'text-yellow-400 fill-current opacity-50'
                        : 'text-neutral-300'
                    }`}
            />
        ));
    };

    const reviews = [
        { id: 1, user: 'John D.', rating: 5, comment: 'Excellent book! Highly recommended.', date: '2024-01-15' },
        { id: 2, user: 'Sarah M.', rating: 4, comment: 'Great content, well written.', date: '2024-01-10' },
        { id: 3, user: 'Mike R.', rating: 5, comment: 'One of the best books I\'ve read this year.', date: '2024-01-05' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 my-[120px]">
            <div className="grid lg:grid-cols-2 gap-12">

                {/* Image Gallery */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 max-h-[400px] flex items-center justify-center">
                        <Image
                            src={images[selectedImage]}
                            alt={book.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {book.discount && (
                            <Badge variant="destructive" className="absolute top-4 left-4">
                                -{book.discount}% OFF
                            </Badge>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-[3/4] overflow-hidden rounded-md border-2 transition-all ${selectedImage === index
                                    ? 'border-primary-500'
                                    : 'border-neutral-200 hover:border-neutral-300'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${book.title} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 25vw, 12vw"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Title and Rating */}
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                            {book.title}
                        </h1>
                        <p className="text-lg text-neutral-600 mb-3">
                            by {book.author || 'Unknown Author'}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                {renderStars(book.rating || 4.5)}
                                <span className="ml-2 font-medium">{book.rating || 4.5}</span>
                            </div>
                            <span className="text-neutral-500">({book.reviews || 128} reviews)</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        {book.discount ? (
                            <>
                                <span className="text-3xl font-bold text-primary-600">
                                    ${discountedPrice}
                                </span>
                                <span className="text-xl text-neutral-500 line-through">
                                    ${book.price}
                                </span>
                                <Badge variant="destructive">
                                    Save ${(book.price - discountedPrice)}
                                </Badge>
                            </>
                        ) : (
                            <span className="text-3xl font-bold text-primary-600">
                                ${book.price}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${book.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={book.inStock ? 'text-green-600' : 'text-red-600'}>
                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium">Quantity:</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="primary"
                                size="lg"
                                disabled={!book.inStock}
                                className="flex-1"
                            >
                                <FiShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setIsWishlisted(!isWishlisted)}
                            >
                                <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                            >
                                <FiShare2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 gap-4 py-6 border-t border-neutral-200">
                        <div className="flex items-center gap-3">
                            <FiTruck className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="font-medium">Free Shipping</p>
                                <p className="text-sm text-neutral-600">On orders over $50</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiShield className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="font-medium">Secure Payment</p>
                                <p className="text-sm text-neutral-600">100% secure checkout</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiRotateCcw className="w-5 h-5 text-primary-600" />
                            <div>
                                <p className="font-medium">Easy Returns</p>
                                <p className="text-sm text-neutral-600">30-day return policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-16">
                <div className="border-b border-neutral-200">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'reviews', label: 'Reviews' },
                            { id: 'details', label: 'Details' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="py-8">
                    {activeTab === 'description' && (
                        <div className="prose max-w-none">
                            <p className="text-neutral-700 leading-relaxed">
                                {book.description}
                            </p>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <Card key={review.id} className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-medium">{review.user}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-sm text-neutral-500">{review.date}</span>
                                    </div>
                                    <p className="text-neutral-700">{review.comment}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-neutral-900">Book Details</h4>
                                    <div className="mt-2 space-y-2 text-sm text-neutral-600">
                                        <p><span className="font-medium">Pages:</span> {book.pages || 'N/A'}</p>
                                        <p><span className="font-medium">Language:</span> {book.language || 'English'}</p>
                                        <p><span className="font-medium">Publisher:</span> {book.publisher || 'N/A'}</p>
                                        <p><span className="font-medium">Publication Date:</span> {book.publicationDate || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-neutral-900">Additional Information</h4>
                                    <div className="mt-2 space-y-2 text-sm text-neutral-600">
                                        <p><span className="font-medium">ISBN:</span> {book.isbn || 'N/A'}</p>
                                        <p><span className="font-medium">Category:</span> {book.category || 'General'}</p>
                                        <p><span className="font-medium">Format:</span> Hardcover</p>
                                        <p><span className="font-medium">Dimensions:</span> 6.1 x 1.2 x 9.2 inches</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
