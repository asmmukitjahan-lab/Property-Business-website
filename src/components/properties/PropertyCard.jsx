import { ArrowUpRight, Bath, BedDouble, Heart, Maximize } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../../hooks/usePropertyStore";
import { formatPrice } from "../../utils/format";

export default function PropertyCard({ property, index = 0 }) {
  const { ids, toggle } = useWishlist();
  const saved = ids.includes(property.id);

  return (
    <motion.article
      className={"property-card [grid-column:span_4] [display:flex] [flex-direction:column] [background:var(--surface)] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [color:var(--ivory)] [overflow:hidden] [transition:transform_0.35s_cubic-bezier(0.2,_0.75,_0.25,_1),_border-color_0.35s_ease,_box-shadow_0.35s_ease,_background-color_0.35s_ease] [&:hover]:[transform:translateY(-6px)] [&:hover]:[background:var(--surface-raised)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[box-shadow:var(--shadow-card)] [&:hover_.property-image_img]:[transform:scale(1.055)] [&:hover_.property-title-link_h3]:[color:var(--gold-light)] [@media(max-width:1100px)]:[grid-column:span_6] [@media(max-width:768px)]:[grid-column:span_12]"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        delay: Math.min((index % 3) * 0.08, 0.24),
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={"property-media-wrap [position:relative] [padding:8px_8px_0]"}>
        <Link className={"property-image [position:relative] [display:block] [height:300px] [border-radius:var(--radius-sm)] [overflow:hidden] [background:var(--navy-deep)] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_img]:[transition:transform_0.7s_cubic-bezier(0.22,_1,_0.36,_1)]"} to={`/properties/${property.id}`}>
          <img
            src={property.image}
            alt={`${property.title} in ${property.location}`}
            loading="lazy"
          />
          <div className={"property-image-scrim [position:absolute] [inset:0] [background:linear-gradient(_180deg,_rgba(6,_19,_28,_0.28)_0%,_transparent_45%,_rgba(6,_19,_28,_0.35)_100%_)] [pointer-events:none]"} aria-hidden="true" />
        </Link>

        <div className={"property-badges [position:absolute] [z-index:2] [left:20px] [top:20px] [display:flex] [flex-wrap:wrap] [gap:6px]"}>
          <span className={"property-status [padding:6px_10px] [border-radius:3px] [font-size:0.6rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.12em] [backdrop-filter:blur(8px)] [background:rgba(7,_23,_34,_0.82)] [border:1px_solid_rgba(255,_255,_255,_0.16)] [color:var(--ivory)]"}>{property.status}</span>
          {property.badge && (
            <span className={"property-badge-accent [padding:6px_10px] [border-radius:3px] [font-size:0.6rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.12em] [backdrop-filter:blur(8px)] [background:rgba(198,_166,_111,_0.22)] [border:1px_solid_rgba(226,_201,_142,_0.4)] [color:var(--gold-light)]"}>{property.badge}</span>
          )}
        </div>

        <motion.button
          type="button"
          className={`heart-button ${saved ? "saved" : ""} [position:absolute] [z-index:3] [right:20px] [top:20px] [width:38px] [height:38px] [border:1px_solid_rgba(255,_255,_255,_0.22)] [border-radius:50%] [background:rgba(7,_23,_34,_0.72)] [backdrop-filter:blur(8px)] [color:var(--ivory)] [display:grid] [place-items:center] [transition:all_0.22s_ease] [&:hover]:[border-color:var(--gold)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(7,_23,_34,_0.94)] [&.saved]:[border-color:var(--gold)] [&.saved]:[color:var(--gold-light)] [&.saved]:[background:rgba(7,_23,_34,_0.94)]`}
          onClick={() => toggle(property.id)}
          whileTap={{ scale: 0.88 }}
          aria-label={
            saved
              ? `Remove ${property.title} from wishlist`
              : `Save ${property.title} to wishlist`
          }
          aria-pressed={saved}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className={"property-card-body [flex:1] [display:flex] [flex-direction:column] [padding:18px_20px_20px]"}>
        <div className={"property-meta-top [display:flex] [align-items:center] [justify-content:space-between] [gap:8px] [margin-bottom:6px]"}>
          <p className={"property-location [margin:0] [font-size:0.66rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.14em] [color:var(--gold)]"}>{property.location}</p>
          <span className={"property-type-tag [font-size:0.65rem] [color:var(--muted)]"}>{property.type}</span>
        </div>

        <Link to={`/properties/${property.id}`} className={"property-title-link [&_h3]:[font-size:clamp(1.45rem,_1.8vw,_1.8rem)] [&_h3]:[line-height:1.12] [&_h3]:[letter-spacing:-0.02em] [&_h3]:[margin:0_0_14px] [&_h3]:[transition:color_0.2s_ease]"}>
          <h3>{property.title}</h3>
        </Link>

        <div className={"property-specs [display:flex] [flex-wrap:wrap] [gap:14px] [padding:12px_0] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [color:var(--muted)] [font-size:0.75rem] [&_span]:[display:inline-flex] [&_span]:[align-items:center] [&_span]:[gap:6px]"}>
          <span>
            <BedDouble size={14} aria-hidden="true" /> {property.bedrooms} Bed
          </span>
          <span>
            <Bath size={14} aria-hidden="true" /> {property.bathrooms} Bath
          </span>
          <span>
            <Maximize size={14} aria-hidden="true" />{" "}
            {property.sqft.toLocaleString()} sq ft
          </span>
        </div>

        <div className={"property-card-foot [margin-top:auto] [padding-top:14px] [display:flex] [align-items:flex-end] [justify-content:space-between] [gap:12px]"}>
          <div className={"property-price-block [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:1.55rem] [&_strong]:[font-weight:600] [&_strong]:[line-height:1.1] [&_strong]:[color:var(--ivory)]"}>
            <span className={"property-price-label [display:block] [font-size:0.62rem] [text-transform:uppercase] [letter-spacing:0.1em] [color:var(--muted)]"}>
              {property.rent ? "Monthly rent" : "Guide price"}
            </span>
            <strong>{formatPrice(property.price, property.rent)}</strong>
          </div>
          <Link
            className={"property-card-cta [display:inline-flex] [align-items:center] [gap:6px] [height:36px] [padding:0_12px] [border:1px_solid_var(--line)] [border-radius:var(--radius-sm)] [font-size:0.66rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.1em] [color:var(--ivory)] [transition:all_0.22s_ease] [&:hover]:[border-color:var(--gold)] [&:hover]:[background:rgba(198,_166,_111,_0.12)] [&:hover]:[color:var(--gold-light)]"}
            to={`/properties/${property.id}`}
            aria-label={`View ${property.title}`}
          >
            <span>View</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
