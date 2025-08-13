'use client';

import { fetchBooks } from '@/app/lib/data'
import React from 'react'
import BookCard from '../components/utilityComponents/BookCard'
import { LoadingContainer, GridSkeleton } from '../components/design-system'
import { useQuery } from '@tanstack/react-query';

interface ShopDataProps {
    viewMode?: 'grid' | 'list';
}

const ShopData = ({ viewMode = 'grid' }: ShopDataProps) => {

    //using use query instead of useEffect
    const { data: books, error, isLoading: loading } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetchBooks(),
    });

    return (
        <LoadingContainer
            loading={loading}
            spinnerSize="lg"
            spinnerColor="primary"
            text="Loading books..."
        >
            {error ? (
                <div className="text-center py-12">
                    <div className="text-accent-error text-lg font-medium mb-2">
                        Oops! Something went wrong
                    </div>
                    <p className="text-neutral-600">
                        {error.message || 'Failed to load books'}
                    </p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {books?.map((book: any) => (
                        <BookCard
                            key={book._id}
                            title={book.title}
                            price={book.price}
                            coverImg={book.img}
                            id={book._id}
                            description={book.description}
                        />
                    ))}
                </div>
            )}
        </LoadingContainer>
    )
}

export default ShopData