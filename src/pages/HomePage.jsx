import React from "react";
import { Link } from "react-router-dom";
import { useCollections } from "../context/CollectionContext";
import { useCategories } from "../context/CategoryContext";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

const HomePage = () => {
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useCollections();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  if (collectionsLoading || categoriesLoading) return <div>Loading...</div>;
  if (collectionsError || categoriesError)
    return <div>Error: {collectionsError || categoriesError}</div>;

  const featuredCollection =
    collections.find((c) => c.name === "2024 Collection") || collections[0];
  const featuredProducts = categories
    .flatMap((category) => category.products || [])
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Hero"
            className="w-full h-80 object-cover"
          />
        </div>

        {/* 2024 Collection */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold mb-4">2024 Collection</h2>
          <p className="mb-6 max-w-3xl">
            Step into a world of winter elegance and style with our latest
            Winter Collection. As temperatures drop, our curated selection of
            clothing is designed to keep you fashionably warm from autumn to
            winter. In our hand-setting collections, each piece in our
            collection is a celebration of seasonal sophistication. Explore the
            blend of comfort and fashion as we present you with the perfect
            wardrobe essentials for the cold months in the chilly months ahead.
            Welcome to a winter wardrobe that seamlessly combines coziness with
            chic aesthetics.
          </p>
          {featuredCollection && featuredCollection.items && (
            <div className="grid md:grid-cols-2 gap-6">
              {featuredCollection.items.slice(0, 2).map((item, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="mb-4">{item.description}</p>
                  <Link
                    to={`/collections/${featuredCollection.permalink}`}
                    className="text-blue-600 hover:underline"
                  >
                    View more
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  to={`/product/${product.permalink}`}
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) =>
                        i < Math.floor(product.ratings) ? (
                          <StarIconSolid
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                          />
                        ) : (
                          <StarIcon key={i} className="w-4 h-4 text-gray-300" />
                        )
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        THB {product.price.toLocaleString()}
                      </span>
                      {product.discount && (
                        <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No featured products available at the moment.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
