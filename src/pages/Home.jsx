import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, ShieldCheck, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "../components/hero/HeroSection";
import PropertySearch from "../components/properties/PropertySearch";
import PropertyCard from "../components/properties/PropertyCard";
import { AnimatedCounter, Magnetic } from "../components/ui/MotionPrimitives";
import { useProperties } from "../hooks/usePropertyStore";
import { developments, locations } from "../data/properties";

gsap.registerPlugin(ScrollTrigger);

const PRICE_PRESETS = [1250000, 1850000, 2750000, 4500000];

export default function Home() {
  const { properties } = useProperties();
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmVideoError, setFilmVideoError] = useState(false);
  const reduced = useReducedMotion();
  const showcaseRef = useRef(null);
  const devImgRef = useRef(null);

  useEffect(() => {
    document.title = "PJ | Extraordinary Homes Across the UK";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Discover exceptional homes, prime estates, and private property advisory across the United Kingdom.",
      );
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      if (devImgRef.current) {
        gsap.fromTo(
          devImgRef.current,
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1.01,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: devImgRef.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
      if (showcaseRef.current) {
        gsap.fromTo(
          showcaseRef.current,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: showcaseRef.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!filmOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setFilmOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filmOpen]);

  const featuredList = properties.filter((item) => item.featured).slice(0, 6);
  const leadDevelopment = developments[0];

  return (
    <main>
      <HeroSection />
      <PropertySearch />

      <section className={"section featured-section [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7.25rem)_var(--gutter)] [position:relative] [max-width:none] [padding:clamp(5rem,_8.5vw,_7.5rem)_max(var(--gutter),_calc((100vw_-_var(--container))_/_2))] [background:var(--ivory-warm)] [color:#152b35] [&_.eyebrow]:[color:#8b6c3b] [&_.section-heading_h2]:[color:#0d212c] [&_.section-heading_h2_em]:[color:#8b6c3b] [&_.section-heading_>_p]:[color:var(--muted-dark)] [&_.featured-more]:[display:flex] [&_.featured-more]:[width:max-content] [&_.featured-more]:[margin:48px_auto_0] [&_.featured-more]:[color:#0d212c] [&_.featured-more]:[border-color:#8b6c3b] [&_.featured-more:hover]:[color:#8b6c3b] [&_.property-card:nth-child(1)]:[grid-column:span_5] [&_.property-card:nth-child(5)]:[grid-column:span_5] [&_.property-card:nth-child(2)]:[grid-column:span_3] [&_.property-card:nth-child(6)]:[grid-column:span_3] [&_.property-card:nth-child(3)]:[grid-column:span_4] [&_.property-card:nth-child(4)]:[grid-column:span_4] [&_.property-card:nth-child(1)_.property-image]:[height:340px] [&_.property-card:nth-child(2)_.property-image]:[height:340px] [&_.property-card:nth-child(5)_.property-image]:[height:340px] [&_.property-card:nth-child(6)_.property-image]:[height:340px] [@media(max-width:1100px)]:[&_.property-card:nth-child(n)]:[grid-column:span_6] [@media(max-width:768px)]:[&_.property-card:nth-child(n)]:[grid-column:span_12]"}>
        <div className={"section-heading [display:flex] [align-items:flex-end] [justify-content:space-between] [gap:32px] [margin-bottom:44px] [&_h2]:[font-size:clamp(2.4rem,_4.4vw,_4rem)] [&_h2]:[line-height:0.96] [&_h2]:[letter-spacing:-0.035em] [&_h2]:[margin:0] [&_>_p]:[max-width:38ch] [&_>_p]:[color:var(--muted)] [&_>_p]:[margin:0] [@media(max-width:768px)]:[flex-direction:column] [@media(max-width:768px)]:[align-items:flex-start] [@media(max-width:768px)]:[margin-bottom:28px]"}>
          <div>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>CURATED RESIDENCES</p>
            <h2>
              Discover Your
              <br />
              <em>Dream Home</em>
            </h2>
          </div>
          <p>
            A hand-selected portfolio of townhouses, coastal villas, and country
            estates across Britain’s finest addresses.
          </p>
        </div>

        <div className={"property-grid [display:grid] [grid-template-columns:repeat(12,_minmax(0,_1fr))] [gap:22px]"}>
          {featuredList.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>

        <Link className={"text-link featured-more [display:inline-flex] [align-items:center] [gap:10px] [border-bottom:1px_solid_var(--gold)] [padding-bottom:6px] [background:transparent] [border-top:0] [border-left:0] [border-right:0] [color:var(--ivory)] [font-size:0.72rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.14em] [transition:color_0.25s_ease,_border-color_0.25s_ease,_transform_0.25s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)]"} to="/properties">
          View all properties <ArrowUpRight size={15} />
        </Link>
      </section>

      <section className={"showcase-section [border-bottom:1px_solid_var(--line)] [background:linear-gradient(180deg,_rgba(15,_39,_53,_0.35),_var(--navy))]"} aria-label="PJ signature philosophy">
        <div className={"showcase-inner [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7rem)_var(--gutter)] [display:grid] [grid-template-columns:1.05fr_0.95fr] [align-items:center] [gap:clamp(32px,_5vw,_72px)] [@media(max-width:1100px)]:[grid-template-columns:1fr]"}>
          <div className={"showcase-copy [&_h2]:[font-size:clamp(2.4rem,_4.2vw,_3.8rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:20px] [&_>_p:not(.eyebrow)]:[color:var(--muted)] [&_>_p:not(.eyebrow)]:[max-width:48ch] [&_>_p:not(.eyebrow)]:[margin-bottom:32px]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PRIVATE ADVISORY · SINCE 2011</p>
            <h2>
              Architecture chosen for
              <br />
              <em>how you live.</em>
            </h2>
            <p>
              Beyond public portals, our private office unlocks off-market
              townhouses in Kensington, gated Surrey sanctuaries, and heritage
              Georgian crescents in Edinburgh and Clifton.
            </p>
            <div className={"showcase-metrics [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:16px] [padding:22px_0] [margin-bottom:28px] [border-top:1px_solid_var(--line-gold)] [border-bottom:1px_solid_var(--line)] [&_strong]:[display:block] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:clamp(2rem,_3vw,_2.75rem)] [&_strong]:[font-weight:500] [&_strong]:[line-height:1] [&_strong]:[color:var(--gold-light)] [&_strong]:[margin-bottom:6px] [&_span]:[font-size:0.68rem] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:0.1em] [&_span]:[color:var(--muted)] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
              <div>
                <strong>
                  £<AnimatedCounter value={2} suffix=".4bn" />
                </strong>
                <span>Prime UK Volume</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter value={98} suffix="%" />
                </strong>
                <span>Client Retention</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter value={42} suffix="%" />
                </strong>
                <span>Private Off-Market</span>
              </div>
            </div>
            <div className={"showcase-actions"}>
              <Magnetic>
                <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/contact?viewing=1">
                  Arrange a Consultation <ArrowUpRight size={15} />
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className={"showcase-media [position:relative] [height:490px] [border-radius:var(--radius-md)] [overflow:hidden] [border:1px_solid_var(--line-gold)] [&_img]:[height:100%] [&_img]:[object-fit:cover] [@media(max-width:768px)]:[height:340px]"}>
            <img
              ref={showcaseRef}
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Contemporary British architectural residence at dusk"
              loading="lazy"
            />
            <div className={"showcase-caption [position:absolute] [left:18px] [right:18px] [bottom:18px] [padding:12px_16px] [border-radius:var(--radius-sm)] [border:1px_solid_rgba(255,_255,_255,_0.16)] [background:rgba(7,_23,_34,_0.78)] [backdrop-filter:blur(12px)] [display:flex] [align-items:center] [gap:10px] [font-size:0.78rem] [color:var(--ivory)] [&_svg]:[color:var(--gold-light)] [&_svg]:[flex-shrink:0]"}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Discreet representation across London &amp; Country</span>
            </div>
          </div>
        </div>
      </section>

      <section className={"section locations-section [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7.25rem)_var(--gutter)]"}>
        <div className={"section-heading [display:flex] [align-items:flex-end] [justify-content:space-between] [gap:32px] [margin-bottom:44px] [&_h2]:[font-size:clamp(2.4rem,_4.4vw,_4rem)] [&_h2]:[line-height:0.96] [&_h2]:[letter-spacing:-0.035em] [&_h2]:[margin:0] [&_>_p]:[max-width:38ch] [&_>_p]:[color:var(--muted)] [&_>_p]:[margin:0] [@media(max-width:768px)]:[flex-direction:column] [@media(max-width:768px)]:[align-items:flex-start] [@media(max-width:768px)]:[margin-bottom:28px]"}>
          <div>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>WHERE WE ADVISE</p>
            <h2>
              Explore The <em>UK</em>
            </h2>
          </div>
          <Link className={"text-link [display:inline-flex] [align-items:center] [gap:10px] [border-bottom:1px_solid_var(--gold)] [padding-bottom:6px] [background:transparent] [border-top:0] [border-left:0] [border-right:0] [color:var(--ivory)] [font-size:0.72rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.14em] [transition:color_0.25s_ease,_border-color_0.25s_ease,_transform_0.25s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)]"} to="/locations">
            View all locations <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className={"location-track [display:grid] [grid-template-columns:repeat(4,_minmax(250px,_1fr))] [gap:18px] [overflow-x:auto] [padding-bottom:12px] [scrollbar-color:rgba(226,_201,_142,_0.35)_transparent] [scrollbar-width:thin] [@media(max-width:768px)]:[display:flex]"}>
          {locations.map((location, index) => (
            <Link
              className={"location-card [position:relative] [display:block] [height:410px] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [overflow:hidden] [background:var(--surface)] [transition:transform_0.35s_ease,_border-color_0.35s_ease,_box-shadow_0.35s_ease] [&:hover]:[transform:translateY(-4px)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[box-shadow:var(--shadow-card)] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_img]:[transition:transform_0.65s_ease] [&:hover_img]:[transform:scale(1.06)] [&::after]:[content:\"\"] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background:linear-gradient(_0deg,_rgba(5,_17,_25,_0.94)_0%,_rgba(5,_17,_25,_0.25)_58%,_rgba(5,_17,_25,_0.05)_100%_)] [&:hover_.location-card-arrow]:[border-color:var(--gold)] [&:hover_.location-card-arrow]:[background:rgba(198,_166,_111,_0.2)] [&:hover_.location-card-arrow]:[color:var(--gold-light)] [&.large]:[height:440px] [@media(max-width:768px)]:[min-width:270px] [@media(max-width:768px)]:[height:360px]"}
              to={`/properties?location=${encodeURIComponent(location.name)}`}
              key={location.name}
            >
              <img src={location.image} alt={location.name} loading="lazy" />
              <div className={"location-card-meta [position:absolute] [z-index:2] [left:22px] [right:54px] [bottom:22px] [&_span]:[font-size:0.64rem] [&_span]:[font-weight:600] [&_span]:[color:var(--gold)] [&_span]:[letter-spacing:0.14em] [&_h3]:[font-size:clamp(1.85rem,_2.5vw,_2.3rem)] [&_h3]:[line-height:1.02] [&_h3]:[margin:6px_0_4px] [&_h2]:[font-size:clamp(1.85rem,_2.5vw,_2.3rem)] [&_h2]:[line-height:1.02] [&_h2]:[margin:6px_0_4px] [&_p]:[font-size:0.74rem] [&_p]:[color:var(--muted)] [&_p]:[margin:0_0_4px] [&_small]:[font-size:0.64rem] [&_small]:[text-transform:uppercase] [&_small]:[letter-spacing:0.12em] [&_small]:[color:var(--gold-light)]"}>
                <span>0{index + 1}</span>
                <h3>{location.name}</h3>
                <p>{location.region}</p>
                <small>{location.count} properties</small>
              </div>
              <ArrowUpRight className={"location-card-arrow [position:absolute] [z-index:3] [right:16px] [bottom:18px] [width:36px] [height:36px] [padding:9px] [border:1px_solid_var(--line)] [border-radius:50%] [background:rgba(7,_23,_34,_0.6)] [transition:all_0.22s_ease]"} />
            </Link>
          ))}
        </div>
      </section>

      <section className={"about-banner [display:grid] [grid-template-columns:54%_46%] [min-height:580px] [background:#eeece5] [color:var(--navy)] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
        <div className={"about-banner-image [position:relative] [min-height:460px] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_button]:[position:absolute] [&_button]:[right:-34px] [&_button]:[top:50%] [&_button]:[transform:translateY(-50%)] [&_button]:[width:68px] [&_button]:[height:68px] [&_button]:[border-radius:50%] [&_button]:[border:7px_solid_#eeece5] [&_button]:[background:var(--gold)] [&_button]:[color:var(--navy)] [&_button]:[display:grid] [&_button]:[place-items:center] [&_button]:[transition:transform_0.25s_ease,_background-color_0.25s_ease] [&_button:hover]:[background:var(--gold-light)] [&_button:hover]:[transform:translateY(-50%)_scale(1.06)] [@media(max-width:768px)]:[min-height:320px] [@media(max-width:768px)]:[&_button]:[right:20px] [@media(max-width:768px)]:[&_button]:[top:auto] [@media(max-width:768px)]:[&_button]:[bottom:-32px] [@media(max-width:768px)]:[&_button]:[transform:none] [@media(max-width:768px)]:[&_button:hover]:[transform:scale(1.05)]"}>
          <img
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
            alt="PJ London architectural living space"
            loading="lazy"
          />
          <button
            type="button"
            aria-label="Play PJ brand film"
            onClick={() => setFilmOpen(true)}
          >
            <Play fill="currentColor" size={18} />
          </button>
        </div>

        <motion.div
          className={"about-banner-content [align-self:center] [padding:clamp(3rem,_6vw,_5.5rem)_clamp(2rem,_6vw,_5.5rem)] [max-width:600px] [&_.eyebrow]:[color:#8b6c3b] [&_h2]:[font-size:clamp(2.5rem,_4.4vw,_4.1rem)] [&_h2]:[line-height:0.94] [&_h2]:[color:#0d212c] [&_h2]:[margin-bottom:22px] [&_h2_em]:[color:#8b6c3b] [&_>_p:not(.eyebrow)]:[color:var(--muted-dark)] [&_>_p:not(.eyebrow)]:[margin-bottom:30px]"}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>THE PJ APPROACH</p>
          <h2>
            Building a better
            <br />
            <em>future, together.</em>
          </h2>
          <p>
            At PJ, acquiring or letting a remarkable home feels calm, informed,
            and deeply personal. From discreet first viewings to completion day,
            one dedicated advisor leads every detail.
          </p>
          <div className={"about-banner-actions [display:flex] [flex-wrap:wrap] [align-items:center] [gap:20px]"}>
            <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/about">
              Discover PJ <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              className={"text-link about-film-trigger [display:inline-flex] [align-items:center] [gap:10px] [border-bottom:1px_solid_var(--gold)] [padding-bottom:6px] [background:transparent] [border-top:0] [border-left:0] [border-right:0] [color:var(--ivory)] [font-size:0.72rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.14em] [transition:color_0.25s_ease,_border-color_0.25s_ease,_transform_0.25s_ease] [&:hover]:[color:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [color:#0d212c] [border-color:#8b6c3b] [&:hover]:[color:#8b6c3b]"}
              onClick={() => setFilmOpen(true)}
            >
              Watch the Brand Film
            </button>
          </div>
        </motion.div>
      </section>

      <MortgageCalculator />

      <section className={"section developments-preview [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7.25rem)_var(--gutter)] [padding-top:0]"}>
        <div className={"development-card [position:relative] [height:510px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [overflow:hidden] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&::after]:[content:\"\"] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background:linear-gradient(_90deg,_rgba(6,_19,_28,_0.92)_0%,_rgba(6,_19,_28,_0.48)_55%,_rgba(6,_19,_28,_0.12)_100%_)] [@media(max-width:768px)]:[height:460px]"}>
          <img
            ref={devImgRef}
            src={leadDevelopment.image}
            alt={leadDevelopment.name}
            loading="lazy"
          />
          <div className={"development-card-overlay [position:absolute] [z-index:2] [left:clamp(24px,_5vw,_60px)] [bottom:clamp(24px,_5vw,_56px)] [max-width:min(560px,_calc(100%_-_48px))] [padding:26px] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [background:rgba(7,_23,_34,_0.76)] [backdrop-filter:blur(14px)] [&_h2]:[font-size:clamp(2.1rem,_3.6vw,_3.25rem)] [&_h2]:[line-height:0.98] [&_h2]:[margin-bottom:10px] [@media(max-width:768px)]:[left:16px] [@media(max-width:768px)]:[right:16px] [@media(max-width:768px)]:[bottom:16px] [@media(max-width:768px)]:[max-width:none] [@media(max-width:768px)]:[padding:20px]"}>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>LANDMARK DEVELOPMENT</p>
            <h2>{leadDevelopment.name}</h2>
            <p className={"development-card-meta [color:var(--muted)] [margin-bottom:22px]"}>
              {leadDevelopment.location} · Completion{" "}
              {leadDevelopment.completion} · {leadDevelopment.startingPrice}
            </p>
            <div className={"development-card-actions [display:flex] [flex-wrap:wrap] [gap:10px]"}>
              <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/developments">
                Explore Developments <ArrowUpRight size={15} />
              </Link>
              <Link
                className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"}
                to={`/contact?viewing=1&development=${encodeURIComponent(leadDevelopment.name)}`}
              >
                Request Dossier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={"closing-band [border-top:1px_solid_var(--line)] [background:radial-gradient(_ellipse_at_50%_0%,_rgba(198,_166,_111,_0.1),_transparent_60%_)] [padding:clamp(4rem,_7vw,_6rem)_var(--gutter)] [text-align:center] [&_h2]:[font-size:clamp(2.4rem,_4.2vw,_3.6rem)] [&_h2]:[line-height:0.98] [&_h2]:[margin-bottom:16px] [&_p:not(.eyebrow)]:[color:var(--muted)] [&_p:not(.eyebrow)]:[margin-bottom:28px]"}>
        <div className={"closing-band-inner [max-width:640px] [margin:0_auto]"}>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>
            <Sparkles size={12} aria-hidden="true" /> PRIVATE CLIENT DESK
          </p>
          <h2>
            Looking for something <em>unlisted?</em>
          </h2>
          <p>
            Register your criteria with our Mayfair office for priority access
            to discreet off-market UK residences.
          </p>
          <Magnetic>
            <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/contact?viewing=1">
              Speak with a Senior Advisor <ArrowUpRight size={15} />
            </Link>
          </Magnetic>
        </div>
      </section>

      <AnimatePresence>
        {filmOpen && (
          <motion.div
            className={"film-modal [position:fixed] [z-index:120] [inset:0] [background:rgba(4,_13,_19,_0.92)] [backdrop-filter:blur(14px)] [display:grid] [place-items:center] [padding:24px]"}
            role="dialog"
            aria-modal="true"
            aria-label="PJ brand architectural film"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) =>
              event.target === event.currentTarget && setFilmOpen(false)
            }
          >
            <motion.div
              className={"film-modal-frame [position:relative] [width:min(1060px,_100%)] [aspect-ratio:16_/_9] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [overflow:hidden] [background:var(--navy-deep)] [&_video]:[width:100%] [&_video]:[height:100%] [&_video]:[object-fit:cover] [&_img]:[width:100%] [&_img]:[height:100%] [&_img]:[object-fit:cover]"}
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                className={"film-close [position:absolute] [z-index:4] [top:16px] [right:16px] [width:42px] [height:42px] [border:1px_solid_rgba(255,_255,_255,_0.24)] [border-radius:50%] [background:rgba(7,_23,_34,_0.78)] [color:var(--ivory)] [display:grid] [place-items:center]"}
                onClick={() => setFilmOpen(false)}
                aria-label="Close brand film"
              >
                <X size={22} />
              </button>
              {!filmVideoError ? (
                <video
                  autoPlay
                  controls
                  playsInline
                  poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
                  onError={() => setFilmVideoError(true)}
                >
                  <source
                    src="https://assets.mixkit.co/videos/4198/4198-1080.mp4"
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
                  alt="PJ brand architectural showcase"
                />
              )}
              <div className={"film-caption [position:absolute] [z-index:2] [left:28px] [bottom:24px] [pointer-events:none] [text-shadow:0_2px_16px_rgba(0,_0,_0,_0.7)] [&_h2]:[font-size:clamp(1.75rem,_3vw,_2.75rem)] [&_h2]:[margin:0]"}>
                <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>THE PJ STORY</p>
                <h2>Property, personally considered.</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function estimateStampDuty(price) {
  let tax = 0;
  const bands = [
    [250000, 0],
    [925000, 0.05],
    [1500000, 0.1],
    [Infinity, 0.12],
  ];
  let prev = 0;
  for (const [cap, rate] of bands) {
    if (price > prev) {
      tax += (Math.min(price, cap) - prev) * rate;
      prev = cap;
    }
  }
  return Math.round(tax);
}

function MortgageCalculator() {
  const [price, setPrice] = useState(1850000);
  const [deposit, setDeposit] = useState(25);
  const [rate, setRate] = useState(4.3);
  const [term, setTerm] = useState(25);

  const depositAmount = (price * deposit) / 100;
  const loan = price - depositAmount;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const monthly = monthlyRate
    ? (loan * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
    : loan / months;
  const sdlt = estimateStampDuty(price);

  return (
    <section className={"section calculator-section [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:clamp(4.5rem,_8vw,_7.25rem)_var(--gutter)] [display:grid] [grid-template-columns:minmax(0,_0.95fr)_minmax(0,_1.35fr)] [align-items:center] [gap:clamp(32px,_5vw,_68px)] [@media(max-width:1100px)]:[grid-template-columns:1fr]"}>
      <div className={"calculator-heading [&_h2]:[font-size:clamp(2.5rem,_4.2vw,_3.8rem)] [&_h2]:[line-height:0.94] [&_h2]:[margin-bottom:16px] [&_>_p:not(.eyebrow)]:[color:var(--muted)] [&_>_p:not(.eyebrow)]:[max-width:34ch] [&_>_p:not(.eyebrow)]:[margin-bottom:24px]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PRIVATE FINANCE</p>
        <h2>
          Plan Your <em>Move</em>
        </h2>
        <p>
          Explore an indicative UK repayment and Stamp Duty illustration tailored
          to your acquisition price.
        </p>
        <div className={"calculator-presets [display:flex] [flex-wrap:wrap] [gap:8px] [&_button]:[height:34px] [&_button]:[padding:0_12px] [&_button]:[border:1px_solid_var(--line)] [&_button]:[border-radius:var(--radius-sm)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.72rem] [&_button]:[font-weight:600] [&_button]:[transition:all_0.2s_ease] [&_button:hover]:[border-color:var(--gold)] [&_button:hover]:[background:rgba(198,_166,_111,_0.14)] [&_button:hover]:[color:var(--gold-light)] [&_button.active]:[border-color:var(--gold)] [&_button.active]:[background:rgba(198,_166,_111,_0.14)] [&_button.active]:[color:var(--gold-light)]"} role="group" aria-label="Sample property prices">
          {PRICE_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={price === preset ? "active" : ""}
              onClick={() => setPrice(preset)}
            >
              £{(preset / 1000000).toFixed(preset % 1000000 === 0 ? 1 : 2)}m
            </button>
          ))}
        </div>
      </div>

      <div className={"calculator [display:grid] [grid-template-columns:minmax(0,_1fr)_295px] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:var(--surface)] [overflow:hidden] [box-shadow:var(--shadow-soft)] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
        <div className={"calculator-fields [padding:32px] [display:grid] [gap:24px] [&_label]:[display:block] [&_label_span]:[display:flex] [&_label_span]:[justify-content:space-between] [&_label_span]:[font-size:0.72rem] [&_label_span]:[text-transform:uppercase] [&_label_span]:[letter-spacing:0.1em] [&_label_span]:[color:var(--muted)] [&_label_b]:[color:var(--gold-light)] [&_label_b]:[font-weight:600]"}>
          {[
            ["Property price", price, setPrice, 250000, 6000000, "£", 25000, true],
            ["Deposit", deposit, setDeposit, 10, 75, "%", 1, false],
            ["Interest rate", rate, setRate, 2, 9, "%", 0.1, false],
            ["Mortgage term", term, setTerm, 5, 35, " yrs", 1, false],
          ].map(([label, value, setter, min, max, unit, step, isPrefix]) => (
            <label key={label}>
              <span>
                {label}
                <b>
                  {isPrefix
                    ? `${unit}${value.toLocaleString()}`
                    : `${value.toLocaleString()}${unit}`}
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

        <div className={"calculator-results [padding:32px] [background:linear-gradient(155deg,_var(--deep),_#102a38)] [border-left:1px_solid_var(--line)] [display:flex] [flex-direction:column] [&_>_div]:[display:flex] [&_>_div]:[justify-content:space-between] [&_>_div]:[align-items:baseline] [&_>_div]:[padding:10px_0] [&_>_div]:[border-bottom:1px_solid_var(--line)] [&_>_div]:[font-size:0.78rem] [&_>_div]:[color:var(--muted)] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:1.15rem] [&_strong]:[color:var(--ivory)] [&_.monthly]:[display:block] [&_.monthly]:[border:0] [&_.monthly]:[margin-top:14px] [&_.monthly]:[padding:0] [&_.monthly_strong]:[display:block] [&_.monthly_strong]:[font-size:clamp(2.1rem,_3vw,_2.65rem)] [&_.monthly_strong]:[color:var(--gold-light)] [&_.monthly_strong]:[margin-top:4px] [&_.monthly_small]:[font-family:var(--font-body)] [&_.monthly_small]:[font-size:0.75rem] [&_.monthly_small]:[color:var(--muted)] [&_.monthly_small]:[margin-left:4px] [&_>_p]:[font-size:0.65rem] [&_>_p]:[color:var(--muted)] [&_>_p]:[margin:14px_0_0] [@media(max-width:768px)]:[border-left:0] [@media(max-width:768px)]:[border-top:1px_solid_var(--line)]"}>
          <div>
            <span>Deposit ({deposit}%)</span>
            <strong>£{Math.round(depositAmount).toLocaleString()}</strong>
          </div>
          <div>
            <span>Loan amount</span>
            <strong>£{Math.round(loan).toLocaleString()}</strong>
          </div>
          <div>
            <span>Est. Stamp Duty</span>
            <strong>£{sdlt.toLocaleString()}</strong>
          </div>
          <div className={"monthly"}>
            <span>Estimated monthly</span>
            <strong>
              £{Math.round(monthly).toLocaleString()}
              <small>/month</small>
            </strong>
          </div>
          <Link className={"button button-gold calculator-cta [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)] [width:100%] [margin-top:20px]"} to="/contact">
            Speak with an Advisor
          </Link>
          <p>Indicative UK estimates only. Not financial or tax advice.</p>
        </div>
      </div>
    </section>
  );
}
