import { useState, useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        const resp = await res.json();
        setProducts(resp.data);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((data) => (
        <div key={data.id} className="bg-white p-0 rounded-lg">
          {/* Product Image */}
          <img
            src={data.imageUrls[0]}
            alt={data.name}
            className="w-full h-370 object-cover object-center"
          />

          {/* Product Name */}
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>

          {/* Product description */}
          <p className="text-gray-600 text-sm mt-2">{data.description}</p>

          {/* Star Ratings */}
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, index) => (
              <StarRateIcon
                key={index}
                className={`h-5 w-5 ${
                  index < data.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Product Price */}
          <span className="mt-4 flex items-center justify-between text-lg font-semibold text-gray-800">
            THB {data.price}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;

// <div>
//   <h1>Product List</h1>
//   <ul className="flex flex-wrap gap-4">
//     {products.map((data) => (
//       <div className="font-bold bg-red-200" key={data.id}>
//         <li>{data.name}</li>
//       </div>
//     ))}
//   </ul>
// </div>
