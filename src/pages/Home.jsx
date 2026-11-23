import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/hero/HeroSection";
import PropertySearch from "../components/properties/PropertySearch";
import PropertyCard from "../components/properties/PropertyCard";
import { useProperties } from "../components/context/PropertyContext";
import { locations } from "../data/properties";

export default function Home() {
  const { properties } = useProperties();
  const [filmOpen, setFilmOpen] = useState(false);
  useEffect(() => {
    document.title = "PJ | Extraordinary Homes Across the UK";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Discover exceptional homes and private property expertise across the United Kingdom.",
      );
  }, []);
  return (
    <>
      <HeroSection />
      <PropertySearch />
      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CURATED PROPERTIES</p>
            <h2>
              Discover Your
              <br/>
              <em>Dream Home</em>
            </h2>
          </div>
          <p>
            Explore carefully selected properties in the UK's most desirable
            locations.
          </p>
        </div>
        <div className="property-grid">
          {properties
            .filter((item) => item.featured)
            .slice(0, 6)
            .map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
        </div>
        <Link className="text-link featured-more" to="/properties">
          View all properties <ArrowUpRight />
        </Link>
      </section>
      <section className="section locations-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHERE WE LIVE</p>
            <h2>
              Explore The <em>UK</em>
            </h2>
          </div>
          <Link className="text-link" to="/locations">
            View all locations <ArrowUpRight />
          </Link>
        </div>
        <div className="location-track">
          {locations.map((location, index) => (
            <Link
              className="location-card"
              to={`/properties?location=${location.name}`}
              key={location.name}
            >
              <img src={location.image} alt={location.name} loading="lazy" />
              <div>
                <span>0{index + 1}</span>
                <h3>{location.name}</h3>
                <p>{location.count} properties</p>
              </div>
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </section>
      <section className="about-banner">
        <div className="about-banner-image">
          <button
            aria-label="Play brand film"
            onClick={() => setFilmOpen(true)}
          >
            <Play fill="currentColor" />
          </button>
        </div>
        <motion.div
          className="about-banner-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">THE PJ APPROACH</p>
          <h2>
            Building a better
            <br />
            <em>future, together.</em>
          </h2>
          <p>
            At PJ, we believe finding a property should feel personal. From your
            first search to your final key, we bring expertise, clarity and care
            to every step.
          </p>
          <Link className="button button-gold" to="/about">
            Discover PJ <ArrowUpRight />
          </Link>
        </motion.div>
      </section>
      <MortgageCalculator />
      <section className="section developments-preview">
        <div className="development-card">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
            alt="Modern luxury development"
          />
          <div>
            <p className="eyebrow">NEW DEVELOPMENT</p>
            <h2>Northbank Residences</h2>
            <p>Manchester · Completion 2027 · From £695,000</p>
            <Link className="button button-ghost" to="/developments">
              Explore Development <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
      {filmOpen && (
        <motion.div
          className="film-modal"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseDown={(event) =>
            event.target === event.currentTarget && setFilmOpen(false)
          }
        >
          <motion.div
            initial={{ scale: 0.96, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <button
              className="film-close"
              onClick={() => setFilmOpen(false)}
              aria-label="Close film"
            >
              ×
            </button>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
              alt="PJ brand film"
            />
            <div>
              <p className="eyebrow">THE PJ STORY</p>
              <h2>Property, personally considered.</h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function MortgageCalculator() {
  const [price, setPrice] = useState(1850000);
  const [deposit, setDeposit] = useState(20);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(25);
  const depositAmount = (price * deposit) / 100;
  const loan = price - depositAmount;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const monthly = monthlyRate
    ? (loan * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
    : loan / months;
  return (
    <section className="section calculator-section">
      <div className="calculator-heading">
        <p className="eyebrow">PRIVATE FINANCE</p>
        <h2>
          Plan Your <em>Move</em>
        </h2>
        <p>Explore an indicative monthly mortgage payment.</p>
      </div>
      <div className="calculator">
        <div className="calculator-fields">
          {[
            ["Property price", price, setPrice, 100000, 5000000, "£", 25000],
            ["Deposit", deposit, setDeposit, 5, 70, "%", 1],
            ["Interest rate", rate, setRate, 1, 10, "%", 0.1],
            ["Mortgage term", term, setTerm, 5, 40, " yrs", 1],
          ].map(([label, value, setter, min, max, suffix, step]) => (
            <label key={label}>
              <span>
                {label}
                <b>
                  {typeof value === "number"
                    ? `${value.toLocaleString()}${suffix}`
                    : value}
                </b>
              </span>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => setter(Number(e.target.value))}
              />
            </label>
          ))}
        </div>
        <div className="calculator-results">
          <div>
            <span>Deposit amount</span>
            <strong>£{Math.round(depositAmount).toLocaleString()}</strong>
          </div>
          <div>
            <span>Loan amount</span>
            <strong>£{Math.round(loan).toLocaleString()}</strong>
          </div>
          <div className="monthly">
            <span>Estimated monthly</span>
            <strong>
              £{Math.round(monthly).toLocaleString()}
              <small>/month</small>
            </strong>
          </div>
          <p>Estimates only. Not financial advice.</p>
        </div>
      </div>
    </section>
  );
}
