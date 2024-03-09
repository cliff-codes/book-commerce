import React from 'react'
import CmsBookCard from '../../components/utilityComponents/CmsBookCard'

const Dashbaord = () => {
  return (
    <div className='max-w-7xl w-full px-4'>
        <div className='mt-4'>
            <h1 className='text-left text-2xl font-medium'>Hello Admin,</h1>
            <h2>{`Here's what is happening on your store`}</h2>
        </div>

    
        <h1 className='text-lg font-medium mt-5'>Books with the most engagement</h1>

        
    </div>
  )
}

export default Dashbaord