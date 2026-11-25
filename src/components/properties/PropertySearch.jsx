import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BUY_PRICES = [
  { value: "1000000", label: "Up to £1m" },
  { value: "2000000", label: "Up to £2m" },
  { value: "3500000", label: "Up to £3.5m" },
  { value: "3500001", label: "£3.5m+" },
];

const RENT_PRICES = [
  { value: "5000", label: "Up to £5,000 pcm" },
  { value: "10000", label: "Up to £10,000 pcm" },
  { value: "15000", label: "Up to £15,000 pcm" },
  { value: "15001", label: "£15,000+ pcm" },
];

export default function PropertySearch() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("buy");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    price: "",
    bedrooms: "",
  });

  const set = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setFilters((current) => ({ ...current, price: "" }));
  };

  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (filters.location) params.set("location", filters.location);
    if (filters.type) params.set("type", filters.type);
    if (filters.price) params.set("price", filters.price);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    navigate(`/properties?${params.toString()}`);
  };

  const priceOptions = mode === "rent" ? RENT_PRICES : BUY_PRICES;

  return (
    <div className={"property-search-wrap [position:relative] [z-index:10] [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:-48px_auto_0] [padding:0_var(--gutter)] [@media(max-width:768px)]:[margin-top:-42px]"} id="search">
      <form
        className={"property-search [display:grid] [grid-template-columns:156px_repeat(4,_minmax(0,_1fr))_164px] [align-items:stretch] [min-height:92px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:linear-gradient(_135deg,_rgba(15,_39,_53,_0.96),_rgba(10,_29,_41,_0.97)_)] [backdrop-filter:blur(20px)] [box-shadow:0_24px_64px_rgba(2,_10,_15,_0.34)] [overflow:hidden] [&_label]:[position:relative] [&_label]:[display:flex] [&_label]:[flex-direction:column] [&_label]:[justify-content:center] [&_label]:[padding:12px_34px_12px_16px] [&_label]:[border-left:1px_solid_var(--line)] [&_label_span]:[font-size:0.62rem] [&_label_span]:[font-weight:600] [&_label_span]:[text-transform:uppercase] [&_label_span]:[letter-spacing:0.14em] [&_label_span]:[color:var(--gold)] [&_label_span]:[margin-bottom:5px] [&_select]:[width:100%] [&_select]:[appearance:none] [&_select]:[border:0] [&_select]:[background:transparent] [&_select]:[color:var(--ivory)] [&_select]:[font-size:0.85rem] [&_select]:[font-weight:500] [&_select]:[outline:0] [&_select]:[cursor:pointer] [&_select_option]:[background:var(--surface)] [&_select_option]:[color:var(--ivory)] [&_label_svg]:[position:absolute] [&_label_svg]:[right:12px] [&_label_svg]:[bottom:20px] [&_label_svg]:[width:14px] [&_label_svg]:[color:var(--gold)] [&_label_svg]:[pointer-events:none] [@media(max-width:1100px)]:[grid-template-columns:repeat(4,_minmax(0,_1fr))] [@media(max-width:1100px)]:[&_.mode-toggle]:[grid-column:1_/_-1] [@media(max-width:1100px)]:[&_.mode-toggle]:[height:54px] [@media(max-width:1100px)]:[&_.mode-toggle]:[border-bottom:1px_solid_var(--line)] [@media(max-width:1100px)]:[&_.mode-toggle]:[justify-content:flex-start] [@media(max-width:1100px)]:[&_label:first-of-type]:[border-left:0] [@media(max-width:768px)]:[grid-template-columns:1fr_1fr] [@media(max-width:768px)]:[&_label:nth-of-type(3)]:[border-left:0] [@media(max-width:768px)]:[&_label:nth-of-type(3)]:[border-top:1px_solid_var(--line)] [@media(max-width:768px)]:[&_label:nth-of-type(4)]:[border-top:1px_solid_var(--line)] [@media(max-width:420px)]:[grid-template-columns:1fr] [@media(max-width:420px)]:[&_label]:[border-left:0] [@media(max-width:420px)]:[&_label]:[border-top:1px_solid_var(--line)]"}
        onSubmit={submit}
        aria-label="Search UK properties"
      >
        <div className={"mode-toggle [display:flex] [align-items:center] [justify-content:center] [gap:4px] [padding:0_12px] [&_button]:[height:38px] [&_button]:[padding:0_14px] [&_button]:[border:1px_solid_transparent] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.72rem] [&_button]:[font-weight:600] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[color:var(--gold-light)] [&_button.active]:[background:var(--gold)] [&_button.active]:[color:#0b1923]"} role="group" aria-label="Property purpose">
          <button
            type="button"
            className={mode === "buy" ? "active" : ""}
            aria-pressed={mode === "buy"}
            onClick={() => switchMode("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={mode === "rent" ? "active" : ""}
            aria-pressed={mode === "rent"}
            onClick={() => switchMode("rent")}
          >
            Rent
          </button>
        </div>

        <label>
          <span>Location</span>
          <select
            value={filters.location}
            onChange={(e) => set("location", e.target.value)}
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
          <ChevronDown aria-hidden="true" />
        </label>

        <label>
          <span>Property type</span>
          <select
            value={filters.type}
            onChange={(e) => set("type", e.target.value)}
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
          <ChevronDown aria-hidden="true" />
        </label>

        <label>
          <span>Price range</span>
          <select
            value={filters.price}
            onChange={(e) => set("price", e.target.value)}
          >
            <option value="">Any price</option>
            {priceOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </label>

        <label>
          <span>Bedrooms</span>
          <select
            value={filters.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
          >
            <option value="">Any</option>
            {[2, 3, 4, 5, 6].map((item) => (
              <option key={item} value={item}>
                {item}+ bedrooms
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </label>

        <button className={"property-search-button [border:0] [background:var(--gold)] [color:#0b1923] [display:inline-flex] [align-items:center] [justify-content:center] [gap:8px] [padding:0_16px] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.1em] [transition:background-color_0.2s_ease] [&:hover]:[background:var(--gold-light)] [@media(max-width:1100px)]:[grid-column:1_/_-1] [@media(max-width:1100px)]:[min-height:52px]"} type="submit">
          <Search size={16} aria-hidden="true" />
          <span>Find Homes</span>
        </button>
      </form>
    </div>
  );
}
