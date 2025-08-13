'use client'
import React, { useEffect, useCallback } from 'react';
import ProductsLoaderSkeleton from '@/app/ui/components/Skeletons/ProductsLoaderSkeleton';
import SearchBox from '@/app/ui/components/utilityComponents/SearchBox';
import BookCard from '@/app/ui/components/utilityComponents/BookCard';
import { useSearchStore } from '@/app/searchStore';

interface SearchProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const SearchPage: React.FC<SearchProps> = ({ searchParams }) => {

    const query = searchParams?.query || "";
    const { searchResults, loading, error, dataFetched, getSearchedData} : any = useSearchStore()

    const handleSearch = useCallback(() => {
        getSearchedData(query)
    }, [getSearchedData, query])

    useEffect(() => {
        handleSearch()
    }, [handleSearch])

  return (
    <div className='w-full flex flex-col place-items-center bg-slate-100 h-full'>

      <div className='mt-4'>
          <SearchBox variant="default" />
      </div>
    
        <div className='mt-4 w-full max-w-7xl flex'>
            {/* when page is loading */}
            {loading && !dataFetched && <ProductsLoaderSkeleton/>}

            {/* display books after page is done loading */}
            {dataFetched && searchResults.length > 0 ? <div className='grid grid-cols-1 custom-xs:grid-cols-2 sm:grid-cols-3
            lg:grid-cols-4  gap-5 mx-3 mb-2 justify-center place-content-center'>
                {
                    searchResults.map((el: any) => (
                        <BookCard key={el._id} coverImg={el.img} price={el.price} id={el._id} title={el.title} description={el.description}/>
                   ))
                }
            </div> : null}

                {/* search results not found message */}
            {dataFetched && searchResults.length == 0 && <div className='font-bold text-[18px]'>{ `"${query}" wasn&apos;t found in our books collection` }</div>}

            {/* error when fetching the data */}
            {error && <div>Search error, please reload :( </div>}
        </div>
    </div>
  );
};

export default SearchPage;
