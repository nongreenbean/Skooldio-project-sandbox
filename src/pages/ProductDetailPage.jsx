import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products/${id}`
        );
        const resp = await res.json();
        setProduct(resp.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <div>
        <p>Price: THB {product.price}</p>
        {product.discount && <p>Original Price: THB {product.originalPrice}</p>}
      </div>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
