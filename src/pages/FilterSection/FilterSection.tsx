import { Search, RotateCcw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { FilterSectionProps } from '../../types/types';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { PriceRange } from '../../components/PriceRange';

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  categories,
  searchTerm,
  onFilterChange,
  onSearch
}) => {
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

  useEffect(() => {
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({
      value: category,
      label: category
    }))
  ];

  const handlePriceChange = () => {
   
      onFilterChange({
        ...filters,
        minPrice,
        maxPrice
      });
  };

  const handleSetPriceChanges = (min: number, max: number) => {
    setMaxPrice(max);
    setMinPrice(min);
  };

  const handleReset = () => {
    setMinPrice(0);
    setMaxPrice(0);
    
    onSearch('');
    onFilterChange({
      category: '',
      minPrice: 0,
      maxPrice: 0
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full lg:w-3/4 mx-auto">
      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            icon={<Search size={20} />}
            className="w-full"
            aria-label="Search products"
          />
        </div>
        <div className="">
          <Select
            options={categoryOptions}
            value={filters.category}
            onChange={(value) => onFilterChange({ ...filters, category: value })}
            className="w-full"
            aria-label="Filter by category"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="flex-1">
          <PriceRange
            onPriceChange={handleSetPriceChanges}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePriceChange}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Apply
          </button>
          <button 
            onClick={handleReset}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200"
            title="Reset filters"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};