import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cartItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity, selectedColor, selectedSize) => {
    setItems((prevItems) => {
      const cartItemId = `${product.id}-${selectedColor}-${selectedSize}`;
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === cartItemId
      );

      // Create new cart item with complete product data
      const cartItem = {
        id: cartItemId,
        product: {
          ...product,
          colors: product.colors, // Store all available colors
          sizes: product.sizes, // Store all available sizes
        },
        quantity,
        selectedColor,
        selectedSize,
      };

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, cartItem];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateItemDetails = (itemId, newDetails) => {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === itemId) {
          const newItemId = `${item.product.id}-${newDetails.selectedColor}-${newDetails.selectedSize}`;
          return {
            ...item,
            id: newItemId,
            selectedColor: newDetails.selectedColor,
            selectedSize: newDetails.selectedSize,
          };
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
