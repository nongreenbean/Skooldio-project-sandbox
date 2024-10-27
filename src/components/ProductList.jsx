//************************
// 1️⃣ ส่วนการ Import Modules
//************************

// สิ่งที่เปลี่ยนแปลง
// เพิ่ม useParams เข้ามา

import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

//************************
// 2️⃣ ส่วนการจัดการข้อมูล
//************************
// สิ่งที่เปลี่ยนแปลง
// 1. เปลี่ยน props จาก export default function ProductList() เป็น export default function ProductList({ products: propProducts
// 2. เปลี่ยน stage เป็น propProducts

export default function ProductList({ products: propProducts }) {
  // รับ props products จากภายนอกที่ส่งมาจาก Categorypage.jsx
  // 2.1 การจัดการ State
  const [products, setProducts] = useState(propProducts || []); // เก็บรายการสินค้า
  const [loading, setLoading] = useState(!propProducts); // เก็บสถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บข้อผิดพลาด (ถ้ามี)

  // 2.2 ดึงข้อมูลจาก URL
  const location = useLocation();
  const { collection, gender, categoryId } = useParams();

  // 2.3 การดึงข้อมูลจาก API
  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
      setLoading(false);
      return;
    }

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // กำหนด URL พื้นฐานของ API
        const baseUrl = "https://api.storefront.wdb.skooldio.dev/products";
        let endpoint = baseUrl;

        // 2.3.1 สร้าง URL ตามประเภทหน้า
        if (location.pathname.includes("/collections/")) {
          const isMenSection = location.state?.from === "men";
          const isWomenSection = location.state?.from === "women";

          if (isMenSection) {
            endpoint = `${baseUrl}/?categories=all-men`;
          } else if (isWomenSection) {
            endpoint = `${baseUrl}/?categories=all-ladies&collection=${collection}`;
          } else {
            endpoint = `${baseUrl}/?collection=${collection}`;
          }
        } else if (location.pathname === "/men") {
          endpoint = `${baseUrl}?categories=all-men`;
        } else if (location.pathname === "/women") {
          endpoint = `${baseUrl}?categories=all-ladies`;
        } else if (gender && categoryId) {
          const prefix = gender === "women" ? "ladies" : "men";
          endpoint = `${baseUrl}?categories=${prefix}-${categoryId}`;
        }

        // 2.3.2 ดึงและตรวจสอบข้อมูล
        console.log("Fetching from:", endpoint);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const resp = await res.json();
        if (!resp.data) throw new Error("Data not found in response");

        setProducts(resp.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [
    location.pathname,
    collection,
    gender,
    categoryId,
    location.state,
    propProducts,
  ]);

  // 2.4 ฟังก์ชันจัดการข้อมูล
  // - getCategoryFromPath()  ลบฟังก์ชันนี้ออก
  // - getCategoryTitle()     ลบฟังก์ชันนี้ออก
  // เพิ่ม getPageTitle แทน สำหรับแสดงชื่อหน้า
  const getPageTitle = () => {
    if (location.pathname === "/men") return "Men's Collection";
    if (location.pathname === "/women") return "Women's Collection";

    if (gender && categoryId) {
      const genderText = gender === "women" ? "Women's" : "Men's";
      const categoryText =
        categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
      return `${genderText} ${categoryText}`;
    }

    if (collection) {
      return collection === "new-arrivals" ? "New Arrivals" : "Sale";
    }

    return "Products";
  };

  //Function sort ยังไม่ได้ทำ

  const sortProducts = (sortBy) => {
    const sortedProducts = [...products];
    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "best-seller":
        return sortedProducts.sort((a, b) => b.ratings - a.ratings);
      default:
        return sortedProducts;
    }
  };

  const handleSort = (e) => {
    const sortedProducts = sortProducts(e.target.value);
    setProducts(sortedProducts);
  };

  //************************
  // 3️⃣ ส่วนการแสดงผล
  //************************

  // 3.1 แสดง Loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // 3.2 แสดง Error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  // 3.3 แสดงกรณีไม่มีสินค้า
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">No products found</div>
      </div>
    );
  }

  // 3.4 แสดงรายการสินค้า
  return (
    <div className="p-6">
      {/* 3.4.1 ส่วนหัวหน้าและตัวเลือกการเรียง */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
        <select
          className="border p-2 rounded"
          onChange={handleSort}
          defaultValue="price-low"
        >
          <option value="price-low">Price - Low to high</option>
          <option value="price-high">Price - High to low</option>
          <option value="best-seller">Best seller</option>
        </select>
      </div>

      {/* 3.4.2 แสดงรายการสินค้าแบบ Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// 3.5 Component สำหรับแสดง Loading Skeleton
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
