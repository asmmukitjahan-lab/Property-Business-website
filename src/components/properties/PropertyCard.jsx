import { Heart, ArrowUpRight, BedDouble, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

export default function PropertyCard({ property, index = 0 }) {
  const { ids, toggle } = useWishlist();
  const saved = ids.includes(property.id);
  return (
    <motion.article
      className="property-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6 }}
    >
      <Link className="property-image" to={`/properties/${property.id}`}>
        <img src={property.image} alt={property.title} loading="lazy" />
        <span className="property-status">{property.status}</span>
      </Link>
      <button
        className={`heart-button ${saved ? "saved" : ""}`}
        onClick={() => toggle(property.id)}
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart fill={saved ? "currentColor" : "none"} />
      </button>
      <div className="property-card-body">
        <p className="property-location">{property.location}</p>
        <Link to={`/properties/${property.id}`}>
          <h3>{property.title}</h3>
        </Link>
        <div className="property-specs">
          <span>
            <BedDouble /> {property.bedrooms}
          </span>
          <span>
            <Bath /> {property.bathrooms}
          </span>
          <span>
            <Maximize /> {property.sqft.toLocaleString()} sq ft
          </span>
        </div>
        <div className="property-card-foot">
          <strong>
            {property.rent
              ? `£${property.price.toLocaleString()} pcm`
              : `£${property.price.toLocaleString()}`}
          </strong>
          <Link
            to={`/properties/${property.id}`}
            aria-label={`View ${property.title}`}
          >
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
