import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
const projects = [
  [
    "Northbank Residences",
    "Manchester",
    "2027",
    "From £695,000",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  ],
  [
    "The Chelsea Collection",
    "London",
    "2028",
    "From £1.2m",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
  ],
  [
    "Harbour & Grove",
    "Brighton",
    "2026",
    "From £840,000",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=85",
  ],
  [
    "Calder House",
    "Edinburgh",
    "2027",
    "From £575,000",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  ],
];
export default function Developments() {
  return (
    <main className="inner-page developments-page">
      <header className="inner-hero">
        <p className="eyebrow">NEW DEVELOPMENTS</p>
        <h1>
          Future addresses.
          <br />
          <em>Exceptional today.</em>
        </h1>
      </header>
      <section className="developments-list">
        {projects.map(([name, location, date, price, image], index) => (
          <article key={name}>
            <div className="development-image">
              <img src={image} alt={name} />
              <span>0{index + 1}</span>
            </div>
            <div className="development-info">
              <p>{location}</p>
              <h2>{name}</h2>
              <div>
                <span>
                  Completion
                  <br />
                  <b>{date}</b>
                </span>
                <span>
                  Starting from
                  <br />
                  <b>{price}</b>
                </span>
              </div>
              <Link className="button button-ghost" to="/contact?viewing=1">
                Explore project <ArrowUpRight />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
