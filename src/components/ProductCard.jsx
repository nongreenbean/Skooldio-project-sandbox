import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Star = ({ filled, half }) => {
  const getStarStyle = () => {
    if (filled) return "w-4 h-4 fill-yellow-400 text-yellow-400";
    if (half) return "w-4 h-4 fill-yellow-400 text-yellow-400";
    return "w-4 h-4 text-gray-300";
  };

  return (
    <svg
      className={getStarStyle()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {half ? (
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l0.007 15.748z" />
      ) : (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01L12 2z" />
      )}
    </svg>
  );
};

export default function ProductCard({ product }) {
  // แปลงราคาเป็นรูปแบบเงินบาทไทย
  const formatPrice = (amount) => {
    return `฿${amount.toLocaleString()}`;
  };

  // คำนวณเปอร์เซ็นต์ส่วนลด
  const getDiscountPercentage = () => {
    if (product.promotionalPrice && product.price > product.promotionalPrice) {
      return Math.round(
        ((product.price - product.promotionalPrice) / product.price) * 100
      );
    }
    return 0;
  };

  // สร้างดาวแสดงคะแนนรีวิว
  const renderRatingStars = () => {
    const rating = product.ratings || 0;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} filled={true} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} half={true} />);
      } else {
        stars.push(<Star key={i} filled={false} />);
      }
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.permalink}`}>
      <div className="relative max-w-sm rounded overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
          <img
            src={product.imageUrls?.[0] || "/api/placeholder/400/400"}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
          {getDiscountPercentage() > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
              - {getDiscountPercentage()}%
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col px-4 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-2 flex items-center gap-1">
            {renderRatingStars()}
            <span className="ml-1 text-sm text-gray-500">
              {product.ratings?.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-col items-end">
            {product.promotionalPrice &&
            product.promotionalPrice < product.price ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg font-medium text-red-500">
                  {formatPrice(product.promotionalPrice)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-medium text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

Star.propTypes = {
  filled: PropTypes.bool,
  half: PropTypes.bool,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    skuCode: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    promotionalPrice: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    collection: PropTypes.string,
    ratings: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
