import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";

// ImageGallery Component
const ImageGallery = ({ images, price, promotionalPrice }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Calculate discount percentage using the actual prices from API
  const calculateDiscount = () => {
    // From API: price = 2000.00, promotionalPrice = 1000.00
    if (!price || !promotionalPrice) return null;
    const discount = ((price - promotionalPrice) / price) * 100;
    return Math.round(discount); // This will give us 50% for the example
  };

  const discountPercentage = calculateDiscount();

  useEffect(() => {
    setMainImageIndex(0);
  }, [images]);

  const handlePrev = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[576px] h-auto aspect-[576/597] bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image with Discount Badge */}
      <div className="relative w-full max-w-[576px] h-auto aspect-[576/597] bg-gray-100 rounded-lg overflow-hidden">
        {discountPercentage > 0 && (
          <div className="absolute top-0 right-0 bg-[#EF4444] text-white px-4 py-2 text-sm font-medium">
            -{discountPercentage}%
          </div>
        )}
        <img
          src={images[mainImageIndex]}
          alt="Product"
          className="w-full h-full object-contain"
        />
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 px-[15px] py-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 px-[15px] py-2 rounded-full"
        >
          &gt;
        </button>
      </div>
      {/* Thumbnails */}
      <div className="w-full max-w-[576px] flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImageIndex(index)}
            className={`relative w-[100px] h-[100px] rounded-lg overflow-hidden flex items-center justify-center ${
              mainImageIndex === index ? "ring-2 ring-black" : ""
            }`}
          >
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

