import React, { createContext, useContext, useState, useEffect } from "react";

const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        console.log("Fetching collections...");
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/collections"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        console.log("Collections fetched successfully:", data);
        setCollections(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  console.log("Current collections state:", collections);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  return (
    <CollectionContext.Provider value={{ collections, loading, error }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionProvider");
  }
  return context;
};
