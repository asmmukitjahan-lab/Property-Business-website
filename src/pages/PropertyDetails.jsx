import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  BedDouble,
  Bath,
  Maximize,
  Share2,
  CalendarDays,
  Mail,
} from "lucide-react";
import { useProperties } from "../components/context/PropertyContext";
import { useWishlist } from "../components/context/WishlistContext";
import PropertyCard from "../components/properties/PropertyCard";
import ViewingForm from "../components/properties/ViewingForm";

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((item) => item.id === Number(id));
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);
  const [viewing, setViewing] = useState(false);
  const { ids, toggle } = useWishlist();
  useEffect(() => {
    if (property) document.title = `${property.title} | PJ`;
  }, [property]);
  if (!property)
    return (
      <div className="inner-page not-found">
        <h1>Property unavailable</h1>
        <Link className="button button-gold" to="/properties">
          Return to properties
        </Link>
      </div>
    );
  const saved = ids.includes(property.id);
  return (
    <main className="inner-page details-page">
      <div className="details-top">
        <Link to="/properties">
          <ArrowLeft /> Back to properties
        </Link>
        <div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            <Share2 /> Share
          </button>
          <button
            type="button"
            className={saved ? "saved" : ""}
            onClick={() => toggle(property.id)}
          >
            <Heart fill={saved ? "currentColor" : "none"} />{" "}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
      <section className="gallery" aria-label={`${property.title} photos`}>
        <button
          type="button"
          className="gallery-main"
          onClick={() => setFull(true)}
          aria-label={`Open full-size photo of ${property.title}`}
        >
          <img
            src={property.gallery[active]}
            alt={`${property.title} view ${active + 1}`}
          />
        </button>
        <div className="gallery-thumbs">
          {property.gallery.map((image, index) => (
            <button
              type="button"
              className={active === index ? "active" : ""}
              key={image}
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={active === index}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>
      {full && (
        <div
          className="gallery-full"
          role="dialog"
          aria-modal="true"
          aria-label={`${property.title} photo gallery`}
          onClick={() => setFull(false)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setFull(false)}
          >
            ×
          </button>
          <img src={property.gallery[active]} alt={property.title} />
        </div>
      )}
      <div className="details-layout">
        <div className="details-content">
          <p className="eyebrow">
            {property.location} · {property.postcode}
          </p>
          <h1>{property.title}</h1>
          <div className="details-specs">
            <span>
              <BedDouble /> {property.bedrooms} bedrooms
            </span>
            <span>
              <Bath /> {property.bathrooms} bathrooms
            </span>
            <span>
              <Maximize /> {property.sqft.toLocaleString()} sq ft
            </span>
          </div>
          <section className="details-section">
            <p className="eyebrow">THE PROPERTY</p>
            <h2>
              Quiet luxury,
              <br />
              <em>beautifully considered.</em>
            </h2>
            <p>
              {property.description} Every detail has been selected to create an
              effortless home for modern living.
            </p>
          </section>
          <section className="details-section">
            <p className="eyebrow">KEY FEATURES</p>
            <div className="feature-grid">
              {[
                "Private outdoor space",
                "Premium integrated kitchen",
                "Designer bathrooms",
                "Secure parking",
                "Excellent natural light",
                "Concierge available",
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section className="details-section">
            <p className="eyebrow">PROPERTY DETAILS</p>
            <div className="detail-table">
              <div>
                <span>Tenure</span>
                <b>Freehold</b>
              </div>
              <div>
                <span>Type</span>
                <b>{property.type}</b>
              </div>
              <div>
                <span>Postcode</span>
                <b>{property.postcode}</b>
              </div>
              <div>
                <span>Energy rating</span>
                <b>B</b>
              </div>
            </div>
          </section>
          <section className="details-section">
            <p className="eyebrow">LOCATION</p>
            <div className="map-placeholder">
              <span>{property.location}</span>
              <div className="map-grid" />
            </div>
            <div className="amenities">
              <span>Central Station · 8 min</span>
              <span>Schools · 12 min</span>
              <span>High Street · 6 min</span>
            </div>
          </section>
        </div>
        <aside className="inquiry-panel">
          <span className="status">{property.status}</span>
          <strong>
            {property.rent
              ? `£${property.price.toLocaleString()} pcm`
              : `£${property.price.toLocaleString()}`}
          </strong>
          <p>Guide price</p>
          <button
            className="button button-gold"
            onClick={() => setViewing(true)}
          >
            <CalendarDays /> Arrange a Viewing
          </button>
          <button
            className="button button-ghost"
            onClick={() => setViewing(true)}
          >
            <Mail /> Request Details
          </button>
          <div className="agent">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=85"
              alt="James Whitmore"
            />
            <div>
              <span>Your property advisor</span>
              <b>James Whitmore</b>
              <a href="tel:+442079460280">+44 (0)20 7946 0280</a>
            </div>
          </div>
        </aside>
      </div>
      <section className="section similar">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOU MAY ALSO LIKE</p>
            <h2>
              Similar <em>Properties</em>
            </h2>
          </div>
        </div>
        <div className="property-grid">
          {properties
            .filter((item) => item.id !== property.id)
            .slice(0, 3)
            .map((item, index) => (
              <PropertyCard key={item.id} property={item} index={index} />
            ))}
        </div>
      </section>
      {viewing && (
        <ViewingForm
          propertyTitle={property.title}
          onClose={() => setViewing(false)}
        />
      )}
    </main>
  );
}
