import React from 'react'

const ProductsLoaderSkeleton = () => {
    const numbers = [1,2,3,4,5,6,7,8]
  return (
    <div>
        {
            numbers.map((number) => (
                <div key={number} className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
        }
    </div>
  )
}

export default ProductsLoaderSkeleton