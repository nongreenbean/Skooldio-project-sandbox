import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permalink, setPermalink] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      if (!permalink) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching product with permalink:", permalink);
        const response = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
        );
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (!isMounted) return;

        if (data && data.data) {
          console.log("Setting product:", data.data);
          setProduct(data.data);
        } else {
          throw new Error("Product data not found in response");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        if (isMounted) {
          setError(err.message);
          setProduct(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (permalink) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [permalink]);

  const fetchProductByPermalink = (newPermalink) => {
    if (newPermalink !== permalink) {
      setProduct(null);
      setError(null);
      setPermalink(newPermalink);
    }
  };

  return (
    <ProductContext.Provider
      value={{ product, loading, error, fetchProductByPermalink }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
