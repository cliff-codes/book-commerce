import React from 'react'
import ManageBookTableRow from '../../components/utilityComponents/ManageBookTableRow'
import { fetchBooks } from '@/app/lib/data'
import AddBtn from '../../components/buttons/AddBtn'

interface Book {
    description: string;
    img: string;
    title: string;
    price: number; // Adjust this type based on how you represent prices
  _id: string;
}

const ManagePage = async() => {
    
    const {books} : any = await fetchBooks()
    
    

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
                        books && books.map((book:Book) => (
                         <ManageBookTableRow bookDescription={book.description} bookImgUrl={book.img} bookName={book.title.toString()} price={book.price} bookId= {book._id.toString()} key={book._id}/>
                    )) 
                }
                </tbody>    
            </table>
        </div>
    </div>
  )
}

export default ManagePage