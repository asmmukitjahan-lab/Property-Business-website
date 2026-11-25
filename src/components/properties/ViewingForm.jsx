import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ViewingForm({ propertyTitle = "", onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [minDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    const email = String(data.get("email") || "").trim();
    if (!String(data.get("name") || "").trim()) {
      nextErrors.name = "Please enter your full name";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!String(data.get("phone") || "").trim()) {
      nextErrors.phone = "Please enter a contact number";
    }
    if (!data.get("date")) {
      nextErrors.date = "Choose a preferred viewing date";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 550);
  }

  return (
    <motion.div
      className={"modal-backdrop [position:fixed] [z-index:100] [inset:0] [background:rgba(4,_13,_19,_0.8)] [backdrop-filter:blur(12px)] [display:grid] [place-items:center] [padding:16px]"}
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className={"viewing-modal [position:relative] [width:min(680px,_100%)] [max-height:90vh] [overflow-y:auto] [padding:clamp(28px,_4vw,_44px)] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:var(--surface)] [box-shadow:var(--shadow-soft)] [&_h2]:[font-size:clamp(2.1rem,_4vw,_3rem)] [&_h2]:[margin-bottom:24px] [&_label]:[position:relative] [&_label]:[display:flex] [&_label]:[flex-direction:column] [&_label]:[gap:7px] [&_label]:[font-size:0.68rem] [&_label]:[font-weight:600] [&_label]:[text-transform:uppercase] [&_label]:[letter-spacing:0.1em] [&_label]:[color:var(--muted)] [&_input]:[width:100%] [&_input]:[padding:12px_14px] [&_input]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_input]:[border-radius:var(--radius-sm)] [&_input]:[background:var(--navy)] [&_input]:[color:var(--ivory)] [&_input]:[font-size:0.88rem] [&_input]:[outline:0] [&_input]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_select]:[width:100%] [&_select]:[padding:12px_14px] [&_select]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_select]:[border-radius:var(--radius-sm)] [&_select]:[background:var(--navy)] [&_select]:[color:var(--ivory)] [&_select]:[font-size:0.88rem] [&_select]:[outline:0] [&_select]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_textarea]:[width:100%] [&_textarea]:[padding:12px_14px] [&_textarea]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_textarea]:[border-radius:var(--radius-sm)] [&_textarea]:[background:var(--navy)] [&_textarea]:[color:var(--ivory)] [&_textarea]:[font-size:0.88rem] [&_textarea]:[outline:0] [&_textarea]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_input:focus]:[border-color:var(--gold)] [&_input:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_select:focus]:[border-color:var(--gold)] [&_select:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_textarea:focus]:[border-color:var(--gold)] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_textarea]:[min-height:104px] [&_textarea]:[resize:vertical] [&_small]:[color:#e6a095] [&_small]:[text-transform:none] [&_small]:[letter-spacing:0] [&_small]:[font-size:0.74rem] [&_form_>_label]:[margin-top:16px] [&_form_>_.button]:[margin-top:20px]"}
        role="dialog"
        aria-modal="true"
        aria-label="Arrange a private property viewing"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          className={"modal-close [position:absolute] [right:16px] [top:16px] [width:38px] [height:38px] [border:1px_solid_var(--line)] [border-radius:var(--radius-sm)] [background:transparent] [color:var(--ivory)] [display:grid] [place-items:center]"}
          type="button"
          onClick={onClose}
          aria-label="Close viewing request"
        >
          <X size={20} />
        </button>

        {sent ? (
          <div className={"success-state [text-align:center] [padding:28px_16px] [&_>_div]:[width:56px] [&_>_div]:[height:56px] [&_>_div]:[margin:0_auto_18px] [&_>_div]:[border-radius:50%] [&_>_div]:[background:#7bc49b] [&_>_div]:[color:var(--navy)] [&_>_div]:[display:grid] [&_>_div]:[place-items:center] [&_h2]:[font-size:2.5rem] [&_h2]:[margin:6px_0_10px] [&_>_p:not(.eyebrow)]:[color:var(--muted)] [&_>_p:not(.eyebrow)]:[margin-bottom:20px]"} role="status" aria-live="polite">
            <div>
              <Check size={24} />
            </div>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PRIVATE APPOINTMENT REQUESTED</p>
            <h2>Thank you.</h2>
            <p>
              Your private viewing request
              {propertyTitle ? ` for ${propertyTitle}` : ""} has been received.
              A PJ senior advisor will confirm your appointment shortly.
            </p>
            <button
              className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
              type="button"
              onClick={onClose}
            >
              Return to Property
            </button>
          </div>
        ) : (
          <>
            <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>PRIVATE VIEWING</p>
            <h2>
              Arrange a <em>Viewing</em>
            </h2>
            <form onSubmit={submit} noValidate>
              <div className={"form-grid [display:grid] [grid-template-columns:1fr_1fr] [gap:16px] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
                <label>
                  Full name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Oliver Kensington"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "viewing-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <small id="viewing-name-error" role="alert">
                      {errors.name}
                    </small>
                  )}
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="oliver@domain.co.uk"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "viewing-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <small id="viewing-email-error" role="alert">
                      {errors.email}
                    </small>
                  )}
                </label>
                <label>
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+44 7700 900077"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? "viewing-phone-error" : undefined
                    }
                  />
                  {errors.phone && (
                    <small id="viewing-phone-error" role="alert">
                      {errors.phone}
                    </small>
                  )}
                </label>
                <label>
                  Preferred property
                  <input name="property" defaultValue={propertyTitle} />
                </label>
                <label>
                  Preferred viewing date
                  <input
                    name="date"
                    type="date"
                    min={minDate}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={
                      errors.date ? "viewing-date-error" : undefined
                    }
                  />
                  {errors.date && (
                    <small id="viewing-date-error" role="alert">
                      {errors.date}
                    </small>
                  )}
                </label>
                <label>
                  Preferred time
                  <select name="time" defaultValue="Morning (10:00 – 12:00)">
                    <option>Morning (10:00 – 12:00)</option>
                    <option>Afternoon (13:00 – 16:30)</option>
                    <option>Evening (17:00 – 19:00)</option>
                  </select>
                </label>
              </div>
              <label>
                Notes for your advisor
                <textarea
                  name="message"
                  placeholder="Share any access preferences or questions"
                />
              </label>
              <button
                className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                type="submit"
                disabled={loading}
              >
                {loading ? "Confirming…" : "Request Private Viewing"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
