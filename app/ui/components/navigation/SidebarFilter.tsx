'use client';

import React, { useState } from 'react';
import { Button, Badge } from '../design-system';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface SidebarFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const SidebarFilter = ({ isOpen, onClose, onApplyFilters }: SidebarFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 100 });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    authors: true,
  });

  const categories: FilterOption[] = [
    { id: 'fiction', label: 'Fiction', count: 245 },
    { id: 'non-fiction', label: 'Non-Fiction', count: 189 },
    { id: 'science', label: 'Science', count: 67 },
    { id: 'history', label: 'History', count: 89 },
    { id: 'biography', label: 'Biography', count: 123 },
    { id: 'self-help', label: 'Self-Help', count: 78 },
    { id: 'business', label: 'Business', count: 156 },
    { id: 'technology', label: 'Technology', count: 92 },
  ];

  const authors: FilterOption[] = [
    { id: 'stephen-king', label: 'Stephen King', count: 45 },
    { id: 'jk-rowling', label: 'J.K. Rowling', count: 12 },
    { id: 'george-rr-martin', label: 'George R.R. Martin', count: 8 },
    { id: 'neil-gaiman', label: 'Neil Gaiman', count: 23 },
    { id: 'malcolm-gladwell', label: 'Malcolm Gladwell', count: 15 },
    { id: 'yuval-noah-harari', label: 'Yuval Noah Harari', count: 7 },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleAuthor = (authorId: string) => {
    setSelectedAuthors(prev => 
      prev.includes(authorId)
        ? prev.filter(id => id !== authorId)
        : [...prev, authorId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      priceRange,
      authors: selectedAuthors,
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 100 });
    setSelectedAuthors([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
    selectedAuthors.length > 0 || 
    priceRange.min > 0 || 
    priceRange.max < 100;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:shadow-none transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col lg:h-auto lg:max-h-[calc(100vh-6rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center space-x-2">
              <FiFilter className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
              {hasActiveFilters && (
                <Badge variant="primary" size="sm">
                  {selectedCategories.length + selectedAuthors.length + (priceRange.min > 0 || priceRange.max < 100 ? 1 : 0)}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <FiX className="w-5 h-5" />
            </Button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 lg:flex-none overflow-y-auto p-6 space-y-6">
            
            {/* Categories */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('categories')}
                className="flex items-center justify-between w-full text-left font-medium text-neutral-900"
              >
                Categories
                {expandedSections.categories ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              {expandedSections.categories && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700">{category.label}</span>
                      <Badge variant="outline" size="sm">{category.count}</Badge>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full text-left font-medium text-neutral-900"
              >
                Price Range
                {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              {expandedSections.price && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Min"
                    />
                    <span className="text-neutral-500">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Max"
                    />
                  </div>
                  <div className="text-xs text-neutral-500">
                    Price: ${priceRange.min} - ${priceRange.max}
                  </div>
                </div>
              )}
            </div>

            {/* Authors */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('authors')}
                className="flex items-center justify-between w-full text-left font-medium text-neutral-900"
              >
                Authors
                {expandedSections.authors ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              
              {expandedSections.authors && (
                <div className="space-y-2">
                  {authors.map((author) => (
                    <label key={author.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAuthors.includes(author.id)}
                        onChange={() => toggleAuthor(author.id)}
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-neutral-700">{author.label}</span>
                      <Badge variant="outline" size="sm">{author.count}</Badge>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200 space-y-3">
            <Button 
              onClick={handleApplyFilters} 
              fullWidth
              disabled={!hasActiveFilters}
            >
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters} 
                fullWidth
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;
