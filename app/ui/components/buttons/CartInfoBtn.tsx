'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiShoppingCartLine } from "react-icons/ri"
import { useCartStore } from '@/app/cartStore'


const CartInfoBtn = () => {
  const [numPersistedBooks, setNumPersistedBooks] = useState(0);
  const {getNumberOfPersistedBooks, getTotalCost} = useCartStore()
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    const numOfBooks = getNumberOfPersistedBooks()
    setNumPersistedBooks(numOfBooks)
    const cost = getTotalCost()
    setTotalCost(cost)
  })


  return (
    <Link href={'/cart'}>
      <button className='btn btn-sm sm:btn-md flex'>
        <div className=' badge badge-primary badge-md'>
          {numPersistedBooks} 
        </div>
        <RiShoppingCartLine size={24}/>
        <div>${totalCost}</div>
      </button>
    </Link>
  )
}

export default CartInfoBtn