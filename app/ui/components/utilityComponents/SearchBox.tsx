'use client'
import React, { useEffect, useState } from 'react'
import SearchBtn from '../buttons/SearchBtn'
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce'


const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const [query] = useDebounce(searchTerm, 100)
  const pathname = usePathname()

  
  // storing the search-term on the url
  useEffect(() => {
    if(!query){
      router.push("/Shop")
    }else{
      router.push(`/Shop?search=${searchTerm}`)
    }
  }, [query, router])

  return (
    <div className='' >
        <div className='bg-white w-fit flex rounded-sm '>
            <input type="text" placeholder="title, author or topics" className="input  w-full max-w-xs  text-slate-900 focus:border-none focus:outline-none text-sm custom-xs:w-80" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div onClick={() => {
              console.log('searching......')
            }}>
              <SearchBtn/> 
            </div> 
        </div>
    </div>
  )
}

export default SearchBox