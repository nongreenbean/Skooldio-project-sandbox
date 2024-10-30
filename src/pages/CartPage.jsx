// 1. การนำเข้าและตั้งค่าเริ่มต้น
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CartPage = () => {
  // สร้างตัวแปรเก็บข้อมูล (State)
  const [recommendedProducts, setRecommendedProducts] = useState([]); // เก็บสินค้าแนะนำ
  const [isLoading, setIsLoading] = useState(true); // เก็บสถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บข้อผิดพลาด

  // 2. ฟังก์ชันสุ่มสินค้า
  // รับข้อมูลสินค้าทั้งหมด และสุ่มเลือกมา 4 ชิ้น
  const getRandomProducts = (products) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  // 3. ดึงข้อมูลจาก API
  // ทำงานครั้งแรกที่โหลดหน้าเว็บ
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ดึงข้อมูลจาก API
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        const data = await response.json();
        // สุ่มสินค้าและเก็บไว้
        setRecommendedProducts(getRandomProducts(data.data));
        // ปิดสถานะโหลด
        setIsLoading(false);
      } catch (err) {
        // เก็บข้อผิดพลาด
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 4. ส่วนแสดงข้อความตะกร้าว่าง
  const EmptyCartMessage = () => (
    <div className="flex flex-col items-center justify-center py-8 md:py-16 px-4">
      {/* ไอคอนตะกร้า */}
      <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full text-gray-200"
        >
          <path
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* ข้อความ */}
      <h3 className="text-lg md:text-xl font-semibold mb-2">
        ตะกร้าของคุณว่างเปล่า
      </h3>
      <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
        ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าในตะกร้า
        <br />
        ลองเลือกดูสินค้าของเราได้เลย
      </p>
      {/* ปุ่มเลือกซื้อสินค้า */}
      <Link
        to="/"
        className="bg-black text-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded"
      >
        เลือกซื้อสินค้า
      </Link>
    </div>
  );

  // 5. ส่วนแสดงสรุปราคา
  const CartSummary = () => (
    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
      {/* รายการราคา */}
      <div className="space-y-3 md:space-y-4 text-sm md:text-base">
        {/* แต่ละรายการ */}
        <div className="flex justify-between">
          <span className="text-gray-600">ไม่มีสินค้า</span>
          <span>0.00</span>
        </div>
        {/* ... รายการอื่นๆ ... */}
      </div>

      {/* ปุ่มชำระเงิน (ปิดการใช้งาน) */}
      <button
        disabled
        className="w-full bg-gray-200 text-gray-400 py-2 md:py-3 rounded mt-4 md:mt-6 text-sm md:text-base cursor-not-allowed"
      >
        ชำระเงิน
      </button>

      {/* ปุ่มเลือกซื้อสินค้าต่อ */}
      <Link
        to="/"
        className="w-full block text-center text-gray-600 py-2 md:py-3 mt-2 md:mt-3 border border-gray-300 rounded text-sm md:text-base"
      >
        เลือกซื้อสินค้าต่อ
      </Link>
    </div>
  );

  // 6. ส่วนแสดง Loading
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-square rounded mb-4"></div>
      <div className="bg-gray-200 h-3 md:h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-gray-200 h-3 md:h-4 rounded w-1/2"></div>
    </div>
  );

  // 7. ส่วนแสดงผลหลัก
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 pb-6 md:pb-8">
        {/* หัวข้อ (ซ่อนบนมือถือ) */}
        <h1 className="hidden md:block text-2xl font-bold mb-8">
          ตะกร้าของฉัน
        </h1>

        {/* กริดหลัก */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 max-w-[1440px] mx-auto">
          {/* ส่วนรายการสินค้า */}
          <div className="lg:col-span-2">
            <h2 className="text-base md:text-lg font-medium mb-4">
              รายการสินค้า
            </h2>
            <EmptyCartMessage />
          </div>

          {/* ส่วนสรุปราคา */}
          <div className="lg:col-span-1">
            <h2 className="text-base md:text-lg font-medium mb-4 flex justify-between items-center">
              <span>สรุปรายการ</span>
              <span className="text-gray-500 text-sm">0 ชิ้น</span>
            </h2>
            <CartSummary />
          </div>
        </div>

        {/* ส่วนสินค้าแนะนำ */}
        <div className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8">
            สินค้าที่คุณอาจสนใจ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {isLoading ? (
              // แสดง Loading
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            ) : error ? (
              // แสดงข้อผิดพลาด
              <div className="col-span-full text-center text-red-500 text-sm md:text-base">
                เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}
              </div>
            ) : (
              // แสดงสินค้าแนะนำ
              recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
