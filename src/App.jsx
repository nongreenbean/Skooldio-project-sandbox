<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
>>>>>>> Stashed changes
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
<<<<<<< Updated upstream
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="men" element={<MenPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="product/:permalink" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
=======
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Homepage */}
            <Route index element={<Home />} />

            {/* Main category routes */}
            <Route path="men" element={<CategoryLayout />} />
            <Route path="women" element={<CategoryLayout />} />
            <Route path="kids" element={<CategoryLayout />} />
            <Route path="shoes" element={<CategoryLayout />} />
            <Route path="accessories" element={<CategoryLayout />} />
            <Route path="product/:permalink" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />

            {/* Subcategory routes */}
            <Route
              path="category/:gender/:categoryId"
              element={<CategoryLayout />}
            />

            {/* Collection routes */}
            <Route
              path="collections/:collection"
              element={<CategoryLayout />}
            />

            {/* Add other routes as needed */}
          </Route>
        </Routes>
      </Router>
    </CartProvider>
>>>>>>> Stashed changes
  );
};

export default App;
