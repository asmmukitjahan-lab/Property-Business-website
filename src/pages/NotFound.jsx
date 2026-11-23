import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="inner-page not-found">
      <p className="eyebrow">404 · ADDRESS NOT FOUND</p>
      <h1>
        This place is <em>unavailable.</em>
      </h1>
      <Link className="button button-gold" to="/">
        Return Home
      </Link>
    </main>
  );
}
