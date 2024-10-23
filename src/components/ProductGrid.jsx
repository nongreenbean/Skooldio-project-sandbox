import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const ProductGrid = ({ products }) => {
  if (!products) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div className="text-center py-8">No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          to={`/product/${product.permalink}`}
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative">
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            {product.promotionalPrice < product.price && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                -
                {Math.round(
                  (1 - product.promotionalPrice / product.price) * 100
                )}
                %
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(product.ratings) ? (
                  <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
                ) : (
                  <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                )
              )}
              <span className="ml-2 text-sm text-gray-600">
                ({product.ratings.toFixed(1)})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {product.promotionalPrice < product.price && (
                  <span className="text-sm text-gray-500 line-through mr-2">
                    THB {product.price.toLocaleString()}
                  </span>
                )}
                <span className="text-lg font-semibold">
                  THB {product.promotionalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
