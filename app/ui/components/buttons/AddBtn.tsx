import Link from 'next/link'
import React from 'react'

const AddBtn = () => {
  return (
    <Link href={'http://localhost:3000/cms/dashboard/upload'}>
        <button className='btn btn-sm custom-xxs:btn-md bg-orange-500 text-slate-50 hover:bg-orange-600 '>Add Book</button>
    </Link>
  )
}

export default AddBtn