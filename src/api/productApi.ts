import { Product } from "../types/types";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };