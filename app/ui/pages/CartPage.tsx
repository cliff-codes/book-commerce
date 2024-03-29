'use client'
import React, { useEffect, useState } from 'react'
import CartItemCard from '../components/utilityComponents/CartItemCard'
import CheckoutBtn from '../components/buttons/CheckoutBtn'
import ContinueShoppingBtn from '../components/buttons/ContinueShoppingBtn'
import { useCartStore } from '@/app/cartStore'

const CartPage = () => {
  const {reset, getTotalCost, getPersistedBooks, getNumberOfPersistedBooks} = useCartStore()
  const {books} = getPersistedBooks()
  const [totalBooks, setTotalBooks] = useState(0)

  useEffect(() => {
    const books = getNumberOfPersistedBooks()
    setTotalBooks(books)
  }, [getNumberOfPersistedBooks])


  return (
    <div className='w-full flex flex-col place-items-center pt-5 gap-2 box-border'>
        <h1 className='text-xl custom-xs:2xl font-bold'>Cart</h1>

        <div className='w-full max-w-xl min-h-80 rounded-lg bg-gray-50 mb-5 box-border '>
              {
                totalBooks > 0 ?  <div className='w-full flex flex-col place-items-center my-8  box-border px-2'>
                {books.map((book:any) => (
                  <CartItemCard img = {book.img} title = {book.title} price = {book.price} qty = {book.qty} id = {book._id} key={book._id}/>
                ))}
                  <div className='w-full flex flex-col place-items-center gap-5 justify-center'>
                      <h1 className='custom-xs:text-lg font-semibold'>Total: ${getTotalCost()}</h1>

                      <CheckoutBtn/>
                      <ContinueShoppingBtn/>
                      <button className='btn' 
                        onClick={reset}
                      >clear</button>
                  </div>
                </div>: <div className='w-full h-80 flex place-items-center justify-center'>
                    <h3>Your cart is empty😒</h3>
                </div>
              }
        </div>
    </div>
  )
}

export default CartPage