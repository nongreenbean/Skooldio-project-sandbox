import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">WDB</Link>
        <div>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kids">Kids</Link>
          <Link to="/shoes">Shoes</Link>
          <Link to="/accessories">Accessories</Link>
        </div>
      </div>
      <div>
        <button>Search</button>
        <button>Wishlist</button>
        <button>Account</button>
        <button>Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;
