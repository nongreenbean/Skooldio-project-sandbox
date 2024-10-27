import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

const CategoryPage = () => {
  const { gender, categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = "https://api.storefront.wdb.skooldio.dev/products";

        // Construct the query parameter based on gender and category
        const categoryPrefix = gender === "women" ? "ladies" : "men";
        const queryParam = `?categories=${categoryPrefix}-${categoryId}`;

        const response = await fetch(`${endpoint}${queryParam}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, categoryId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white">
            <Sidebar />
          </div>
        </div>
        <div className="flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white">
            <Sidebar />
          </div>
        </div>
        <div className="flex-grow p-6">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white">
          <Sidebar />
        </div>
      </div>
      <div className="flex-grow">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;
