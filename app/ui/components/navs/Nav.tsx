'use client'
import { usePathname } from 'next/navigation'
import HomeNav from './HomeNav'
import StoreNav from './StoreNav'
import DashNav from './DashNav'

const Nav = () => {
    const pathname = usePathname()

  return (
    <div className='w-full flex justify-center'>
      { pathname.includes('login') ? null :
          pathname.includes('register') ? null :
            pathname.includes("store") ? <StoreNav/> : 
              pathname.includes("cms") ? <DashNav/> :
              <HomeNav/>}
    </div>
  )
}

export default Nav