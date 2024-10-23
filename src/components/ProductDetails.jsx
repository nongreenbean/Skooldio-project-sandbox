import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useProduct } from "../context/ProductContext";

const ProductDetail = () => {
  const { permalink } = useParams();
  const { product, loading, error, fetchProductByPermalink } = useProduct();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    console.log("ProductDetail mounted with permalink:", permalink);
    if (permalink) {
      fetchProductByPermalink(permalink);
    }
    return () => {
      console.log("ProductDetail unmounting");
    };
  }, [permalink, fetchProductByPermalink]);

  console.log("Product state:", product);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    console.log("Rendering error state. Error:", error, "Product:", product);
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={product.imageUrls[selectedImageIndex]}
              alt={product.name}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} view ${index + 1}`}
                className={`w-full h-24 object-cover cursor-pointer rounded ${
                  index === selectedImageIndex ? "border-2 border-black" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-gray-500">SKU: {product.skuCode}</p>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) =>
                index < Math.floor(product.ratings) ? (
                  <StarIconSolid
                    key={index}
                    className="w-5 h-5 text-yellow-400"
                  />
                ) : (
                  <StarIcon key={index} className="w-5 h-5 text-gray-300" />
                )
              )}
              <span className="ml-2 text-gray-600">
                ({product.ratings.toFixed(1)})
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                THB {product.promotionalPrice.toLocaleString()}
              </span>
              {product.promotionalPrice < product.price && (
                <>
                  <span className="text-gray-500 line-through">
                    THB {product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                    -
                    {Math.round(
                      (1 - product.promotionalPrice / product.price) * 100
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Available Options</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.variants.map((variant, index) => (
                  <div key={index} className="border rounded p-3">
                    {variant.color && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: variant.colorCode }}
                        />
                        <span>{variant.color}</span>
                      </div>
                    )}
                    {variant.size && <span>Size: {variant.size}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
            <button className="w-full border border-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <HeartIcon className="w-5 h-5" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
