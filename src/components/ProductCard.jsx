import { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
          <h2 className="text-lg font-bold text-gray-900">{data.name}</h2>

          {/* Product description */}
          <p className="text-lg font-bold text-gray-900">{data.description}</p>

          {/* Star Ratings */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) =>
              index < data.rating ? (
                <StarIcon
                  key={index}
                  className="text-yellow-400"
                  fontSize="small"
                />
              ) : (
                <StarBorderIcon
                  key={index}
                  className="text-gray-300"
                  fontSize="small"
                />
              )
            )}
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
