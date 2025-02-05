import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { PriceRangeProps } from '../types/types';

interface PriceInputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  ariaLabel: string;
}

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  placeholder,
  ariaLabel
}) => (
  <Input
    type="number"
    placeholder={placeholder}
    value={value || ''}
    onChange={onChange}
    className="w-24"
    min={0}
    aria-label={ariaLabel}
  />
);

export const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice: initialMinPrice = 0,
  maxPrice: initialMaxPrice = 0,
  onPriceChange,
  className = ''
}) => {
  const [prices, setPrices] = useState({
    min: initialMinPrice,
    max: initialMaxPrice
  });

  useEffect(() => {
    setPrices({
      min: initialMinPrice,
      max: initialMaxPrice
    });
  }, [initialMinPrice, initialMaxPrice]);

  const handlePriceChange = (type: 'min' | 'max') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    const newPrices = { ...prices, [type]: value };
    setPrices(newPrices);
    onPriceChange(newPrices.min, newPrices.max);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PriceInput
        value={prices.min}
        onChange={handlePriceChange('min')}
        placeholder="Min"
        ariaLabel="Minimum price"
      />
      <span className="text-gray-500">-</span>
      <PriceInput
        value={prices.max}
        onChange={handlePriceChange('max')}
        placeholder="Max"
        ariaLabel="Maximum price"
      />
    </div>
  );
};