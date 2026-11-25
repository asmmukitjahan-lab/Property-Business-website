import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useWishlist } from "../../hooks/usePropertyStore";

const LINKS = [
  ["Buy", "/properties?mode=buy"],
  ["Rent", "/properties?mode=rent"],
  ["Developments", "/developments"],
  ["Locations", "/locations"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function MobileMenu({ open, onClose, onSearch, onWishlist }) {
  const closeButton = useRef(null);
  const menuPanel = useRef(null);
  const location = useLocation();
  const { ids } = useWishlist();
  const propertyMode =
    new URLSearchParams(location.search).get("mode") || "buy";
  const onPropertiesPage = location.pathname === "/properties";

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = menuPanel.current?.querySelectorAll(
        "a[href], button:not([disabled])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={"mobile-menu-backdrop [position:fixed] [z-index:79] [inset:0] [background:rgba(2,_10,_15,_0.72)] [backdrop-filter:blur(4px)]"}
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            ref={menuPanel}
            id="pj-mobile-menu"
            className={"mobile-menu [position:fixed] [z-index:80] [inset:0_0_0_auto] [width:min(420px,_100%)] [height:100dvh] [overflow-y:auto] [display:flex] [flex-direction:column] [padding:24px_26px] [border-left:1px_solid_var(--line-gold)] [background:radial-gradient(_ellipse_at_100%_0,_rgba(38,_67,_78,_0.38),_transparent_52%_),_rgba(7,_23,_34,_0.98)] [backdrop-filter:blur(22px)] [&_nav]:[margin:32px_0_24px] [&_nav_>_div]:[display:flex] [&_nav_>_div]:[align-items:center] [&_nav_>_div]:[border-bottom:1px_solid_var(--line)] [&_nav_span]:[width:38px] [&_nav_span]:[font-size:0.65rem] [&_nav_span]:[color:var(--gold)] [&_nav_span]:[letter-spacing:0.12em] [&_nav_a]:[flex:1] [&_nav_a]:[padding:13px_0] [&_nav_a]:[font-family:var(--font-display)] [&_nav_a]:[font-size:2.15rem] [&_nav_a]:[line-height:1.05] [&_nav_a]:[transition:color_0.2s_ease,_transform_0.2s_ease] [&_nav_a:hover]:[color:var(--gold-light)] [&_nav_a:hover]:[transform:translateX(4px)] [&_nav_a.active]:[color:var(--gold-light)] [&_nav_a.active]:[transform:translateX(4px)]"}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className={"mobile-menu-head [display:flex] [align-items:center] [justify-content:space-between] [&_>_button]:[width:40px] [&_>_button]:[height:40px] [&_>_button]:[border:1px_solid_var(--line)] [&_>_button]:[border-radius:var(--radius-sm)] [&_>_button]:[background:transparent] [&_>_button]:[color:var(--ivory)] [&_>_button]:[display:grid] [&_>_button]:[place-items:center]"}>
              <BrandLogo onClick={onClose} />
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav aria-label="Mobile navigation">
              {LINKS.map(([label, href], index) => {
                const isPropertyMode = href.startsWith("/properties?");
                const isActive = isPropertyMode
                  ? onPropertiesPage &&
                    propertyMode ===
                      new URLSearchParams(href.split("?")[1]).get("mode")
                  : location.pathname === href;

                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.04 }}
                  >
                    <span>0{index + 1}</span>
                    <Link
                      to={href}
                      onClick={onClose}
                      className={isActive ? "active" : undefined}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className={"mobile-menu-utilities [display:grid] [grid-template-columns:1fr_1fr] [gap:10px] [margin-bottom:12px]"}>
              <button
                type="button"
                className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"}
                onClick={() => {
                  onClose();
                  onSearch();
                }}
              >
                <Search size={16} /> Search
              </button>
              <button
                type="button"
                className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"}
                onClick={() => {
                  onClose();
                  onWishlist();
                }}
              >
                <Heart size={16} /> Saved ({ids.length})
              </button>
            </div>

            <Link
              className={"button button-gold mobile-book [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)] [width:100%] [margin-top:auto]"}
              to="/contact?viewing=1"
              onClick={onClose}
            >
              Book a Viewing
            </Link>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
