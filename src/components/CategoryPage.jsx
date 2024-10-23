import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";
import ProductCard from "./ProductCard";

const CategoryPage = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorySlug = location.pathname.slice(1); // Remove the leading slash

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoriesLoading || categoriesError) return;

      try {
        setLoading(true);
        let apiUrl = "https://api.storefront.wdb.skooldio.dev/products";
        let categoryParam = "";

        if (categorySlug === "men") {
          categoryParam = "all-men";
        } else if (categorySlug === "women") {
          categoryParam = "all-ladies";
        } else {
          const category = categories.find(
            (cat) => cat.permalink === categorySlug
          );
          if (category) {
            categoryParam = category.permalink;
          }
        }

        if (categoryParam) {
          apiUrl += `?categories=${categoryParam}`;
        }

        console.log("Fetching products from:", apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status} ${response.statusText}`
          );
        }

        const responseData = await response.json();
        console.log("Fetched products data:", responseData);

        if (responseData && Array.isArray(responseData.data)) {
          setProducts(responseData.data);
        } else {
          throw new Error("Invalid data format received from API");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message, err.stack);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categories, categoriesLoading, categoriesError, categorySlug]);

  if (categoriesLoading || loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (categoriesError || error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {categoriesError || error}
      </div>
    );
  }

  const pageTitle =
    categorySlug === "men"
      ? "Men"
      : categorySlug === "women"
      ? "Women"
      : categories.find((cat) => cat.permalink === categorySlug)?.name ||
        "All Products";

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>
          <div className="flex flex-col md:flex-row">
            <button
              className="md:hidden mb-4 flex items-center justify-between w-full bg-gray-100 p-4 rounded"
              onClick={toggleSidebar}
            >
              Categories
              {isSidebarOpen ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
            <div className={`md:block ${isSidebarOpen ? "block" : "hidden"}`}>
              <Sidebar />
            </div>
            <div className="flex-1 md:ml-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">
                  Showing {products.length} products
                </span>
                <select className="border rounded px-2 py-1">
                  <option>Sort by</option>
                  <option>Price - Low to high</option>
                  <option>Price - High to low</option>
                  <option>Best seller</option>
                </select>
              </div>
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
