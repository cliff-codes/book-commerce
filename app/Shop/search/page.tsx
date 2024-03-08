'use client'
import React, { useEffect } from 'react';
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
    const { searchResults, loading, error, getSearchedData, dataFetched} = useSearchStore()

    useEffect(() => {
        const getData = async() => {
            await getSearchedData(query)
        }
        getData()
    },[query])

  return (
    <div className='w-full flex flex-col place-items-center bg-slate-100 h-full'>

      <div className='mt-4'><SearchBox/></div>
    
        <div className='mt-4 w-full max-w-7xl flex'>
            {loading && !dataFetched && <ProductsLoaderSkeleton/>}

            {dataFetched && searchResults.length > 0 ? <div className='w-full grid-cols-1 custom-xs:grid-cols-2 sm:grid-cols-3'>
                {
                    searchResults.map(el => (
                        <BookCard coverImg={el.img} price={el.price} id={el.id} title={el.title}/>
                   ))
                }
            </div> : null}

            {dataFetched && searchResults.length == 0 && <div className='font-bold text-[18px]'>"{query}" wasn't found in our books collection</div>}
        </div>
    </div>
  );
};

export default SearchPage;
