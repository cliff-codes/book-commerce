import React from 'react'
import BookDetailsPage from '../ui/pages/BookDetailsPage'
import { getBook } from '../lib/data'

const page = async({params}:{params:{bookId:string}}) => {

  const {bookId} = params
  const book = await getBook(bookId)

  return (
    <div className='w-full flex justify-center'>
        <BookDetailsPage book = {book}/>
    </div>
  )
}

export default page