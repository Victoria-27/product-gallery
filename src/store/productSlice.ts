import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, FilterOptions, ProductState } from "../types/types";
import { fetchProducts } from "../api/productApi";

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  searchTerm: "",
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 0,
  },
  selectedProduct: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

const filterProducts = (
  products: Product[],
  searchTerm: string,
  filters: FilterOptions
) => {
  const filtered = products.filter((product) => {
    const searchMatch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch =
      !filters.category || product.category === filters.category;

    const priceMatch =
      (filters.minPrice == 0 && filters.maxPrice == 0) ||
      (product.price >= filters.minPrice && product.price <= filters.maxPrice);

    if (searchMatch && categoryMatch && priceMatch) {
      return product;
    }
  });
  return filtered;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        action.payload,
        state.filters
      );
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.filteredProducts = filterProducts(
        state.products,
        state.searchTerm,
        action.payload
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm, setFilters, setSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
