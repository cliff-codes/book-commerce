'use client'
import React from 'react'
import Link from 'next/link'
import SideNavBtn from '../buttons/SideNavBtn'
import { MdCloudUpload, MdDashboard, MdLibraryBooks, MdLogout } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'



const DashNav = () => {
    const pathname = usePathname()
    const currentRoute = pathname.split('/').pop()

  return (
    <nav className='w-full bg-base-300 flex justify-center'>
      <div className="drawer w-full max-w-7xl">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300 justify-between border">
            <div>
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
              </div> 
              <div>
                <Link href={'/cms/dashboard'}>
                    <h1 className='text-lg font-semibold'>Store CMS</h1>
                </Link>
              </div>
            </div>

            <div className='hidden lg:flex lg:gap-5 font-semibold text-slate-800'>
                <SideNavBtn Icon = {<MdDashboard size={28} className={clsx('text-slate-800', {
                    'text-orange-500' : currentRoute === 'dashboard'
                })}/>} btnName='Dashboard' route='/cms/dashboard' />

                <SideNavBtn Icon = {<MdCloudUpload size={28} className={clsx('text-slate-800', {
                    'text-orange-500' : currentRoute === 'upload'
                })}/>} btnName='Upload' route='/cms/dashboard/upload' />

                <SideNavBtn Icon = {<MdLibraryBooks size={28} className={clsx('text-slate-800', {
                    'text-orange-500' : currentRoute === 'manage'
                })}/>} btnName='Manage' route='/cms/dashboard/manage' />
            </div>
            
            <div className='cursor-pointer'>
                <div className="avatar">
                    <div className="w-10 rounded-full ring ring-[orange] ring-offset-base-100 ring-offset-2">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
            </div>
          </div>
         
        </div> 
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
          <div className="menu p-4 w-80 min-h-full gap-5 bg-slate-800 text-slate-50 font-medium text-lg">
            {/* Navbar menu content here */}
            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
              <SideNavBtn Icon = {<MdDashboard size={28} className='text-slate-50'/>} btnName='Dashboard' route='/cms/dashboard' />
            </div>

            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
                <SideNavBtn Icon = {<MdCloudUpload size={28} className='text-slate-50'/>} btnName='Upload' route='/cms/dashboard/upload' />
            </div>

            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
                <SideNavBtn Icon = {<MdLibraryBooks size={28} className='text-slate-50'/>} btnName='Manage' route='/cms/dashboard/manage' />
            </div>

            <div className='w-full hover:bg-slate-600 py-3 pl-3 rounded-md hover:text-slate-50'>
                <SideNavBtn Icon = {<MdLogout size={28} className='text-slate-50'/>} btnName='Logout' route='/'/>
            </div>
          </div>
        </div>
      </div>
   </nav>
  )
}

export default DashNav