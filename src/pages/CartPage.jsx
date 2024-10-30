import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../components/CartContext";

const CartPage = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items } = useCart();

  const getRandomProducts = (products) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        if (!response.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลได้");
        }
        const data = await response.json();
        setRecommendedProducts(getRandomProducts(data.data));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const EmptyCartMessage = () => (
    <div className="flex flex-col items-center justify-center py-8 md:py-16 px-4">
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
      <h3 className="text-lg md:text-xl font-semibold mb-2">
        ตะกร้าของคุณว่างเปล่า
      </h3>
      <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
        ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าในตะกร้า
        <br />
        ลองเลือกดูสินค้าของเราได้เลย
      </p>
      <Link
        to="/"
        className="bg-black text-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded"
      >
        เลือกซื้อสินค้า
      </Link>
    </div>
  );

  const CartSummary = ({ items }) => {
    const subtotal = items.reduce(
      (sum, item) =>
        sum +
        (item.product.promotionalPrice || item.product.price) * item.quantity,
      0
    );

    return (
      <div className="bg-gray-50 rounded-lg p-4 md:p-6">
        <div className="space-y-3 md:space-y-4 text-sm md:text-base">
          <div className="flex justify-between">
            <span className="text-gray-600">ยอดรวมสินค้า</span>
            <span>THB {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ค่าจัดส่ง</span>
            <span>ฟรี</span>
          </div>
          <div className="flex justify-between font-medium pt-3 border-t">
            <span>ยอดรวมทั้งหมด</span>
            <span>THB {subtotal.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full bg-[#15192C] text-white py-2 md:py-3 rounded mt-4 md:mt-6 text-sm md:text-base">
          ชำระเงิน
        </button>

        <Link
          to="/"
          className="w-full block text-center text-gray-600 py-2 md:py-3 mt-2 md:mt-3 border border-gray-300 rounded text-sm md:text-base"
        >
          เลือกซื้อสินค้าต่อ
        </Link>
      </div>
    );
  };

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
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-8 items-center">
            {/* Replace dropdown with text display */}
            <div>
              <p className="text-gray-600">
                Color: <span className="font-medium">{item.selectedColor}</span>
              </p>
              <p className="text-gray-600 mt-1">
                Size: <span className="font-medium">{item.selectedSize}</span>
              </p>
            </div>

            {/* Quantity */}
            <div>
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

            {/* Price */}
            <div className="text-right">
              <span className="text-xl font-bold">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">ตะกร้าของฉัน</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-4">
                รายการสินค้า ({items.length} รายการ)
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

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">สินค้าที่คุณอาจสนใจ</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-red-500">{error}</div>
            ) : (
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
