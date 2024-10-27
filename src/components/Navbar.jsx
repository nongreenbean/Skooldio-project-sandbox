import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Link to="/" className="font-bold text-xl">
                WDB
              </Link>
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-gray-600">
                Home
              </Link>
              <Link to="/men" className="hover:text-gray-600">
                Men
              </Link>
              <Link to="/women" className="hover:text-gray-600">
                Women
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button>
                <HeartIcon className="h-6 w-6" />
              </button>
              <button>
                <UserIcon className="h-6 w-6" />
              </button>
              <button>
                <ShoppingBagIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
