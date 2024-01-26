'use client'
import { usePathname } from 'next/navigation'
import HomeNav from './HomeNav'
import StoreNav from './StoreNav'

const Nav = () => {
    const pathname = usePathname()

  return (
    <div className='w-full flex justify-center'>
      { pathname.includes('login') ? null :
          pathname.includes("store") ? <StoreNav/> : 
            <HomeNav/>}
    </div>
  )
}

export default Nav