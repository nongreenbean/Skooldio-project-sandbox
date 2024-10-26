import React from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ProductGrid from "../components/ProductGrid";

const Categories = () => {
  const { categorySlug } = useParams();
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <div className="text-center py-8">Loading categories...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading categories: {error}
      </div>
    );
  }

  const currentCategory = categories.find(
    (cat) => cat.permalink === categorySlug
  );
  const pageTitle =
    categorySlug === "men"
      ? "Men"
      : categorySlug === "women"
      ? "Women"
      : currentCategory?.name || "All Products";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 md:ml-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Showing products</span>
                <select className="border rounded px-2 py-1">
                  <option>Sort by</option>
                  <option>Price - Low to high</option>
                  <option>Price - High to low</option>
                  <option>Best seller</option>
                </select>
              </div>
              <ProductGrid category={categorySlug} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
