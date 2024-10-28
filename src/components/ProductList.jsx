import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
  const [selectedSort, setSelectedSort] = useState("price-low");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleSort = (sortBy) => {
    const sortedProducts = sortProducts(sortBy);
    setProducts(sortedProducts);
  };
  const sortOptions = [
    { value: "price-low", label: "Price - Low to high" },
    { value: "price-high", label: "Price - High to low" },
    { value: "best-seller", label: "Best seller" },
  ];

  // Function to handle sort selection
  const handleSortSelect = (value) => {
    setSelectedSort(value);
    handleSort(value);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sort-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header section */}
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{getPageTitle()}</h1>

          {/* Custom Sort Dropdown */}
          <div className="relative sort-dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded hover:border-gray-300 focus:outline-none"
            >
              <span>Sort by</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      selectedSort === option.value ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Radio circle */}
                      <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                        {selectedSort === option.value && (
                          <div className="w-2 h-2 rounded-full bg-black" />
                        )}
                      </div>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* แสดง Loading */}
      {loading && (
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      )}

      {/* แสดง Error */}
      {error && (
        <div className="flex justify-center items-center min-h-[200px] text-red-500">
          <div className="text-lg">{error}</div>
        </div>
      )}

      {/* แสดงกรณีไม่มีสินค้า */}
      {!loading && !error && (!products || products.length === 0) && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg">No products found</div>
        </div>
      )}

      {/* แสดงรายการสินค้า */}
      {!loading && !error && products && products.length > 0 && (
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================
// 7️⃣ ส่วน Component สำหรับแสดง Loading
// =============================================
function ProductCardSkeleton() {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
      {/* รูปภาพ skeleton */}
      <div className="relative pt-[100%] bg-gray-200 animate-pulse" />

      {/* ข้อมูลสินค้า skeleton */}
      <div className="p-4 space-y-3">
        {/* ชื่อสินค้า */}
        <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4 animate-pulse" />

        {/* คำอธิบาย */}
        <div className="h-3 md:h-4 bg-gray-200 rounded w-full animate-pulse" />
        <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3 animate-pulse" />

        {/* Rating */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        {/* ราคา */}
        <div className="flex items-center gap-2">
          <div className="h-5 md:h-6 bg-gray-200 rounded w-24 md:w-28 animate-pulse" />
          <div className="h-4 md:h-5 bg-gray-200 rounded w-16 md:w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
