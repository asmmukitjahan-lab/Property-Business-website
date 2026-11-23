import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Contact PJ | Private Property Advice";
  }, []);

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    if (!data.get("name")) nextErrors.name = "Please enter your name";
    if (!String(data.get("email")).includes("@"))
      nextErrors.email = "Enter a valid email";
    if (!data.get("message")) nextErrors.message = "Please enter a message";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  }

  return (
    <main className="inner-page contact-page">
      <header className="inner-hero">
        <p className="eyebrow">CONTACT PJ</p>
        <h1>
          Start a conversation.
          <br />
          <em>Discover what's next.</em>
        </h1>
      </header>

      <div className="contact-layout">
        <aside>
          <p className="eyebrow">LONDON OFFICE</p>
          <address>
            18 Hanover Square
            <br />
            Mayfair, London W1S 1JY
          </address>
          <a href="tel:+442079460280">+44 (0)20 7946 0280</a>
          <a href="mailto:hello@pjproperty.co.uk">hello@pjproperty.co.uk</a>
          <div className="office-list">
            <p>
              <b>Manchester</b> 23 King Street
            </p>
            <p>
              <b>Edinburgh</b> 14 Charlotte Square
            </p>
          </div>
        </aside>

        <section className="contact-form" aria-label="Send PJ a message">
          {sent ? (
            <div className="success-state" role="status" aria-live="polite">
              <p className="eyebrow">MESSAGE SENT</p>
              <h2>Thank you.</h2>
              <p>A member of our team will be in touch shortly.</p>
              <button
                className="button button-gold"
                type="button"
                onClick={() => setSent(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <label>
                  Name
                  <input
                    name="name"
                    autoComplete="name"
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
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  Inquiry type
                  <select name="type" defaultValue="Buying a property">
                    <option>Buying a property</option>
                    <option>Renting a property</option>
                    <option>Book a viewing</option>
                    <option>Sell or value a property</option>
                  </select>
                  <ChevronDown aria-hidden="true" />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
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
              <button className="button button-gold" type="submit">
                Send Message <ArrowUpRight />
              </button>
            </form>
          )}
        </section>
      </div>

      <section className="map-and-faq">
        <div className="contact-map">
          <iframe
            title="PJ London office map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.153%2C51.506%2C-0.141%2C51.516&amp;layer=mapnik"
            loading="lazy"
          />
        </div>
        <div className="faq">
          <p className="eyebrow">COMMON QUESTIONS</p>
          {[
            [
              "How do I arrange a viewing?",
              "Use any property enquiry button or contact our team directly.",
            ],
            [
              "Do you cover the whole UK?",
              "We advise clients across the UK through our London and regional network.",
            ],
            [
              "Can you help sell my property?",
              "Yes. Our advisors provide private valuation and strategic sales guidance.",
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