// ColorSelector Component
const ColorSelector = ({ variants, selectedColor, onColorSelect }) => {
  if (!variants || variants.length === 0) return null;

  // Get unique colors
  const uniqueColors = Array.from(
    new Set(variants.map((variant) => variant.color))
  ).map((color) => {
    const variant = variants.find((v) => v.color === color);
    return {
      color: variant.color,
      colorCode: variant.colorCode,
    };
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Color</label>
      <div className="flex space-x-4">
        {uniqueColors.map((variant) => (
          <div
            key={variant.color}
            className="flex flex-col items-center space-y-1"
          >
            <button
              onClick={() => onColorSelect(variant.color)}
              className={`w-8 h-8 rounded-full ${
                selectedColor === variant.color
                  ? "ring-2 ring-black ring-offset-2"
                  : ""
              }`}
              style={{ backgroundColor: variant.colorCode }}
            />
            <span className="text-xs text-gray-600">{variant.color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// SizeSelector Component - Updated to match the design
const SizeSelector = ({
  variants,
  selectedColor,
  selectedSize,
  onSizeSelect,
}) => {
  // Get available sizes for the selected color
  const availableSizes = variants
    .filter((variant) => variant.color === selectedColor)
    .map((variant) => ({
      size: variant.size,
      remains: variant.remains,
    }));

  // Get unique sizes from variants and sort them
  const allSizes = Array.from(new Set(variants.map((v) => v.size))).sort(
    (a, b) => {
      // Define size order for letter sizes
      const sizeOrder = { S: 1, M: 2, L: 3, XL: 4 };

      // If both are letter sizes, use the defined order
      if (sizeOrder[a] && sizeOrder[b]) {
        return sizeOrder[a] - sizeOrder[b];
      }

      // If they're numbers, sort numerically
      if (!isNaN(a) && !isNaN(b)) {
        return Number(a) - Number(b);
      }

      // If mixed types, prioritize letter sizes
      return sizeOrder[a] ? -1 : 1;
    }
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Size</label>
      <div className="flex gap-2 flex-nowrap">
        {allSizes.map((size) => {
          const sizeVariant = availableSizes.find((v) => v.size === size);
          const isOutOfStock = !sizeVariant || sizeVariant.remains === 0;

          return (
            <button
              key={size}
              onClick={() => !isOutOfStock && onSizeSelect(size)}
              className={`
                w-[140px] h-[48px] rounded-sm border border-gray-300
                ${selectedSize === size ? "bg-[#DEF81C]" : "bg-white"}
                ${
                  isOutOfStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
              disabled={isOutOfStock}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// QuantitySelector Component
const QuantitySelector = ({ quantity, onQuantityChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Quantity
      </label>
      <select
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-4 py-2"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};

// Rating Component
const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="text-2xl">
          {index < fullStars ? (
            <span style={{ color: "#DEF81C" }}>★</span>
          ) : index === fullStars && hasHalfStar ? (
            <span style={{ color: "#DEF81C" }}>★</span>
          ) : (
            <span style={{ color: "#d1d5db" }}>★</span>
          )}
        </span>
      ))}
      {Number.isInteger(rating) && (
        <span className="ml-2 text-gray-600">({rating})</span>
      )}
    </div>
  );
};

// RelatedProducts Component
const RelatedProducts = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products/"
        );
        const { data } = await response.json();
        if (data && Array.isArray(data)) {
          const filtered = data
            .filter((p) => p.id !== currentProductId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

  if (loading) return <div>Loading related products...</div>;
  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">People also like these</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.permalink}`}
            className="group"
          >
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              {product.imageUrls && product.imageUrls.length > 0 && (
                <img
                  src={product.imageUrls[0]}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              )}
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              THB {product.promotionalPrice.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Add this new component for the heart icon
const WishlistButton = ({ isWishlisted, onClick }) => {
  if (isWishlisted) {
    return (
      <button
        onClick={onClick}
        className="text-red-500 hover:text-red-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="text-gray-400 hover:text-red-500 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

// Main ProductDetail Component - Updated with proper checks
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { permalink } = useParams();

  // Reset quantity when color or size changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    // Quantity will be reset by the useEffect
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    // Quantity will be reset by the useEffect
  };

  // Updated fetch function with correct endpoint
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const productData = await response.json();
        setProduct(productData);

        // Set initial color if variants exist
        if (productData.variants && productData.variants.length > 0) {
          setSelectedColor(productData.variants[0].color);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [permalink]);

  // Get the selected variant based on both color and size
  const selectedVariant = useMemo(() => {
    return product?.variants?.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
  }, [product, selectedColor, selectedSize]);

  // Get remains for the selected variant
  const currentRemains = selectedVariant?.remains || 0;

  console.log("Product:", product);
  console.log("Product variants:", product?.variants);
  console.log("Selected color:", selectedColor);
  console.log("Selected variant:", selectedVariant);

  // Update size when color changes
  useEffect(() => {
    if (selectedColor && product?.variants) {
      // Check if current size is available in new color
      const isSizeAvailable = product.variants.some(
        (v) =>
          v.color === selectedColor && v.size === selectedSize && v.remains > 0
      );

      // Only change size if current size is not available
      if (!isSizeAvailable) {
        // Find first available size for selected color
        const availableSizes = product.variants
          .filter((v) => v.color === selectedColor && v.remains > 0)
          .map((v) => v.size);

        if (availableSizes.length > 0) {
          setSelectedSize(availableSizes[0]);
        } else {
          setSelectedSize(""); // Reset size if no sizes available
        }
      }
      // If current size is available in new color, keep it selected
    }
  }, [selectedColor, product, selectedSize]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found
      </div>
    );

  // Check if any variant has a non-empty size after we confirm product exists
  const hasSizes = product.variants?.some((variant) => variant.size !== "");

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Image Gallery */}
        <div className="w-full">
          <ImageGallery
            images={product.imageUrls}
            price={product.price}
            promotionalPrice={product.promotionalPrice}
          />
        </div>

        {/* Right column - Product Info */}
        <div className="space-y-6 w-full max-w-[577px]">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-500">ID: {product.skuCode}</div>
            <WishlistButton
              isWishlisted={isWishlisted}
              onClick={() => setIsWishlisted(!isWishlisted)}
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold break-words">
              {product.name}
            </h1>
            <p className="text-gray-600 mt-2 break-words">
              {product.description}
            </p>
          </div>

          {/* Price Display */}
          <div>
            {product.price !== product.promotionalPrice ? (
              // Show promotional price with red background when there's a discount
              <>
                <div className="bg-[#FF000D] text-white px-4 py-2 inline-block">
                  <span className="font-[ui-sans-serif,system-ui,sans-serif] text-[40px] font-bold leading-[60px]">
                    THB {product.promotionalPrice}
                  </span>
                </div>
                <div className="mt-2">
                  From <span className="line-through">THB {product.price}</span>
                </div>
              </>
            ) : (
              // Show normal price without background when there's no discount
              <div className="inline-block">
                <span className="font-[ui-sans-serif,system-ui,sans-serif] text-[40px] font-bold leading-[60px] text-black">
                  THB {product.price}
                </span>
              </div>
            )}
          </div>

          {product.ratings && <Rating rating={product.ratings} />}
          {product.variants && product.variants.length > 0 && (
            <ColorSelector
              variants={product.variants}
              selectedColor={selectedColor}
              onColorSelect={handleColorSelect}
            />
          )}
          {hasSizes && (
            <SizeSelector
              variants={product.variants}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onSizeSelect={handleSizeSelect}
            />
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Qty.
            </label>
            {currentRemains > 0 ? (
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-sm px-4 py-2 w-32"
              >
                {[...Array(currentRemains)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500 text-sm">Out of stock</p>
            )}
          </div>
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || currentRemains === 0}
            className={`w-full h-[54px] rounded-sm ${
              !selectedVariant || currentRemains === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#15192C] hover:bg-[#1e2340]"
            } text-white`}
          >
            {currentRemains === 0 ? "Out of Stock" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        {product && <RelatedProducts currentProductId={product.id} />}
      </div>
    </div>
  );
};

export default ProductDetail;
