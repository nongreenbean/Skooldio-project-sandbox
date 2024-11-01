import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentMenu, setCurrentMenu] = useState("main"); // main, men, women, kids, etc.
  const [menuHistory, setMenuHistory] = useState(["main"]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileMenuWidth = Math.min(windowWidth * 0.9, 900);

  const menuItems = {
    main: [
      { title: "Men", id: "men" },
      { title: "Women", id: "women" },
      { title: "Kids", id: "kids" },
      { title: "Shoes", id: "shoes" },
      { title: "Accessories", id: "accessories" },
    ],
    men: [
      { title: "All Men", id: "men" }, // Changed from all-men to men
      { title: "Shoes", id: "shoes" }, // Changed from mens-shoes
      { title: "Shirts", id: "shirts" }, // Changed from mens-shirts
      { title: "Accessories", id: "accessories" }, // Changed from mens-accessories
    ],
    women: [
      { title: "All Women", id: "women" }, // Changed from all-women to women
      { title: "Shoes", id: "shoes" }, // Changed from womens-shoes
      { title: "Shirts", id: "shirts" }, // Changed from womens-shirts
      { title: "Accessories", id: "accessories" }, // Changed from womens-accessories
    ],
  };

  const navigateToSubmenu = (menuId) => {
    setCurrentMenu(menuId);
    setMenuHistory((prev) => [...prev, menuId]);
  };

  const navigateBack = () => {
    if (menuHistory.length > 1) {
      const newHistory = [...menuHistory];
      newHistory.pop();
      setMenuHistory(newHistory);
      setCurrentMenu(newHistory[newHistory.length - 1]);
    }
  };

  const getCurrentMenuTitle = () => {
    switch (currentMenu) {
      case "main":
        return "Menu";
      case "mens-tops":
        return "Men's Tops";
      case "womens-tops":
        return "Women's Tops";
      default:
        return currentMenu.charAt(0).toUpperCase() + currentMenu.slice(1);
    }
  };

  const getLinkUrl = (item, parentCategory = null) => {
    if (["shoes", "kids", "accessories"].includes(item.id) && !parentCategory) {
      return `/${item.id}`;
    }
    if (item.title === "All Men") return "/men";
    if (item.title === "All Women") return "/women";
    return parentCategory
      ? `/category/${parentCategory}/${item.id}`
      : `/${item.id}`;
  };

  return (
    <div className="w-full bg-[#1A1A1A] relative z-50">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex w-full max-w-[1440px] h-[60px] mx-auto text-white px-4 justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="WDB Logo" className="h-[37px] w-[91px]" />
          </Link>
          <div className="flex gap-6">
            {menuItems.main.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  to={getLinkUrl(item)}
                  className={`${
                    activeLink === getLinkUrl(item)
                      ? "text-[#DEF81C]"
                      : "text-white"
                  } hover:text-gray-300 group`}
                  onClick={() => setActiveLink(getLinkUrl(item))}
                >
                  {item.title}
                </Link>
                {menuItems[item.id] && (
                  <div className="absolute hidden group-hover:block w-48 bg-white text-black shadow-lg rounded-md mt-2">
                    {menuItems[item.id].map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={getLinkUrl(subItem, item.id)}
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() =>
                          setActiveLink(getLinkUrl(subItem, item.id))
                        }
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-300">Search</button>
          <button className="hover:text-gray-300">Wishlist</button>
          <button className="hover:text-gray-300">Account</button>
          <Link to="/cart" className="hover:text-gray-300">
            Cart
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden w-full bg-[#1A1A1A]">
        <div className="flex justify-between items-center h-[60px] px-4">
          <div className="flex items-center gap-4">
            {" "}
            {/* Added flex container for hamburger and logo */}
            <button
              className="text-white z-50 relative"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setCurrentMenu("main");
                setMenuHistory(["main"]);
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="WDB Logo" className="h-[37px] w-[91px]" />
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            {/* Account Icon (using search icon as placeholder) */}
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>

            {/* Existing Cart Icon */}
            <Link to="/cart" className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Rest of the mobile menu code remains the same */}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full bg-white text-black transform transition-transform duration-300 ease-in-out z-50`}
          style={{
            width: `${mobileMenuWidth}px`,
            transform: isMenuOpen
              ? "translateX(0)"
              : `translateX(-${mobileMenuWidth}px)`,
          }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {menuHistory.length > 1 && (
              <button
                onClick={navigateBack}
                className="flex items-center text-gray-600"
              >
                <ChevronLeftIcon className="h-6 w-6 mr-2" />
                {/* Back */}
              </button>
            )}
            <span className="text-lg font-medium">{getCurrentMenuTitle()}</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600"
            >
              {/* <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> */}
            </button>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems[currentMenu]?.map((item) => (
              <div key={item.id} className="px-4">
                {item.title === "All Men" ? (
                  <Link
                    to="/men"
                    className="flex items-center justify-between w-full py-3 hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveLink("/men");
                    }}
                  >
                    <span>{item.title}</span>
                  </Link>
                ) : item.title === "All Women" ? (
                  <Link
                    to="/women"
                    className="flex items-center justify-between w-full py-3 hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveLink("/women");
                    }}
                  >
                    <span>{item.title}</span>
                  </Link>
                ) : menuItems[item.id] ? (
                  <button
                    onClick={() => navigateToSubmenu(item.id)}
                    className="flex items-center justify-between w-full py-3 hover:bg-gray-100"
                  >
                    <span>{item.title}</span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                ) : (
                  <Link
                    to={getLinkUrl(
                      item,
                      currentMenu !== "main" ? currentMenu : null
                    )}
                    className="block py-3 hover:bg-gray-100"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setActiveLink(
                        getLinkUrl(
                          item,
                          currentMenu !== "main" ? currentMenu : null
                        )
                      );
                    }}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {currentMenu === "main" && (
            <div className="border-t border-gray-200 mt-4">
              <div className="p-4 space-y-4">
                <button className="block w-full text-left py-3 hover:bg-gray-100">
                  Search
                </button>
                <button className="block w-full text-left py-3 hover:bg-gray-100">
                  Wishlist
                </button>
                <button className="block w-full text-left py-3 hover:bg-gray-100">
                  Account
                </button>
                <Link
                  to="/cart"
                  className="block w-full text-left py-3 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
          style={{ top: "60px" }}
        />
      )}
    </div>
  );
};

export default Navbar;
