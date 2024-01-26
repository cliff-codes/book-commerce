import React from 'react'

const BookDetailsPage = () => {
  return (
    <div className='w-full max-w-7xl flex pt-8 flex-col place-items-center'>
        <div className='flex flex-col custom-xs:flex-row gap-4 custom-xs:gap-9'>
            <div className="card card-side bg-base-100 shadow-xl rounded-none">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
            </div>

            <div className='flex flex-col justify-around '>
                <div>
                    <h1 className='text-xl '>Chronicles of Ephemeral Echoes</h1>
                    <h2 className='font-bold'>$26.00</h2>
                </div>
                <div className='flex  flex-col gap-2'>
                    <div className='w-full flex justify-center place-items-center'>
                        <button className='btn btn-sm custom-xs:btn-md'>-</button>
                        <span className='px-5'>1</span>
                        <button className='btn btn-sm custom-xs:btn-md'>+</button>
                    </div>

                    <button className='btn btn-sm text-sm custom-xs:btn-md custom-xs:text-base bg-orange-500 text-slate-50 hover:bg-orange-500 '>add to cart</button>
                </div>
            </div>

        </div>

        <h1 className='text-lg font-medium mt-10'>About "Chronicles of Ephemeral Echoes"</h1>

        <h2>
            "Chronicles of Ephemeral Echoes" is a spellbinding tale that explores the intricacies of time, dreams, and the enduring power of stories. Get ready to be swept away into a world where every heartbeat echoes through the corridors of time, and the past whispers secrets to those willing to listen.
        </h2>

    </div>
  )
}

export default BookDetailsPage