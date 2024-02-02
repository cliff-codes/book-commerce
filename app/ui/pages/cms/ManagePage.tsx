import React from 'react'
import ManageBookTableRow from '../../components/utilityComponents/ManageBookTableRow'
import { fetchBooks } from '@/app/lib/data'

const ManagePage = async() => {
    
    const {books} = await fetchBooks()
    console.log(books)

  return (
    <div className='w-full max-w-7xl mt-6'>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Book</th>
                    <th>Description</th>
                    <th>Price ($)</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                
                {/* rows of books in catalog*/}
                {
                    books.map((book) => (
                         <ManageBookTableRow bookDescription={book.description} bookImgUrl={book.img} bookName={book.title} price={book.price} bookId= {book._id} key={book._id}/>
                    )) 
                }

                </tbody>    
            </table>
        </div>
    </div>
  )
}

export default ManagePage