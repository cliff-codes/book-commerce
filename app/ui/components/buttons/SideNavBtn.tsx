import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface BtnInfo {
    btnName: string,
    Icon: React.ReactNode,
    route: string
}

const SideNavBtn = ({btnName, Icon, route} : BtnInfo) => {
  
    const pathname = usePathname()
    const currentRoute = pathname.split('/').pop()
    


    return (
   <Link href={route}>
        <button className='flex gap-4 place-items-center'>
            {Icon}
            <span className={clsx({
                'text-orange-500' : btnName.toLowerCase() === currentRoute
            })}>{btnName}</span>
        </button>
   </Link>
  )
}

export default SideNavBtn