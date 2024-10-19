import { useState, useEffect } from "react";

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
        <div key={data.id} className="bg-white p-0 rounded-lg shadow-md">
          {/* Product Image */}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2FdBt7jOQ9qnKvs8aWrxb5%2F_images%2FtrWAP3Q0eBJTUjhmP683-Gemini%20Generated%20(8).jpeg?alt=media&token=cf7b47de-a656-4608-98a7-96a6b0cc7a2c"
            alt={data.name}
            className="w-full h-56 object-cover object-center"
          />

          {/* Product Name */}
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>

          {/* Product description */}
          <p className="text-gray-600 text-sm mt-2">{data.description}</p>

          {/* Star Ratings */}
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${
                  index < data.rating ? "text-yellow-500" : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.977 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.977-2.89a1 1 0 00-1.176 0l-3.977 2.89c-.784.57-1.84-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
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
