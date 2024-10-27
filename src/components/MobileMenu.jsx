import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const MobileMenu = ({ isOpen, onClose }) => {
  const [currentMenu, setCurrentMenu] = useState("main");
  const [previousMenu, setPreviousMenu] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("Menu");

  const navigateToMenu = (menuId, title) => {
    setPreviousMenu([...previousMenu, currentMenu]);
    setCurrentMenu(menuId);
    setCurrentTitle(title);
  };

  const navigateBack = () => {
    const previousMenus = [...previousMenu];
    const lastMenu = previousMenus.pop();
    setPreviousMenu(previousMenus);
    setCurrentMenu(lastMenu);
    setCurrentTitle(
      lastMenu === "main"
        ? "Menu"
        : lastMenu === "women"
        ? "Women"
        : lastMenu === "men"
        ? "Men"
        : "Menu"
    );
  };

  const renderMainMenu = () => (
    <div className="space-y-4">
      <Link
        to="/"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Home
      </Link>
      <div
        className="flex items-center justify-between px-4 py-2 hover:bg-[#C1CD00] cursor-pointer"
        onClick={() => navigateToMenu("men", "Men")}
      >
        <span>Men</span>
        <ChevronRightIcon className="h-5 w-5" />
      </div>
      <div
        className="flex items-center justify-between px-4 py-2 hover:bg-[#C1CD00] cursor-pointer"
        onClick={() => navigateToMenu("women", "Women")}
      >
        <span>Women</span>
        <ChevronRightIcon className="h-5 w-5" />
      </div>
    </div>
  );

  const renderWomenMenu = () => (
    <div className="space-y-4">
      <Link
        to="/women"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        All Women
      </Link>
      <Link
        to="/category/women/shoes"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Shoes
      </Link>
      <Link
        to="/category/women/shirts"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Shirts
      </Link>
      <Link
        to="/category/women/accessories"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Accessories
      </Link>
      <div className="mt-6">
        <h3 className="px-4 font-bold text-lg mb-4">Collections</h3>
        <Link
          to="/collections/new-arrivals"
          state={{ from: "women" }}
          className="block px-4 py-2 hover:bg-[#C1CD00]"
          onClick={onClose}
        >
          New Arrivals
        </Link>
        <Link
          to="/collections/price-down"
          state={{ from: "women" }}
          className="block px-4 py-2 hover:bg-[#C1CD00]"
          onClick={onClose}
        >
          Sale
        </Link>
      </div>
    </div>
  );

  const renderMenMenu = () => (
    <div className="space-y-4">
      <Link
        to="/men"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        All Men
      </Link>
      <Link
        to="/category/men/shoes"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Shoes
      </Link>
      <Link
        to="/category/men/shirts"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Shirts
      </Link>
      <Link
        to="/category/men/accessories"
        className="block px-4 py-2 hover:bg-[#C1CD00]"
        onClick={onClose}
      >
        Accessories
      </Link>
      <div className="mt-6">
        <h3 className="px-4 font-bold text-lg mb-4">Collections</h3>
        <Link
          to="/collections/new-arrivals"
          state={{ from: "men" }}
          className="block px-4 py-2 hover:bg-[#C1CD00]"
          onClick={onClose}
        >
          New Arrivals
        </Link>
        <Link
          to="/collections/price-down"
          state={{ from: "men" }}
          className="block px-4 py-2 hover:bg-[#C1CD00]"
          onClick={onClose}
        >
          Sale
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-white z-50 transform transition-transform duration-300 rounded-r-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {previousMenu.length > 0 && (
            <button
              onClick={navigateBack}
              className="flex items-center text-gray-600"
            >
              <ChevronLeftIcon className="h-6 w-6 mr-1" />
              Back
            </button>
          )}
          <span className="text-lg font-medium">{currentTitle}</span>
          <button onClick={onClose} className="text-gray-600">
            Close
          </button>
        </div>

        <div className="py-4">
          {currentMenu === "main" && renderMainMenu()}
          {currentMenu === "women" && renderWomenMenu()}
          {currentMenu === "men" && renderMenMenu()}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
