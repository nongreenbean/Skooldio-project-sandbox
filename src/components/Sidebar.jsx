import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCategories } from "../context/CategoryContext";
import { useCollections } from "../context/CollectionContext";

const Sidebar = () => {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    collections,
    loading: collectionsLoading,
    error: collectionsError,
  } = useCollections();
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const location = useLocation();

  const currentPath = location.pathname;
  const isOnMenPage = currentPath.startsWith("/men");
  const isOnWomenPage = currentPath.startsWith("/women");

  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleCollections = () => setCollectionsOpen(!collectionsOpen);

  const getSubcategories = () => {
    if (isOnMenPage || isOnWomenPage) {
      const parentCategory = categories.find(
        (cat) =>
          (isOnMenPage &&
            cat.permalink.includes("men") &&
            cat.parentId === null) ||
          (isOnWomenPage &&
            cat.permalink.includes("ladies") &&
            cat.parentId === null)
      );
      if (parentCategory) {
        return categories.filter((cat) => cat.parentId === parentCategory.id);
      }
    }
    return categories.filter((cat) => cat.parentId === null);
  };

  const getCategoryLink = (category) => {
    const baseCategory = isOnWomenPage ? "women" : "men";

    if (category.permalink === "shoes") {
      return `/${baseCategory}/${baseCategory}-shoes`;
    }

    if (category.permalink.includes("shoes")) {
      return `/${baseCategory}/${category.permalink}`;
    }

    return `/${category.permalink}`;
  };

  const displayCategories = getSubcategories();

  return (
    <aside className="w-full md:w-64 bg-white p-4">
      <div className="mb-6">
        <button
          onClick={toggleCategories}
          className="flex items-center justify-between w-full text-lg font-semibold mb-4"
        >
          Categories
          {categoriesOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        {categoriesOpen && (
          <ul>
            {categoriesLoading && <li>Loading categories...</li>}
            {categoriesError && <li>Error: {categoriesError}</li>}
            {!categoriesLoading &&
              !categoriesError &&
              displayCategories.map((category) => (
                <li key={category.id} className="mb-2">
                  <Link
                    to={getCategoryLink(category)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>

      <div>
        <button
          onClick={toggleCollections}
          className="flex items-center justify-between w-full text-lg font-semibold mb-4"
        >
          Collections
          {collectionsOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        {collectionsOpen && (
          <ul>
            {collectionsLoading && <li>Loading collections...</li>}
            {collectionsError && <li>Error: {collectionsError}</li>}
            {!collectionsLoading &&
              !collectionsError &&
              collections.map((collection) => (
                <li key={collection.id} className="mb-2">
                  <Link
                    to={`/collections/${collection.permalink}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
