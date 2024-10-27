import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryPage from "./pages/CategoryPage";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="men" element={<MenPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route
            path="category/:gender/:categoryId"
            element={<CategoryPage />}
          />
          <Route path="product/:permalink" element={<ProductDetailPage />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
