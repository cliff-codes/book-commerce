import React from 'react'
import ManageBookTableRow from '../../components/utilityComponents/ManageBookTableRow'
import { fetchBooks } from '@/app/lib/data'
import AddBtn from '../../components/buttons/AddBtn'

const ManagePage = async() => {
    
    const {books} = await fetchBooks()

    

  return (
    <div className='w-full max-w-7xl mt-6'>
        {/* add button to add feature onto a book to the catalog */}
        <div className='w-full flex justify-end pr-4'>
            <AddBtn/>
        </div>
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