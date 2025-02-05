import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const StoreHeader = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg mb-8"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
          >
            <ShoppingBag className="w-8 h-8" />
            <h1 className="text-3xl font-bold tracking-tight">Visibuy</h1>
          </motion.div>
          
          <motion.div 
            className="text-sm font-medium opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover Quality Products
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default StoreHeader;