'use client'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useCartStore } from '@/app/cartStore'

interface book {
    img: string,
    title: string,
    price: number,
    qty: number,
    id: string
}

const CartItemCard = ({img, title, price, qty, id}: book) => {
    
    const {removeBook, decreaseQty, increaseQty} = useCartStore()

    return (
    <div className='flex gap-10 place-items-center hover:bg-slate-200 p-8 transition-all .1s ease-linear'>
        <div className='w-32'>
            <img src= {img} alt='img of book' />
        </div>

        <div className='flex flex-col justify-center gap-5'>
           <div>
                <h1 className='font-semibold text-lg custom-xs:text-xl'>{title}</h1>
                
                <h2 className='font-medium text-orange-500'>${price}</h2>
            </div>

            <div className='flex gap-5 place-items-center'>
                <button className='btn'
                    onClick={() => decreaseQty(id)}
                >-</button>
                <span>{qty}</span>
                <button className='btn' 
                    onClick={() => increaseQty(id)}
                >+</button>
            </div>
        </div>

        <div>
            <button className='btn btn-sm custom-xs:btn-md' 
                onClick={() => removeBook(id)}
            ><MdDelete size={24}/></button>
        </div>
    </div>
  )
}

export default CartItemCard