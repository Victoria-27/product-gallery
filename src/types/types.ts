export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
  }

  export interface FilterOptions {
    category: string;
    minPrice: number;
    maxPrice: number;
  }

  export interface ProductState {
    products: Product[];
    filteredProducts: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    searchTerm: string;
    filters: FilterOptions;
    selectedProduct: Product | null;
  }

  export interface PriceRangeProps {
    minPrice?: number;
    maxPrice?: number;
    onPriceChange: (min: number, max: number) => void;
    className?: string;
  }

  export interface StarRatingProps {
    numberOfStars: number;
    onChange?: (rating: number) => void;
    color?: string;
    readonly?: boolean;
    value?: number;
    displayValue?: boolean;
  }