import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 · Page Not Found | PJ";
  }, []);

  return (
    <main className={"inner-page not-found [min-height:70vh] [padding-top:124px] [padding:200px_var(--gutter)_140px] [text-align:center] [background:linear-gradient(rgba(7,_23,_34,_0.78),_var(--navy)),_url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85)_center/cover] [&_h1]:[font-size:clamp(2.8rem,_6vw,_4.8rem)] [&_h1]:[margin-bottom:28px]"}>
      <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>404 · ADDRESS NOT FOUND</p>
      <h1>
        This place is <em>unavailable.</em>
      </h1>
      <div className={"not-found-actions [display:flex] [flex-wrap:wrap] [justify-content:center] [gap:12px]"}>
        <Link className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} to="/">
          Return Home
        </Link>
        <Link className={"button button-ghost [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:rgba(7,_23,_34,_0.32)] [border-color:rgba(243,_240,_233,_0.26)] [color:var(--ivory)] [backdrop-filter:blur(8px)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:var(--gold-light)] [&:hover]:[background:rgba(198,_166,_111,_0.08)] [&:hover]:[transform:translateY(-1px)]"} to="/properties">
          Browse Collection
        </Link>
      </div>
    </main>
  );
}
