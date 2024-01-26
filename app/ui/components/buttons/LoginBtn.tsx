import Link from 'next/link'
import React from 'react'
import { LuUser } from "react-icons/lu"

const LoginBtn = () => {
  return (
    <Link href={'/login'}>
      <button className='btn btn-sm sm:btn-md flex '>
        <LuUser size={24}/>
        <div>login</div>
      </button>
    </Link>
  )
}

export default LoginBtn