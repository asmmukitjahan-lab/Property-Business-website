import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Search, Trash2, X } from "lucide-react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileMenu from "./components/layout/MobileMenu";
import BrandLogo from "./components/layout/BrandLogo";
import Home from "./pages/Home";
import { useProperties, useWishlist } from "./hooks/usePropertyStore";
import { formatPrice } from "./utils/format";

const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const Locations = lazy(() => import("./pages/Locations"));
const Developments = lazy(() => import("./pages/Developments"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = window.setTimeout(
      () => setLoading(false),
      prefersReduced ? 120 : 750,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Navbar
        menuOpen={menuOpen}
        onMenu={() => setMenuOpen((open) => !open)}
        onSearch={() => setSearchOpen(true)}
        onWishlist={() => setWishlistOpen(true)}
      />
      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        onSearch={() => setSearchOpen(true)}
        onWishlist={() => setWishlistOpen(true)}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className={"inner-page [min-height:70vh] [padding-top:124px]"} aria-busy="true" />}>
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
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {wishlistOpen && (
          <WishlistDrawer onClose={() => setWishlistOpen(false)} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

const POPULAR_CITIES = ["London", "Surrey", "Edinburgh", "Manchester", "Brighton"];

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
  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? properties.filter((item) =>
        [item.title, item.location, item.city, item.postcode, item.type]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : [];

  function saveSearch(value) {
    const next = [value, ...recent.filter((item) => item !== value)].slice(
      0,
      4,
    );
    setRecent(next);
    try {
      localStorage.setItem("pj-recent-searches", JSON.stringify(next));
    } catch {
      // Ignore storage errors
    }
  }

  function clearRecent() {
    setRecent([]);
    try {
      localStorage.removeItem("pj-recent-searches");
    } catch {
      // Ignore storage errors
    }
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [onClose]);

  return (
    <motion.div
      className={"search-modal-backdrop [position:fixed] [z-index:100] [inset:0] [background:rgba(4,_13,_19,_0.8)] [backdrop-filter:blur(12px)] [display:grid] [justify-items:center] [align-items:start] [padding:96px_16px_24px]"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className={"search-modal [width:min(720px,_100%)] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:var(--surface)] [overflow:hidden] [box-shadow:var(--shadow-soft)]"}
        role="dialog"
        aria-modal="true"
        aria-label="Search properties"
        initial={{ y: -24, scale: 0.98, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -16, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={"search-modal-input [height:66px] [display:flex] [align-items:center] [border-bottom:1px_solid_var(--line)] [&_span]:[padding:0_16px_0_20px] [&_span]:[color:var(--gold)] [&_span]:[display:inline-flex] [&_input]:[flex:1] [&_input]:[min-width:0] [&_input]:[height:100%] [&_input]:[border:0] [&_input]:[background:transparent] [&_input]:[color:var(--ivory)] [&_input]:[font-size:0.92rem] [&_input]:[outline:0] [&_button]:[height:100%] [&_button]:[padding:0_16px] [&_button]:[border:0] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.75rem]"}>
          <span aria-hidden="true">
            <Search size={18} />
          </span>
          <input
            autoFocus
            aria-label="Search by location, property title, type or postcode"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by London postcode, city, residence or type..."
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search text"
            >
              Clear
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        {normalizedQuery ? (
          <div className={"search-results [max-height:390px] [overflow-y:auto] [padding:10px] [&_>_a]:[display:grid] [&_>_a]:[grid-template-columns:74px_1fr_auto] [&_>_a]:[align-items:center] [&_>_a]:[gap:14px] [&_>_a]:[padding:8px_10px] [&_>_a]:[border-radius:var(--radius-sm)] [&_>_a]:[transition:background-color_0.2s_ease] [&_>_a:hover]:[background:rgba(198,_166,_111,_0.08)] [&_img]:[height:54px] [&_img]:[border-radius:3px] [&_img]:[object-fit:cover] [&_div]:[display:flex] [&_div]:[flex-direction:column] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:1.2rem] [&_span]:[font-size:0.74rem] [&_span]:[color:var(--muted)] [&_b]:[font-family:var(--font-display)] [&_b]:[color:var(--gold-light)]"}>
            {results.length ? (
              results.map((item) => (
                <Link
                  key={item.id}
                  to={`/properties/${item.id}`}
                  onClick={() => {
                    saveSearch(item.city || item.location);
                    onClose();
                  }}
                >
                  <img src={item.image} alt={item.title} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>
                      {item.location} · {item.bedrooms} Bed · {item.type}
                    </span>
                  </div>
                  <b>{formatPrice(item.price, item.rent)}</b>
                </Link>
              ))
            ) : (
              <div className={"empty-state [text-align:center] [padding:64px_20px] [color:var(--muted)] [&_svg]:[color:var(--gold)] [&_svg]:[margin:0_auto_12px] [&_h3]:[font-size:1.85rem] [&_h3]:[color:var(--ivory)] [&_h3]:[margin-bottom:8px]"}>
                <p>No properties match “{query}”.</p>
                <Link
                  to="/properties"
                  className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"}
                  onClick={onClose}
                >
                  Browse Full Collection
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className={"recent-searches [padding:20px]"}>
            <div className={"search-section-head [display:flex] [align-items:center] [justify-content:space-between] [margin-bottom:10px] [&_span]:[font-size:0.64rem] [&_span]:[font-weight:700] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:0.14em] [&_span]:[color:var(--gold)]"}>
              <span>Prime UK Locations</span>
            </div>
            <div className={"search-chips [display:flex] [flex-wrap:wrap] [gap:8px] [margin-bottom:18px] [&:last-child]:[margin-bottom:0] [&_button]:[height:34px] [&_button]:[padding:0_13px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--ivory)] [&_button]:[font-size:0.78rem] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[color:var(--gold-light)]"}>
              {POPULAR_CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setQuery(city)}
                >
                  {city}
                </button>
              ))}
            </div>

            {recent.length > 0 && (
              <>
                <div className={"search-section-head [display:flex] [align-items:center] [justify-content:space-between] [margin-bottom:10px] [&_span]:[font-size:0.64rem] [&_span]:[font-weight:700] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:0.14em] [&_span]:[color:var(--gold)]"}>
                  <span>Recent searches</span>
                  <button
                    type="button"
                    className={"search-clear-recent [border:0] [background:transparent] [color:var(--muted)] [font-size:0.72rem]"}
                    onClick={clearRecent}
                  >
                    Clear
                  </button>
                </div>
                <div className={"search-chips [display:flex] [flex-wrap:wrap] [gap:8px] [margin-bottom:18px] [&:last-child]:[margin-bottom:0] [&_button]:[height:34px] [&_button]:[padding:0_13px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--ivory)] [&_button]:[font-size:0.78rem] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[color:var(--gold-light)]"}>
                  {recent.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setQuery(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </>
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
      className={"site-loader [position:fixed] [z-index:200] [inset:0] [background:var(--navy-deep)] [display:grid] [place-content:center] [justify-items:center] [gap:18px]"}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BrandLogo size="lg" />
      </motion.div>
      <div className={"loader-line [width:136px] [height:1px] [background:rgba(255,_255,_255,_0.14)] [overflow:hidden] [&_i]:[display:block] [&_i]:[width:100%] [&_i]:[height:100%] [&_i]:[background:var(--gold)] [&_i]:[transform-origin:left]"}>
        <motion.i
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function WishlistDrawer({ onClose }) {
  const { ids, toggle, clear } = useWishlist();
  const { properties } = useProperties();
  const saved = properties.filter((property) => ids.includes(property.id));

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [onClose]);

  return (
    <motion.div
      className={"drawer-backdrop [position:fixed] [z-index:100] [inset:0] [background:rgba(4,_13,_19,_0.8)] [backdrop-filter:blur(12px)]"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.aside
        className={"wishlist-drawer [position:absolute] [right:0] [top:0] [bottom:0] [width:min(460px,_100%)] [display:flex] [flex-direction:column] [padding:32px_28px] [border-left:1px_solid_var(--line-gold)] [background:var(--navy)] [overflow-y:auto]"}
        role="dialog"
        aria-modal="true"
        aria-label="Your saved wishlist"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 240 }}
      >
        <div className={"wishlist-head [display:flex] [justify-content:space-between] [align-items:flex-start] [padding-bottom:20px] [border-bottom:1px_solid_var(--line)] [&_h2]:[font-size:2.5rem] [&_h2]:[margin:0] [&_button]:[width:38px] [&_button]:[height:38px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--ivory)] [&_button]:[display:grid] [&_button]:[place-items:center]"}>
          <div>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PRIVATE COLLECTION</p>
            <h2>
              Your <em>Wishlist</em>
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>
        {saved.length ? (
          <>
            <div className={"wishlist-items [flex:1] [padding-top:14px] [&_article]:[display:grid] [&_article]:[grid-template-columns:96px_1fr_30px] [&_article]:[gap:14px] [&_article]:[align-items:center] [&_article]:[padding:12px] [&_article]:[margin-bottom:10px] [&_article]:[border:1px_solid_var(--line)] [&_article]:[border-radius:var(--radius-sm)] [&_article]:[background:rgba(255,_255,_255,_0.02)] [&_article_img]:[height:76px] [&_article_img]:[border-radius:3px] [&_article_img]:[object-fit:cover] [&_h3]:[font-size:1.25rem] [&_h3]:[margin:0_0_2px] [&_p]:[font-size:0.74rem] [&_p]:[color:var(--muted)] [&_p]:[margin:0_0_4px] [&_strong]:[font-family:var(--font-display)] [&_strong]:[color:var(--gold-light)] [&_article_>_button]:[border:0] [&_article_>_button]:[background:transparent] [&_article_>_button]:[color:var(--muted)] [&_article_>_button]:[display:grid] [&_article_>_button]:[place-items:center]"}>
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
                    <strong>{formatPrice(property.price, property.rent)}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(property.id)}
                    aria-label={`Remove ${property.title}`}
                  >
                    <X size={16} />
                  </button>
                </article>
              ))}
            </div>
            <div className={"wishlist-footer [padding-top:18px] [border-top:1px_solid_var(--line)] [display:grid] [gap:10px]"}>
              <Link
                className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                to="/contact?viewing=1"
                onClick={onClose}
              >
                Arrange Private Viewings
              </Link>
              <button
                type="button"
                className={"wishlist-clear [display:inline-flex] [align-items:center] [justify-content:center] [gap:6px] [border:0] [background:transparent] [color:var(--muted)] [font-size:0.76rem] [padding:8px]"}
                onClick={clear}
              >
                <Trash2 size={14} /> Clear all ({saved.length})
              </button>
            </div>
          </>
        ) : (
          <div className={"wishlist-empty [text-align:center] [padding:80px_16px] [&_>_span]:[display:inline-grid] [&_>_span]:[place-items:center] [&_>_span]:[width:64px] [&_>_span]:[height:64px] [&_>_span]:[border:1px_solid_var(--line-gold)] [&_>_span]:[border-radius:50%] [&_>_span]:[font-family:var(--font-display)] [&_>_span]:[font-size:1.75rem] [&_>_span]:[color:var(--gold-light)] [&_h3]:[font-size:2rem] [&_h3]:[margin:16px_0_8px] [&_p]:[color:var(--muted)] [&_p]:[margin-bottom:24px]"}>
            <span>0</span>
            <h3>Your collection is empty</h3>
            <p>
              Save exceptional properties to compare and arrange private
              viewings.
            </p>
            <Link
              className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
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
    <main className={"inner-page policy-page [min-height:70vh] [padding-top:124px] [padding-bottom:96px]"}>
      <header className={"inner-hero [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:52px_var(--gutter)_56px] [&_h1]:[font-size:clamp(2.85rem,_6.2vw,_5.4rem)] [&_h1]:[line-height:0.92] [&_h1]:[letter-spacing:-0.04em] [&_h1]:[margin:0]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PJ PROPERTY</p>
        <h1>
          {privacy ? "Privacy" : "Terms"}{" "}
          <em>{privacy ? "Policy" : "& Conditions"}</em>
        </h1>
      </header>
      <article className={"policy-content [max-width:820px] [margin:0_auto] [padding:16px_var(--gutter)_64px] [&_h2]:[font-family:var(--font-body)] [&_h2]:[font-size:0.82rem] [&_h2]:[font-weight:700] [&_h2]:[text-transform:uppercase] [&_h2]:[letter-spacing:0.14em] [&_h2]:[color:var(--gold)] [&_h2]:[margin:34px_0_10px] [&_p]:[color:var(--muted)]"}>
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
              information. Wishlist data and recent searches are stored locally
              in your browser.
            </p>
          </>
        ) : (
          <>
            <h2>Website information</h2>
            <p>
              Property listings and figures displayed on this website are
              illustrative. Availability, pricing and specifications should be
              independently verified.
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
        <p className={"policy-date [margin-top:40px] [padding-top:16px] [border-top:1px_solid_var(--line)] [font-size:0.72rem] [text-transform:uppercase] [letter-spacing:0.1em]"}>Last updated 24 November 2026</p>
      </article>
    </main>
  );
}
