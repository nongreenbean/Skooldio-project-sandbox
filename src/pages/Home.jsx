import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Component() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        const data = await response.json();

        // Get 4 random products from the data array
        const shuffled = data.data.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);

        setRecommendedProducts(randomProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="./src/assets/Rectangle 2957.svg"
          alt="People wearing casual fashion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2024 Collection Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[1fr,1fr] gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">2024</h1>
            <h2 className="text-3xl font-semibold">Collection</h2>
            <p className="text-gray-600 max-w-[600px]">
              Step into a world of winter elegance and style with our curated
              Winter Collection. In preparation stop, our current selection of
              clothing is designed to keep you fashionably warm throughout the
              season. From cozy-setting outerwear, each piece in our collection
              is a collaboration of seasonal comfort and fashion, as we present
              you with the right style essentials to make a statement this
              winter season. Discover our exclusive winter wardrobe that
              seamlessly combines comfort with chic aesthetics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="./src/assets/Catalogue2.svg"
                alt="Cozy breeze collection"
                className="w-full h-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="./src/assets/Catalogue3.svg"
                alt="Flexi Move collection"
                className="w-full h-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto px-4">
        <div className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-center text-red-500 text-sm md:text-base">
                เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}
              </div>
            ) : (
              recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
