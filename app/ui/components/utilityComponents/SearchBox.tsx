'use client'
import React, { useState } from 'react'
import { Button, Input } from '../design-system'
import { useSearchStore } from '@/app/searchStore'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { FiSearch, FiX } from 'react-icons/fi'

interface SearchBoxProps {
  variant?: 'default' | 'hero' | 'compact' | 'mobile';
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
}

const SearchBox = ({ 
  variant = 'default', 
  placeholder = "Search ...",
  className = "",
  onSearch 
}: SearchBoxProps) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const { getSearchedData }: any = useSearchStore()
    const pathname = usePathname()
    const router = useRouter()

    const handleSearch = async (event: React.MouseEvent<HTMLElement> | React.FormEvent) => {
        event.preventDefault();
        
        if (onSearch) {
            onSearch(searchTerm);
            return;
        }

        router.push(`/Shop/search?query=${searchTerm}`)
        getSearchedData(searchTerm)
    }

    const clearSearch = () => {
        setSearchTerm('');
    }

    // Variant-specific styles
    const getVariantStyles = () => {
        switch (variant) {
            case 'hero':
                return {
                    container: "w-full max-w-2xl mx-auto",
                    input: "pr-12  bg-white/95 backdrop-blur-sm border-white/20 text-neutral-900 placeholder:text-neutral-500 focus:bg-white shadow-lg",
                    button: "absolute right-1 h-10 px-4 bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                };
            case 'compact':
                return {
                    container: "w-full max-w-sm",
                    input: "pr-10 bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500",
                    button: "absolute right-1 h-8 px-3 bg-primary-600 hover:bg-primary-700 text-white"
                };
            case 'mobile':
                return {
                    container: "w-full",
                    input: "pr-10 bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:bg-white focus:border-primary-500",
                    button: "absolute right-1 h-8 px-3 bg-primary-600 hover:bg-primary-700 text-white"
                };
            default:
                return {
                    container: "w-full max-w-md",
                    input: "pr-12 bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500 shadow-sm",
                    button: "absolute right-1 h-9 px-4 bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                };
        }
    }

    const styles = getVariantStyles();

    return (
        <div className={`${styles.container} ${className}`}>
            <form onSubmit={handleSearch} className="relative">
                <div className={`relative flex items-center transition-all duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}>
                    <Input
                        type="text"
                        placeholder={placeholder}
                        className={`${styles.input} transition-all duration-200 h-[50px]`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        leftIcon={
                            <FiSearch className={`w-4 h-4 transition-colors duration-200 ${isFocused ? 'text-primary-600' : 'text-neutral-400'}`} />
                        }
                    />
                    
                    {/* Clear button */}
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    )}
                    
                    <Button
                        type="submit"
                        size="sm"
                        className={styles.button}
                        disabled={!searchTerm.trim()}
                    >
                        <FiSearch className="w-4 h-4" />
                        <span className="ml-1 hidden sm:inline">Search</span>
                    </Button>
                </div>
                
                {/* Search suggestions (optional enhancement) */}
                {isFocused && searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        <div className="p-2">
                            <div className="text-xs text-neutral-500 mb-2 px-2">Quick suggestions:</div>
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className="w-full text-left px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-50 rounded transition-colors duration-150"
                                    onClick={() => setSearchTerm(`${searchTerm} fiction`)}
                                >
                                    &quot;{searchTerm}&quot; fiction
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-50 rounded transition-colors duration-150"
                                    onClick={() => setSearchTerm(`${searchTerm} non-fiction`)}
                                >
                                    &quot;{searchTerm}&quot; non-fiction
                                </button>
                                <button
                                    type="button"
                                    className="w-full text-left px-2 py-1 text-sm text-neutral-700 hover:bg-neutral-50 rounded transition-colors duration-150"
                                    onClick={() => setSearchTerm(`${searchTerm} bestseller`)}
                                >
                                    &quot;{searchTerm}&quot; bestseller
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default SearchBox