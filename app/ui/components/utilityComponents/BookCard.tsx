import React from 'react'

interface BookData {
  title: string,
  price: number,
  coverImg: string
}

const BookCard = ({title, price, coverImg} : BookData) => {
  return (
    <div>
      <div className="card w-72 h-auto bg-base-100 shadow-xl hover:shadow-2xl transition-all .1 ease-linear">
        <figure className="px-10 pt-10 box-border">
          <img  width={100} src={coverImg} />
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