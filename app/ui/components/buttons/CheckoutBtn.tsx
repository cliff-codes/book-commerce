import React from 'react'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/app/cartStore'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const CheckoutBtn = () => {
  const {getTotalCost} = useCartStore()
  const router = useRouter()

  const {data:session} = useSession()

  const checkoutData = {
    email : session?.user?.email,
    amount: getTotalCost()
  }

  const handleClick = async() => {
    if(session?.user){
      try {
        const response = await axios.post('/api/payment', {...checkoutData})
        
        if (response.status === 200) {
          // Assuming the API returns a JSON response
          const res = response.data;
          
          // Handle success (redirect to confirmation page)
          const { data } = res;
          const { authorization_url } = data;
  
          router.push(authorization_url);
        } else {
          console.log(response);
          throw new Error('An error occurred while processing the payment');
        }
      } catch (error) {
        console.log(error)
        router.push('/')
      }
    }else{
      router.push('/login')
    }
  }

  return (
    <div className='w-full max-w-sm'>
        <button className='btn bg-orange-500 hover:bg-orange-600 w-full text-slate-50 border-none'
        onClick={handleClick}
        >Checkout</button>
    </div>
  )
}

export default CheckoutBtn