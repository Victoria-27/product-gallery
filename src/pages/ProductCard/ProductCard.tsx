import React from "react";
import { ProductCardProps } from "../../types/types";
import StarRating from "../../components/StarRating";

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => (
  <div
    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    onClick={() => onClick(product)}
  >
    <div className="p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="font-semibold mb-2 line-clamp-2 h-12">{product.title}</h3>
      <div className="flex items-center justify-between">
        <span className="font-bold">${product.price}</span>
        <StarRating value={product.rating.rate} numberOfStars={5} displayValue readonly/>
      </div>
    </div>
  </div>
);
