import { useState } from "react";
import { Check, X } from "lucide-react";

export default function ViewingForm({ propertyTitle, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors = {};
    if (!data.get("name")) nextErrors.name = "Please enter your name";
    if (!String(data.get("email")).includes("@"))
      nextErrors.email = "Enter a valid email";
    if (!data.get("phone")) nextErrors.phone = "Please enter a phone number";
    if (!data.get("date")) nextErrors.date = "Choose a preferred date";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="viewing-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Arrange a property viewing"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close viewing request"
        >
          <X />
        </button>
        {sent ? (
          <div className="success-state" role="status" aria-live="polite">
            <div>
              <Check />
            </div>
            <p className="eyebrow">REQUEST RECEIVED</p>
            <h2>Thank you.</h2>
            <p>
              Your viewing request has been received. Our property team will
              contact you shortly.
            </p>
            <button
              className="button button-gold"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">PRIVATE VIEWING</p>
            <h2>
              Arrange a <em>Viewing</em>
            </h2>
            <form onSubmit={submit} noValidate>
              <div className="form-grid">
                <label>
                  Full name
                  <input
                    name="name"
                    autoComplete="name"
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
                  <select name="time" defaultValue="Morning">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell us anything we should know"
                />
              </label>
              <button
                className="button button-gold"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Request Viewing"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
