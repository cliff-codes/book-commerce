'use client'
import React, { useEffect, useState } from 'react'
import SearchBtn from '../buttons/SearchBtn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce'



const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const {replace} = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query] = useDebounce(searchTerm, 500)



  const handleSearch = async (event: React.MouseEvent<HTMLElement> ) => {
    event.preventDefault();
    const url = new URL('/Shop/search', window.location.origin);
    url.searchParams.set('query', searchTerm);
    window.location.href = url.toString(); // Redirect to the search route
  };

  return (
    <div className='' >
        <div className='bg-white w-fit flex rounded-sm '>
            <input type="text" placeholder="title, author or topics" className="input  w-full max-w-xs  text-slate-900 focus:border-none focus:outline-none text-sm custom-xs:w-80 bg-slate-100" 
            value={searchTerm}
            
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div onClick={(e) => handleSearch(e)}>
              <SearchBtn/> 
            </div> 
        </div>
    </div>
  )
}

export default SearchBox