
import React from 'react'
import SearchBox from '../components/utilityComponents/SearchBox'
import ShopData from './ShopData'

const StorePage = () => {
  

  return (
    <div className='w-full flex justify-center'>
        <div className='px-8 box-border w-full max-w-7xl'>
          
          <div className='flex justify-center my-5'>
            <SearchBox/>
          </div>
          {/* section to display available books in the shop */}
          <ShopData/>
        </div>
    </div>
  )
}

export default StorePage