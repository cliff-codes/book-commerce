'use client'
import React, {useEffect} from 'react'
import { useCounterStore } from '@/app/store'
import {useCartStore} from '@/app/cartStore'

const BookDetailsPage = ({book}: any) => {
    const {increase, counter, decrease, reset} = useCounterStore()
    const {addToCart} = useCartStore()

    useEffect(() => {
        reset()
    },[])


  return (
    <div className='w-full max-w-7xl flex pt-8 flex-col place-items-center'>
        <div className='flex flex-col custom-xs:flex-row gap-4 custom-xs:gap-9'>
            <div className="card card-side bg-base-100 shadow-xl rounded-none max-h-80">
                <figure className='border w-64 '><img src={book.img || null}  className='w-full object-contain p-8' alt="Book"/></figure>
            </div>

            <div className='flex flex-col justify-around '>
                <div>
                    <h1 className='text-xl '>{book.title || null}</h1>
                    <h2 className='font-bold'>${book.price || null}.00</h2>
                </div>
                <div className='flex  flex-col gap-2'>
                    <div className='w-full flex justify-center place-items-center'>
                        <button className='btn btn-sm custom-xs:btn-md'
                            onClick={() => decrease(1)}
                        >-</button>
                        <span className='px-5'>{counter}</span>
                        <button className='btn btn-sm custom-xs:btn-md'
                            onClick={() => increase(1)}
                        >+</button>
                    </div>

                    <button className='btn btn-sm text-sm custom-xs:btn-md custom-xs:text-base bg-orange-500 text-slate-50 hover:bg-orange-500 ' 
                        onClick={() => addToCart({...book, qty: counter})}
                    >add to cart</button>
                </div>
            </div>

        </div>

        <h1 className='text-lg font-medium mt-10'>About {book.title || null}</h1>

        <h2 className='px-4'>
           {book.description}
        </h2>

    </div>
  )
}

export default BookDetailsPage