import Link from 'next/link'
import React from 'react'

const SellerBtn = () => {
  return (
        <Link href={'/Store/login'}>
            <button className='btn btn-outline'>Become a seller</button>
        </Link>
  )
}

export default SellerBtn