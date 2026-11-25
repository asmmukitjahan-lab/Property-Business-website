import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Camera, Users } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const cleaned = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
    setEmail("");
  };

  return (
    <footer className={"footer [position:relative] [overflow:hidden] [border-top:1px_solid_var(--line)] [background:var(--navy-deep)] [padding:72px_var(--gutter)_28px] [&_h4]:[font-family:var(--font-body)] [&_h4]:[font-size:0.68rem] [&_h4]:[font-weight:700] [&_h4]:[text-transform:uppercase] [&_h4]:[letter-spacing:0.16em] [&_h4]:[color:var(--gold)] [&_h4]:[margin:4px_0_20px]"}>
      <div className={"footer-glow [position:absolute] [width:480px] [height:480px] [right:-180px] [bottom:-280px] [border-radius:50%] [background:rgba(198,_166,_111,_0.08)] [filter:blur(40px)] [pointer-events:none]"} aria-hidden="true" />
      <div className={"footer-main [max-width:var(--container)] [margin:0_auto] [display:grid] [grid-template-columns:1.8fr_1fr_1fr_1.6fr] [gap:clamp(28px,_4vw,_52px)] [@media(max-width:1100px)]:[grid-template-columns:1fr_1fr] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
        <div className={"footer-brand [&_>_p]:[color:var(--muted)] [&_>_p]:[max-width:28ch] [&_>_p]:[font-size:0.88rem]"}>
          <BrandLogo className={"footer-logo [margin-bottom:18px]"} />
          <p>
            Private property advisory and prime residential representation
            across the United Kingdom.
          </p>
          <div className={"socials [display:flex] [gap:8px] [margin-top:24px] [&_a]:[width:40px] [&_a]:[height:40px] [&_a]:[border:1px_solid_var(--line)] [&_a]:[border-radius:var(--radius-sm)] [&_a]:[display:grid] [&_a]:[place-items:center] [&_a]:[color:var(--ivory)] [&_a]:[transition:all_0.2s_ease] [&_a:hover]:[border-color:var(--gold)] [&_a:hover]:[color:var(--gold-light)] [&_a:hover]:[background:rgba(198,_166,_111,_0.08)] [&_svg]:[width:15px]"}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Camera />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <BriefcaseBusiness />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Users />
            </a>
          </div>
        </div>

        <div className={"footer-links [&_a]:[display:block] [&_a]:[color:var(--muted)] [&_a]:[font-size:0.84rem] [&_a]:[margin:11px_0] [&_a]:[transition:color_0.2s_ease] [&_a:hover]:[color:var(--gold-light)]"}>
          <h4>Explore</h4>
          <Link to="/properties">All Properties</Link>
          <Link to="/properties?mode=buy">Buy</Link>
          <Link to="/properties?mode=rent">Rent</Link>
          <Link to="/developments">New Developments</Link>
          <Link to="/locations">UK Locations</Link>
        </div>

        <div className={"footer-links [&_a]:[display:block] [&_a]:[color:var(--muted)] [&_a]:[font-size:0.84rem] [&_a]:[margin:11px_0] [&_a]:[transition:color_0.2s_ease] [&_a:hover]:[color:var(--gold-light)]"}>
          <h4>Company</h4>
          <Link to="/about">About PJ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact?viewing=1">Book a Viewing</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>

        <div className={"footer-newsletter [&_form]:[display:flex] [&_form]:[border-bottom:1px_solid_var(--line)] [&_input]:[flex:1] [&_input]:[min-width:0] [&_input]:[height:46px] [&_input]:[border:0] [&_input]:[background:transparent] [&_input]:[color:var(--ivory)] [&_input]:[outline:0] [&_input]:[font-size:0.86rem] [&_form_button]:[width:44px] [&_form_button]:[border:0] [&_form_button]:[background:transparent] [&_form_button]:[color:var(--gold)] [&_form_button]:[display:grid] [&_form_button]:[place-items:center]"}>
          <h4>Private market updates</h4>
          <p className={"footer-newsletter-copy [font-size:0.82rem] [color:var(--muted)] [margin-bottom:12px]"}>
            Discreet briefings on off-market estates and new UK launches.
          </p>
          {sent ? (
            <div className={"newsletter-success [color:#7bc49b] [font-size:0.85rem]"} role="status" aria-live="polite">
              <p>Thank you — you are subscribed to PJ Private Updates.</p>
              <button
                type="button"
                className={"newsletter-reset [margin-top:6px] [padding:0] [border:0] [background:transparent] [color:var(--gold-light)] [font-size:0.72rem] [text-decoration:underline]"}
                onClick={() => setSent(false)}
              >
                Use another email
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Email address"
                aria-label="Email address"
                aria-invalid={Boolean(error)}
              />
              <button type="submit" aria-label="Subscribe to market updates">
                <ArrowUpRight />
              </button>
            </form>
          )}
          {error && (
            <small className={"newsletter-error [display:block] [margin-top:8px] [color:#e6a095] [font-size:0.75rem]"} role="alert">
              {error}
            </small>
          )}
          <div className={"footer-office [display:flex] [flex-direction:column] [margin-top:24px] [font-size:0.8rem] [color:var(--muted)] [line-height:1.85] [&_span]:[color:var(--ivory)] [&_span]:[font-weight:600] [&_a:hover]:[color:var(--gold-light)]"}>
            <span>London · Mayfair Head Office</span>
            <a href="tel:+442079460280">+44 (0)20 7946 0280</a>
            <a href="mailto:hello@pjproperty.co.uk">hello@pjproperty.co.uk</a>
          </div>
        </div>
      </div>

      <div className={"footer-bottom [max-width:var(--container)] [margin:56px_auto_0] [padding-top:20px] [border-top:1px_solid_var(--line)] [display:flex] [justify-content:space-between] [gap:16px] [font-size:0.68rem] [text-transform:uppercase] [letter-spacing:0.1em] [color:#788892] [@media(max-width:768px)]:[flex-direction:column]"}>
        <span>© 2026 PJ Property Ltd. All rights reserved.</span>
        <span>London · Surrey · Manchester · Edinburgh · Brighton</span>
      </div>
    </footer>
  );
}
