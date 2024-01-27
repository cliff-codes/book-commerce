import Link from 'next/link'
import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri"

const CartInfoBtn = () => {
  return (
    <Link href={'/cart'}>
      <button className='btn btn-sm sm:btn-md  flex'>
        <RiShoppingCartLine size={24}/>
        <div>$0.00</div>
      </button>
    </Link>
  )
}

export default CartInfoBtn