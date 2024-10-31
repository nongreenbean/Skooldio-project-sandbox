import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    collections: true,
  });

  const location = useLocation();

  const isWomenSection =
    location.pathname.includes("/women") ||
    location.state?.from === "women" ||
    location.pathname.includes("/category/women");

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/categories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredCategories =
          data?.data?.filter((cat) =>
            isWomenSection
              ? cat.name.toLowerCase().includes("women")
              : cat.name.toLowerCase().includes("men")
          ) || [];
        setCategories(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [isWomenSection]);

  const mainCategories = isWomenSection
    ? [
        { id: "all-women", name: "All Women", permalink: "women" },
        { id: "women-shoes", name: "Shoes", permalink: "shoes" },
        { id: "women-shirts", name: "Shirts", permalink: "shirts" },
        {
          id: "women-accessories",
          name: "Accessories",
          permalink: "accessories",
        },
      ]
    : [
        { id: "all-men", name: "All Men", permalink: "men" },
        { id: "men-shoes", name: "Shoes", permalink: "shoes" },
        { id: "men-shirts", name: "Shirts", permalink: "shirts" },
        {
          id: "men-accessories",
          name: "Accessories",
          permalink: "accessories",
        },
      ];

  const SidebarContent = () => (
    <div className="pt-8 p-4">
      {/* Categories Section */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="font-poppins font-bold text-[18px]">Categories</h3>
          {expandedSections.categories ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
        {expandedSections.categories && (
          <ul className="space-y-4">
            {mainCategories.map((category) => (
              <li key={category.id}>
                <Link
                  to={
                    category.permalink === "women" ||
                    category.permalink === "men"
                      ? `/${category.permalink}`
                      : `/category/${isWomenSection ? "women" : "men"}/${
                          category.permalink
                        }`
                  }
                  className="block text-gray-600 hover:bg-[#C1CD00] px-4 py-2 w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Collections Section */}
      <div className="mb-6">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection("collections")}
        >
          <h3 className="font-poppins font-bold text-[18px]">Collections</h3>
          {expandedSections.collections ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </div>
        {expandedSections.collections && (
          <ul className="space-y-4">
            <li>
              <Link
                to="/collections/new-arrivals"
                state={{ from: isWomenSection ? "women" : "men" }}
                className="block text-gray-600 hover:bg-[#C1CD00] px-4 py-2 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                to="/collections/price-down"
                state={{ from: isWomenSection ? "women" : "men" }}
                className="block text-gray-600 hover:bg-[#C1CD00] px-4 py-2 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sale
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <aside className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="p-4">
        <div className="text-red-500">{error}</div>
      </aside>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
