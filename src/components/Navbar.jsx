import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  return (
    <div className="w-full bg-[#1A1A1A]">
      <nav className="w-full h-[60px] mx-auto text-white px-4 flex justify-between items-center">
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
          <button className="hover:text-gray-300">Cart</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
