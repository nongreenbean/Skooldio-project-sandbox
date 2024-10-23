import PropTypes from "prop-types";
import { Star, StarHalf } from "lucide-react";

const ProductCard = ({
  imageUrl,
  title,
  description,
  price,
  rating,
  promotionalPrice,
  categories,
}) => {
  // แปลงราคาเป็นรูปแบบเงินบาทไทย
  const formatPrice = (amount) => {
    return `฿${amount.toLocaleString()}`;
  };

  // คำนวณเปอร์เซ็นต์ส่วนลด
  const getDiscountPercentage = () => {
    if (promotionalPrice && price > promotionalPrice) {
      return Math.round(((price - promotionalPrice) / price) * 100);
    }
    return 0;
  };

  // สร้างดาวแสดงคะแนนรีวิว
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating); // ดาวเต็ม
    const hasHalfStar = rating % 1 >= 0.5; // เช็คว่ามีครึ่งดาวหรือไม่

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // ดาวเต็ม
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        // ครึ่งดาว
        stars.push(
          <StarHalf
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        // ดาวเปล่า
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="relative max-w-sm rounded overflow-hidden  bg-white hover:shadow-xl transition-shadow duration-300">
      {/* ส่วนแสดงรูปภาพ */}
      <div className="aspect-square w-full overflow-hidden  bg-gray-100 relative">
        <img
          src={imageUrl?.[0] || "/api/placeholder/400/400"}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        {/* แสดงป้ายส่วนลด (ถ้ามี) */}
        {getDiscountPercentage() > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
            ลด {getDiscountPercentage()}%
          </div>
        )}
      </div>

      {/* ส่วนแสดงรายละเอียดสินค้า */}
      <div className="mt-4 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>

        {/* แสดงคะแนนรีวิว */}
        <div className="mt-2 flex items-center gap-1">
          {renderRatingStars()}
          <span className="ml-1 text-sm text-gray-500">
            {rating?.toFixed(1)}
          </span>
        </div>

        {/* แสดงราคา */}
        <div className="flex flex-col items-end">
          {promotionalPrice && promotionalPrice < price ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </span>
              <span className="text-lg font-medium text-red-500">
                {formatPrice(promotionalPrice)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-medium text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  currency: PropTypes.string,
  promotionalPrice: PropTypes.number,
};

export default ProductCard;
