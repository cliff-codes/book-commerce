'use client';

import React, { useState } from 'react'
import SearchBox from '../components/utilityComponents/SearchBox'
import ShopData from './ShopData'
import SidebarFilter from '../components/navigation/SidebarFilter'
import Breadcrumb from '../components/navigation/Breadcrumb'
import { Button } from '../components/design-system'
import { FiFilter } from 'react-icons/fi'

const StorePage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeFilters, setActiveFilters] = useState<any>({});

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
        setIsFilterOpen(false);
        // Here you would typically apply the filters to your data
        console.log('Applied filters:', filters);
    };

    return (
        <div className='min-h-screen bg-neutral-50'>
            {/* Breadcrumbs */}
            <Breadcrumb />

            <div className='max-w-7xl mx-auto px-6 py-8'>
                {/* Header Section */}
                <div className='mb-8'>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                        <div>
                            <h1 className='text-3xl lg:text-4xl font-bold text-neutral-900 mb-2'>
                                Book Store
                            </h1>
                            <p className='text-neutral-600'>
                                Discover thousands of books across all genres
                            </p>
                        </div>

                        <div className='flex items-center gap-4'>
                            {/* Search Box */}
                            <div className='flex-1 max-w-md'>
                                <SearchBox variant="default" />
                            </div>


                            {/* Filter Toggle - Mobile Only */}
                            <Button
                                variant="outline"
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden"
                            >
                                <FiFilter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content - Desktop Layout */}
                <div className='hidden lg:block lg:sticky lg:top-24'>
                    <div className='flex gap-8'>
                        {/* Sticky Sidebar Filter - Desktop */}
                        <div className='w-80 flex-shrink-0'>
                            <div className='top-24'>
                                <SidebarFilter
                                    isOpen={true}
                                    onClose={() => { }}
                                    onApplyFilters={handleApplyFilters}
                                />
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className='flex-1'>
                            {/* Active Filters Display */}
                            {Object.keys(activeFilters).length > 0 && (
                                <div className='mb-6 p-4 bg-white rounded-lg border border-neutral-200'>
                                    <div className='flex items-center justify-between mb-3'>
                                        <h3 className='font-medium text-neutral-900'>Active Filters</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setActiveFilters({})}
                                        >
                                            Clear All
                                        </Button>
                                    </div>
                                    <div className='flex flex-wrap gap-2'>
                                        {activeFilters.categories?.map((cat: string) => (
                                            <span key={cat} className='px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full'>
                                                {cat}
                                            </span>
                                        ))}
                                        {activeFilters.authors?.map((author: string) => (
                                            <span key={author} className='px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full'>
                                                {author}
                                            </span>
                                        ))}
                                        {(activeFilters.priceRange?.min > 0 || activeFilters.priceRange?.max < 100) && (
                                            <span className='px-3 py-1 bg-accent-info/10 text-accent-info text-sm rounded-full'>
                                                ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Books Grid/List */}
                            <ShopData viewMode={viewMode} />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className='lg:hidden'>
                    {/* Active Filters Display */}
                    {Object.keys(activeFilters).length > 0 && (
                        <div className='mb-6 p-4 bg-white rounded-lg border border-neutral-200'>
                            <div className='flex items-center justify-between mb-3'>
                                <h3 className='font-medium text-neutral-900'>Active Filters</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveFilters({})}
                                >
                                    Clear All
                                </Button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {activeFilters.categories?.map((cat: string) => (
                                    <span key={cat} className='px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full'>
                                        {cat}
                                    </span>
                                ))}
                                {activeFilters.authors?.map((author: string) => (
                                    <span key={author} className='px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full'>
                                        {author}
                                    </span>
                                ))}
                                {(activeFilters.priceRange?.min > 0 || activeFilters.priceRange?.max < 100) && (
                                    <span className='px-3 py-1 bg-accent-info/10 text-accent-info text-sm rounded-full'>
                                        ${activeFilters.priceRange.min} - ${activeFilters.priceRange.max}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Books Grid/List */}
                    <ShopData viewMode={viewMode} />
                </div>
            </div>

            {/* Mobile Sidebar Filter - Only render on mobile */}
            <div className="lg:hidden">
                <SidebarFilter
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    onApplyFilters={handleApplyFilters}
                />
            </div>
        </div>
    )
}

export default StorePage