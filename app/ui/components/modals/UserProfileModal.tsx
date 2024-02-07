'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'

const UserProfileModal = () => {
  return (
    
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className='btn m-1 rounded-full border-2 cursor-pointer'>
            <MdAccountCircle size={32}/>
        </div>

        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            <li onClick={() => signOut()}> <a className='font-medium'>logout</a> </li>
        </ul>
    </div>
  )
}

export default UserProfileModal