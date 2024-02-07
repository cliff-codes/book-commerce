import React from 'react'
import StoreLoginPage from '../ui/pages/forms/StoreLoginPage'
import {getServerSession} from "next-auth"
import {redirect} from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const page = async() => {
  const session = await getServerSession(authOptions as any)

  if(session) redirect('/')

  return (
    <div className='w-full h-full bg-gray-50 flex justify-center place-items-center'>
        <StoreLoginPage/>
    </div>
  )
}

export default page