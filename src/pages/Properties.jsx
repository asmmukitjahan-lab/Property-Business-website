import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Grid2X2,
  Heart,
  Map as MapIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import PropertyCard from "../components/properties/PropertyCard";
import { useProperties, useWishlist } from "../hooks/usePropertyStore";
import { formatPrice } from "../utils/format";

const BUY_PRICES = [
  { value: "1000000", label: "Up to £1,000,000" },
  { value: "2000000", label: "Up to £2,000,000" },
  { value: "3500000", label: "Up to £3,500,000" },
  { value: "3500001", label: "£3,500,000+" },
];

const RENT_PRICES = [
  { value: "5000", label: "Up to £5,000 pcm" },
  { value: "10000", label: "Up to £10,000 pcm" },
  { value: "15000", label: "Up to £15,000 pcm" },
  { value: "15001", label: "£15,000+ pcm" },
];

export default function Properties() {
  const { properties } = useProperties();
  const { ids } = useWishlist();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const mode = params.get("mode") === "rent" ? "rent" : "buy";
  const location = params.get("location") || "";
  const type = params.get("type") || "";
  const bedrooms = params.get("bedrooms") || "";
  const maxPrice = params.get("price") || "";

  const [bathrooms, setBathrooms] = useState("");
  const [sort, setSort] = useState("featured");
  const [limit, setLimit] = useState(6);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPinId, setSelectedPinId] = useState(null);

  useEffect(() => {
    document.title = `${mode === "rent" ? "Properties to Rent" : "Properties for Sale"} | PJ`;
  }, [mode]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === "mode") {
      next.delete("price");
    }
    setLimit(6);
    setSelectedPinId(null);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = properties.filter((item) =>
      mode === "rent" ? item.rent : !item.rent,
    );
    if (location) {
      const needle = location.toLowerCase();
      list = list.filter(
        (item) =>
          item.location.toLowerCase().includes(needle) ||
          item.city.toLowerCase().includes(needle),
      );
    }
    if (type) list = list.filter((item) => item.type === type);
    if (bedrooms) {
      list = list.filter((item) => item.bedrooms >= Number(bedrooms));
    }
    if (bathrooms) {
      list = list.filter((item) => item.bathrooms >= Number(bathrooms));
    }
    if (maxPrice) {
      const cap = Number(maxPrice);
      const isPlusBand =
        (mode === "buy" && cap === 3500001) ||
        (mode === "rent" && cap === 15001);
      list = list.filter((item) =>
        isPlusBand ? item.price >= cap - 1 : item.price <= cap,
      );
    }
    if (sort === "newest") list = [...list].reverse();
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "size") list = [...list].sort((a, b) => b.sqft - a.sqft);
    return list;
  }, [properties, mode, location, type, bedrooms, bathrooms, maxPrice, sort]);

  const reset = () => {
    setBathrooms("");
    setSort("featured");
    setLimit(6);
    setSelectedPinId(null);
    setParams({ mode }, { replace: true });
  };

  const activeChips = [
    location && { key: "location", label: location },
    type && { key: "type", label: type },
    bedrooms && { key: "bedrooms", label: `${bedrooms}+ Bed` },
    bathrooms && { key: "bathrooms", label: `${bathrooms}+ Bath` },
    maxPrice && {
      key: "price",
      label:
        (mode === "rent" ? RENT_PRICES : BUY_PRICES).find(
          (p) => p.value === maxPrice,
        )?.label || maxPrice,
    },
  ].filter(Boolean);

  const selectedProperty =
    filtered.find((item) => item.id === selectedPinId) || filtered[0] || null;
  const priceOptions = mode === "rent" ? RENT_PRICES : BUY_PRICES;

  return (
    <main className={"inner-page properties-page [min-height:70vh] [padding-top:124px]"}>
      <header className={"inner-hero [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:52px_var(--gutter)_56px] [&_h1]:[font-size:clamp(2.85rem,_6.2vw,_5.4rem)] [&_h1]:[line-height:0.92] [&_h1]:[letter-spacing:-0.04em] [&_h1]:[margin:0]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>THE PJ COLLECTION</p>
        <h1>
          {mode === "rent" ? "Private lettings," : "Exceptional homes,"}
          <br />
          <em>exceptionally found.</em>
        </h1>
      </header>

      <div className={"listings-toolbar [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:14px_var(--gutter)] [display:flex] [flex-wrap:wrap] [align-items:center] [justify-content:space-between] [gap:14px] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)]"}>
        <div className={"mode-toggle [display:flex] [align-items:center] [justify-content:center] [gap:4px] [padding:0_12px] [&_button]:[height:38px] [&_button]:[padding:0_14px] [&_button]:[border:1px_solid_transparent] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.72rem] [&_button]:[font-weight:600] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[color:var(--gold-light)] [&_button.active]:[background:var(--gold)] [&_button.active]:[color:#0b1923]"} role="group" aria-label="Property purpose">
          <button
            type="button"
            aria-pressed={mode === "buy"}
            className={mode === "buy" ? "active" : ""}
            onClick={() => updateParam("mode", "buy")}
          >
            Buy
          </button>
          <button
            type="button"
            aria-pressed={mode === "rent"}
            className={mode === "rent" ? "active" : ""}
            onClick={() => updateParam("mode", "rent")}
          >
            Rent
          </button>
        </div>

        <div className={"result-count [margin-right:auto] [margin-left:16px] [font-size:0.74rem] [text-transform:uppercase] [letter-spacing:0.1em] [&_span]:[color:var(--muted)] [@media(max-width:768px)]:[display:none]"}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "residence" : "residences"}{" "}
          <span>· {ids.length} saved</span>
        </div>

        <div className={"toolbar-actions [display:flex] [align-items:center] [gap:8px] [&_select]:[height:40px] [&_select]:[padding:0_12px] [&_select]:[border:1px_solid_var(--line)] [&_select]:[border-radius:var(--radius-sm)] [&_select]:[background:var(--surface)] [&_select]:[color:var(--ivory)] [&_select]:[font-size:0.8rem]"}>
          <button
            className={"filter-mobile [height:40px] [border:1px_solid_var(--line)] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--muted)] [display:none] [align-items:center] [justify-content:center] [gap:8px] [padding:0_12px] [transition:all_0.2s_ease] [&:hover]:[border-color:var(--gold)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.1)] [font-size:0.76rem] [font-weight:600] [@media(max-width:768px)]:[display:inline-flex]"}
            type="button"
            aria-expanded={filterOpen}
            aria-controls="property-filters"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal size={15} /> Filters
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
            <option value="size">Largest Area</option>
          </select>

          <button
            type="button"
            className={`view-toggle ${viewMode === "grid" ? "active" : ""} [height:40px] [border:1px_solid_var(--line)] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--muted)] [display:inline-flex] [align-items:center] [justify-content:center] [gap:8px] [padding:0] [transition:all_0.2s_ease] [width:40px] [&.active]:[border-color:var(--gold)] [&.active]:[color:var(--gold-light)] [&.active]:[background:rgba(198,_166,_111,_0.1)] [&:hover]:[border-color:var(--gold)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.1)]`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <Grid2X2 size={16} />
          </button>
          <button
            type="button"
            className={`view-toggle ${viewMode === "map" ? "active" : ""} [height:40px] [border:1px_solid_var(--line)] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--muted)] [display:inline-flex] [align-items:center] [justify-content:center] [gap:8px] [padding:0] [transition:all_0.2s_ease] [width:40px] [&.active]:[border-color:var(--gold)] [&.active]:[color:var(--gold-light)] [&.active]:[background:rgba(198,_166,_111,_0.1)] [&:hover]:[border-color:var(--gold)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.1)]`}
            onClick={() => setViewMode("map")}
            aria-label="Map view"
            aria-pressed={viewMode === "map"}
          >
            <MapIcon size={16} />
          </button>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className={"active-filters-bar [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:14px_var(--gutter)_0] [display:flex] [flex-wrap:wrap] [align-items:center] [gap:8px]"}>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className={"filter-chip [display:inline-flex] [align-items:center] [gap:7px] [height:30px] [padding:0_10px] [border:1px_solid_var(--line-gold)] [border-radius:999px] [background:rgba(198,_166,_111,_0.1)] [color:var(--gold-light)] [font-size:0.72rem]"}
              onClick={() =>
                chip.key === "bathrooms"
                  ? setBathrooms("")
                  : updateParam(chip.key, "")
              }
            >
              <span>{chip.label}</span>
              <X size={12} />
            </button>
          ))}
          <button type="button" className={"reset-filter [margin-top:10px] [padding:6px_0] [border:0] [border-bottom:1px_solid_var(--gold)] [background:transparent] [color:var(--gold-light)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em]"} onClick={reset}>
            Clear all
          </button>
        </div>
      )}

      <div className={"listings-layout [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:32px_var(--gutter)_100px] [display:grid] [grid-template-columns:248px_minmax(0,_1fr)] [gap:28px] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
        {filterOpen && (
          <div
            className={"mobile-filter-backdrop [display:none] [@media(max-width:768px)]:[display:block] [@media(max-width:768px)]:[position:fixed] [@media(max-width:768px)]:[z-index:69] [@media(max-width:768px)]:[inset:0] [@media(max-width:768px)]:[background:rgba(2,_10,_15,_0.7)]"}
            aria-hidden="true"
            onClick={() => setFilterOpen(false)}
          />
        )}
        <aside
          id="property-filters"
          className={`filters-sidebar ${filterOpen ? "open" : ""} [align-self:start] [position:sticky] [top:90px] [padding:18px] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [background:rgba(15,_39,_53,_0.55)] [&_label]:[display:block] [&_label]:[border-bottom:1px_solid_var(--line)] [&_label]:[padding:14px_0] [&_label_>_span]:[display:block] [&_label_>_span]:[font-size:0.64rem] [&_label_>_span]:[font-weight:700] [&_label_>_span]:[text-transform:uppercase] [&_label_>_span]:[letter-spacing:0.14em] [&_label_>_span]:[color:var(--gold)] [&_label_>_span]:[margin-bottom:10px] [&_select]:[width:100%] [&_select]:[height:40px] [&_select]:[padding:0_10px] [&_select]:[border:1px_solid_var(--line)] [&_select]:[border-radius:var(--radius-sm)] [&_select]:[background:var(--surface)] [&_select]:[color:var(--ivory)] [&_select]:[font-size:0.84rem] [@media(max-width:768px)]:[position:fixed] [@media(max-width:768px)]:[z-index:70] [@media(max-width:768px)]:[left:0] [@media(max-width:768px)]:[top:0] [@media(max-width:768px)]:[bottom:0] [@media(max-width:768px)]:[width:min(340px,_88%)] [@media(max-width:768px)]:[background:var(--navy)] [@media(max-width:768px)]:[border-radius:0] [@media(max-width:768px)]:[overflow-y:auto] [@media(max-width:768px)]:[transform:translateX(-105%)] [@media(max-width:768px)]:[transition:transform_0.3s_ease] [@media(max-width:768px)]:[&.open]:[transform:translateX(0)]`}
          aria-label="Property filters"
        >
          <div className={"mobile-filter-head [display:none] [@media(max-width:768px)]:[display:flex] [@media(max-width:768px)]:[align-items:center] [@media(max-width:768px)]:[justify-content:space-between] [@media(max-width:768px)]:[padding-bottom:12px] [@media(max-width:768px)]:[border-bottom:1px_solid_var(--line)] [@media(max-width:768px)]:[&_h3]:[margin:0] [@media(max-width:768px)]:[&_h3]:[font-size:1.5rem] [@media(max-width:768px)]:[&_button]:[border:1px_solid_var(--gold)] [@media(max-width:768px)]:[&_button]:[border-radius:var(--radius-sm)] [@media(max-width:768px)]:[&_button]:[background:transparent] [@media(max-width:768px)]:[&_button]:[color:var(--gold-light)] [@media(max-width:768px)]:[&_button]:[padding:6px_12px] [@media(max-width:768px)]:[&_button]:[font-size:0.72rem] [@media(max-width:768px)]:[&_button]:[font-weight:600]"}>
            <h3>Refine Search</h3>
            <button type="button" onClick={() => setFilterOpen(false)}>
              Done
            </button>
          </div>

          <label>
            <span>Location</span>
            <select
              value={location}
              onChange={(e) => updateParam("location", e.target.value)}
            >
              <option value="">All UK locations</option>
              {[
                "London",
                "Surrey",
                "Edinburgh",
                "Manchester",
                "Brighton",
                "Bristol",
                "Birmingham",
                "Leeds",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Property type</span>
            <select
              value={type}
              onChange={(e) => updateParam("type", e.target.value)}
            >
              <option value="">Any type</option>
              {[
                "Townhouse",
                "Luxury Estate",
                "Penthouse",
                "Apartment",
                "House",
                "Detached",
                "Semi-Detached",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{mode === "rent" ? "Monthly budget" : "Maximum price"}</span>
            <select
              value={maxPrice}
              onChange={(e) => updateParam("price", e.target.value)}
            >
              <option value="">Any price</option>
              {priceOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className={"filter-group [display:block] [border-bottom:1px_solid_var(--line)] [padding:14px_0] [&_>_span]:[display:block] [&_>_span]:[font-size:0.64rem] [&_>_span]:[font-weight:700] [&_>_span]:[text-transform:uppercase] [&_>_span]:[letter-spacing:0.14em] [&_>_span]:[color:var(--gold)] [&_>_span]:[margin-bottom:10px]"}>
            <span>Bedrooms</span>
            <div className={"choice-row [display:flex] [flex-wrap:wrap] [gap:6px] [&_button]:[height:32px] [&_button]:[min-width:38px] [&_button]:[padding:0_10px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.72rem] [&_button]:[font-weight:600] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[color:var(--gold-light)] [&_button.active]:[background:var(--gold)] [&_button.active]:[border-color:var(--gold)] [&_button.active]:[color:#0b1923]"}>
              {["", "2", "3", "4", "5", "6"].map((item) => (
                <button
                  key={item || "any-bed"}
                  type="button"
                  className={bedrooms === item ? "active" : ""}
                  onClick={() => updateParam("bedrooms", item)}
                >
                  {item ? `${item}+` : "Any"}
                </button>
              ))}
            </div>
          </div>

          <div className={"filter-group [display:block] [border-bottom:1px_solid_var(--line)] [padding:14px_0] [&_>_span]:[display:block] [&_>_span]:[font-size:0.64rem] [&_>_span]:[font-weight:700] [&_>_span]:[text-transform:uppercase] [&_>_span]:[letter-spacing:0.14em] [&_>_span]:[color:var(--gold)] [&_>_span]:[margin-bottom:10px]"}>
            <span>Bathrooms</span>
            <div className={"choice-row [display:flex] [flex-wrap:wrap] [gap:6px] [&_button]:[height:32px] [&_button]:[min-width:38px] [&_button]:[padding:0_10px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.72rem] [&_button]:[font-weight:600] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[color:var(--gold-light)] [&_button.active]:[background:var(--gold)] [&_button.active]:[border-color:var(--gold)] [&_button.active]:[color:#0b1923]"}>
              {["", "2", "3", "4", "5"].map((item) => (
                <button
                  key={item || "any-bath"}
                  type="button"
                  className={bathrooms === item ? "active" : ""}
                  onClick={() => setBathrooms(item)}
                >
                  {item ? `${item}+` : "Any"}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className={"reset-filter [margin-top:10px] [padding:6px_0] [border:0] [border-bottom:1px_solid_var(--gold)] [background:transparent] [color:var(--gold-light)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em]"} onClick={reset}>
            Reset all filters
          </button>
        </aside>

        <section className={"listings-results"}>
          {viewMode === "grid" ? (
            <>
              <div className={"property-grid listings-grid [display:grid] [grid-template-columns:repeat(12,_minmax(0,_1fr))] [gap:22px] [&_.property-card]:[grid-column:span_6] [@media(max-width:768px)]:[&_.property-card]:[grid-column:span_12]"}>
                {filtered.slice(0, limit).map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                  />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className={"empty-state [text-align:center] [padding:64px_20px] [color:var(--muted)] [&_svg]:[color:var(--gold)] [&_svg]:[margin:0_auto_12px] [&_h3]:[font-size:1.85rem] [&_h3]:[color:var(--ivory)] [&_h3]:[margin-bottom:8px]"}>
                  <Heart size={28} />
                  <h3>No residences match those filters</h3>
                  <p>
                    Adjust your criteria or explore our wider UK portfolio.
                  </p>
                  <button
                    type="button"
                    className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                    onClick={reset}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
              {filtered.length > limit && (
                <button
                  type="button"
                  className={"load-more [display:block] [margin:36px_auto_0] [min-height:46px] [padding:0_24px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--gold-light)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.1em] [transition:all_0.2s_ease] [&:hover]:[background:var(--gold-light)] [&:hover]:[color:#0b1923]"}
                  onClick={() => setLimit((value) => value + 6)}
                >
                  Load more residences ({filtered.length - limit} remaining)
                </button>
              )}
            </>
          ) : (
            <div className={"properties-map [position:relative] [height:620px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:radial-gradient(circle_at_60%_70%,_rgba(198,_166,_111,_0.08),_transparent_45%),_#0b222f] [overflow:hidden]"}>
              <div className={"map-routes [position:absolute] [inset:-20%] [transform:rotate(-8deg)] [background-image:linear-gradient(_30deg,_transparent_48%,_rgba(198,_166,_111,_0.12)_49%,_rgba(198,_166,_111,_0.12)_50%,_transparent_51%_),_linear-gradient(_-30deg,_transparent_48%,_rgba(255,_255,_255,_0.06)_49%,_rgba(255,_255,_255,_0.06)_50%,_transparent_51%_)] [background-size:110px_190px]"} aria-hidden="true" />
              <div className={"map-water [position:absolute] [width:120%] [height:240px] [left:-10%] [bottom:-150px] [border-radius:50%] [border:28px_solid_rgba(54,_122,_145,_0.22)] [transform:rotate(12deg)]"} aria-hidden="true" />

              {filtered.map((property) => {
                const isSelected = selectedProperty?.id === property.id;
                const pos = property.mapPos || { x: 50, y: 50 };
                return (
                  <button
                    key={property.id}
                    type="button"
                    className={`map-pin ${isSelected ? "active" : ""} [position:absolute] [z-index:2] [transform:translate(-50%,_-50%)] [border:0] [background:transparent] [&::before]:[content:""] [&::before]:[display:block] [&::before]:[width:14px] [&::before]:[height:14px] [&::before]:[margin:0_auto] [&::before]:[border-radius:50%] [&::before]:[border:3px_solid_var(--navy)] [&::before]:[background:var(--gold)] [&::before]:[box-shadow:0_0_0_5px_rgba(198,_166,_111,_0.22)] [&_span]:[display:block] [&_span]:[margin-top:6px] [&_span]:[padding:5px_9px] [&_span]:[border:1px_solid_var(--gold)] [&_span]:[border-radius:3px] [&_span]:[background:rgba(7,_23,_34,_0.94)] [&_span]:[font-family:var(--font-display)] [&_span]:[font-size:0.85rem] [&_span]:[color:var(--ivory)] [&_span]:[white-space:nowrap] [&.active_span]:[background:var(--gold)] [&.active_span]:[color:#0b1923] [&:hover_span]:[background:var(--gold)] [&:hover_span]:[color:#0b1923]`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    onClick={() => setSelectedPinId(property.id)}
                    onDoubleClick={() =>
                      navigate(`/properties/${property.id}`)
                    }
                    aria-label={`${property.title} in ${property.location}, ${formatPrice(property.price, property.rent)}`}
                  >
                    <span>
                      {property.rent
                        ? `£${(property.price / 1000).toFixed(1)}k pcm`
                        : `£${(property.price / 1000000).toFixed(2)}m`}
                    </span>
                  </button>
                );
              })}

              {selectedProperty ? (
                <div className={"map-preview-card [position:absolute] [z-index:4] [left:18px] [bottom:18px] [width:min(360px,_calc(100%_-_36px))] [display:grid] [grid-template-columns:110px_1fr] [gap:14px] [padding:12px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:rgba(7,_23,_34,_0.94)] [backdrop-filter:blur(14px)] [&_img]:[height:100%] [&_img]:[min-height:108px] [&_img]:[border-radius:var(--radius-sm)] [&_img]:[object-fit:cover] [@media(max-width:420px)]:[grid-template-columns:1fr] [@media(max-width:420px)]:[&_img]:[height:120px]"}>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                  />
                  <div className={"map-preview-body [&_h3]:[font-size:1.25rem] [&_h3]:[margin:0_0_4px] [&_>_p:not(.eyebrow)]:[font-size:0.72rem] [&_>_p:not(.eyebrow)]:[color:var(--muted)] [&_>_p:not(.eyebrow)]:[margin-bottom:10px]"}>
                    <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>{selectedProperty.location}</p>
                    <h3>{selectedProperty.title}</h3>
                    <p>
                      {selectedProperty.bedrooms} Bed ·{" "}
                      {selectedProperty.bathrooms} Bath ·{" "}
                      {selectedProperty.sqft.toLocaleString()} sq ft
                    </p>
                    <div className={"map-preview-foot [display:flex] [align-items:center] [justify-content:space-between] [gap:8px] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:1.15rem] [&_strong]:[color:var(--gold-light)] [&_.button]:[min-height:34px] [&_.button]:[padding:0_12px] [&_.button]:[font-size:0.65rem]"}>
                      <strong>
                        {formatPrice(
                          selectedProperty.price,
                          selectedProperty.rent,
                        )}
                      </strong>
                      <Link
                        className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                        to={`/properties/${selectedProperty.id}`}
                      >
                        View <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={"map-empty-overlay [position:absolute] [inset:0] [display:grid] [place-content:center] [justify-items:center] [gap:14px] [background:rgba(7,_23,_34,_0.7)]"}>
                  <p>No properties match your active filters.</p>
                  <button
                    type="button"
                    className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                    onClick={reset}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
