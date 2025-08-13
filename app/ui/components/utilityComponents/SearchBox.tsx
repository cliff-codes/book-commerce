'use client'
import React, { useState } from 'react'
import { Button, Input } from '../design-system'
import { useDebounce } from 'use-debounce'
import { useSearchStore } from '@/app/searchStore'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FiSearch } from 'react-icons/fi'

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const {getSearchedData}: any = useSearchStore()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = async (event: React.MouseEvent<HTMLElement> | React.FormEvent) => {
    event.preventDefault();
 
    if(pathname == "/Shop/search"){
      getSearchedData(searchTerm)
    }else{
      router.push("/Shop/search")
      getSearchedData(searchTerm)
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className='relative flex items-center'>
        <Input
          type="text" 
          placeholder="Search for books, authors, or topics..." 
          className="pr-12 bg-white/95 backdrop-blur-sm border-white/20 text-neutral-900 placeholder:text-neutral-500 focus:bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<FiSearch className="w-4 h-4" />}
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 h-8 px-3 bg-primary-600 hover:bg-primary-700 text-white"
        >
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchBox