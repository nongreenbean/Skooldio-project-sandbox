import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CategoryLayout from "./components/CategoryLayout";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetailPage";

// import other components as needed

function App() {
  return (
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

          {/* Subcategory routes */}
          <Route
            path="category/:gender/:categoryId"
            element={<CategoryLayout />}
          />

          {/* Collection routes */}
          <Route path="collections/:collection" element={<CategoryLayout />} />

          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
