import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function WomanCloth() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
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
    return <div className="text-center py-10">Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Womens Clothing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((data) => (
          <ProductCard
            key={data.id}
            imageUrl={data.imageUrls[1]}
            title={data.name}
            description={data.description}
            price={data.price}
            rating={data.ratings}
            currency="THB"
          />
        ))}
      </div>
    </div>
  );
}

export default WomanCloth;
