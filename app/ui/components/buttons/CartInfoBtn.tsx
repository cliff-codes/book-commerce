'use client'
import Link from 'next/link'
import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri"
import { useCartStore } from '@/app/cartStore'

const CartInfoBtn = () => {
  const {books, getTotalCost} = useCartStore()

  return (
    <Link href={'/cart'}>
      <button className='btn btn-sm sm:btn-md flex'>
        <div className=' badge badge-primary badge-md'>
          {books.length}
        </div>
        <RiShoppingCartLine size={24}/>
        <div>${getTotalCost()}</div>
      </button>
    </Link>
  )
}

export default CartInfoBtn