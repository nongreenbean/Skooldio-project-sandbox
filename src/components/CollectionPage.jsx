import React from "react";
import { useParams } from "react-router-dom";
import { useCollections } from "../context/CollectionContext";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const CollectionPage = () => {
  const { collectionSlug } = useParams();
  const { collections, loading, error } = useCollections();

  if (loading) {
    return <div>Loading collection...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Find the "Price Down" collection or use the first collection as default
  const defaultCollection =
    collections.find((col) => col.name === "Price Down") || collections[0];
  const collection =
    collections.find((col) => col.permalink === collectionSlug) ||
    defaultCollection;

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{collection.name}</h1>
          <p className="mb-8">{collection.description}</p>
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 md:ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage;
