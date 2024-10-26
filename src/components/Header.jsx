import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useCategories } from "../context/CategoryContext";

const Header = () => {
  const { categories, loading, error } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Men", permalink: "men" },
    { name: "Women", permalink: "women" },
    { name: "Kids", permalink: "kids" },
    { name: "Shoes", permalink: "shoes" },
    { name: "Accessories", permalink: "accessories" },
  ];

  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {
            // this controls the header stuff, at first it's in three, now it's two
            // try collapsing nav(line 32) and div(line 52)
          }
          <nav className="hidden md:block">
            <ul className="flex space-x-6 items-center">
              <Link to="/" className="text-2xl font-bold flex gap-2">
                <img src="/WDBLogo.png"></img>
                WDB
              </Link>
              {!loading &&
                !error &&
                navItems.map((item) => (
                  <li key={item.permalink}>
                    <Link
                      to={`/${item.permalink}`}
                      className=" hover:text-gray-400/75"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <MagnifyingGlassIcon className="w-6 h-6  cursor-pointer" />
            <HeartIcon className="w-6 h-6  cursor-pointer" />
            <UserIcon className="w-6 h-6  cursor-pointer" />
            <ShoppingBagIcon className="w-6 h-6  cursor-pointer" />
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <ul className="py-2">
            {!loading &&
              !error &&
              navItems.map((item) => (
                <li key={item.permalink}>
                  <Link
                    to={`/${item.permalink}`}
                    className="block px-4 py-2  hover:bg-gray-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
