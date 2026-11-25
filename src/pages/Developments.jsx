import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { developments } from "../data/properties";

export default function Developments() {
  useEffect(() => {
    document.title = "New Developments | PJ";
  }, []);

  return (
    <main className={"inner-page developments-page [min-height:70vh] [padding-top:124px] [&_.inner-hero]:[border-bottom:1px_solid_var(--line)]"}>
      <header className={"inner-hero [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:52px_var(--gutter)_56px] [&_h1]:[font-size:clamp(2.85rem,_6.2vw,_5.4rem)] [&_h1]:[line-height:0.92] [&_h1]:[letter-spacing:-0.04em] [&_h1]:[margin:0]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>NEW DEVELOPMENTS</p>
        <h1>
          Future addresses.
          <br />
          <em>Exceptional today.</em>
        </h1>
      </header>

      <section className={"developments-list [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:48px_var(--gutter)_100px] [display:grid] [gap:28px] [&_article]:[display:grid] [&_article]:[grid-template-columns:56%_44%] [&_article]:[border:1px_solid_var(--line)] [&_article]:[border-radius:var(--radius-md)] [&_article]:[background:var(--surface)] [&_article]:[overflow:hidden] [&_article.is-mirrored_.development-image]:[order:2] [@media(max-width:1100px)]:[&_article]:[grid-template-columns:1fr] [@media(max-width:1100px)]:[&_article.is-mirrored_.development-image]:[order:0]"}>
        {developments.map((project, index) => (
          <motion.article
            key={project.id}
            className={index % 2 === 1 ? "is-mirrored" : ""}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
          >
            <div className={"development-image [position:relative] [min-height:400px] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&_span]:[position:absolute] [&_span]:[left:18px] [&_span]:[top:18px] [&_span]:[width:40px] [&_span]:[height:40px] [&_span]:[border:1px_solid_var(--line-gold)] [&_span]:[border-radius:var(--radius-sm)] [&_span]:[background:rgba(7,_23,_34,_0.8)] [&_span]:[display:grid] [&_span]:[place-items:center] [&_span]:[font-size:0.7rem] [&_span]:[color:var(--gold-light)]"}>
              <img src={project.image} alt={project.name} loading="lazy" />
              <span>0{index + 1}</span>
            </div>
            <div className={"development-info [padding:clamp(28px,_4vw,_52px)] [display:flex] [flex-direction:column] [justify-content:center] [&_h2]:[font-size:clamp(2rem,_3.2vw,_3rem)] [&_h2]:[line-height:0.98] [&_h2]:[margin-bottom:14px]"}>
              <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>{project.location}</p>
              <h2>{project.name}</h2>
              <p className={"development-summary [color:var(--muted)] [font-size:0.9rem] [margin-bottom:24px]"}>{project.summary}</p>
              <div className={"development-specs [display:grid] [grid-template-columns:1fr_1fr] [gap:16px] [padding:20px_0] [margin-bottom:26px] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [&_span]:[font-size:0.7rem] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:0.1em] [&_span]:[color:var(--muted)] [&_b]:[display:block] [&_b]:[margin-top:4px] [&_b]:[color:var(--ivory)] [&_b]:[font-size:0.9rem] [&_b]:[text-transform:none] [&_b]:[letter-spacing:0]"}>
                <span>
                  Completion
                  <b>{project.completion}</b>
                </span>
                <span>
                  Starting from
                  <b>{project.startingPrice}</b>
                </span>
                <span>
                  Architect
                  <b>{project.architect}</b>
                </span>
                <span>
                  Collection
                  <b>{project.units}</b>
                </span>
              </div>
              <Link
                className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                to={`/contact?viewing=1&development=${encodeURIComponent(project.name)}`}
              >
                Request Private Dossier <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
