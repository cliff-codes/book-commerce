import React from 'react'
import SearchBox from '../components/utilityComponents/SearchBox'
import SectionTitle from '../components/textUi/SectionTitle'
import BookCard from '../components/utilityComponents/BookCard'
import { fetchBooks } from '@/app/lib/data'

const StorePage = async() => {
  const {books} = await fetchBooks()
  return (
    <div className='w-full flex justify-center'>
        <div className='px-8 box-border w-full max-w-7xl'>
          
          <div className='flex justify-center my-5'>
            <SearchBox/>
          </div>

          <div className='text-center mb-4'>
            <SectionTitle name='New Releases'/>
          </div>
          {/* fetch data from database to fill card  */}
          <div className='w-full'>
            <div className='w-full grid grid-cols-1 custom-sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center justify-center mb-4 '>
                 
              {
                books.map((book : any) => (
                  <BookCard key={book._id} title={book.title} price={book.price} coverImg={book.img} id={book._id}/>
                ))
              }
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default StorePage