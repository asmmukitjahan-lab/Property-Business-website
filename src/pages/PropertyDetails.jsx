import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Heart,
  Mail,
  MapPin,
  Maximize,
  Share2,
  X,
} from "lucide-react";
import { useProperties, useWishlist } from "../hooks/usePropertyStore";
import PropertyCard from "../components/properties/PropertyCard";
import ViewingForm from "../components/properties/ViewingForm";
import { formatPrice } from "../utils/format";

export default function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useProperties();
  const property = properties.find((item) => item.id === Number(id));

  const [galleryState, setGalleryState] = useState({ id, index: 0 });
  const [full, setFull] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ids, toggle } = useWishlist();

  const active = galleryState.id === id ? galleryState.index : 0;
  const setActive = (nextIndex) => setGalleryState({ id, index: nextIndex });

  useEffect(() => {
    if (property) {
      document.title = `${property.title} | ${property.location} | PJ`;
    } else {
      document.title = "Property Unavailable | PJ";
    }
  }, [property]);

  useEffect(() => {
    if (!full || !property) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const total = property.gallery.length;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setFull(false);
      if (event.key === "ArrowRight") {
        setGalleryState({ id, index: (active + 1) % total });
      }
      if (event.key === "ArrowLeft") {
        setGalleryState({ id, index: (active - 1 + total) % total });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [full, property, id, active]);

  if (!property) {
    return (
      <main className={"inner-page not-found [min-height:70vh] [padding-top:124px] [padding:200px_var(--gutter)_140px] [text-align:center] [background:linear-gradient(rgba(7,_23,_34,_0.78),_var(--navy)),_url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85)_center/cover] [&_h1]:[font-size:clamp(2.8rem,_6vw,_4.8rem)] [&_h1]:[margin-bottom:28px]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>RESIDENCE NOT FOUND</p>
        <h1>
          Property <em>unavailable.</em>
        </h1>
        <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/properties">
          Return to properties
        </Link>
      </main>
    );
  }

  const saved = ids.includes(property.id);

  async function handleShare() {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  }

  return (
    <main className={"inner-page details-page [min-height:70vh] [padding-top:124px] [padding-inline:var(--gutter)]"}>
      <div className={"details-top [max-width:var(--container)] [margin:0_auto_14px] [display:flex] [align-items:center] [justify-content:space-between] [gap:12px] [&_>_a]:[display:inline-flex] [&_>_a]:[align-items:center] [&_>_a]:[gap:8px] [&_>_a]:[font-size:0.74rem] [&_>_a]:[font-weight:600] [&_>_a]:[text-transform:uppercase] [&_>_a]:[letter-spacing:0.1em] [&_>_div_button]:[display:inline-flex] [&_>_div_button]:[align-items:center] [&_>_div_button]:[gap:8px] [&_>_div_button]:[font-size:0.74rem] [&_>_div_button]:[font-weight:600] [&_>_div_button]:[text-transform:uppercase] [&_>_div_button]:[letter-spacing:0.1em] [&_>_div]:[display:flex] [&_>_div]:[gap:8px] [&_button]:[height:38px] [&_button]:[padding:0_12px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--ivory)] [&_button.saved]:[border-color:var(--gold)] [&_button.saved]:[color:var(--gold-light)] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[color:var(--gold-light)]"}>
        <Link to="/properties">
          <ArrowLeft size={15} /> Back to properties
        </Link>
        <div>
          <button type="button" onClick={handleShare}>
            {copied ? <Check size={15} /> : <Share2 size={15} />}{" "}
            {copied ? "Link Copied" : "Share"}
          </button>
          <button
            type="button"
            className={saved ? "saved" : ""}
            onClick={() => toggle(property.id)}
            aria-pressed={saved}
          >
            <Heart size={15} fill={saved ? "currentColor" : "none"} />{" "}
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <section className={"gallery [max-width:var(--container)] [margin:0_auto] [height:580px] [display:grid] [grid-template-columns:3fr_1fr] [gap:12px] [@media(max-width:1100px)]:[height:460px] [@media(max-width:768px)]:[height:auto] [@media(max-width:768px)]:[grid-template-columns:1fr]"} aria-label={`${property.title} photos`}>
        <button
          type="button"
          className={"gallery-main [position:relative] [border:0] [padding:0] [border-radius:var(--radius-md)] [overflow:hidden] [cursor:zoom-in] [&_img]:[height:100%] [&_img]:[object-fit:cover] [@media(max-width:768px)]:[height:300px]"}
          onClick={() => setFull(true)}
          aria-label={`Open full-size photo ${active + 1} of ${property.title}`}
        >
          <img
            src={property.gallery[active]}
            alt={`${property.title} view ${active + 1}`}
          />
          <span className={"gallery-counter [position:absolute] [right:14px] [bottom:14px] [padding:6px_12px] [border:1px_solid_rgba(255,_255,_255,_0.22)] [border-radius:var(--radius-sm)] [background:rgba(7,_23,_34,_0.78)] [color:var(--ivory)] [font-size:0.68rem] [letter-spacing:0.1em] [text-transform:uppercase]"}>
            0{active + 1} / 0{property.gallery.length} · Expand
          </span>
        </button>
        <div className={"gallery-thumbs [&_img]:[height:100%] [&_img]:[object-fit:cover] [display:grid] [grid-template-rows:repeat(3,_1fr)] [gap:12px] [&_button]:[border:2px_solid_transparent] [&_button]:[padding:0] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[overflow:hidden] [&_button]:[background:var(--surface)] [&_button.active]:[border-color:var(--gold)] [@media(max-width:768px)]:[grid-template-rows:none] [@media(max-width:768px)]:[grid-template-columns:repeat(3,_1fr)] [@media(max-width:768px)]:[height:76px]"}>
          {property.gallery.map((image, index) => (
            <button
              type="button"
              className={active === index ? "active" : ""}
              key={image}
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={active === index}
            >
              <img src={image} alt={`${property.title} thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {full && (
          <motion.div
            className={"gallery-full [position:fixed] [z-index:120] [inset:0] [background:rgba(4,_13,_19,_0.96)] [display:grid] [place-items:center] [padding:24px] [&_img]:[max-width:88vw] [&_img]:[max-height:82vh] [&_img]:[width:auto] [&_img]:[object-fit:contain] [&_img]:[border-radius:var(--radius-sm)]"}
            role="dialog"
            aria-modal="true"
            aria-label={`${property.title} photo lightbox`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) =>
              event.target === event.currentTarget && setFull(false)
            }
          >
            <button
              type="button"
              className={"gallery-full-close [position:absolute] [width:44px] [height:44px] [border:1px_solid_var(--line)] [border-radius:50%] [background:rgba(7,_23,_34,_0.8)] [color:var(--ivory)] [display:grid] [place-items:center] [top:20px] [right:20px]"}
              aria-label="Close gallery"
              onClick={() => setFull(false)}
            >
              <X size={24} />
            </button>
            <button
              type="button"
              className={"gallery-nav gallery-prev [position:absolute] [width:44px] [height:44px] [border:1px_solid_var(--line)] [border-radius:50%] [background:rgba(7,_23,_34,_0.8)] [color:var(--ivory)] [display:grid] [place-items:center] [left:20px] [top:50%] [transform:translateY(-50%)]"}
              aria-label="Previous photo"
              onClick={() =>
                setActive(
                  (active - 1 + property.gallery.length) %
                    property.gallery.length,
                )
              }
            >
              <ArrowLeft size={20} />
            </button>
            <img src={property.gallery[active]} alt={property.title} />
            <button
              type="button"
              className={"gallery-nav gallery-next [position:absolute] [width:44px] [height:44px] [border:1px_solid_var(--line)] [border-radius:50%] [background:rgba(7,_23,_34,_0.8)] [color:var(--ivory)] [display:grid] [place-items:center] [right:20px] [top:50%] [transform:translateY(-50%)]"}
              aria-label="Next photo"
              onClick={() =>
                setActive((active + 1) % property.gallery.length)
              }
            >
              <ArrowRight size={20} />
            </button>
            <div className={"gallery-full-caption [position:absolute] [bottom:20px] [left:50%] [transform:translateX(-50%)] [display:flex] [gap:18px] [font-size:0.8rem] [color:var(--muted)]"}>
              <span>{property.title}</span>
              <span>
                {active + 1} / {property.gallery.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={"details-layout [max-width:var(--container)] [margin:56px_auto_90px] [display:grid] [grid-template-columns:minmax(0,_1fr)_360px] [gap:clamp(32px,_6vw,_84px)] [@media(max-width:1100px)]:[grid-template-columns:1fr]"}>
        <div className={"details-content [&_>_h1]:[font-size:clamp(2.6rem,_4.8vw,_4.4rem)] [&_>_h1]:[line-height:0.95] [&_>_h1]:[margin:6px_0_18px]"}>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>
            {property.location} · {property.postcode}
          </p>
          <h1>{property.title}</h1>
          <div className={"details-specs [display:flex] [flex-wrap:wrap] [gap:24px] [padding:16px_0] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [color:var(--muted)] [font-size:0.82rem] [&_span]:[display:inline-flex] [&_span]:[align-items:center] [&_span]:[gap:8px]"}>
            <span>
              <BedDouble size={16} /> {property.bedrooms} bedrooms
            </span>
            <span>
              <Bath size={16} /> {property.bathrooms} bathrooms
            </span>
            <span>
              <Maximize size={16} /> {property.sqft.toLocaleString()} sq ft
            </span>
          </div>

          <section className={"details-section [padding:48px_0] [border-bottom:1px_solid_var(--line)] [&_h2]:[font-size:clamp(2.1rem,_3.6vw,_3.2rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:18px] [&_>_p:last-child]:[max-width:64ch] [&_>_p:last-child]:[color:var(--muted)]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>THE RESIDENCE</p>
            <h2>
              Quiet luxury,
              <br />
              <em>beautifully considered.</em>
            </h2>
            <p>
              {property.description} Every proportion, material, and threshold
              has been crafted for effortless contemporary British living.
            </p>
          </section>

          <section className={"details-section [padding:48px_0] [border-bottom:1px_solid_var(--line)] [&_h2]:[font-size:clamp(2.1rem,_3.6vw,_3.2rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:18px] [&_>_p:last-child]:[max-width:64ch] [&_>_p:last-child]:[color:var(--muted)]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>KEY FEATURES</p>
            <div className={"feature-grid [display:grid] [grid-template-columns:repeat(2,_1fr)] [gap:10px] [&_span]:[padding:14px_16px] [&_span]:[border:1px_solid_var(--line)] [&_span]:[border-radius:var(--radius-sm)] [&_span]:[background:rgba(255,_255,_255,_0.02)] [&_span]:[font-size:0.82rem] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
              {property.features.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <section className={"details-section [padding:48px_0] [border-bottom:1px_solid_var(--line)] [&_h2]:[font-size:clamp(2.1rem,_3.6vw,_3.2rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:18px] [&_>_p:last-child]:[max-width:64ch] [&_>_p:last-child]:[color:var(--muted)]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>SPECIFICATION</p>
            <div className={"detail-table [display:grid] [grid-template-columns:repeat(2,_1fr)] [gap:10px] [&_div]:[display:flex] [&_div]:[justify-content:space-between] [&_div]:[padding:14px_16px] [&_div]:[border:1px_solid_var(--line)] [&_div]:[border-radius:var(--radius-sm)] [&_div]:[font-size:0.84rem] [&_span]:[color:var(--muted)] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
              <div>
                <span>Tenure</span>
                <b>{property.tenure}</b>
              </div>
              <div>
                <span>Architectural Type</span>
                <b>{property.type}</b>
              </div>
              <div>
                <span>Postcode</span>
                <b>{property.postcode}</b>
              </div>
              <div>
                <span>EPC Rating</span>
                <b>{property.epc}</b>
              </div>
            </div>
          </section>

          <section className={"details-section [padding:48px_0] [border-bottom:1px_solid_var(--line)] [&_h2]:[font-size:clamp(2.1rem,_3.6vw,_3.2rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:18px] [&_>_p:last-child]:[max-width:64ch] [&_>_p:last-child]:[color:var(--muted)]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>NEIGHBOURHOOD &amp; ACCESS</p>
            <div className={"map-placeholder [position:relative] [height:260px] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [background:#0d2633] [overflow:hidden] [display:grid] [place-items:center]"}>
              <div className={"map-grid [position:absolute] [inset:-40px] [transform:rotate(12deg)] [background-image:linear-gradient(rgba(198,_166,_111,_0.14)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(198,_166,_111,_0.14)_1px,_transparent_1px)] [background-size:38px_38px]"} aria-hidden="true" />
              <div className={"map-pin-badge [position:relative] [z-index:2] [display:inline-flex] [align-items:center] [gap:8px] [padding:10px_16px] [border:1px_solid_var(--gold)] [border-radius:var(--radius-sm)] [background:rgba(7,_23,_34,_0.92)] [font-size:0.82rem] [&_svg]:[color:var(--gold)]"}>
                <MapPin size={15} />
                <span>
                  {property.location} · {property.postcode}
                </span>
              </div>
            </div>
            <div className={"amenities [display:flex] [flex-wrap:wrap] [gap:18px] [margin-top:14px] [color:var(--muted)] [font-size:0.78rem]"}>
              {property.nearby.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className={"inquiry-panel [position:sticky] [top:94px] [height:max-content] [padding:28px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:linear-gradient(145deg,_var(--surface-raised),_var(--surface))] [box-shadow:var(--shadow-soft)] [&_>_.status]:[display:block] [&_>_.status]:[font-size:0.65rem] [&_>_.status]:[font-weight:700] [&_>_.status]:[text-transform:uppercase] [&_>_.status]:[letter-spacing:0.14em] [&_>_.status]:[color:var(--gold)] [&_>_strong]:[display:block] [&_>_strong]:[font-family:var(--font-display)] [&_>_strong]:[font-size:2.5rem] [&_>_strong]:[line-height:1.05] [&_>_strong]:[margin-top:8px] [&_>_p]:[font-size:0.74rem] [&_>_p]:[color:var(--muted)] [&_>_p]:[margin-bottom:18px] [&_.button]:[width:100%] [&_.button]:[margin-top:10px] [@media(max-width:1100px)]:[position:static]"}>
          <span className={"status"}>
            {property.status} · {property.badge}
          </span>
          <strong>{formatPrice(property.price, property.rent)}</strong>
          <p>{property.rent ? "Per calendar month" : "Guide price"}</p>
          <button
            type="button"
            className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
            onClick={() => setViewing(true)}
          >
            <CalendarDays size={16} /> Arrange a Viewing
          </button>
          <button
            type="button"
            className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"}
            onClick={() => setViewing(true)}
          >
            <Mail size={16} /> Request Floorplan &amp; Dossier
          </button>
          <div className={"agent [display:flex] [align-items:center] [gap:14px] [margin-top:22px] [padding-top:20px] [border-top:1px_solid_var(--line)] [&_img]:[width:54px] [&_img]:[height:54px] [&_img]:[border-radius:50%] [&_img]:[object-fit:cover] [&_img]:[border:1px_solid_var(--line-gold)] [&_div]:[display:flex] [&_div]:[flex-direction:column] [&_div]:[font-size:0.75rem] [&_span]:[color:var(--muted)] [&_b]:[font-family:var(--font-display)] [&_b]:[font-size:1.15rem] [&_b]:[margin:2px_0]"}>
            <img src={property.advisor.image} alt={property.advisor.name} />
            <div>
              <span>Your property advisor</span>
              <b>{property.advisor.name}</b>
              <a href={`tel:${property.advisor.phone.replace(/[^\d+]/g, "")}`}>
                {property.advisor.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section className={"section similar [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7.25rem)_var(--gutter)] [padding-inline:0]"}>
        <div className={"section-heading [display:flex] [align-items:flex-end] [justify-content:space-between] [gap:32px] [margin-bottom:44px] [&_h2]:[font-size:clamp(2.4rem,_4.4vw,_4rem)] [&_h2]:[line-height:0.96] [&_h2]:[letter-spacing:-0.035em] [&_h2]:[margin:0] [&_>_p]:[max-width:38ch] [&_>_p]:[color:var(--muted)] [&_>_p]:[margin:0] [@media(max-width:768px)]:[flex-direction:column] [@media(max-width:768px)]:[align-items:flex-start] [@media(max-width:768px)]:[margin-bottom:28px]"}>
          <div>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>YOU MAY ALSO LIKE</p>
            <h2>
              Similar <em>Residences</em>
            </h2>
          </div>
        </div>
        <div className={"property-grid [display:grid] [grid-template-columns:repeat(12,_minmax(0,_1fr))] [gap:22px]"}>
          {properties
            .filter((item) => item.id !== property.id)
            .slice(0, 3)
            .map((item, index) => (
              <PropertyCard key={item.id} property={item} index={index} />
            ))}
        </div>
      </section>

      <AnimatePresence>
        {viewing && (
          <ViewingForm
            propertyTitle={property.title}
            onClose={() => setViewing(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
