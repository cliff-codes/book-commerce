import { fetchBooks } from '@/app/lib/data'
import React from 'react'
import BookCard from '../components/utilityComponents/BookCard'
import SectionTitle from '../components/textUi/SectionTitle'

const ShopData = async() => {
    const {books} : any = await fetchBooks()

  return (
     <div className='w-full'>

        <div className='text-center mb-4'>
            <SectionTitle name='New Releases'/>
        </div>

        <div className='w-full grid grid-cols-1 custom-sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center justify-center mb-4 '>
                
            {
            books.map((book : any) => (
                <BookCard key={book._id} title={book.title} price={book.price} coverImg={book.img} id={book._id}/>
            ))
            }
            
        </div>
    </div>
  )
}

export default ShopData