import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu({ open, onClose }) {
  const links = [
    ["Buy", "/properties?mode=buy"],
    ["Rent", "/properties?mode=rent"],
    ["Developments", "/developments"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ];
  const closeButton = useRef(null);
  const menuPanel = useRef(null);
  const location = useLocation();
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
            className="mobile-menu-backdrop"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            ref={menuPanel}
            id="pj-mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="mobile-menu-head">
              <Link
                className="brand"
                to="/"
                onClick={onClose}
                aria-label="PJ home"
              >
                <span>PJ</span>
                <i />
              </Link>
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav aria-label="Primary navigation">
              {links.map(([label, href], index) => {
                const isPropertyMode = href.startsWith("/properties?");
                const isActive = isPropertyMode
                  ? onPropertiesPage &&
                    propertyMode ===
                      new URLSearchParams(href.split("?")[1]).get("mode")
                  : location.pathname === href;

                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.04 }}
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
            <Link
              className="button button-gold mobile-book"
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
