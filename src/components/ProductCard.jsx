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
    <div className="grid grid-cols-3 gap-4">
      {products.map((data) => (
        <div key={data.id} className="min-w-sm bg-white">
          {/* Product Image */}
          <img
            src={data.imageUrls[0]}
            alt={data.name}
            className="w-full h-96 object-cover object-center mb-4"
          />

          {/* Product Name */}
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>

          {/* Product description */}
          <p className="text-gray-600 text-sm mt-2">{data.description}</p>

          {/* Star Ratings */}
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) =>
              index < data.ratings ? (
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
          <div className="mt-4 flex justify-end">
            <span className="text-lg font-semibold text-gray-900">
              THB {data.price}
            </span>
          </div>
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
