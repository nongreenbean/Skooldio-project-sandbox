// src/pages/ProductDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { permalink } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0); // เก็บ index ของรูปที่เลือก

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
        );

        const resp = await res.json();
        if (resp.data) {
          setProduct(resp.data);
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [permalink]);

  // แปลงราคาเป็นรูปแบบเงินบาทไทย
  const formatPrice = (amount) => {
    return `฿${amount.toLocaleString()}`;
  };

  // คำนวณเปอร์เซ็นต์ส่วนลด
  const getDiscountPercentage = () => {
    if (
      product?.promotionalPrice &&
      product?.price > product.promotionalPrice
    ) {
      return Math.round(
        ((product.price - product.promotionalPrice) / product.price) * 100
      );
    }
    return 0;
  };

  // แสดง rating ด้วยดาว
  const renderRatingStars = () => {
    if (!product?.ratings) return null;

    const stars = [];
    const rating = product.ratings;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l0.007 15.748z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
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

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รูปภาพสินค้า */}
        <div className="space-y-4">
          {/* รูปใหญ่ */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.imageUrls[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* รูปย่อย */}
          <div className="grid grid-cols-5 gap-2">
            {product.imageUrls.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 
                  ${selectedImage === index ? "ring-2 ring-indigo-500" : ""}`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="space-y-4">
          {/* SKU */}
          <div className="text-sm text-gray-500">SKU: {product.skuCode}</div>

          {/* ชื่อสินค้า */}
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {renderRatingStars()}
            <span className="ml-2 text-sm text-gray-500">
              {product.ratings?.toFixed(1)} rating
            </span>
          </div>

          {/* ราคา */}
          <div className="mt-4">
            {product.promotionalPrice &&
            product.promotionalPrice < product.price ? (
              <div className="space-y-1">
                <p className="text-3xl font-bold text-red-500">
                  {formatPrice(product.promotionalPrice)}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </p>
                  <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded">
                    Save {getDiscountPercentage()}%
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-500">{product.description}</p>
          </div>

          {/* หมวดหมู่ */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.categories.map((category) => (
                <span
                  key={category}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Collection (ถ้ามี) */}
          {product.collection && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Collection</h2>
              <span className="mt-2 inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
                {product.collection}
              </span>
            </div>
          )}

          {/* ปุ่มเพิ่มลงตะกร้า */}
          <button className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
