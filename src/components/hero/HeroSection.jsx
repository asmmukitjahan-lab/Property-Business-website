import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { heroSlides } from "../../data/properties";
import { Magnetic } from "../ui/MotionPrimitives";

const SLIDE_INTERVAL_MS = 7500;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoFailed, setVideoFailed] = useState({});
  const reduced = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 70, damping: 24 });
  const parallaxY = useSpring(pointerY, { stiffness: 70, damping: 24 });

  useEffect(() => {
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  function handlePointerMove(event) {
    if (reduced) return;
    const { innerWidth, innerHeight } = window;
    if (innerWidth < 1024) return;
    const nx = (event.clientX / innerWidth - 0.5) * -18;
    const ny = (event.clientY / innerHeight - 0.5) * -12;
    pointerX.set(nx);
    pointerY.set(ny);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const currentSlide = heroSlides[activeIndex];
  const showVideo = !reduced && !videoFailed[currentSlide.id];

  return (
    <section
      className={"hero-section [position:relative] [height:min(920px,_100svh)] [min-height:690px] [overflow:hidden] [isolation:isolate] [&::after]:[content:\"\"] [&::after]:[position:absolute] [&::after]:[z-index:3] [&::after]:[inset:18px] [&::after]:[border:1px_solid_rgba(255,_255,_255,_0.1)] [&::after]:[pointer-events:none] [@media(max-width:768px)]:[height:min(760px,_100svh)] [@media(max-width:768px)]:[min-height:620px] [@media(max-width:768px)]:[&::after]:[inset:10px]"}
      aria-label="Featured British luxury properties"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className={"hero-media-stage [position:absolute] [inset:-3%] [z-index:0] [will-change:transform]"}
        style={reduced ? undefined : { x: parallaxX, y: parallaxY }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id}
            className={"hero-media-layer [position:absolute] [inset:0]"}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className={"hero-fallback-img [position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center] animate-hero-ken-burns"}
              src={currentSlide.image}
              alt={`${currentSlide.title} in ${currentSlide.label}`}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
            />
            {showVideo && (
              <video
                key={currentSlide.video}
                className={"hero-video [position:absolute] [inset:0] [width:100%] [height:100%] [object-fit:cover] [object-position:center]"}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={currentSlide.image}
                onError={() =>
                  setVideoFailed((prev) => ({
                    ...prev,
                    [currentSlide.id]: true,
                  }))
                }
              >
                <source src={currentSlide.video} type="video/mp4" />
              </video>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className={"hero-overlay [position:absolute] [inset:0] [z-index:1] [background:linear-gradient(_90deg,_rgba(4,_15,_23,_0.88)_0%,_rgba(4,_15,_23,_0.56)_48%,_rgba(4,_15,_23,_0.22)_100%_),_linear-gradient(0deg,_rgba(7,_23,_34,_0.86)_0%,_transparent_52%)]"} aria-hidden="true" />
      <div className={"hero-atmosphere [position:absolute] [inset:0] [z-index:1] [background:radial-gradient(_circle_at_78%_24%,_rgba(198,_166,_111,_0.14),_transparent_42%_)] [pointer-events:none]"} aria-hidden="true" />
      <div className={"hero-grid [position:absolute] [inset:0] [z-index:2] [opacity:0.4] [background-image:linear-gradient(rgba(255,_255,_255,_0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,_255,_255,_0.03)_1px,_transparent_1px)] [background-size:92px_92px] [mask-image:linear-gradient(90deg,_#000_0%,_transparent_72%)] [pointer-events:none]"} aria-hidden="true" />

      <div className={"hero-inner [position:relative] [z-index:4] [height:100%] [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:0_var(--gutter)] [display:flex] [align-items:flex-end] [justify-content:space-between] [padding-bottom:clamp(6.5rem,_15vh,_10rem)] [gap:32px] [@media(max-width:768px)]:[padding-bottom:7.5rem]"}>
        <motion.div
          className={"hero-content [max-width:780px]"}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.p
            className={"eyebrow hero-eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px] [margin-bottom:20px] [&::before]:[content:\"\"] [&::before]:[width:28px] [&::before]:[height:1px] [&::before]:[background:var(--gold)]"}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
          >
            PRIVATE PROPERTY · UNITED KINGDOM
          </motion.p>

          <h1 className={"hero-title [margin:0_0_24px] [font-size:clamp(3.4rem,_7vw,_6.75rem)] [line-height:0.9] [letter-spacing:-0.045em] [&_em]:[color:var(--gold-light)] [&_em]:[text-shadow:0_8px_36px_rgba(0,_0,_0,_0.3)] [@media(max-width:768px)]:[font-size:clamp(2.75rem,_11.5vw,_4rem)]"}>
            <span className={"hero-line-mask [display:block] [overflow:hidden] [padding-bottom:0.06em]"}>
              <motion.span
                className={"hero-line [display:block]"}
                variants={{
                  hidden: { y: "105%", opacity: 0 },
                  show: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                Find a place
              </motion.span>
            </span>
            <span className={"hero-line-mask [display:block] [overflow:hidden] [padding-bottom:0.06em]"}>
              <motion.span
                className={"hero-line [display:block]"}
                variants={{
                  hidden: { y: "105%", opacity: 0 },
                  show: {
                    y: "0%",
                    opacity: 1,
                    transition: {
                      duration: 0.95,
                      delay: 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                to call <em>extraordinary.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className={"hero-sub [max-width:44ch] [margin-bottom:30px] [color:rgba(243,_240,_233,_0.85)] [font-size:clamp(0.95rem,_1.15vw,_1.08rem)]"}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            Architectural townhouses, country estates, and landmark residences
            across Great Britain — curated with quiet discretion.
          </motion.p>

          <motion.div
            className={"hero-actions [display:flex] [flex-wrap:wrap] [gap:12px] [@media(max-width:420px)]:[flex-direction:column] [@media(max-width:420px)]:[width:100%] [@media(max-width:420px)]:[&_.button]:[width:100%]"}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <Magnetic>
              <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/properties">
                Explore Properties <ArrowUpRight />
              </Link>
            </Magnetic>
            <Magnetic strength={0.14}>
              <Link className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"} to="/about">
                Discover Our Approach <ArrowDownRight />
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.aside
          className={"hero-note [width:274px] [flex-shrink:0] [padding:20px_22px] [border:1px_solid_rgba(255,_255,_255,_0.2)] [border-radius:var(--radius-md)] [background:linear-gradient(_145deg,_rgba(7,_23,_34,_0.72),_rgba(16,_42,_56,_0.45)_)] [backdrop-filter:blur(16px)] [box-shadow:var(--shadow-soft)] [@media(max-width:1100px)]:[display:none]"}
          aria-label="Featured showcase residence"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
        >
          <div className={"hero-note-top [display:flex] [align-items:center] [gap:7px] [color:var(--gold-light)] [font-size:0.62rem] [font-weight:700] [letter-spacing:0.16em] [margin-bottom:10px]"}>
            <Sparkles size={12} aria-hidden="true" />
            <span>SIGNATURE PORTFOLIO</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className={"hero-note-title [font-family:var(--font-display)] [font-size:1.55rem] [line-height:1.1] [margin-bottom:10px]"}>{currentSlide.title}</p>
              <div className={"hero-note-meta [display:flex] [align-items:baseline] [justify-content:space-between] [gap:10px] [font-size:0.75rem] [color:var(--muted)] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:1.15rem] [&_strong]:[color:var(--gold-light)]"}>
                <span>{currentSlide.label}</span>
                <strong>{currentSlide.price}</strong>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className={"hero-note-bar [width:42px] [height:1px] [margin-top:14px] [background:var(--gold)]"} aria-hidden="true" />
        </motion.aside>
      </div>

      <div
        className={"hero-slide [position:absolute] [z-index:5] [right:clamp(24px,_3vw,_44px)] [top:50%] [transform:translateY(-50%)] [display:flex] [flex-direction:column] [gap:10px] [@media(max-width:768px)]:[top:auto] [@media(max-width:768px)]:[bottom:28px] [@media(max-width:768px)]:[left:22px] [@media(max-width:768px)]:[right:auto] [@media(max-width:768px)]:[transform:none] [@media(max-width:768px)]:[flex-direction:row] [@media(max-width:768px)]:[gap:10px]"}
        role="tablist"
        aria-label="Hero showcase slides"
      >
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Show ${slide.title} (${slide.label})`}
              className={`hero-slide-btn ${isActive ? "active" : ""} [display:flex] [flex-direction:row] [align-items:center] [gap:8px] [padding:4px] [border:0] [background:transparent] [color:rgba(243,_240,_233,_0.48)] [font-size:0.64rem] [font-weight:600] [letter-spacing:0.12em] [transition:color_0.22s_ease] [&.active]:[color:var(--gold-light)] [&:hover]:[color:var(--gold-light)]`}
              onClick={() => setActiveIndex(index)}
            >
              <span>0{index + 1}</span>
              <span className={"hero-slide-track [position:relative] [width:24px] [height:2px] [background:rgba(255,_255,_255,_0.22)] [overflow:hidden] [@media(max-width:768px)]:[width:18px] [@media(max-width:768px)]:[height:2px]"} aria-hidden="true">
                {isActive && (
                  <motion.span
                    key={`progress-${activeIndex}`}
                    className={"hero-slide-fill [position:absolute] [inset:0] [background:var(--gold-light)] [transform-origin:left]"}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: reduced ? 0 : SLIDE_INTERVAL_MS / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <a
        className={"hero-scroll [position:absolute] [z-index:5] [right:clamp(24px,_3.5vw,_48px)] [bottom:34px] [display:inline-flex] [align-items:center] [gap:12px] [font-size:0.62rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.16em] [color:rgba(243,_240,_233,_0.78)] [&_i]:[width:42px] [&_i]:[height:42px] [&_i]:[border:1px_solid_rgba(255,_255,_255,_0.24)] [&_i]:[border-radius:50%] [&_i]:[position:relative] [&_i]:[transition:border-color_0.25s_ease] [&:hover_i]:[border-color:var(--gold)] [&_i::after]:[content:\"\"] [&_i::after]:[position:absolute] [&_i::after]:[left:17px] [&_i::after]:[top:15px] [&_i::after]:[width:6px] [&_i::after]:[height:6px] [&_i::after]:[border-right:1px_solid_var(--gold)] [&_i::after]:[border-bottom:1px_solid_var(--gold)] [&_i::after]:[transform:rotate(45deg)] [@media(max-width:768px)]:[bottom:24px] [@media(max-width:768px)]:[right:20px] [@media(max-width:768px)]:[&_span]:[display:none]"}
        href="#search"
        aria-label="Scroll to property search"
      >
        <span>Scroll to explore</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
