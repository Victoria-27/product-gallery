import React from "react";
import { ProductModalProps } from "../../types/types";
import { Modal } from "../../components/Modal";
import StarRating from "../../components/StarRating";

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => (
  <Modal
    isOpen={!!product}
    onClose={onClose}
    title={product.title}
    className="max-w-2xl"
  >
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-auto max-h-64 object-contain rounded-lg shadow-md"
      />
      <div className="flex-1">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {product.description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-semibold text-green-600">
            ${product.price}
          </span>
          <span className="text-sm text-gray-500">|</span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        <div className="flex items-center gap-2">
        <StarRating value={product.rating.rate} numberOfStars={5} displayValue readonly/>
          <span className="text-sm text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
      </div>
    </div>
  </Modal>
);
