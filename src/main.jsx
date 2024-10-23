import React from "react";
import ReactDOM from "react-dom/client";
import { CategoryProvider } from "./context/CategoryContext";
import { CollectionProvider } from "./context/CollectionContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategoryProvider>
      <CollectionProvider>
        <App />
      </CollectionProvider>
    </CategoryProvider>
  </React.StrictMode>
);
