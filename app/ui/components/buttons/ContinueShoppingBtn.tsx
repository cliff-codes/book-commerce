import Link from 'next/link'
import React from 'react'

const ContinueShoppingBtn = () => {
  return (
    <Link href={'/Shop'} className='w-full flex justify-center'>
        <div className='w-full max-w-sm'>
            <button className='btn border border-orange-500 text-orange-500 w-full'>continue shopping</button>
        </div>
    </Link>
  )
}

export default ContinueShoppingBtn