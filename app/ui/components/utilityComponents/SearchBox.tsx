'use client'
import React, { useState } from 'react'
import SearchBtn from '../buttons/SearchBtn'
import { useDebounce } from 'use-debounce'
import { useSearchStore } from '@/app/searchStore'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'




const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const {getSearchedData}: any = useSearchStore()
  const pathname = usePathname()
  const router = useRouter()



  const handleSearch = async (event: React.MouseEvent<HTMLElement> ) => {
    event.preventDefault();
 
    if(pathname == "/Shop/search"){
      getSearchedData(searchTerm)
    }else{
      router.push("/Shop/search")
      getSearchedData(searchTerm)
    }

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