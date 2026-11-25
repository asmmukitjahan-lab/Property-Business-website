import { Link } from "react-router-dom";

export default function BrandLogo({ className = "", onClick, size = "md" }) {
  return (
    <Link
      className={`brand brand-${size} ${className} [display:inline-flex] [align-items:center] [gap:8px] [color:var(--ivory)] [transition:opacity_0.2s_ease] [&:hover]:[opacity:0.88] ${size === "lg" ? "[&_.brand-wordmark]:[font-size:3rem] [&_.brand-mark]:[width:34px] [&_.brand-mark]:[height:27px]" : ""}`.trim()}
      to="/"
      onClick={onClick}
      aria-label="PJ Property — Home"
    >
      <span className={"brand-wordmark [font-family:var(--font-display)] [font-size:2rem] [font-weight:500] [letter-spacing:-0.04em] [line-height:1]"}>PJ</span>
      <svg
        className={"brand-mark [width:24px] [height:19px] [color:var(--gold)]"}
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 24V12.5L18 3L34 12.5V24"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M11 24V15.5H21.5V24"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeOpacity="0.65"
        />
      </svg>
    </Link>
  );
}
