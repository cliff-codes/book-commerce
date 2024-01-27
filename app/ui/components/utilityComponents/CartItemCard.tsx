import React from 'react'
import { MdDelete } from 'react-icons/md'

const CartItemCard = () => {
  return (
    <div className='flex gap-10 place-items-center hover:bg-slate-200 p-8 transition-all .1s ease-linear'>
        <div className='w-32'>
            <img src='https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg' alt='img of book' />
        </div>

        <div className='flex flex-col justify-center gap-5'>
           <div>
                <h1 className='font-semibold text-lg custom-xs:text-xl'>Soul</h1>
                
                <h2 className='font-medium text-orange-500'>$35.00</h2>
            </div>

            <div className='flex gap-5 place-items-center'>
                <button className='btn'>-</button>
                <span>1</span>
                <button className='btn'>+</button>
            </div>
        </div>

        <div>
            <button className='btn btn-sm custom-xs:btn-md'><MdDelete size={24}/></button>
        </div>
    </div>
  )
}

export default CartItemCard