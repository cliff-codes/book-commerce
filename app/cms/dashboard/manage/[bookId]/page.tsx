import EditBookPage from '@/app/ui/pages/cms/EditBookPage'
import React from 'react'
import { getBook } from '@/app/lib/data';

const page = async ({params}:{params:{bookId:string}}) => {
  // const params = useParams()
  const {bookId}  = params
  const book = await getBook(bookId)

  return (
    <div className='w-full h-full bg-gray-50 flex justify-center'>
        <EditBookPage book = {book}/>
    </div>
  )
}

export default page