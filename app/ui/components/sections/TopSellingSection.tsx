import React from 'react'
import SectionTitle from '../textUi/SectionTitle'
import BookCard from '../utilityComponents/BookCard'

const TopSellingSection = () => {
  return (
    <div className='w-full flex justify-center bg-gray-200'>
        <div className='w-full max-w-7xl px-6 flex flex-col gap-2 justify-center mt-10 mb-10'>
            <div className='text-center pb-5'>
              <SectionTitle name={'Top Selling'} />
            </div>


            {/* fetch books data from the database to populate this section */}
            <div className='w-full grid grid-cols-1 custom-xs:grid-cols-2 lg:grid-cols-3 gap-2 place-items-center'>
              <BookCard title='The psychology of money' price={123.42}/>
              <BookCard title='The psychology of money' price={123.42}/>
              <BookCard title='The psychology of money' price={123.42}/>
            </div>
        </div>
    </div>
  )
}

export default TopSellingSection