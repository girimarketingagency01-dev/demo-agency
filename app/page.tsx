"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;

  setMouse({
    x,
    y,
  });

  const planets = document.querySelectorAll<HTMLElement>(".planet");

  let closestPlanet: string | null = null;
  let closestDistance = 110;

  planets.forEach((planet) => {
    const rect = planet.getBoundingClientRect();

    const planetX = rect.left + rect.width / 2;
    const planetY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(x - planetX, 2) +
      Math.pow(y - planetY, 2)
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPlanet = planet.dataset.planet || null;
    }
  });

  setActivePlanet(closestPlanet);
};

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main>

      {/* =========================
          CUSTOM INFINITY CURSOR
      ========================= */}

      <div
      className="infinity-cursor"
  style={{
    left: mouse.x,
    top: mouse.y,
  }}
>
  ∞
</div>


      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">

        <div className="logo">

          <img
            src="/logo.jpg"
            alt="Infinity Digital Marketing"
            style={{
              width: "48px",
              height: "48px",
              objectFit: "contain",
            }}
          />

          <div>
            <strong>INFINITY</strong>
            <small>DIGITAL MARKETING</small>
          </div>

        </div>

        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#insights">Insights</a>
        </nav>

        <a href="#contact" className="nav-button">
          Let's Talk →
        </a>

      </header>


      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="hero-grid"></div>


        {/* LEFT CONTENT */}

        <div className="hero-content">

          <div className="eyebrow">
            <span></span>
            DIGITAL PARTNERS FOR AMBITIOUS BRANDS
          </div>


          <h1>
            We Make
            <br />

            <span>Brands</span>

            <br />

            Go Beyond.
          </h1>


          <p>
            Performance marketing, social media, paid advertising,
            web experiences and digital strategy — all working together
            to make your brand impossible to ignore.
          </p>


          <div className="hero-buttons">

            <a href="#contact" className="primary-button">
              Start a Conversation →
            </a>

            <a href="#services" className="secondary-button">
              Explore Services
            </a>

          </div>


          <div className="hero-services">

            <span>
              <i>✦</i> PERFORMANCE
            </span>

            <span>
              <i>✦</i> SOCIAL
            </span>

            <span>
              <i>✦</i> ADS
            </span>

            <span>
              <i>✦</i> WEB
            </span>

            <span>
              <i>✦</i> BRANDING
            </span>

          </div>

        </div>


        {/* =========================
            DIGITAL UNIVERSE
        ========================= */}

        <div
  className="universe"
  onMouseEnter={() => setCursorHidden(true)}
  onMouseLeave={() => setCursorHidden(false)}
>

          <div className="core-glow"></div>

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit orbit-three"></div>


          <div className="infinity-core">
  <span>∞</span>
</div>


          <div
  className={`planet planet-one ${
    activePlanet === "seo" ? "planet-active" : ""
  }`}
  data-planet="seo"
>
  <span>SEO</span>
</div>

<div
  className={`planet planet-two ${
    activePlanet === "ads" ? "planet-active" : ""
  }`}
  data-planet="ads"
>
  <span>ADS</span>
</div>

<div
  className={`planet planet-three ${
    activePlanet === "web" ? "planet-active" : ""
  }`}
  data-planet="web"
>
  <span>WEB</span>
</div>

<div
  className={`planet planet-four ${
    activePlanet === "social" ? "planet-active" : ""
  }`}
  data-planet="social"
>
  <span>SOCIAL</span>
</div>


          <div className="star star-one">✦</div>
          <div className="star star-two">✦</div>
          <div className="star star-three">✦</div>
          <div className="star star-four">✦</div>
          <div className="star star-five">✦</div>


          <div className="universe-label">
            <span>∞</span>
            ONE BRAND · INFINITE POSSIBILITIES
          </div>

        </div>

      </section>


{/* =========================
    TRUSTED / CAPABILITIES
========================= */}

<section className="trusted-section">

  <div className="trusted-label">
    <span></span>
    BUILT FOR AMBITIOUS BRANDS
    <span></span>
  </div>

  <div className="trusted-track">
    <div className="trusted-items">
      <span>PERFORMANCE</span>
      <i>✦</i>
      <span>SOCIAL MEDIA</span>
      <i>✦</i>
      <span>GOOGLE ADS</span>
      <i>✦</i>
      <span>META ADS</span>
      <i>✦</i>
      <span>SEO</span>
      <i>✦</i>
      <span>WEB DEVELOPMENT</span>
      <i>✦</i>
      <span>BRANDING</span>
      <i>✦</i>
      <span>DIGITAL STRATEGY</span>
      <i>✦</i>
    </div>
  </div>

</section>

      {/* =========================
          SERVICES PREVIEW
      ========================= */}

      <section className="services-preview" id="services">

        <div className="section-heading">

          <span>WHAT WE DO</span>

          <h2>
            Everything your
            <br />
            brand needs to{" "}
            <em>grow.</em>
          </h2>

          <p>
            From performance marketing to powerful digital experiences,
            we bring strategy, creativity and technology together under
            one roof.
          </p>

        </div>


        <div className="service-grid">

          <div className="service-card">
            <div className="service-number">01</div>

            <h3>Performance Marketing</h3>

            <p>
              Data-driven campaigns designed to turn attention
              into measurable business growth.
            </p>

            <div className="service-arrow">↗</div>
          </div>


          <div className="service-card">
            <div className="service-number">02</div>

            <h3>Social Media</h3>

            <p>
              Build a stronger digital presence with content,
              strategy and social campaigns that connect.
            </p>

            <div className="service-arrow">↗</div>
          </div>


          <div className="service-card">
            <div className="service-number">03</div>

            <h3>Google & Meta Ads</h3>

            <p>
              Reach the right audience with high-intent paid
              campaigns built around performance.
            </p>

            <div className="service-arrow">↗</div>
          </div>


          <div className="service-card">
            <div className="service-number">04</div>

            <h3>Web Development</h3>

            <p>
              Fast, responsive and memorable digital experiences
              built to represent your brand.
            </p>

            <div className="service-arrow">↗</div>
          </div>

        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================= */}

      <section className="final-cta" id="contact">

        <span>READY TO GO BEYOND?</span>

        <h2>
          Let's build
          <br />
          something <em>infinite.</em>
        </h2>

        <a href="mailto:hello@infinitydigitalmarketing.com">
          Start a Conversation →
        </a>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footer-logo">

          <span>∞</span>

          <strong>INFINITY</strong>

        </div>

        <p>
          Digital Marketing · Performance · Creative · Web
        </p>

        <small>
          © 2026 Infinity Digital Marketing
        </small>

      </footer>

    </main>
  );
}