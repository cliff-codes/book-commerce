"use client"

import React, { useEffect } from 'react'
import SectionTitle from '../textUi/SectionTitle'
import BookCard from '../utilityComponents/BookCard'
import { GridSkeleton, LoadingContainer } from '../design-system'
import { useTopSellingStore } from '@/app/topSellingStore'
import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '@/app/lib/data'

const TopSellingSection = () => {

    const { data: books, error: productsError, isLoading: productsIsLoading } = useQuery({
        queryKey: ['topSelling'],
        queryFn: () => {
            return fetchBooks()
        }
    })

    console.log("Products Error", productsError)

    console.log(books)

    return (
        <section className='w-full bg-gradient-to-b from-neutral-50 to-white py-16'>
            <div className='w-full max-w-7xl mx-auto px-6'>
                <div className='text-center mb-12'>
                    <SectionTitle name={'Top Selling Books'} />
                    <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
                        Discover our most popular titles, carefully curated for book lovers like you
                    </p>
                </div>


                { 
                    productsIsLoading && (<div>Loading...</div>)
                }

                {
                    productsError && (<div className='text-center py-12'>
                        <div className="text-accent-error text-lg font-medium mb-2">
                            Oops! Something went wrong
                        </div>
                        <p className="text-neutral-600">
                            We couldn't load the books right now. Please try again later.
                        </p>
                    </div>)
                }

                {
                    books && (<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {
                            books.map((book: any) => (
                                <BookCard key={book._id} coverImg={book.img} title={book.title} price={book.price} id={book._id} description={book.description} />
                            ))
                        }
                    </div>)
                }
            </div>
        </section>
    )
}

export default TopSellingSection
