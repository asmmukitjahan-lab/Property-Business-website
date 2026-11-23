import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <main className="inner-page about-page">
      <header className="about-hero">
        <div>
          <p className="eyebrow">ABOUT PJ</p>
          <h1>
            Property is more than a place.
            <br />
            <em>It's where life happens.</em>
          </h1>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
          alt="Luxury PJ property"
        />
      </header>
      <section className="story-section">
        <p className="eyebrow">OUR STORY</p>
        <h2>
          Independent thinking.
          <br />
          <em>Personal guidance.</em>
        </h2>
        <p>
          PJ was created for a new generation of property clients: people who
          value discretion, design and meaningful advice. We pair deep market
          knowledge with a highly personal approach.
        </p>
      </section>
      <section className="stats">
        <div>
          <strong>500+</strong>
          <span>Properties Sold</span>
        </div>
        <div>
          <strong>15+</strong>
          <span>Years of Experience</span>
        </div>
        <div>
          <strong>98%</strong>
          <span>Client Satisfaction</span>
        </div>
        <div>
          <strong>UK</strong>
          <span>Nationwide Coverage</span>
        </div>
      </section>
      <p className="demo-note">
        Demo statistics shown for presentation purposes and may be replaced with
        verified company figures.
      </p>
      <section className="values-section">
        <p className="eyebrow">WHAT GUIDES US</p>
        {[
          [
            "01",
            "Our Vision",
            "To make every property journey clearer, calmer and more rewarding.",
          ],
          [
            "02",
            "Our Values",
            "Trust, discretion, clarity and genuine care in every relationship.",
          ],
          [
            "03",
            "Our Expertise",
            "Precise local insight, strategic advice and considered representation.",
          ],
          [
            "04",
            "Our Approach",
            "One dedicated team, fully engaged from first conversation to final key.",
          ],
        ].map(([n, title, text]) => (
          <div key={n}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <section className="team-section">
        <div>
          <p className="eyebrow">OUR TEAM</p>
          <h2>
            Meet the people
            <br />
            <em>behind PJ.</em>
          </h2>
        </div>
        <div className="team-grid">
          {[
            [
              "James Whitmore",
              "Founder & Managing Director",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
            ],
            [
              "Sofia Laurent",
              "Head of Prime Properties",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
            ],
            [
              "Daniel Reed",
              "Director of Developments",
              "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=700&q=85",
            ],
          ].map(([name, role, image]) => (
            <article key={name}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <p>{role}</p>
            </article>
          ))}
        </div>
      </section>
      <Link className="button button-gold about-contact" to="/contact">
        Speak with PJ <ArrowUpRight />
      </Link>
    </main>
  );
}
