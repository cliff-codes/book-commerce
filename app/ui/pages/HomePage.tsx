import React from 'react'
import Showcase from '../components/sections/Showcase'
import TopSellingSection from '../components/sections/TopSellingSection'


const HomePage = () => {
  return (
    <div className='w-full flex-1 '>
        <Showcase/>
        <TopSellingSection/>
    </div>
  )
}

export default HomePage