import { useEffect, useState } from "react";
import { Heart, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar({ onMenu, onSearch, onWishlist, menuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const { ids } = useWishlist();
  const location = useLocation();
  const propertyMode =
    new URLSearchParams(location.search).get("mode") || "buy";
  const onPropertiesPage = location.pathname === "/properties";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link className="brand" to="/" aria-label="PJ home">
        <span>PJ</span>
        <i />
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link
          to="/properties?mode=buy"
          className={
            onPropertiesPage && propertyMode === "buy" ? "active" : undefined
          }
          aria-current={
            onPropertiesPage && propertyMode === "buy" ? "page" : undefined
          }
        >
          Buy
        </Link>
        <Link
          to="/properties?mode=rent"
          className={
            onPropertiesPage && propertyMode === "rent" ? "active" : undefined
          }
          aria-current={
            onPropertiesPage && propertyMode === "rent" ? "page" : undefined
          }
        >
          Rent
        </Link>
        <NavLink
          to="/developments"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Developments
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Contact
        </NavLink>
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button"
          type="button"
          onClick={onSearch}
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        <button
          className="icon-button wishlist-link"
          type="button"
          onClick={onWishlist}
          aria-label={`Wishlist${ids.length > 0 ? `, ${ids.length} saved` : ""}`}
        >
          <Heart size={18} />
          {ids.length > 0 && <b>{ids.length}</b>}
        </button>
        <Link className="nav-cta" to="/contact?viewing=1">
          Book a Viewing
        </Link>
        <button
          className="mobile-menu-button"
          type="button"
          onClick={onMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="pj-mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
