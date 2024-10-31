// 1. การนำเข้าและตั้งค่าเริ่มต้น
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../components/CartContext";

const CartPage = () => {
  // สร้างตัวแปรเก็บข้อมูล (State)
  const [recommendedProducts, setRecommendedProducts] = useState([]); // เก็บสินค้าแนะนำ
  const [isLoading, setIsLoading] = useState(true); // เก็บสถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บข้อผิดพลาด

  // Add cart context usage
  const { items } = useCart();

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
    <div className="flex flex-col items-center justify-center py-8 md:py-16 px-4 bg-gray-50 rounded-lg">
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
        Your cart is empty
      </h3>
      <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
        Looks like you have not added anything to your cart. <br />
        Go ahead & explore top categories.
      </p>
      {/* ปุ่มเลือกซื้อสินค้า */}
      <Link
        to="/"
        className="bg-black text-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded"
      >
        Continue shopping
      </Link>
    </div>
  );

  // 5. ส่วนแสดงสรุปราคา
  const CartSummary = ({ items }) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const itemPrice = item.product.promotionalPrice || item.product.price;
      return sum + itemPrice * item.quantity;
    }, 0);

    return (
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#222222] text-[24px] font-bold leading-[32px]">
            Summary
          </span>
          <span className="text-gray-600">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Product List */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-[16px]">
              <span className="text-[#222222]">
                {item.product.name}
                {item.quantity > 1 ? ` x ${item.quantity}` : ""}
              </span>
              <span className="text-[#222222]">
                {(
                  (item.product.promotionalPrice || item.product.price) *
                  item.quantity
                ).toLocaleString()}
                .00
              </span>
            </div>
          ))}
        </div>

        {/* Subtotal and Shipping */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="text-[#222222]">Subtotal</span>
            <span className="text-[#222222]">
              {subtotal.toLocaleString()}.00
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#222222]">Shipping fee</span>
            <span className="text-[#222222]">Free</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between mt-4 pt-4 border-t">
          <span className="text-[#222222] text-[16px] font-bold">Total</span>
          <span className="text-[#222222] text-[16px] font-bold">
            {subtotal.toLocaleString()}.00
          </span>
        </div>

        <button className="w-full bg-[#15192C] text-white py-2 md:py-3 rounded mt-4 md:mt-6 text-sm md:text-base">
          Check out
        </button>

        <Link
          to="/"
          className="w-full block text-center text-gray-600 py-2 md:py-3 mt-2 md:mt-3 border border-gray-300 rounded text-sm md:text-base"
        >
          Continue shopping
        </Link>
      </div>
    );
  };

  // 6. ส่วนแสดง Loading
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-square rounded mb-4"></div>
      <div className="bg-gray-200 h-3 md:h-4 rounded w-3/4 mb-2"></div>
      <div className="bg-gray-200 h-3 md:h-4 rounded w-1/2"></div>
    </div>
  );

  const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity, updateItemDetails } = useCart();
    const [editColor, setEditColor] = useState(item.selectedColor);
    const [editSize, setEditSize] = useState(item.selectedSize);
    const [editQuantity, setEditQuantity] = useState(item.quantity);

    // Use the stored product data directly
    const colors = item.product.colors || [];
    const sizes = item.product.sizes || [];

    return (
      <div className="flex items-center gap-6 p-4 border-b border-gray-200">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={item.product.imageUrls[0]}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold">{item.product.name}</h3>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                width="20"
                height="23"
                viewBox="0 0 20 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7937 8.11339L15.8817 19.5933C15.8289 20.2061 15.3253 20.6674 14.7126 20.6674H5.44411C4.82786 20.6674 4.32784 20.2062 4.27499 19.5969L3.36299 8.11344C3.33135 7.72611 2.99676 7.43735 2.60585 7.46555C2.21851 7.49719 1.92976 7.83537 1.95796 8.2227L2.86996 19.7097C2.98264 21.0584 4.08838 22.0761 5.44411 22.0761H14.7161C16.0683 22.0761 17.1742 21.0584 17.2903 19.7062L18.2023 8.22267C18.2339 7.83534 17.9452 7.49728 17.5544 7.46552C17.1635 7.43733 16.8254 7.72608 16.7938 8.11341L16.7937 8.11339Z"
                  fill="currentColor"
                />
                <path
                  d="M6.4372 4.09197C6.82453 4.09197 7.14149 3.775 7.14149 3.38767V2.00019C7.14149 1.67269 7.4056 1.40858 7.7331 1.40858H11.8849C12.2124 1.40858 12.4765 1.67269 12.4765 2.00019V3.38767C12.4765 3.775 12.7935 4.09197 13.1808 4.09197C13.5681 4.09197 13.8851 3.775 13.8851 3.38767V2.00019C13.8851 0.898002 12.9871 0 11.8849 0H7.7331C6.63091 0 5.73291 0.898031 5.73291 2.00019V3.38767C5.73291 3.77856 6.04632 4.09197 6.4372 4.09197Z"
                  fill="currentColor"
                />
                <path
                  d="M0.704292 6.56398H18.9842C19.3715 6.56398 19.6885 6.24702 19.6885 5.85969C19.6885 5.47236 19.3715 5.1554 18.9842 5.1554H0.704292C0.316961 5.1554 0 5.47236 0 5.85969C0 6.24702 0.316961 6.56398 0.704292 6.56398Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Color and Size Display */}
            <div className="col-span-4">
              <p className="text-gray-600">
                Color: <span className="font-medium">{item.selectedColor}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Size: <span className="font-medium">{item.selectedSize}</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="col-span-3">
              <label className="block text-gray-600 mb-2">Qty.</label>
              <div className="relative">
                <select
                  value={editQuantity}
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    setEditQuantity(newQuantity);
                    updateQuantity(item.id, newQuantity);
                  }}
                  className="w-full appearance-none border border-gray-300 rounded px-4 py-2 pr-8 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price - Moved to the far right */}
            <div className="col-span-5 flex justify-end">
              <span className="text-[18px] font-semibold leading-[24px] text-right">
                THB{" "}
                {(
                  (item.product.promotionalPrice || item.product.price) *
                  item.quantity
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 7. ส่วนแสดงผลหลัก
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-[24px] font-bold leading-[32px] mb-4 text-[#222222]">
                Items
              </h2>
              {items.length === 0 ? (
                <EmptyCartMessage />
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <div className="lg:col-span-1">
              <CartSummary items={items} />
            </div>
          )}
        </div>

        {/* ส่วนสินค้าแนะนำ */}
        <div className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8">
            People also like these
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
              // แสดงินค้าแนะนำ
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
