import React, { Suspense } from 'react'
import SectionTitle from '../textUi/SectionTitle'
import BookCard from '../utilityComponents/BookCard'
import { fetchBooks } from '@/app/lib/data'
import ProductsLoaderSkeleton from '../Skeletons/ProductsLoaderSkeleton'

const TopSellingSection = async() => {

  const { books } : any  = await fetchBooks();
  
  return (
    <div className='w-full flex justify-center bg-gray-200'>
        <div className='w-full max-w-7xl px-6 flex flex-col gap-2 justify-center mt-10 mb-10'>
            <div className='text-center pb-5'>
              <SectionTitle name={'Top Selling'} />
            </div>


            {/* fetch books data from the database to populate this section */}
            <div className='grid grid-cols-1 custom-xs:grid-cols-2 sm:grid-cols-3
            lg:grid-cols-4  gap-5'>

              {
                <Suspense fallback = {<ProductsLoaderSkeleton/>}>
                  {books && books.map((book: any) => (
                    <BookCard key={book._id} title={book.title} price={book.price} coverImg={book.img} id={book._id} />
                  ))}
                </Suspense>
              }

            </div>
        </div>
    </div>
  )
}

export default TopSellingSection