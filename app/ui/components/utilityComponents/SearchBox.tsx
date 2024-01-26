import React from 'react'
import SearchBtn from '../buttons/SearchBtn'

const SearchBox = () => {
  return (
    <div className='' >
        <div className='bg-white w-fit flex rounded-sm '>
            <input type="text" placeholder="title, author or topics" className="input  w-full max-w-xs  text-slate-900 focus:border-none focus:outline-none text-sm custom-xs:w-80" />
            <SearchBtn/>
        </div>
    </div>
  )
}

export default SearchBox