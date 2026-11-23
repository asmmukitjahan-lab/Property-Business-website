import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid2X2, Map, Heart } from "lucide-react";
import PropertyCard from "../components/properties/PropertyCard";
import { useProperties } from "../components/context/PropertyContext";
import { useWishlist } from "../components/context/WishlistContext";

export default function Properties() {
  const { properties } = useProperties();
  const { ids } = useWishlist();
  const [params, setParams] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode") || "buy");
  const [location, setLocation] = useState(params.get("location") || "");
  const [type, setType] = useState(params.get("type") || "");
  const [bedrooms, setBedrooms] = useState(params.get("bedrooms") || "");
  const [bathrooms, setBathrooms] = useState("");
  const [maxPrice, setMaxPrice] = useState(params.get("price") || "");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(6);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  useEffect(() => {
    document.title = "Properties | PJ";
    const next = new URLSearchParams();
    if (mode) next.set("mode", mode);
    if (location) next.set("location", location);
    if (type) next.set("type", type);
    if (bedrooms) next.set("bedrooms", bedrooms);
    if (maxPrice) next.set("price", maxPrice);
    setParams(next, { replace: true });
  }, [mode, location, type, bedrooms, maxPrice, setParams]);

  const filtered = useMemo(() => {
    let list = properties.filter((item) =>
      mode === "rent" ? item.rent : !item.rent,
    );
    if (location)
      list = list.filter((item) =>
        item.location.toLowerCase().includes(location.toLowerCase()),
      );
    if (type) list = list.filter((item) => item.type === type);
    if (bedrooms)
      list = list.filter((item) => item.bedrooms >= Number(bedrooms));
    if (bathrooms)
      list = list.filter((item) => item.bathrooms >= Number(bathrooms));
    if (maxPrice)
      list = list.filter(
        (item) => !item.rent && item.price <= Number(maxPrice),
      );
    if (sort === "newest") list = [...list].reverse();
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [properties, mode, location, type, bedrooms, bathrooms, maxPrice, sort]);

  const reset = () => {
    setLocation("");
    setType("");
    setBedrooms("");
    setBathrooms("");
    setMaxPrice("");
  };
  return (
    <main className="inner-page properties-page">
      <header className="inner-hero">
        <p className="eyebrow">THE PJ COLLECTION</p>
        <h1>
          Exceptional homes,
          <br />
          <em>exceptionally found.</em>
        </h1>
      </header>
      <div className="listings-toolbar">
        <div className="mode-toggle" role="group" aria-label="Property purpose">
          <button
            type="button"
            aria-pressed={mode === "buy"}
            className={mode === "buy" ? "active" : ""}
            onClick={() => setMode("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            aria-pressed={mode === "rent"}
            className={mode === "rent" ? "active" : ""}
            onClick={() => setMode("rent")}
          >
            Rent
          </button>
        </div>
        <div className="result-count">
          {filtered.length} properties <span>· {ids.length} saved</span>
        </div>
        <div className="toolbar-actions">
          <button
            className="filter-mobile"
            type="button"
            aria-expanded={filterOpen}
            aria-controls="property-filters"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort properties"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
          <button
            type="button"
            className={`view-toggle ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <Grid2X2 />
          </button>
          <button
            type="button"
            className={`view-toggle ${viewMode === "map" ? "active" : ""}`}
            onClick={() => setViewMode("map")}
            aria-label="Map view"
            aria-pressed={viewMode === "map"}
          >
            <Map />
          </button>
        </div>
      </div>
      <div className="listings-layout">
        <aside
          id="property-filters"
          className={`filters-sidebar ${filterOpen ? "open" : ""}`}
          aria-label="Property filters"
        >
          <div className="mobile-filter-head">
            <h3>Filters</h3>
            <button type="button" onClick={() => setFilterOpen(false)}>
              Done
            </button>
          </div>
          <label>
            <span>Location</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All locations</option>
              {[
                "London",
                "Manchester",
                "Birmingham",
                "Bristol",
                "Edinburgh",
                "Surrey",
                "Brighton",
                "Leeds",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Property type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">Any type</option>
              {[
                "Apartment",
                "House",
                "Penthouse",
                "Detached",
                "Semi-Detached",
                "Townhouse",
                "Luxury Estate",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Maximum price</span>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            >
              <option value="">Any price</option>
              <option value="250000">£250,000</option>
              <option value="500000">£500,000</option>
              <option value="1000000">£1,000,000</option>
              <option value="2000000">£2,000,000</option>
            </select>
          </label>
          <label>
            <span>Bedrooms</span>
            <div className="choice-row">
              {["", "1", "2", "3", "4", "5"].map((item) => (
                <button
                  key={item}
                  className={bedrooms === item ? "active" : ""}
                  onClick={() => setBedrooms(item)}
                >
                  {item || "Any"}
                </button>
              ))}
            </div>
          </label>
          <label>
            <span>Bathrooms</span>
            <div className="choice-row">
              {["", "1", "2", "3", "4"].map((item) => (
                <button
                  key={item}
                  className={bathrooms === item ? "active" : ""}
                  onClick={() => setBathrooms(item)}
                >
                  {item || "Any"}
                </button>
              ))}
            </div>
          </label>
          <button className="reset-filter" onClick={reset}>
            Reset filters
          </button>
        </aside>
        <section className="listings-results">
          {viewMode === "grid" ? (
            <>
              <div className="property-grid listings-grid">
                {filtered.slice(0, limit).map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <Heart />
                  <h3>No properties found</h3>
                  <p>Try adjusting your filters.</p>
                  <button className="button button-gold" onClick={reset}>
                    Clear Filters
                  </button>
                </div>
              )}{" "}
              {filtered.length > limit && (
                <button
                  className="load-more"
                  onClick={() => setLimit((value) => value + 6)}
                >
                  Load more properties
                </button>
              )}
            </>
          ) : (
            <div className="properties-map">
              <div className="map-routes" />
              <div className="map-water" />
              {filtered.slice(0, limit).map((property, index) => (
                <button
                  key={property.id}
                  className="map-pin"
                  style={{
                    left: `${18 + ((index * 17) % 68)}%`,
                    top: `${20 + ((index * 23) % 58)}%`,
                  }}
                  onClick={() =>
                    window.location.assign(`/properties/${property.id}`)
                  }
                >
                  <span>
                    {property.rent
                      ? `£${Math.round(property.price / 1000)}k pcm`
                      : `£${(property.price / 1000000).toFixed(2)}m`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
