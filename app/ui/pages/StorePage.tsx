import React from 'react'
import SearchBox from '../components/utilityComponents/SearchBox'
import SectionTitle from '../components/textUi/SectionTitle'
import BookCard from '../components/utilityComponents/BookCard'

const StorePage = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='px-8 box-border max-w-7xl'>
          <div className='py-8'><SearchBox/></div>

          <div className='text-center mb-4'>
            <SectionTitle name='New Releases'/>
          </div>
          {/* fetch data from database to fill card  */}
          <div className='w-full'>
            <div className='w-full grid grid-cols-1 custom-sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center justify-center mb-4 '>
                  <BookCard title='Soul' price={123.42} coverImg='https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg'/>

                  <BookCard title='Alone' price={123.42} coverImg='https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg'/>

                  <BookCard title='A million to one' price={123.42} coverImg='https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg'/>

                  <BookCard title='Soul' price={123.42} coverImg='https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg'/>

                  <BookCard title='Alone' price={123.42} coverImg='https://marketplace.canva.com/EAFPHUaBrFc/1/0/1003w/canva-black-and-white-modern-alone-story-book-cover-QHBKwQnsgzs.jpg'/>
                  
                  <BookCard title='A million to one' price={123.42} coverImg='https://www.designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg'/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default StorePage