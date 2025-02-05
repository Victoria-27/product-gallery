import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FilterSection } from "../FilterSection/FilterSection";
import { ProductCard } from "../ProductCard/ProductCard";
import { Product } from "../../types/types";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProductsAsync, setFilters, setSearchTerm, setSelectedProduct } from "../../store/productSlice";
import { ProductModal } from "../ProductModal/ProductModal";
import StoreHeader from "../StoreHeader/StoreHeader";


// Animation variants
const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

// Components
const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center py-12">
    <ClipLoader size={40} color="#3498db" />
  </div>
);

const NoProductsFound: React.FC = () => (
  <motion.div
    {...fadeInScale}
    className="text-center py-12 text-gray-500 w-full"
  >
    <p>No products found. Try adjusting the filters.</p>
  </motion.div>
);

const ScrollToTopButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 
               rounded-full shadow-lg hover:bg-blue-700 transition"
  >
    ↑
  </motion.button>
);

const ProductGrid: React.FC<{
  products: Product[];
  onProductSelect: (product: Product) => void;
}> = ({ products, onProductSelect }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
      <motion.div key={product.id} {...fadeInUp}>
        <ProductCard
          product={product}
          onClick={onProductSelect}
          className="transform transition hover:scale-105 hover:shadow-lg"
        />
      </motion.div>
    ))}
  </div>
);

const ProductGallery: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    filteredProducts,
    status,
    error,
    searchTerm,
    filters,
    selectedProduct,
  } = useAppSelector((state: RootState) => state.products);

  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  
  // Effects
  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);
  
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers
  const handleSearchChange = (newSearchTerm: string) => {
    dispatch(setSearchTerm(newSearchTerm));
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    dispatch(setFilters(newFilters));
  };

  const handleProductSelect = (product: typeof selectedProduct) => {
    dispatch(setSelectedProduct(product));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen w-full bg-gray-50">
    <StoreHeader />
    
    <div className="p-4">
      <div className="w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-lg p-4 shadow-md"
        >
          <FilterSection
            filters={filters}
            categories={categories}
            searchTerm={searchTerm}
            onFilterChange={handleFilterChange}
            onSearch={handleSearchChange}
          />
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <NoProductsFound />
        ) : (
          <ProductGrid 
            products={filteredProducts} 
            onProductSelect={handleProductSelect} 
          />
        )}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => handleProductSelect(null)}
          />
        )}

        {showScrollTop && <ScrollToTopButton onClick={scrollToTop} />}
      </div>
    </div>
  </div>
  );
};

export default ProductGallery;