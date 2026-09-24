import { useState } from 'react';

const initialForm = {
  name: '',
  service: 'Wash & Fold',
  phone: '',
  notes: '',
};

const services = [
  'Wash & Fold',
  'Shoe Care',
  'Home Essentials',
  'Pickup & Delivery',
  'Urgent Cleaning',
];

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({ type: 'error', message: 'Please add your name and phone number.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: '', message: '' });

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed.');
      }

      setStatus({
        type: 'success',
        message: `Thanks ${form.name}! Your booking request has been received.`,
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="brand-wrap">
          <div className="brand-mark">G</div>
          <div className="brand-text">
            <strong>GAMABE</strong>
            <span>LAUNDRY</span>
          </div>
        </div>

        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#promo" onClick={closeMenu}>Promo</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a className="nav-button" href="#contact">Book now</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Fresh care for every day</p>
            <h1>Clean clothes.<br />Fresh confidence.</h1>
            <p>
              Professional laundry, shoe cleaning, and home textile care designed for busy families and individuals in Busanza.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#contact">Book a wash</a>
              <a className="secondary-btn" href="#services">Explore services</a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>clients served</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>happy rating</span>
              </div>
              <div>
                <strong>Same day</strong>
                <span>service available</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card large-card">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80" alt="Laundry machines" />
            </div>
            <div className="floating-box">
              <span className="mini-pill">Trusted care</span>
              <strong>From <em>3,000 RWF</em></strong>
            </div>
          </div>
        </section>

        <section className="promo-bar" id="promo">
          <div className="promo-left">
            <span className="promo-tag">Promo</span>
            <h3>Weekend special: 20% OFF laundry + free pickup</h3>
          </div>
          <a href="#contact" className="promo-btn">Claim offer</a>
        </section>

        <section className="services" id="services">
          <div className="section-header">
            <div>
              <p className="eyebrow eyebrow-dark">Our services</p>
              <h2>Care for clothes, shoes and home essentials.</h2>
            </div>
            <p className="section-copy">We handle the details so your favorite things stay fresh, clean, and ready to wear.</p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <div className="service-photo">
                <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" alt="Washing and folding clothes" />
              </div>
              <div className="service-info">
                <span>01</span>
                <h3>Wash &amp; Fold</h3>
                <p>Gentle cleaning for everyday clothes, uniforms, and household fabrics.</p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-photo">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80" alt="Clean shoes" />
              </div>
              <div className="service-info">
                <span>02</span>
                <h3>Shoe Care</h3>
                <p>Deep cleaning and finishing for sneakers, sandals, and leather pairs.</p>
              </div>
            </article>

            <article className="service-card">
              <div className="service-photo">
                <img src="https://images.unsplash.com/photo-1604176354204-92687c70cd36?auto=format&fit=crop&w=900&q=80" alt="Laundry towels and linen" />
              </div>
              <div className="service-info">
                <span>03</span>
                <h3>Home Essentials</h3>
                <p>Fresh bedding, towels, curtains, and linens with careful finishing.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="process">
          <div className="process-copy">
            <p className="eyebrow eyebrow-dark">How it works</p>
            <h2>Simple steps. Better results.</h2>
            <p>We make laundry easy, quick, and trustworthy for your home or business.</p>
          </div>

          <div className="steps">
            <div className="step">
              <span>01</span>
              <div>
                <h4>Book</h4>
                <p>Message us or call to arrange your pickup or drop-off.</p>
              </div>
            </div>
            <div className="step">
              <span>02</span>
              <div>
                <h4>Wash</h4>
                <p>We sort and wash according to fabric, color, and quality.</p>
              </div>
            </div>
            <div className="step">
              <span>03</span>
              <div>
                <h4>Dry &amp; fold</h4>
                <p>Your items are neatly dried, pressed, and packed for collection.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-panel" id="contact">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-dark">Stay connected</p>
            <h2>Let us handle the mess, so you can enjoy the clean.</h2>
            <p>Reach out for pickups, laundry bundles, or your next cleaning request.</p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </label>

              <label>
                Service
                <select name="service" value={form.service} onChange={handleChange}>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+250 ..."
                />
              </label>

              <label>
                Notes
                <textarea
                  name="notes"
                  rows="3"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your items"
                />
              </label>

              <button type="submit" className="primary-btn submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Book now'}
              </button>

              {status.message ? (
                <p className={`status ${status.type}`}>{status.message}</p>
              ) : null}
            </form>
          </div>

          <div className="contact-cards">
            <a className="contact-card whatsapp" href="https://wa.me/250788000000" target="_blank" rel="noreferrer">
              <div className="card-icon">✆</div>
              <div>
                <small>WhatsApp</small>
                <strong>+250 788 000 000</strong>
              </div>
            </a>

            <a className="contact-card instagram" href="https://instagram.com/gamabe_laundry" target="_blank" rel="noreferrer">
              <div className="card-icon">◎</div>
              <div>
                <small>Instagram</small>
                <strong>@gamabe_laundry</strong>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand-mark small">G</div>
          <div>
            <strong>GAMABE</strong>
            <span>LAUNDRY</span>
          </div>
        </div>
        <p>Clean clothes, fresh confidence, and care you can trust in Busanza.</p>
        <span>© 2026 GAMABE Laundry</span>
      </footer>
    </div>
  );
}
