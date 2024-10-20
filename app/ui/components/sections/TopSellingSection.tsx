"use client"

import React, {useEffect} from 'react'
import SectionTitle from '../textUi/SectionTitle'
import BookCard from '../utilityComponents/BookCard'
import ProductsLoaderSkeleton from '../Skeletons/ProductsLoaderSkeleton'
import { useTopSellingStore } from '@/app/topSellingStore'
import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '@/app/lib/data'

const TopSellingSection = () => {

  const {data: books, error, isLoading: loading} = useQuery({
    queryKey: ['topSelling'],
    queryFn: () =>  {
      return fetchBooks()
    }
  })

  
  return (
    <div className='w-full flex justify-center bg-gray-100'>
        <div className='w-full h-full max-w-7xl px-6 flex flex-col gap-2 justify-center mt-10 mb-10'>
            <div className='text-center pb-5'>
              <SectionTitle name={'Top Selling'} />
            </div>

            {/* fetch books data from the database to populate this section */}
            {
              loading ? <ProductsLoaderSkeleton/> : 
              error ? <div className='h-full flex-1 text-center'>Error Loading books :). Please reload page</div>:
                books ? <div className='grid grid-cols-1 custom-xs:grid-cols-2 sm:grid-cols-3
                lg:grid-cols-4  gap-5 bg-gray-100 min-h-52'>
                  { books?.map((book: any) => (
                    <BookCard key={book._id} title={book.title} price={book.price} coverImg={book.img} id={book._id} description={book.description} />
                  ))}
              </div>
              : null
            }
        </div>
    </div>
  )
}

export default TopSellingSection
