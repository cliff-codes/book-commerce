'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Button, Badge } from '../design-system';
import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';

interface SearchFilters {
  query: string;
  category: string;
  author: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  sortBy: string;
}

interface AdvancedSearchProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, className = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Form state
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    author: searchParams.get('author') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    sortBy: searchParams.get('sortBy') || 'relevance'
  });

  const [debouncedQuery] = useDebounce(filters.query, 300);

  // Categories and sorting options
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-Fiction' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'biography', label: 'Biography' },
    { value: 'self-help', label: 'Self-Help' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];

  // Generate search suggestions
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      const mockSuggestions = [
        `${debouncedQuery} books`,
        `${debouncedQuery} fiction`,
        `${debouncedQuery} non-fiction`,
        `${debouncedQuery} bestseller`,
        `${debouncedQuery} 2024`
      ];
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.query) params.set('q', filters.query);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.author) params.set('author', filters.author);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minRating) params.set('minRating', filters.minRating);
    if (filters.sortBy && filters.sortBy !== 'relevance') params.set('sortBy', filters.sortBy);

    const queryString = params.toString();
    const url = queryString ? `/Shop?${queryString}` : '/Shop';
    
    router.push(url);
    onSearch?.(filters);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFilters(prev => ({ ...prev, query: suggestion }));
    setShowSuggestions(false);
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'all',
      author: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      sortBy: 'relevance'
    });
    router.push('/Shop');
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'all' && value !== 'relevance'
  );

  return (
    <div className={`space-y-4 ${className}`} ref={searchRef}>
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              placeholder="Search books, authors, or categories..."
              className="pl-10 pr-4"
              onFocus={() => setShowSuggestions(true)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <FiFilter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="primary" size="sm" className="ml-1">
                {Object.values(filters).filter(v => v && v !== 'all' && v !== 'relevance').length}
              </Badge>
            )}
          </Button>
          
          <Button onClick={handleSearch} className="px-6">
            Search
          </Button>
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-neutral-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FiSearch className="w-4 h-4 text-neutral-400" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-neutral-200 rounded-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Advanced Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-neutral-500 hover:text-neutral-700"
              >
                Clear All
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Author
                </label>
                <Input
                  value={filters.author}
                  onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Search by author..."
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Min Price
                </label>
                <Input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Max Price
                </label>
                <Input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  placeholder="100"
                  min="0"
                />
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Min Rating
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-medium text-neutral-700 mb-3">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.query && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Search: {filters.query}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.category && filters.category !== 'all' && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Category: {categories.find(c => c.value === filters.category)?.label}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.author && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Author: {filters.author}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, author: '' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {(filters.minPrice || filters.maxPrice) && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.minRating && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      Rating: {filters.minRating}+ Stars
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, minRating: '' }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
