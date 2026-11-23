import { useState } from "react";
import { Camera, BriefcaseBusiness, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setEmail("");
  };
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand footer-logo" to="/">
            <span>PJ</span>
            <i />
          </Link>
          <p>Your trusted property partner across the UK.</p>
          <div className="socials">
            <a href="https://instagram.com" aria-label="Instagram">
              <Camera />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <BriefcaseBusiness />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <Users />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/properties">Properties</Link>
          <Link to="/properties?mode=buy">Buy</Link>
          <Link to="/properties?mode=rent">Rent</Link>
          <Link to="/developments">New Developments</Link>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <Link to="/about">About PJ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
        <div className="footer-newsletter">
          <h4>Private market updates</h4>
          {sent ? (
            <p className="newsletter-success">
              Thank you — you are now subscribed.
            </p>
          ) : (
            <form onSubmit={submit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
              />
              <button aria-label="Subscribe">
                <ArrowUpRight />
              </button>
            </form>
          )}
          <div className="footer-office">
            <span>London</span>
            <a href="tel:+442079460280">+44 (0)20 7946 0280</a>
            <a href="mailto:hello@pjproperty.co.uk">hello@pjproperty.co.uk</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PJ Property. All rights reserved.</span>
        <span>London · Manchester · Birmingham · Edinburgh</span>
      </div>
    </footer>
  );
}
