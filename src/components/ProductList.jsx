import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

// =============================================
// 1️⃣ ส่วนกำหนดค่าคงที่และการ Map ข้อมูล
// =============================================
// กำหนดข้อมูลสำหรับแต่ละหมวดหมู่
const CATEGORY_INFO = {
  men: {
    apiParam: "all-men", // พารามิเตอร์สำหรับเรียก API
    title: "Men's Collection", // ชื่อที่จะแสดงในหน้าเว็บ
    prefix: "men", // คำนำหน้าสำหรับ URL
  },
  women: {
    apiParam: "all-ladies",
    title: "Women's Collection",
    prefix: "ladies",
  },
  kids: {
    apiParam: "kids",
    title: "Kids Collection",
    prefix: "kids",
  },
  shoes: {
    apiParam: "shoes",
    title: "Shoes Collection",
    prefix: "shoes",
  },
  accessories: {
    apiParam: "accessories",
    title: "Accessories Collection",
    prefix: "accessories",
  },
};

export default function ProductList({ products: propProducts }) {
  // =============================================
  // 2️⃣ ส่วน State Management
  // =============================================
  const [products, setProducts] = useState(propProducts || []); // เก็บข้อมูลสินค้า
  const [loading, setLoading] = useState(!propProducts); // สถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บข้อผิดพลาด

  // ดึงข้อมูลจาก URL
  const location = useLocation();
  const { collection, gender, categoryId } = useParams();

  // =============================================
  // 3️⃣ ส่วนฟังก์ชันช่วยเหลือ (Helper Functions)
  // =============================================

  // ฟังก์ชันดึงหมวดหมู่หลักจาก URL
  const getMainCategory = () => {
    const path = location.pathname.slice(1); // ตัด "/" ออกจากด้านหน้า
    return path.split("/")[0]; // เอาส่วนแรกของ path
  };

  // ฟังก์ชันสร้าง URL สำหรับเรียก API
  const createApiUrl = () => {
    const baseUrl = "https://api.storefront.wdb.skooldio.dev/products";

    // กรณีอยู่ในหน้า collections (เช่น New Arrivals, Sale)
    if (location.pathname.includes("/collections/")) {
      const categoryInfo = CATEGORY_INFO[location.state?.from];
      if (categoryInfo) {
        return `${baseUrl}/?categories=${categoryInfo.apiParam}&collection=${collection}`;
      }
      return `${baseUrl}/?collection=${collection}`;
    }

    // กรณีอยู่ในหน้าหมวดหมู่ย่อย (เช่น Men > Shoes)
    if (gender && categoryId) {
      const parentCategory = CATEGORY_INFO[gender];
      if (parentCategory) {
        return `${baseUrl}?categories=${parentCategory.prefix}-${categoryId}`;
      }
    }

    // กรณีอยู่ในหน้าหมวดหมู่หลัก (เช่น Men, Women)
    const mainCategory = getMainCategory();
    const categoryInfo = CATEGORY_INFO[mainCategory];
    if (categoryInfo) {
      return `${baseUrl}?categories=${categoryInfo.apiParam}`;
    }

    return baseUrl;
  };

  // ฟังก์ชันสำหรับดึงชื่อหัวข้อของหน้า
  const getPageTitle = () => {
    // กรณีอยู่ในหน้า collections
    if (location.pathname.includes("/collections/")) {
      return collection === "new-arrivals" ? "New Arrivals" : "Sale";
    }

    // กรณีอยู่ในหน้าหมวดหมู่ย่อย
    if (gender && categoryId) {
      const parentInfo = CATEGORY_INFO[gender];
      const categoryText =
        categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
      return `${parentInfo?.title.split(" ")[0] || ""} ${categoryText}`;
    }

    // กรณีอยู่ในหน้าหมวดหมู่หลัก
    const mainCategory = getMainCategory();
    return CATEGORY_INFO[mainCategory]?.title || "Products";
  };

  // =============================================
  // 4️⃣ ส่วนการจัดเรียงสินค้า
  // =============================================
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

  // =============================================
  // 5️⃣ ส่วนการดึงข้อมูลจาก API
  // =============================================
  useEffect(() => {
    // ถ้ามี products ที่ส่งมาจาก props ให้ใช้เลย
    if (propProducts) {
      setProducts(propProducts);
      setLoading(false);
      return;
    }

    // ฟังก์ชันดึงข้อมูลจาก API
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = createApiUrl();
        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data) {
          throw new Error("Data not found in response");
        }

        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [
    location.pathname,
    collection,
    gender,
    categoryId,
    location.state,
    propProducts,
  ]);

  // =============================================
  // 6️⃣ ส่วนการแสดงผล (Render)
  // =============================================

  // แสดง Loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // แสดงข้อผิดพลาด
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-lg">{error}</div>
      </div>
    );
  }

  // แสดงกรณีไม่มีสินค้า
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">No products found</div>
      </div>
    );
  }

  // แสดงรายการสินค้า
  return (
    <div className="p-6">
      {/* ส่วนหัวของหน้า */}
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

      {/* แสดงรายการสินค้าแบบ Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// =============================================
// 7️⃣ ส่วน Component สำหรับแสดง Loading
// =============================================
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
