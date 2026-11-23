import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Locations from "./pages/Locations";
import Developments from "./pages/Developments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useProperties } from "./components/context/PropertyContext";
import { useWishlist } from "./components/context/WishlistContext";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Navbar
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((open) => !open)}
        onSearch={() => setSearchOpen(true)}
        onWishlist={() => setWishlistOpen(true)}
      />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/developments" element={<Developments />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PolicyPage type="privacy" />} />
            <Route path="/terms" element={<PolicyPage type="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {wishlistOpen && (
        <WishlistDrawer onClose={() => setWishlistOpen(false)} />
      )}
    </>
  );
}

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("pj-recent-searches") || "[]",
      );
      return Array.isArray(saved)
        ? saved.filter((item) => typeof item === "string").slice(0, 4)
        : [];
    } catch {
      return [];
    }
  });
  const { properties } = useProperties();
  const normalizedQuery = query.toLowerCase();
  const results = properties.filter((item) =>
    [item.title, item.location, item.postcode]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery),
  );

  function choose(value) {
    const next = [value, ...recent.filter((item) => item !== value)].slice(
      0,
      4,
    );
    setRecent(next);
    localStorage.setItem("pj-recent-searches", JSON.stringify(next));
  }
  useEffect(() => {
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <motion.div
      className="search-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className="search-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Search properties"
        initial={{ y: -30, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
      >
        <div className="search-modal-input">
          <span aria-hidden="true">⌕</span>
          <input
            autoFocus
            aria-label="Search by location, property title or postcode"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by location, title or postcode"
          />
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
        {query ? (
          <div className="search-results">
            {results.length ? (
              results.map((item) => (
                <Link
                  key={item.id}
                  to={`/properties/${item.id}`}
                  onClick={() => {
                    choose(item.location);
                    onClose();
                  }}
                >
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.location}</span>
                  </div>
                  <b>
                    {item.rent
                      ? `£${item.price.toLocaleString()} pcm`
                      : `£${item.price.toLocaleString()}`}
                  </b>
                </Link>
              ))
            ) : (
              <p className="empty-state">No properties match your search.</p>
            )}
          </div>
        ) : (
          <div className="recent-searches">
            <span>Recent searches</span>
            {recent.length ? (
              recent.map((item) => (
                <button key={item} onClick={() => setQuery(item)}>
                  {item}
                </button>
              ))
            ) : (
              <p>Start typing to discover exceptional homes.</p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function Loader() {
  return (
    <motion.div
      className="site-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <span>PJ</span>
        <i />
      </motion.div>
      <div className="loader-line">
        <motion.i
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function WishlistDrawer({ onClose }) {
  const { ids, toggle } = useWishlist();
  const { properties } = useProperties();
  const saved = properties.filter((property) => ids.includes(property.id));

  useEffect(() => {
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <motion.div
      className="drawer-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.aside
        className="wishlist-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your wishlist"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 240 }}
      >
        <div className="wishlist-head">
          <div>
            <p className="eyebrow">PRIVATE COLLECTION</p>
            <h2>
              Your <em>Wishlist</em>
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close wishlist">
            ×
          </button>
        </div>
        {saved.length ? (
          <div className="wishlist-items">
            {saved.map((property) => (
              <article key={property.id}>
                <Link to={`/properties/${property.id}`} onClick={onClose}>
                  <img src={property.image} alt={property.title} />
                </Link>
                <div>
                  <Link to={`/properties/${property.id}`} onClick={onClose}>
                    <h3>{property.title}</h3>
                  </Link>
                  <p>{property.location}</p>
                  <strong>
                    {property.rent
                      ? `£${property.price.toLocaleString()} pcm`
                      : `£${property.price.toLocaleString()}`}
                  </strong>
                </div>
                <button
                  onClick={() => toggle(property.id)}
                  aria-label={`Remove ${property.title}`}
                >
                  ×
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <span>0</span>
            <h3>Your collection is empty</h3>
            <p>Save exceptional properties to revisit them here.</p>
            <Link
              className="button button-gold"
              to="/properties"
              onClick={onClose}
            >
              Explore Properties
            </Link>
          </div>
        )}
      </motion.aside>
    </motion.div>
  );
}

function PolicyPage({ type }) {
  const privacy = type === "privacy";
  useEffect(() => {
    document.title = `${privacy ? "Privacy Policy" : "Terms & Conditions"} | PJ`;
  }, [privacy]);
  return (
    <main className="inner-page policy-page">
      <header className="inner-hero">
        <p className="eyebrow">PJ PROPERTY</p>
        <h1>
          {privacy ? "Privacy" : "Terms"}{" "}
          <em>{privacy ? "Policy" : "& Conditions"}</em>
        </h1>
      </header>
      <article className="policy-content">
        {privacy ? (
          <>
            <h2>Information we collect</h2>
            <p>
              We collect details you voluntarily provide through property
              enquiries, viewing requests and newsletter forms. This may include
              your name, contact details and property preferences.
            </p>
            <h2>How we use information</h2>
            <p>
              Information is used to respond to enquiries, arrange viewings,
              provide requested market updates and improve the PJ experience.
              Demo submissions remain in this frontend unless connected to a
              secure backend.
            </p>
            <h2>Your choices</h2>
            <p>
              You may contact us to request correction or removal of personal
              information. Wishlist data is stored locally in your browser.
            </p>
          </>
        ) : (
          <>
            <h2>Website information</h2>
            <p>
              Property listings and figures displayed on this demonstration
              website are illustrative. Availability, pricing and specifications
              should be independently verified.
            </p>
            <h2>Property enquiries</h2>
            <p>
              Submitting an enquiry does not create a reservation or tenancy.
              Viewing requests and offers remain subject to confirmation and due
              diligence.
            </p>
            <h2>Financial estimates</h2>
            <p>
              Mortgage calculations are estimates for general guidance only and
              do not constitute financial advice.
            </p>
          </>
        )}
        <p className="policy-date">Last updated 24 November 2026</p>
      </article>
    </main>
  );
}
