import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // ฟังก์ชันสำหรับดึงประเภทสินค้าจาก URL
  const getCategoryFromPath = (path) => {
    if (path.includes("/men")) return "men";
    if (path.includes("/women")) return "ladies";
    if (path.includes("/kids")) return "kids";
    if (path.includes("/accessories")) return "accessories";
    return "all";
  };

  // ฟังก์ชันสำหรับแปลงประเภทเป็นข้อความแสดงผล
  const getCategoryTitle = (category) => {
    switch (category) {
      case "men":
        return "Men's Clothing";
      case "ladies":
        return "Women's Clothing";
      case "kids":
        return "Kids' Clothing";
      case "accessories":
        return "Accessories";
      default:
        return "All Products";
    }
  };

  useEffect(() => {
    async function fetchData() {
      const category = getCategoryFromPath(location.pathname);
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products?${category}`
        );
        const resp = await res.json();
        if (resp.data) {
          setProducts(resp.data);
        } else {
          throw new Error("Data not found in response");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location.pathname]); // เพิ่ม dependency เพื่อให้ดึงข้อมูลใหม่เมื่อ path เปลี่ยน

  // แสดง loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">No products found</div>
      </div>
    );
  }

  return (
    <main>
      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-2xl font-bold">
          {getCategoryTitle(getCategoryFromPath(location.pathname))}
        </h1>
        <select className="border p-2 rounded">
          <option value="price-low">Price - Low to high</option>
          <option value="price-high">Price - High to low</option>
          <option value="best-seller">Best seller</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
// ProductCardSkeleton component
function ProductCardSkeleton() {
  return (
    <div className="relative max-w-sm rounded overflow-hidden bg-white">
      <div className="aspect-square w-full bg-gray-200 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
            ></div>
          ))}
        </div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
}
