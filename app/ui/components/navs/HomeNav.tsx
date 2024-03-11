'use client'
import React from 'react'
import LoginBtn from '../buttons/LoginBtn'
import CartInfoBtn from '../buttons/CartInfoBtn'
import Logo from '../logos/Logo'
import NavLink from '../links/NavLink'
import {useSession} from 'next-auth/react'
import UserProfileModal from '../modals/UserProfileModal'


const HomeNav = () => {
  const {data:session} = useSession()
 
  
  return (
   <nav className='w-full bg-base-300 flex justify-center'>
      <div className="drawer w-full max-w-7xl">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 justify-between">
            <div>
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
              </div> 
              <div className="flex-1 px-1 mx-1">
                <Logo/> 
              </div>
            </div>
            <div className="flex-none hidden lg:block">
              <div className="menu menu-horizontal gap-4 place-items-center">
                {/* Navbar menu content here */}
                <NavLink route={'/'} routeName={'Home'}/>
                <NavLink route={'/Shop'} routeName={'Shop'}/>
                <NavLink route={'/About'} routeName={'About'}/>
              </div>
            </div>
            <div className='flex gap-1 place-items-center'>
              <CartInfoBtn/>
              
              {
                session?.user ?<UserProfileModal/> : <LoginBtn/>
              }
            </div>
          </div>
         
        </div> 
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <div className="menu p-4 w-80 min-h-full bg-base-200 gap-5">
            {/* Navbar menu content here */}
            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
              <NavLink route={'/'} routeName='Home'/>
            </div>

            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
              <NavLink route={'/Shop'} routeName='Shop'/>
            </div>

            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
              <NavLink route={'/About'} routeName='About'/>
            </div>
          </div>
        </div>
      </div>
   </nav>
  )
}

export default HomeNav