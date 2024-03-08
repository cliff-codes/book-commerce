import React from 'react'
import CmsBookCard from '../../components/utilityComponents/CmsBookCard'

const Dashbaord = () => {
  return (
    <div className='max-w-7xl w-full px-4'>
        <div className='mt-4'>
            <h1 className='text-left text-2xl font-medium'>Hello Admin,</h1>
            <h2>Here's what is happening on your store</h2>
        </div>

    
        <h1 className='text-lg font-medium mt-5'>Books with the most engagement</h1>

        {/* <div className='grid grid-cols-1 custom-xs:grid-cols-2 gap-4 custom-sm:grid-cols-3 lg:grid-cols-4 mt-2'>
            <CmsBookCard title='one in a milliion' price={123.00} coverImg={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />

            <CmsBookCard title='one in a milliion' price={123.00} coverImg={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />

            <CmsBookCard title='one in a milliion' price={123.00} coverImg={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />

            <CmsBookCard title='one in a milliion' price={123.00} coverImg={'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg'} />
        </div> */}
    </div>
  )
}

export default Dashbaord