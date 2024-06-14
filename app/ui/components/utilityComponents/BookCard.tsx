import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


interface BookData {
  title: string,
  price: number,
  coverImg: string,
  id: string,
  description: string
}

const BookCard = ({title, price, coverImg,id, description} : BookData) => {

  const formatString = (desc: string):string => {
    const formattedString = desc.length > 50 ? `${desc.substring(0,50)}...` : desc
    return formattedString
  }

  return (
    <Link href={`/${id}`}>
      <div className='w-full'>
          <div className="card w-full min-h-44  pt-4 bg-white border-none hover:shadow-2xl transition all .1 ease-out">
          <figure><Image src={coverImg} width={100} height={100} quality={100} layout="responsive"  className='max-h-60 w-full object-contain' alt="car!"/></figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{formatString(description)}</p>
            <div className="card-actions justify-end">
              <h1>{`$${price}.00`}</h1>
            </div>
          </div>  
        </div>
        </div>
    </Link>
  )
}

export default BookCard