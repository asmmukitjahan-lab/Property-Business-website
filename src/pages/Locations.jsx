import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { locations } from "../data/properties";

export default function Locations() {
  useEffect(() => {
    document.title = "UK Locations | PJ";
  }, []);

  return (
    <main className={"inner-page locations-page [min-height:70vh] [padding-top:124px] [&_.inner-hero]:[border-bottom:1px_solid_var(--line)]"}>
      <header className={"inner-hero [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:52px_var(--gutter)_56px] [&_h1]:[font-size:clamp(2.85rem,_6.2vw,_5.4rem)] [&_h1]:[line-height:0.92] [&_h1]:[letter-spacing:-0.04em] [&_h1]:[margin:0]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>UNITED KINGDOM</p>
        <h1>
          Extraordinary places
          <br />
          <em>to belong.</em>
        </h1>
      </header>

      <section className={"locations-grid [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:48px_var(--gutter)_100px] [display:grid] [grid-template-columns:repeat(2,_minmax(0,_1fr))] [gap:20px] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
        {locations.map((location, index) => (
          <motion.div
            key={location.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ delay: (index % 2) * 0.08, duration: 0.5 }}
          >
            <Link
              className={"location-card large [position:relative] [display:block] [height:410px] [border:1px_solid_var(--line)] [border-radius:var(--radius-md)] [overflow:hidden] [background:var(--surface)] [transition:transform_0.35s_ease,_border-color_0.35s_ease,_box-shadow_0.35s_ease] [&:hover]:[transform:translateY(-4px)] [&:hover]:[border-color:var(--line-gold)] [&:hover]:[box-shadow:var(--shadow-card)] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_img]:[transition:transform_0.65s_ease] [&:hover_img]:[transform:scale(1.06)] [&::after]:[content:\"\"] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background:linear-gradient(_0deg,_rgba(5,_17,_25,_0.94)_0%,_rgba(5,_17,_25,_0.25)_58%,_rgba(5,_17,_25,_0.05)_100%_)] [&:hover_.location-card-arrow]:[border-color:var(--gold)] [&:hover_.location-card-arrow]:[background:rgba(198,_166,_111,_0.2)] [&:hover_.location-card-arrow]:[color:var(--gold-light)] [&.large]:[height:440px] [@media(max-width:768px)]:[min-width:270px] [@media(max-width:768px)]:[height:360px]"}
              to={`/properties?location=${encodeURIComponent(location.name)}`}
            >
              <img src={location.image} alt={location.name} loading="lazy" />
              <div className={"location-card-meta [position:absolute] [z-index:2] [left:22px] [right:54px] [bottom:22px] [&_span]:[font-size:0.64rem] [&_span]:[font-weight:600] [&_span]:[color:var(--gold)] [&_span]:[letter-spacing:0.14em] [&_h3]:[font-size:clamp(1.85rem,_2.5vw,_2.3rem)] [&_h3]:[line-height:1.02] [&_h3]:[margin:6px_0_4px] [&_h2]:[font-size:clamp(1.85rem,_2.5vw,_2.3rem)] [&_h2]:[line-height:1.02] [&_h2]:[margin:6px_0_4px] [&_p]:[font-size:0.74rem] [&_p]:[color:var(--muted)] [&_p]:[margin:0_0_4px] [&_small]:[font-size:0.64rem] [&_small]:[text-transform:uppercase] [&_small]:[letter-spacing:0.12em] [&_small]:[color:var(--gold-light)]"}>
                <span>0{index + 1}</span>
                <h2>{location.name}</h2>
                <p>{location.region}</p>
                <small>{location.count} properties</small>
              </div>
              <ArrowUpRight className={"location-card-arrow [position:absolute] [z-index:3] [right:16px] [bottom:18px] [width:36px] [height:36px] [padding:9px] [border:1px_solid_var(--line)] [border-radius:50%] [background:rgba(7,_23,_34,_0.6)] [transition:all_0.22s_ease]"} />
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
