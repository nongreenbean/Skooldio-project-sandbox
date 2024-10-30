import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

// Simplified ImageGallery Component
const ImageGallery = ({ images, price, promotionalPrice }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const discountPercentage = useMemo(() => {
    if (!price || !promotionalPrice) return null;
    return Math.round(((price - promotionalPrice) / price) * 100);
  }, [price, promotionalPrice]);

  if (!images?.length) {
    return (
      <div className="w-full max-w-[576px] h-auto aspect-[576/597] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        No image available
      </div>
    );
  }

  const navigate = (direction) => {
    setMainImageIndex((prev) =>
      direction === "next"
        ? prev === images.length - 1
          ? 0
          : prev + 1
        : prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  return (
    <div className="space-y-3">
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
        {["prev", "next"].map((direction) => (
          <button
            key={direction}
            onClick={() => navigate(direction)}
            className={`absolute ${
              direction === "prev" ? "left-4" : "right-4"
            } top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 px-[15px] py-2 rounded-full`}
          >
            {direction === "prev" ? "<" : ">"}
          </button>
        ))}
      </div>
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

// Simplified ColorSelector Component
const ColorSelector = ({ variants, selectedColor, onColorSelect }) => {
  if (!variants?.length) return null;

  const uniqueColors = [...new Set(variants.map((v) => v.color))].map((color) =>
    variants.find((v) => v.color === color)
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Color</label>
      <div className="flex space-x-4">
        {uniqueColors.map(({ color, colorCode }) => (
          <div key={color} className="flex flex-col items-center space-y-1">
            <button
              onClick={() => onColorSelect(color)}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""
              }`}
              style={{ backgroundColor: colorCode }}
            />
            <span className="text-xs text-gray-600">{color}</span>
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

// Simplified Rating Component
const Rating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className="text-2xl"
        style={{
          color:
            i < Math.floor(rating) ||
            (i === Math.floor(rating) && rating % 1 >= 0.5)
              ? "#DEF81C"
              : "#d1d5db",
        }}
      >
        ★
      </span>
    ))}
    {Number.isInteger(rating) && (
      <span className="ml-2 text-gray-600">({rating})</span>
    )}
  </div>
);

// RelatedProducts Component
const RelatedProducts = ({ currentProductId, currentCategories }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products/"
        );
        const data = await response.json();

        const related = data.data.filter(
          (product) =>
            product.id !== currentProductId &&
            product.categories.some((category) =>
              currentCategories.includes(category)
            )
        );

        const shuffled = related.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (currentCategories?.length) {
      fetchRelatedProducts();
    }
  }, [currentProductId, currentCategories]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-16 px-[1px]">
      <h2 className="text-2xl font-bold mb-8 font-poppins">
        People also like these
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.permalink}`}
            className="group"
          >
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.price !== product.promotionalPrice && (
                <div className="absolute top-0 right-0 bg-[#EF4444] text-white px-4 py-2 text-sm font-medium z-10">
                  -
                  {Math.round(
                    ((product.price - product.promotionalPrice) /
                      product.price) *
                      100
                  )}
                  %
                </div>
              )}
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center mb-2">
                {product.ratings && <Rating rating={product.ratings} />}
              </div>
              <div className="text-right">
                {product.price !== product.promotionalPrice ? (
                  <>
                    <p className="text-sm line-through text-gray-500">
                      THB {product.price.toLocaleString()}
                    </p>
                    <p className="text-lg font-bold text-[#FF000D]">
                      THB {product.promotionalPrice.toLocaleString()}
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-bold">
                    THB {product.price.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Simplified WishlistButton Component
const WishlistButton = ({ isWishlisted, onClick }) => (
  <button
    onClick={onClick}
    className={`transition-colors ${
      isWishlisted
        ? "text-red-500 hover:text-red-600"
        : "text-gray-400 hover:text-red-500"
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      {...(isWishlisted
        ? { fill: "currentColor" }
        : { fill: "none", stroke: "currentColor", strokeWidth: 1.5 })}
    >
      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  </button>
);

// CartNotification Component
const CartNotification = ({
  product,
  quantity,
  selectedColor,
  selectedSize,
  onClose,
}) => {
  const navigate = useNavigate();
  const unitPrice = product.promotionalPrice || product.price;
  const totalPrice = unitPrice * quantity;

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Items added to your cart</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="w-32 h-32 object-cover"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <div className="text-gray-600 space-y-1">
                <p>QTY : {quantity}</p>
                {selectedColor && <p>Color : {selectedColor}</p>}
                {selectedSize && <p>Size : {selectedSize}</p>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">
              THB {totalPrice.toLocaleString()}
            </div>
            {quantity > 1 && (
              <div className="text-sm text-gray-500">
                (THB {unitPrice.toLocaleString()} × {quantity})
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 border border-black text-center"
          >
            Continue shopping
          </button>
          <button
            onClick={handleViewCart}
            className="w-full py-3 bg-[#15192C] text-white text-center"
          >
            View cart
          </button>
        </div>
      </div>
    </div>
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
  const [showCartNotification, setShowCartNotification] = useState(false);
  const { addToCart } = useCart();

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
    // Log the product data before adding to cart
    console.log("Product before adding to cart:", {
      product,
      colors: product.colors,
      sizes: product.sizes,
    });

    addToCart(product, quantity, selectedColor, selectedSize);
    setShowCartNotification(true);
  };

  if (showCartNotification) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-[124px] py-8">
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
                <div className="text-sm text-gray-500">
                  ID: {product.skuCode}
                </div>
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
                      From{" "}
                      <span className="line-through">THB {product.price}</span>
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
            {product && (
              <RelatedProducts
                currentProductId={product.id}
                currentCategories={product.categories}
              />
            )}
          </div>
        </div>
        <CartNotification
          product={product}
          quantity={quantity}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onClose={() => setShowCartNotification(false)}
        />
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-[124px] py-8">
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
        {product && (
          <RelatedProducts
            currentProductId={product.id}
            currentCategories={product.categories}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
