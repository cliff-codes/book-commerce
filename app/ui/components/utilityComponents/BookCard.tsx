import React from 'react'

interface BookData {
  title: string,
  price: number
}

const BookCard = ({title, price} : BookData) => {
  return (
    <div>
      <div className="card w-72 h-auto bg-base-100 shadow-xl ">
        <figure className="px-10 pt-10 box-border">
          <img  width={100} src="https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg" alt="Book" className="rounded-xl object-contain" />
        </figure>
        <div className="card-body pl-10">
          <h2 className="text-lg">{title}</h2>
          
          {/* card price and action button to buy */}
          <div className='flex w-full  place-items-center justify-between'>
            <div className='font-semibold'>${price}</div>

            <div className="card-actions">
              <button className="btn btn-primary btn-sm custom-xs:btn-md bg-orange-500 border-none hover:bg-orange-600 text-slate-50">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard