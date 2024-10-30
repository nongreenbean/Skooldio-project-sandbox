import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CartPage = () => {
  // สร้าง state สำหรับเก็บข้อมูล
  const [recommendedProducts, setRecommendedProducts] = useState([]); // เก็บสินค้าแนะนำ
  const [isLoading, setIsLoading] = useState(true); // เก็บสถานะว่ากำลังโหลดข้อมูลอยู่หรือไม่
  const [error, setError] = useState(null); // เก็บข้อผิดพลาด (ถ้ามี)

  // ฟังก์ชันสำหรับสุ่มสินค้า
  const getRandomProducts = (products) => {
    // สร้าง array ใหม่และสุ่มลำดับ
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    // เลือกแค่ 4 ชิ้นแรก
    return shuffled.slice(0, 4);
  };

  // ดึงข้อมูลสินค้าเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ดึงข้อมูลจาก API
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        // ตรวจสอบว่าดึงข้อมูลสำเร็จหรือไม่
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        // แปลงข้อมูลเป็น JSON
        const data = await response.json();
        // สุ่มสินค้าและเก็บไว้ใน state
        setRecommendedProducts(getRandomProducts(data.data));
        // ปิดสถานะ loading
        setIsLoading(false);
      } catch (err) {
        // ถ้าเกิดข้อผิดพลาด เก็บไว้ใน state
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ส่วนแสดงผลหน้าตะกร้าว่าง
  const EmptyCartMessage = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-48 h-48 mb-6">
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
      <h3 className="text-xl font-semibold mb-2">ตะกร้าของคุณว่างเปล่า</h3>
      <p className="text-gray-500 text-center mb-6">
        ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าในตะกร้า
        <br />
        ลองเลือกดูสินค้าของเราได้เลย
      </p>
      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
      >
        เลือกซื้อสินค้า
      </Link>
    </div>
  );

  // ส่วนแสดงผลสรุปราคา
  const CartSummary = () => (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">ไม่มีสินค้า</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">ราคารวม</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">ค่าจัดส่ง</span>
          <span>0.00</span>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <span className="font-semibold">ยอดรวมทั้งหมด</span>
          <span className="font-semibold">0.00</span>
        </div>
      </div>

      <button
        className="w-full bg-gray-200 text-gray-400 py-3 rounded mt-6 cursor-not-allowed"
        disabled
      >
        ชำระเงิน
      </button>

      <Link
        to="/"
        className="w-full block text-center text-gray-600 py-3 mt-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
      >
        เลือกซื้อสินค้าต่อ
      </Link>
    </div>
  );

  // ส่วนแสดงผล Loading
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-square rounded mb-4"></div>
      <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">ตะกร้าของฉัน</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ส่วนแสดงรายการสินค้า */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold mb-4">รายการสินค้า</h2>
            <EmptyCartMessage />
          </div>

          {/* ส่วนแสดงสรุปราคา */}
          <div className="lg:col-span-1">
            <h2 className="font-semibold mb-4 flex justify-between">
              <span>สรุปรายการ</span>
              <span className="text-gray-500">0 ชิ้น</span>
            </h2>
            <CartSummary />
          </div>
        </div>

        {/* ส่วนแสดงสินค้าแนะนำ */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-8">สินค้าที่คุณอาจสนใจ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // แสดง loading ขณะโหลดข้อมูล
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            ) : error ? (
              // แสดงข้อผิดพลาด (ถ้ามี)
              <div className="col-span-full text-center text-red-500">
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
