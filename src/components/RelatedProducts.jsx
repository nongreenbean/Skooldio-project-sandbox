import React, { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";

const RelatedProducts = ({ currentProductId, currentCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        // Filter products by matching category and exclude current product
        const relatedProducts = data.filter(
          (product) =>
            product.id !== currentProductId &&
            product.category === currentCategory
        );

        // Limit to 4 related products
        setProducts(relatedProducts.slice(0, 4));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, currentCategory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (products.length === 0) return null; // Don't show section if no related products

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
