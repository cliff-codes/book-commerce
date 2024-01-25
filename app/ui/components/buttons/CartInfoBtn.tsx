import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri"

const CartInfoBtn = () => {
  return (
    <button className='btn  flex'>
        <RiShoppingCartLine size={24}/>
        <div>$0.00</div>
    </button>
  )
}

export default CartInfoBtn