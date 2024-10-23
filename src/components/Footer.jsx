import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured product</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/men" className="hover:text-gray-300">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-gray-300">
                Ladies
              </Link>
            </li>
            <li>
              <Link to="/men-shoes" className="hover:text-gray-300">
                Shoes
              </Link>
            </li>
            <li>
              <Link to="/men-accessories" className="hover:text-gray-300">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Register with us</h2>
          <p className="mb-4">
            Sign up now and get 20% off your first purchase!
          </p>
          <button className="bg-white text-gray-900 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition-colors">
            Sign up now
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Customer services</h2>
          <p className="mb-2">
            MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
            Bangkok 10330
          </p>
          <p className="mb-4">Email: jane.doe@realmail.com</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-l text-gray-900"
            />
            <button className="bg-lime-400 text-gray-900 px-4 py-2 rounded-r hover:bg-lime-500 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 md:mb-0">
          Copyright © 2024 All rights reserved for all contents.
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Powered by</span>
          <img src="/path-to-shopify-logo.png" alt="Shopify" className="h-6" />
          <img src="/path-to-wdb-logo.png" alt="WDB" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
