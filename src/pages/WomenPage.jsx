import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products/?categories=all-ladies"
        );
        const resp = await res.json();
        setProducts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white">
          <Sidebar />
        </div>
      </div>
      <div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default WomenPage;
