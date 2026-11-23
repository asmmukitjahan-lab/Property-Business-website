import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ mode, ...filters });
    navigate(`/properties?${params}`);
  };

  return (
    <div className="property-search-wrap" id="search">
      <form className="property-search" onSubmit={submit}>
        <div className="mode-toggle" role="group" aria-label="Property purpose">
          <button
            type="button"
            className={mode === "buy" ? "active" : ""}
            onClick={() => setMode("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={mode === "rent" ? "active" : ""}
            onClick={() => setMode("rent")}
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
          <ChevronDown />
        </label>
        <label>
          <span>Property type</span>
          <select
            value={filters.type}
            onChange={(e) => set("type", e.target.value)}
          >
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
          <ChevronDown />
        </label>
        <label>
          <span>Price range</span>
          <select
            value={filters.price}
            onChange={(e) => set("price", e.target.value)}
          >
            <option value="">Any price</option>
            <option value="250000">Up to £250k</option>
            <option value="500000">Up to £500k</option>
            <option value="1000000">Up to £1m</option>
            <option value="2000000">Up to £2m</option>
            <option value="3000000">£2m+</option>
          </select>
          <ChevronDown />
        </label>
        <label>
          <span>Bedrooms</span>
          <select
            value={filters.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((item) => (
              <option key={item} value={item}>
                {item}+ bedrooms
              </option>
            ))}
          </select>
          <ChevronDown />
        </label>
        <button className="property-search-button" type="submit">
          <Search /> <span>Find Properties</span>
        </button>
      </form>
    </div>
  );
}
