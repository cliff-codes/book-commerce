'use client'
import React from 'react'
import CartItemCard from '../components/utilityComponents/CartItemCard'
import CheckoutBtn from '../components/buttons/CheckoutBtn'
import ContinueShoppingBtn from '../components/buttons/ContinueShoppingBtn'
import { useCartStore } from '@/app/cartStore'

const CartPage = () => {
  const {reset, getTotalCost, books} = useCartStore()
  
  return (
    <div className='flex flex-col place-items-center pt-10 gap-2'>
        <h1 className='text-xl custom-xs:2xl font-bold'>Cart</h1>

        <div className='w-full max-w-xl min-h-80 rounded-lg bg-gray-50 mb-5'>

              {
                books.length > 0 ?  <div className='w-full flex flex-col place-items-center my-8'>
                {books.map((book:any) => (
                  <CartItemCard img = {book.img} title = {book.title} price = {book.price} qty = {book.qty} id = {book._id} key={book._id}/>
                ))}
                

                <div className='w-full flex flex-col place-items-center gap-5'>
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