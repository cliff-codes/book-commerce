import React from 'react'
import RegisterPage from '../ui/pages/forms/RegisterPage'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

const page = async() => {

  const session = await getServerSession(authOptions as any)

  if(session) redirect('/')

  return (
    <div className='w-full h-full bg-slate-50 flex justify-center place-items-center'>
        <RegisterPage />
    </div>
  )
}

export default page