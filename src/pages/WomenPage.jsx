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
          "https://api.storefront.wdb.skooldio.dev/products?ladies"
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
    <div>
      <Sidebar />
      <ProductList products={products} />
    </div>
  );
};

export default WomenPage;
