import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-glow"></div>

      <div className="site-footer-inner">

        {/* TOP BRAND */}
        <div className="footer-brand-area">
          <Link href="/" className="footer-brand-link">
            <div className="footer-logo-mark">
  <img
    src="/logo.jpg"
    alt="Infinity Digital Marketing"
  />
</div>

            <div className="footer-brand-text">
              <strong>INFINITY</strong>
              <span>DIGITAL MARKETING</span>
            </div>
          </Link>

          <p className="footer-description">
            Digital marketing built for brands that want to go beyond.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/_.infinitydigitalmarketing/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61561187416724"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M14 8h3V5h-3c-2.8 0-5 2.2-5 5v2H6v3h3v6h3v-6h3l1-3h-4v-2c0-1.1.9-2 2-2Z"
                  fill="currentColor"
                />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* FOOTER COLUMNS */}
        <div className="footer-columns">

          {/* SERVICES */}
          <div className="footer-column">
            <h3>Services</h3>

            <div className="footer-vertical-links">
              <Link href="/services">
                Web Design & Development
              </Link>

              <Link href="/services">
                Meta Ads
              </Link>

              <Link href="/services">
                Google Ads
              </Link>

              <Link href="/services">
                Social Media Marketing
              </Link>

              <Link href="/services">
                Performance Marketing
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <h3>Contact</h3>

            <div className="footer-contact-list">

              <a href="tel:+918076728103">
                <span>Call</span>
                +91 8076728103
              </a>

              <a
                href="https://wa.me/918076728103"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp</span>
                +91 8076728103
              </a>

              <a href="mailto:infinitydigitalmarketing50@gmail.com">
                <span>Email</span>
                infinitydigitalmarketing50@gmail.com
              </a>

              <a
                href="https://maps.app.goo.gl/itAQgfp9vbsBYppb6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Location</span>
                View on Google Maps →
              </a>

            </div>
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h3>Company</h3>

            <div className="footer-vertical-links">
              <Link href="/about">
                About Infinity
              </Link>

              <Link href="/pricing">
                Pricing
              </Link>

              <Link href="/contact">
                Let's Talk
              </Link>
            </div>
          </div>

          {/* LEGAL */}
          <div className="footer-column">
            <h3>Legal</h3>

            <div className="footer-vertical-links">
              <Link href="/privacy-policy">
                Privacy Policy
              </Link>

              <Link href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">

          <span>
            © 2026 Infinity Digital Marketing. All rights reserved.
          </span>

          <span className="footer-infinity-line">
   <span className="footer-heart"></span> 
</span>

        </div>

      </div>
    </footer>
  );
}