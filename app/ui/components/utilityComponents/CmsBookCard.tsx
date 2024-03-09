import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BookData {
    coverImg: string,
    title: string,
    price: number
}

const CmsBookCard = ({coverImg, title, price}: BookData) => {
  return (
    <Link href={''}>
        <div className='w-full'>
        <div className="card w-full glass">
        <figure><Image width={100} height={100} src={coverImg} alt="car!"/></figure>
      <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <h1>$20</h1>
          </div>
        </div>  
      </div>
      </div>
    </Link>
  )
}

export default CmsBookCard