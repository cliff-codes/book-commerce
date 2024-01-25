import React from 'react'
import { LuUser } from "react-icons/lu"

const LoginBtn = () => {
  return (
    <button className='btn flex'>
        <LuUser size={24}/>
        <div>login</div>
    </button>
  )
}

export default LoginBtn