'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import clsx from 'clsx'

interface LinkProps {
    route: string,
    routeName: string
}

const NavLink = ({route, routeName}:LinkProps) => {
    const pathname = usePathname()
    const name = pathname.split('/')
    const rName = name.pop();
    
    
  return (
    <Link href={`${route}`} className={clsx('font-medium',{
        'text-orange-500' : rName == routeName
    } )} >
        <div className={clsx({
            'text-orange-500': routeName == "Home" && pathname == "/" 
        })}>
            {routeName}
        </div>
    </Link>
  )
}
export default NavLink