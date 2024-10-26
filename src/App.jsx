import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "./context/CategoryContext";
import { CollectionProvider } from "./context/CollectionContext";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./components/CategoryPage";
import CollectionPage from "./components/CollectionPage";
import ProductDetail from "./components/ProductDetails";
import KidsComingSoon from "./pages/KidsComingSoon";

const App = () => {
  return (
    <Router>
      <CategoryProvider>
        <CollectionProvider>
          <ProductProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/collections/:collectionSlug"
                  element={<CollectionPage />}
                />
                <Route path="/men" element={<CategoryPage />} />
                <Route path="/women" element={<CategoryPage />} />
                <Route path="/kids" element={<KidsComingSoon />} />
                <Route path="/men/men-shoes" element={<CategoryPage />} />
                <Route path="/women/women-shoes" element={<CategoryPage />} />
                <Route path="/men-shoes" element={<CategoryPage />} />
                <Route path="/women-shoes" element={<CategoryPage />} />
                <Route path="/shoes" element={<CategoryPage />} />
                <Route path="/accessories" element={<CategoryPage />} />
                <Route path="/:categorySlug" element={<CategoryPage />} />
                <Route path="/product/:permalink" element={<ProductDetail />} />
              </Routes>
              <Footer />
            </div>
          </ProductProvider>
        </CollectionProvider>
      </CategoryProvider>
    </Router>
  );
};

export default App;
