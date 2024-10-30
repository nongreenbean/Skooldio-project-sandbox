import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#1A1A1A]">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex w-full max-w-[1440px] h-[60px] mx-auto text-white px-4 justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="WDB Logo" className="h-[37px] w-[91px]" />
          </Link>
          <div className="flex gap-6">
            <Link
              to="/men"
              className={`${
                activeLink === "/men" ? "text-[#DEF81C]" : "text-white"
              } hover:text-gray-300`}
              onClick={() => setActiveLink("/men")}
            >
              Men
            </Link>
            <Link
              to="/women"
              className={`${
                activeLink === "/women" ? "text-[#DEF81C]" : "text-white"
              } hover:text-gray-300`}
              onClick={() => setActiveLink("/women")}
            >
              Women
            </Link>
            <Link
              to="/kids"
              className={`${
                activeLink === "/kids" ? "text-[#DEF81C]" : "text-white"
              } hover:text-gray-300`}
              onClick={() => setActiveLink("/kids")}
            >
              Kids
            </Link>
            <Link
              to="/shoes"
              className={`${
                activeLink === "/shoes" ? "text-[#DEF81C]" : "text-white"
              } hover:text-gray-300`}
              onClick={() => setActiveLink("/shoes")}
            >
              Shoes
            </Link>
            <Link
              to="/accessories"
              className={`${
                activeLink === "/accessories" ? "text-[#DEF81C]" : "text-white"
              } hover:text-gray-300`}
              onClick={() => setActiveLink("/accessories")}
            >
              Accessories
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-300">Search</button>
          <button className="hover:text-gray-300">Wishlist</button>
          <button className="hover:text-gray-300">Account</button>
          <Link to="/cart" className="hover:text-gray-300">
            Cart
          </Link>{" "}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden w-full">
        <div className="flex justify-between items-center h-[60px] px-4">
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* Hamburger Icon */}
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

          <Link to="/cart" className="text-white">
            {/* Cart Icon */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="bg-[#1A1A1A] text-white px-4 py-2">
            <div className="flex flex-col gap-4">
              <Link
                to="/men"
                className={`${
                  activeLink === "/men" ? "text-[#DEF81C]" : "text-white"
                } py-2`}
                onClick={() => {
                  setActiveLink("/men");
                  setIsMenuOpen(false);
                }}
              >
                Men
              </Link>
              <Link
                to="/women"
                className={`${
                  activeLink === "/women" ? "text-[#DEF81C]" : "text-white"
                } py-2`}
                onClick={() => {
                  setActiveLink("/women");
                  setIsMenuOpen(false);
                }}
              >
                Women
              </Link>
              <Link
                to="/kids"
                className={`${
                  activeLink === "/kids" ? "text-[#DEF81C]" : "text-white"
                } py-2`}
                onClick={() => {
                  setActiveLink("/kids");
                  setIsMenuOpen(false);
                }}
              >
                Kids
              </Link>
              <Link
                to="/shoes"
                className={`${
                  activeLink === "/shoes" ? "text-[#DEF81C]" : "text-white"
                } py-2`}
                onClick={() => {
                  setActiveLink("/shoes");
                  setIsMenuOpen(false);
                }}
              >
                Shoes
              </Link>
              <Link
                to="/accessories"
                className={`${
                  activeLink === "/accessories"
                    ? "text-[#DEF81C]"
                    : "text-white"
                } py-2`}
                onClick={() => {
                  setActiveLink("/accessories");
                  setIsMenuOpen(false);
                }}
              >
                Accessories
              </Link>
              <div className="border-t border-gray-700 pt-4 flex flex-col gap-4">
                <button className="text-left py-2">Search</button>
                <button className="text-left py-2">Wishlist</button>
                <button className="text-left py-2">Account</button>
                <button className="text-left py-2">Cart</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
