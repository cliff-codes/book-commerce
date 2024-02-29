'use client'
import Link from 'next/link'
import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri"
import { useCartStore } from '@/app/cartStore'


const CartInfoBtn = () => {
  const {getNumberOfPersistedBooks, getTotalCost} = useCartStore()
  const totalNumberOfBooks = getNumberOfPersistedBooks()


  return (
    <Link href={'/cart'}>
      <button className='btn btn-sm sm:btn-md flex'>
        <div className=' badge badge-primary badge-md'>
          {totalNumberOfBooks}
        </div>
        <RiShoppingCartLine size={24}/>
        <div>${getTotalCost()}</div>
      </button>
    </Link>
  )
}

export default CartInfoBtn