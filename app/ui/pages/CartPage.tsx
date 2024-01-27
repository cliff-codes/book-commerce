import React from 'react'
import CartItemCard from '../components/utilityComponents/CartItemCard'
import CheckoutBtn from '../components/buttons/CheckoutBtn'
import ContinueShoppingBtn from '../components/buttons/ContinueShoppingBtn'

const CartPage = () => {
  return (
    <div className='flex flex-col place-items-center pt-10 gap-2'>
        <h1 className='text-xl custom-xs:2xl font-bold'>Cart</h1>

        <div className='w-full max-w-xl min-h-80 rounded-lg bg-gray-50 mb-5'>

             {/* if there are no cart items */}
             {/* <div className='w-full h-80 flex place-items-center justify-center'>
                <h3>Your cart is empty😒</h3>
             </div> */}

             {/* Else display cart items cards */}
             <div className='w-full flex flex-col place-items-center my-8'>
                <CartItemCard />
                <CartItemCard />
                <CartItemCard />

                <div className='w-full flex flex-col place-items-center gap-5'>
                    <h1 className='custom-xs:text-lg font-semibold'>Total: $105.00</h1>

                    <CheckoutBtn/>
                    <ContinueShoppingBtn/>
                </div>
             </div>
        </div>
    </div>
  )
}

export default CartPage