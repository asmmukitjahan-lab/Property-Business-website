import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Menu, Search, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useWishlist } from "../../hooks/usePropertyStore";
import BrandLogo from "./BrandLogo";

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
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems = [
    {
      label: "Buy",
      to: "/properties?mode=buy",
      active: onPropertiesPage && propertyMode === "buy",
    },
    {
      label: "Rent",
      to: "/properties?mode=rent",
      active: onPropertiesPage && propertyMode === "rent",
    },
    { label: "Developments", to: "/developments", isNavLink: true },
    { label: "Locations", to: "/locations", isNavLink: true },
    { label: "About", to: "/about", isNavLink: true },
    { label: "Contact", to: "/contact", isNavLink: true },
  ];

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} [position:fixed] [z-index:50] [top:16px] [left:50%] [transform:translateX(-50%)] [width:min(1360px,_calc(100%_-_32px))] [height:68px] [padding:0_14px_0_22px] [display:grid] [grid-template-columns:minmax(90px,_1fr)_auto_minmax(0,_1fr)] [align-items:center] [gap:20px] [border:1px_solid_rgba(231,_235,_235,_0.14)] [border-radius:var(--radius-md)] [background:rgba(7,_23,_34,_0.62)] [backdrop-filter:blur(18px)_saturate(130%)] [-webkit-backdrop-filter:blur(18px)_saturate(130%)] [box-shadow:0_12px_32px_rgba(2,_10,_15,_0.16)] [transition:top_0.3s_ease,_height_0.3s_ease,_background-color_0.3s_ease,_border-color_0.3s_ease] [&.scrolled]:[top:10px] [&.scrolled]:[height:62px] [&.scrolled]:[background:rgba(7,_23,_34,_0.94)] [&.scrolled]:[border-color:var(--line-gold)] [@media(max-width:1100px)]:[grid-template-columns:auto_1fr] [@media(max-width:768px)]:[top:10px] [@media(max-width:768px)]:[width:calc(100%_-_20px)] [@media(max-width:768px)]:[height:58px] [@media(max-width:768px)]:[padding:0_10px_0_14px]`}>
      <BrandLogo />

      <nav className={"nav-links [display:flex] [align-items:center] [gap:clamp(18px,_2vw,_30px)] [&_a]:[position:relative] [&_a]:[padding:8px_0] [&_a]:[font-size:0.78rem] [&_a]:[font-weight:600] [&_a]:[letter-spacing:0.04em] [&_a]:[color:rgba(243,_240,_233,_0.82)] [&_a]:[transition:color_0.22s_ease] [&_a:hover]:[color:var(--gold-light)] [&_a.active]:[color:var(--gold-light)] [@media(max-width:1100px)]:[display:none]"} aria-label="Primary navigation">
        {navItems.map((item) =>
          item.isNavLink ? (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="pj-nav-indicator"
                      className={"nav-indicator [position:absolute] [left:0] [right:0] [bottom:0] [height:1px] [background:linear-gradient(90deg,_var(--gold),_var(--gold-light))]"}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              className={item.active ? "active" : undefined}
              aria-current={item.active ? "page" : undefined}
            >
              <span>{item.label}</span>
              {item.active && (
                <motion.span
                  layoutId="pj-nav-indicator"
                  className={"nav-indicator [position:absolute] [left:0] [right:0] [bottom:0] [height:1px] [background:linear-gradient(90deg,_var(--gold),_var(--gold-light))]"}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ),
        )}
      </nav>

      <div className={"nav-actions [justify-self:end] [display:flex] [align-items:center] [gap:6px]"}>
        <button
          className={"icon-button [width:40px] [height:40px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--ivory)] [display:inline-grid] [place-items:center] [transition:color_0.2s_ease,_background-color_0.2s_ease,_border-color_0.2s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[background:rgba(198,_166,_111,_0.09)]"}
          type="button"
          onClick={onSearch}
          aria-label="Open property search"
          title="Search properties (⌘K)"
        >
          <Search size={17} />
        </button>
        <button
          className={"icon-button wishlist-link [width:40px] [height:40px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--ivory)] [display:inline-grid] [place-items:center] [transition:color_0.2s_ease,_background-color_0.2s_ease,_border-color_0.2s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[background:rgba(198,_166,_111,_0.09)] [position:relative] [&_b]:[position:absolute] [&_b]:[top:3px] [&_b]:[right:3px] [&_b]:[min-width:16px] [&_b]:[height:16px] [&_b]:[padding:0_3px] [&_b]:[border-radius:999px] [&_b]:[background:var(--gold)] [&_b]:[color:var(--navy)] [&_b]:[font-size:0.6rem] [&_b]:[font-weight:700] [&_b]:[display:grid] [&_b]:[place-items:center]"}
          type="button"
          onClick={onWishlist}
          aria-label={`Saved wishlist${ids.length > 0 ? `, ${ids.length} properties` : ""}`}
        >
          <Heart size={17} />
          {ids.length > 0 && <b>{ids.length}</b>}
        </button>
        <Link className={"nav-cta [height:40px] [padding:0_16px] [margin-left:4px] [border-radius:var(--radius-sm)] [background:var(--gold)] [color:#0b1923] [display:inline-flex] [align-items:center] [font-size:0.68rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.1em] [white-space:nowrap] [transition:background-color_0.22s_ease,_transform_0.22s_ease] [&:hover]:[background:var(--gold-light)] [&:hover]:[transform:translateY(-1px)] [@media(max-width:1100px)]:[display:none]"} to="/contact?viewing=1">
          Book a Viewing
        </Link>
        <button
          className={"mobile-menu-button [width:40px] [height:40px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--ivory)] [display:none] [place-items:center] [transition:color_0.2s_ease,_background-color_0.2s_ease,_border-color_0.2s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[background:rgba(198,_166,_111,_0.09)] [@media(max-width:1100px)]:[display:inline-grid]"}
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
