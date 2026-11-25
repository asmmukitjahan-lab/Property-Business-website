import { useEffect, useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const OFFICES = [
  {
    id: "london",
    city: "London · Mayfair",
    street: "18 Hanover Square",
    postcode: "Mayfair, London W1S 1JY",
    phone: "+44 (0)20 7946 0280",
    email: "mayfair@pjproperty.co.uk",
    bbox: "-0.153%2C51.506%2C-0.141%2C51.516",
  },
  {
    id: "manchester",
    city: "Manchester",
    street: "23 King Street",
    postcode: "Manchester M2 6AN",
    phone: "+44 (0)161 555 0140",
    email: "manchester@pjproperty.co.uk",
    bbox: "-2.253%2C53.477%2C-2.238%2C53.485",
  },
  {
    id: "edinburgh",
    city: "Edinburgh",
    street: "14 Charlotte Square",
    postcode: "New Town, Edinburgh EH2 4DR",
    phone: "+44 (0)131 555 0190",
    email: "edinburgh@pjproperty.co.uk",
    bbox: "-3.215%2C55.948%2C-3.199%2C55.956",
  },
];

export default function Contact() {
  const [params] = useSearchParams();
  const isViewing = params.get("viewing") === "1";
  const developmentName = params.get("development") || "";

  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeOfficeId, setActiveOfficeId] = useState("london");

  useEffect(() => {
    document.title = "Contact PJ | Private Property Advice";
  }, []);

  const activeOffice =
    OFFICES.find((office) => office.id === activeOfficeId) || OFFICES[0];

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    const email = String(data.get("email") || "").trim();
    if (!String(data.get("name") || "").trim()) {
      nextErrors.name = "Please enter your name";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!String(data.get("message") || "").trim()) {
      nextErrors.message = "Please enter a brief message";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  }

  return (
    <main className={"inner-page contact-page [min-height:70vh] [padding-top:124px] [&_.inner-hero]:[border-bottom:1px_solid_var(--line)]"}>
      <header className={"inner-hero [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:52px_var(--gutter)_56px] [&_h1]:[font-size:clamp(2.85rem,_6.2vw,_5.4rem)] [&_h1]:[line-height:0.92] [&_h1]:[letter-spacing:-0.04em] [&_h1]:[margin:0]"}>
        <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>CONTACT PJ</p>
        <h1>
          Start a conversation.
          <br />
          <em>Discover what’s next.</em>
        </h1>
      </header>

      <div className={"contact-layout [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:48px_var(--gutter)_80px] [display:grid] [grid-template-columns:minmax(0,_0.38fr)_minmax(0,_0.62fr)] [gap:clamp(28px,_5vw,_56px)] [&_aside]:[display:flex] [&_aside]:[flex-direction:column] [&_address]:[font-family:var(--font-display)] [&_address]:[font-size:1.85rem] [&_address]:[font-style:normal] [&_address]:[line-height:1.3] [&_address]:[margin:4px_0_20px] [&_aside_>_a]:[font-size:0.88rem] [&_aside_>_a]:[color:var(--muted)] [&_aside_>_a]:[margin:4px_0] [&_aside_>_a:hover]:[color:var(--gold-light)] [@media(max-width:1100px)]:[grid-template-columns:1fr]"}>
        <aside>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>{activeOffice.city.toUpperCase()} OFFICE</p>
          <address>
            {activeOffice.street}
            <br />
            {activeOffice.postcode}
          </address>
          <a href={`tel:${activeOffice.phone.replace(/[^\d+]/g, "")}`}>
            {activeOffice.phone}
          </a>
          <a href={`mailto:${activeOffice.email}`}>{activeOffice.email}</a>

          <div
            className={"office-list [margin-top:32px] [border-top:1px_solid_var(--line)] [&_button]:[width:100%] [&_button]:[display:flex] [&_button]:[justify-content:space-between] [&_button]:[align-items:center] [&_button]:[padding:14px_8px] [&_button]:[border:0] [&_button]:[border-bottom:1px_solid_var(--line)] [&_button]:[background:transparent] [&_button]:[color:var(--muted)] [&_button]:[font-size:0.82rem] [&_button]:[text-align:left] [&_button]:[transition:all_0.2s_ease] [&_button.active]:[color:var(--gold-light)] [&_button.active]:[background:rgba(198,_166,_111,_0.06)] [&_button:hover]:[color:var(--gold-light)] [&_button:hover]:[background:rgba(198,_166,_111,_0.06)]"}
            role="tablist"
            aria-label="Select PJ regional office"
          >
            {OFFICES.map((office) => (
              <button
                key={office.id}
                type="button"
                role="tab"
                aria-selected={office.id === activeOffice.id}
                className={office.id === activeOffice.id ? "active" : ""}
                onClick={() => setActiveOfficeId(office.id)}
              >
                <b>{office.city}</b>
                <span>{office.street}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className={"contact-form [&_label]:[position:relative] [&_label]:[display:flex] [&_label]:[flex-direction:column] [&_label]:[gap:7px] [&_label]:[font-size:0.68rem] [&_label]:[font-weight:600] [&_label]:[text-transform:uppercase] [&_label]:[letter-spacing:0.1em] [&_label]:[color:var(--muted)] [&_input]:[width:100%] [&_input]:[padding:12px_14px] [&_input]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_input]:[border-radius:var(--radius-sm)] [&_input]:[background:var(--navy)] [&_input]:[color:var(--ivory)] [&_input]:[font-size:0.88rem] [&_input]:[outline:0] [&_input]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_select]:[width:100%] [&_select]:[padding:12px_14px] [&_select]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_select]:[border-radius:var(--radius-sm)] [&_select]:[background:var(--navy)] [&_select]:[color:var(--ivory)] [&_select]:[font-size:0.88rem] [&_select]:[outline:0] [&_select]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_textarea]:[width:100%] [&_textarea]:[padding:12px_14px] [&_textarea]:[border:1px_solid_rgba(231,_235,_235,_0.2)] [&_textarea]:[border-radius:var(--radius-sm)] [&_textarea]:[background:var(--navy)] [&_textarea]:[color:var(--ivory)] [&_textarea]:[font-size:0.88rem] [&_textarea]:[outline:0] [&_textarea]:[transition:border-color_0.2s_ease,_box-shadow_0.2s_ease] [&_input:focus]:[border-color:var(--gold)] [&_input:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_select:focus]:[border-color:var(--gold)] [&_select:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_textarea:focus]:[border-color:var(--gold)] [&_textarea:focus]:[box-shadow:0_0_0_3px_rgba(198,_166,_111,_0.14)] [&_textarea]:[min-height:104px] [&_textarea]:[resize:vertical] [&_small]:[color:#e6a095] [&_small]:[text-transform:none] [&_small]:[letter-spacing:0] [&_small]:[font-size:0.74rem] [&_form_>_label]:[margin-top:16px] [&_form_>_.button]:[margin-top:20px] [padding:clamp(24px,_4vw,_44px)] [border:1px_solid_var(--line-gold)] [border-radius:var(--radius-md)] [background:linear-gradient(145deg,_var(--surface-raised),_var(--surface))] [&_select]:[appearance:none] [&_select]:[padding-right:36px] [&_label_>_svg]:[position:absolute] [&_label_>_svg]:[right:12px] [&_label_>_svg]:[bottom:13px] [&_label_>_svg]:[width:15px] [&_label_>_svg]:[color:var(--gold)] [&_label_>_svg]:[pointer-events:none]"} aria-label="Send PJ a message">
          {sent ? (
            <div className={"success-state [text-align:center] [padding:28px_16px] [&_>_div]:[width:56px] [&_>_div]:[height:56px] [&_>_div]:[margin:0_auto_18px] [&_>_div]:[border-radius:50%] [&_>_div]:[background:#7bc49b] [&_>_div]:[color:var(--navy)] [&_>_div]:[display:grid] [&_>_div]:[place-items:center] [&_h2]:[font-size:2.5rem] [&_h2]:[margin:6px_0_10px] [&_>_p:not(.eyebrow)]:[color:var(--muted)] [&_>_p:not(.eyebrow)]:[margin-bottom:20px]"} role="status" aria-live="polite">
              <div>
                <Check size={24} />
              </div>
              <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>MESSAGE RECEIVED</p>
              <h2>Thank you.</h2>
              <p>
                A senior PJ advisor from our {activeOffice.city} office will
                respond shortly.
              </p>
              <button
                className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"}
                type="button"
                onClick={() => setSent(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              key={`${isViewing}-${developmentName}`}
              onSubmit={submit}
              noValidate
            >
              <div className={"form-grid [display:grid] [grid-template-columns:1fr_1fr] [gap:16px] [@media(max-width:768px)]:[grid-template-columns:1fr]"}>
                <label>
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <small id="contact-name-error" role="alert">
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
                    placeholder="name@domain.co.uk"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <small id="contact-email-error" role="alert">
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
                  />
                </label>
                <label>
                  Inquiry type
                  <select
                    name="type"
                    defaultValue={
                      isViewing ? "Book a viewing" : "Buying a property"
                    }
                  >
                    <option>Buying a property</option>
                    <option>Renting a property</option>
                    <option>Book a viewing</option>
                    <option>New development dossier</option>
                    <option>Sell or value a property</option>
                  </select>
                  <ChevronDown aria-hidden="true" />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  defaultValue={
                    developmentName
                      ? `I would like to arrange a private consultation and receive the dossier for ${developmentName}.`
                      : ""
                  }
                  placeholder="Share your preferred neighbourhoods, timing, or residence requirements"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                />
                {errors.message && (
                  <small id="contact-message-error" role="alert">
                    {errors.message}
                  </small>
                )}
              </label>
              <button className={"button button-gold [display:inline-flex] [align-items:center] [justify-content:center] [gap:10px] [min-height:50px] [padding:0_22px] [border:1px_solid_transparent] [border-radius:var(--radius-sm)] [font-family:var(--font-body)] [font-size:0.72rem] [font-weight:700] [text-transform:uppercase] [letter-spacing:0.11em] [transition:color_0.22s_ease,_background-color_0.22s_ease,_border-color_0.22s_ease,_transform_0.22s_ease,_box-shadow_0.22s_ease] [&_svg]:[width:16px] [&_svg]:[height:16px] [&_svg]:[flex-shrink:0] [&_svg]:[transition:transform_0.22s_ease] [&:hover_svg]:[transform:translate(2px,_-1px)] [&:disabled]:[opacity:0.5] [&:disabled]:[cursor:not-allowed] [&:disabled]:[transform:none] [background:var(--gold)] [border-color:var(--gold)] [color:#0b1923] [&:hover]:[background:var(--gold-light)] [&:hover]:[border-color:var(--gold-light)] [&:hover]:[color:#0b1923] [&:hover]:[box-shadow:0_10px_28px_rgba(198,_166,_111,_0.24)] [&:hover]:[transform:translateY(-1px)]"} type="submit">
                Send Message <ArrowUpRight size={15} />
              </button>
            </form>
          )}
        </section>
      </div>

      <section className={"map-and-faq [max-width:calc(var(--container)_+_var(--gutter)_*_2)] [margin:0_auto] [padding:0_var(--gutter)_96px] [display:grid] [grid-template-columns:1.15fr_0.85fr] [gap:44px] [@media(max-width:1100px)]:[grid-template-columns:1fr]"}>
        <div className={"contact-map [&_iframe]:[width:100%] [&_iframe]:[height:380px] [&_iframe]:[border:1px_solid_var(--line-gold)] [&_iframe]:[border-radius:var(--radius-md)] [&_iframe]:[filter:saturate(0.7)_contrast(1.05)_brightness(0.92)]"}>
          <iframe
            key={activeOffice.id}
            title={`PJ ${activeOffice.city} office map`}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeOffice.bbox}&layer=mapnik`}
            loading="lazy"
          />
        </div>
        <div className={"faq [&_details]:[border-bottom:1px_solid_var(--line)] [&_details]:[padding:16px_0] [&_summary]:[list-style:none] [&_summary]:[display:flex] [&_summary]:[justify-content:space-between] [&_summary]:[align-items:center] [&_summary]:[gap:12px] [&_summary]:[font-family:var(--font-display)] [&_summary]:[font-size:1.35rem] [&_summary]:[cursor:pointer] [&_summary_svg]:[width:16px] [&_summary_svg]:[color:var(--gold)] [&_summary_svg]:[flex-shrink:0] [&_details_p]:[margin:10px_0_0] [&_details_p]:[color:var(--muted)] [&_details_p]:[font-size:0.88rem]"}>
          <p className={"eyebrow [display:inline-flex] [align-items:center] [gap:10px] [font-family:var(--font-body)] [font-size:0.68rem] [font-weight:600] [text-transform:uppercase] [letter-spacing:0.22em] [color:var(--gold)] [margin-bottom:12px]"}>COMMON QUESTIONS</p>
          {[
            [
              "How do I arrange a private viewing?",
              "Select Arrange a Viewing on any residence or choose Book a Viewing above to coordinate directly with the listing partner.",
            ],
            [
              "Do you advise across the entire United Kingdom?",
              "Yes. From our Mayfair, Manchester, and Edinburgh offices we cover Prime Central London, Surrey, the South Coast, the Midlands, and Scotland.",
            ],
            [
              "Can PJ represent an off-market sale?",
              "Yes. Over 40% of our transactions are placed discreetly through private introductions without public portal advertising.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
