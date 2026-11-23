import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "../data/properties";
export default function Locations() {
  return (
    <main className="inner-page locations-page">
      <header className="inner-hero">
        <p className="eyebrow">UNITED KINGDOM</p>
        <h1>
          Extraordinary places
          <br />
          <em>to belong.</em>
        </h1>
      </header>
      <section className="locations-grid">
        {locations.map((location, index) => (
          <Link
            className="location-card large"
            to={`/properties?location=${location.name}`}
            key={location.name}
          >
            <img src={location.image} alt={location.name} />
            <div>
              <span>0{index + 1}</span>
              <h2>{location.name}</h2>
              <p>{location.count} properties</p>
            </div>
            <ArrowUpRight />
          </Link>
        ))}
      </section>
    </main>
  );
}
