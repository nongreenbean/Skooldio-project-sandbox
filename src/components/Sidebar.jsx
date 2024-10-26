import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  // State เก็บสถานะการเปิด/ปิดของแต่ละเมนู
  const [expandedMenus, setExpandedMenus] = useState({
    tops: true,
    bottoms: false,
    dresses: false,
    accessories: false,
    collections: false,
  });

  // ฟังก์ชันสำหรับ toggle เมนู
  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <aside>
      {/* Tops Menu */}
      <div>
        <div onClick={() => toggleMenu("tops")}>
          <h3>Tops</h3>
          <span>{expandedMenus.tops ? "−" : "+"}</span>
        </div>
        {expandedMenus.tops && (
          <ul>
            <li>
              <Link to="/women/tops/all">All Items</Link>
            </li>
            <li>
              <Link to="/women/tops/tshirts">T-Shirts</Link>
            </li>
            <li>
              <Link to="/women/tops/cardigans">Cardigans</Link>
            </li>
            <li>
              <Link to="/women/tops/knitwear">Knitwear & Sweaters</Link>
            </li>
            <li>
              <Link to="/women/tops/hoodies">Sweatshirts & Hoodies</Link>
            </li>
            <li>
              <Link to="/women/tops/fleece">Fleece</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Bottoms Menu */}
      <div>
        <div onClick={() => toggleMenu("bottoms")}>
          <h3>Bottoms</h3>
          <span>{expandedMenus.bottoms ? "−" : "+"}</span>
        </div>
        {expandedMenus.bottoms && (
          <ul>
            <li>
              <Link to="/women/bottoms/all">All Bottoms</Link>
            </li>
            <li>
              <Link to="/women/bottoms/pants">Pants</Link>
            </li>
            <li>
              <Link to="/women/bottoms/skirts">Skirts</Link>
            </li>
            <li>
              <Link to="/women/bottoms/shorts">Shorts</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Dress & Jumpsuits Menu */}
      <div>
        <div onClick={() => toggleMenu("dresses")}>
          <h3>Dress & Jumpsuits</h3>
          <span>{expandedMenus.dresses ? "−" : "+"}</span>
        </div>
        {expandedMenus.dresses && (
          <ul>
            <li>
              <Link to="/women/dresses/all">All Dresses</Link>
            </li>
            <li>
              <Link to="/women/dresses/casual">Casual Dresses</Link>
            </li>
            <li>
              <Link to="/women/dresses/formal">Formal Dresses</Link>
            </li>
            <li>
              <Link to="/women/dresses/jumpsuits">Jumpsuits</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Accessories Menu */}
      <div>
        <div onClick={() => toggleMenu("accessories")}>
          <h3>Accessories</h3>
          <span>{expandedMenus.accessories ? "−" : "+"}</span>
        </div>
        {expandedMenus.accessories && (
          <ul>
            <li>
              <Link to="/women/accessories/all">All Accessories</Link>
            </li>
            <li>
              <Link to="/women/accessories/bags">Bags</Link>
            </li>
            <li>
              <Link to="/women/accessories/jewelry">Jewelry</Link>
            </li>
            <li>
              <Link to="/women/accessories/belts">Belts</Link>
            </li>
          </ul>
        )}
      </div>

      {/* Collections Menu */}
      <div>
        <div onClick={() => toggleMenu("collections")}>
          <h3>Collections</h3>
          <span>{expandedMenus.collections ? "−" : "+"}</span>
        </div>
        {expandedMenus.collections && (
          <ul>
            <li>
              <Link to="/women/collections/new">New Arrivals</Link>
            </li>
            <li>
              <Link to="/women/collections/bestsellers">Best Sellers</Link>
            </li>
            <li>
              <Link to="/women/collections/sale">Sale</Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
