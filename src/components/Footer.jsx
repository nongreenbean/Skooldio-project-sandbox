import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/men" className="text-gray-300 hover:text-white">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-gray-300 hover:text-white">
                  Ladies
                </Link>
              </li>
              <li>
                <Link to="/shoes" className="text-gray-300 hover:text-white">
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/accessories"
                  className="text-gray-300 hover:text-white"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Registration Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Register with us</h3>
            <p className="text-gray-300 mb-4">
              Sign up now and get 20% off your first purchase!
            </p>
            <button className="bg-[#C1CD00] hover:bg-[#bfcd00c1] text-black font-semibold py-2 px-4 rounded">
              Sign up now
            </button>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer services</h3>
            <address className="text-gray-300 not-italic mb-4">
              MBK Tower 30th Floor, 444 Phaya Thai Rd,
              <br />
              Wang Mai, Pathum Wan, Bangkok 10330
            </address>
            <p className="text-gray-300 mb-4">Email: jane.doe@realmail.com</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
              <button className="bg-[#C1CD00] hover:bg-[#bfcd00c1] text-black font-semibold py-2 px-4 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 All rights reserved by WDB.</p>
          <p className="mt-2">Powered by Skooldio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
