import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../components/ui/MotionPrimitives";

export default function About() {
  useEffect(() => {
    document.title = "About PJ | Private Property Advisory";
  }, []);

  return (
    <main className={"inner-page about-page [min-height:70vh] [padding-top:124px]"}>
      <header className={"about-hero [position:relative] [height:min(640px,_78vh)] [min-height:460px] [overflow:hidden] [&_img]:[height:100%] [&_img]:[object-fit:cover] [&::after]:[content:\"\"] [&::after]:[position:absolute] [&::after]:[inset:0] [&::after]:[background:linear-gradient(0deg,_var(--navy)_4%,_rgba(7,_23,_34,_0.35)_70%)]"}>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
          alt="PJ London architectural property"
        />
        <div className={"about-hero-copy [position:relative] [z-index:2] [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:-180px_auto_0] [padding:0_var(--gutter)_40px] [&_h1]:[font-size:clamp(2.8rem,_5.5vw,_5rem)] [&_h1]:[line-height:0.92]"}>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>ABOUT PJ</p>
          <h1>
            Property is more than a place.
            <br />
            <em>It’s where life happens.</em>
          </h1>
        </div>
      </header>

      <section className={"story-section [max-width:820px] [margin:0_auto] [padding:72px_var(--gutter)] [&_h2]:[font-size:clamp(2.4rem,_4.4vw,_3.8rem)] [&_h2]:[line-height:0.96] [&_h2]:[margin-bottom:20px] [&_>_p:last-child]:[font-size:1.05rem] [&_>_p:last-child]:[color:var(--muted)]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>OUR STORY</p>
        <h2>
          Independent thinking.
          <br />
          <em>Personal guidance.</em>
        </h2>
        <p>
          PJ was founded in Mayfair for a new generation of discerning property
          clients — people who value architectural provenance, quiet
          discretion, and strategic counsel over volume brokerage.
        </p>
      </section>

      <section className={"stats [max-width:var(--container)] [margin:0_auto] [padding:48px_var(--gutter)] [display:grid] [grid-template-columns:repeat(4,_1fr)] [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [&_div]:[text-align:center] [&_div]:[border-right:1px_solid_var(--line)] [&_div]:[padding:12px] [&_div:last-child]:[border-right:0] [&_strong]:[display:block] [&_strong]:[font-family:var(--font-display)] [&_strong]:[font-size:clamp(2.4rem,_4vw,_3.5rem)] [&_strong]:[color:var(--gold-light)] [&_strong]:[line-height:1] [&_span]:[display:block] [&_span]:[margin-top:8px] [&_span]:[font-size:0.68rem] [&_span]:[text-transform:uppercase] [&_span]:[letter-spacing:0.12em] [&_span]:[color:var(--muted)] [@media(max-width:768px)]:[grid-template-columns:1fr_1fr] [@media(max-width:768px)]:[&_div]:[border-right:0] [@media(max-width:768px)]:[&_div]:[border-bottom:1px_solid_var(--line)]"} aria-label="PJ track record">
        <div>
          <strong>
            <AnimatedCounter value={500} suffix="+" />
          </strong>
          <span>Residences Placed</span>
        </div>
        <div>
          <strong>
            <AnimatedCounter value={15} suffix="+" />
          </strong>
          <span>Years of Advisory</span>
        </div>
        <div>
          <strong>
            <AnimatedCounter value={98} suffix="%" />
          </strong>
          <span>Client Satisfaction</span>
        </div>
        <div>
          <strong>
            <AnimatedCounter value={8} />
          </strong>
          <span>Prime UK Regions</span>
        </div>
      </section>

      <p className={"demo-note [text-align:center] [color:var(--muted)] [font-size:0.7rem] [margin:16px_0_0]"}>
        Illustrative figures presented for brand showcase purposes.
      </p>

      <section className={"values-section [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:88px_var(--gutter)] [&_>_div]:[display:grid] [&_>_div]:[grid-template-columns:90px_1fr_1.2fr] [&_>_div]:[align-items:center] [&_>_div]:[gap:20px] [&_>_div]:[padding:26px_0] [&_>_div]:[border-bottom:1px_solid_var(--line)] [&_>_div_span]:[color:var(--gold)] [&_>_div_span]:[font-size:0.85rem] [&_h3]:[font-size:2rem] [&_h3]:[margin:0] [&_p]:[color:var(--muted)] [&_p]:[margin:0] [@media(max-width:768px)]:[&_>_div]:[grid-template-columns:44px_1fr] [@media(max-width:768px)]:[&_>_div_p]:[grid-column:1_/_-1]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>WHAT GUIDES US</p>
        {[
          [
            "01",
            "Our Vision",
            "To make every acquisition and sale across the UK calmer, clearer, and deeply considered.",
          ],
          [
            "02",
            "Our Values",
            "Discretion, architectural literacy, integrity, and unhurried personal attention.",
          ],
          [
            "03",
            "Our Expertise",
            "Granular street-level valuation across London, Surrey, Edinburgh, and prime regional enclaves.",
          ],
          [
            "04",
            "Our Approach",
            "One dedicated senior partner guiding you from confidential briefing to completion.",
          ],
        ].map(([n, title, text]) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
          >
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.div>
        ))}
      </section>

      <section className={"team-section [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:24px_var(--gutter)_72px] [&_>_div:first-child_h2]:[font-size:clamp(2.4rem,_4.2vw,_3.6rem)] [&_>_div:first-child_h2]:[line-height:0.96] [&_>_div:first-child_h2]:[margin-bottom:36px]"}>
        <div>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>SENIOR LEADERSHIP</p>
          <h2>
            Meet the people
            <br />
            <em>behind PJ.</em>
          </h2>
        </div>

        <div className={"team-grid [display:grid] [grid-template-columns:repeat(3,_1fr)] [gap:22px] [&_article]:[padding:10px_10px_18px] [&_article]:[border:1px_solid_var(--line)] [&_article]:[border-radius:var(--radius-md)] [&_article]:[background:var(--surface)] [&_article]:[transition:transform_0.3s_ease,_border-color_0.3s_ease] [&_article:hover]:[transform:translateY(-4px)] [&_article:hover]:[border-color:var(--line-gold)] [&_img]:[height:360px] [&_img]:[border-radius:var(--radius-sm)] [&_img]:[object-fit:cover] [&_h3]:[font-size:1.6rem] [&_h3]:[margin:16px_10px_4px] [&_p]:[margin:0_10px] [&_p]:[font-size:0.8rem] [&_p]:[color:var(--muted)] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
          {[
            [
              "James Whitmore",
              "Founder & Managing Director · Mayfair",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
            ],
            [
              "Sofia Laurent",
              "Head of Prime Properties · London & Surrey",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
            ],
            [
              "Daniel Reed",
              "Director of Developments · North & Scotland",
              "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=85",
            ],
          ].map(([name, role, image], index) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <img src={image} alt={name} loading="lazy" />
              <h3>{name}</h3>
              <p>{role}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <Link className={"button button-gold about-contact [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)] [display:flex] [width:max-content] [margin:0_auto_96px]"} to="/contact?viewing=1">
        Speak with PJ <ArrowUpRight size={15} />
      </Link>
    </main>
  );
}
