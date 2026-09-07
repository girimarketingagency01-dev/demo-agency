"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);

  const storySectionRef = useRef<HTMLElement | null>(null);
const storySceneRef = useRef<HTMLDivElement | null>(null);

const storyLineOneRef = useRef<HTMLHeadingElement | null>(null);
const storyLineTwoRef = useRef<HTMLHeadingElement | null>(null);
const storyLineThreeRef = useRef<HTMLHeadingElement | null>(null);

const storyCapabilitiesRef = useRef<HTMLDivElement | null>(null);


useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    // Store current mouse position
    setMouse({ x, y });

    // Hide cursor when it touches any viewport edge.
    const EDGE_GAP = 3;

    const outsideViewport =
      x <= EDGE_GAP ||
      y <= EDGE_GAP ||
      x >= window.innerWidth - EDGE_GAP ||
      y >= window.innerHeight - EDGE_GAP;

    setIsCursorVisible(!outsideViewport);

    // Planet proximity effect
    const planets = document.querySelectorAll<HTMLElement>(".planet");

    let closestPlanet: string | null = null;
    let closestDistance = 110;

    planets.forEach((planet) => {
      const rect = planet.getBoundingClientRect();

      const planetX = rect.left + rect.width / 2;
      const planetY = rect.top + rect.height / 2;

      const distance = Math.hypot(
        x - planetX,
        y - planetY
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestPlanet = planet.dataset.planet || null;
      }
    });

    setActivePlanet(closestPlanet);
  };

  const handleMouseLeave = () => {
    setIsCursorVisible(false);
    setActivePlanet(null);
  };

  window.addEventListener("mousemove", handleMouseMove);
  document.documentElement.addEventListener(
    "mouseleave",
    handleMouseLeave
  );

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    document.documentElement.removeEventListener(
      "mouseleave",
      handleMouseLeave
    );
  };
}, []);



useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const section = storySectionRef.current;
  const scene = storySceneRef.current;

  const lineOne = storyLineOneRef.current;
  const lineTwo = storyLineTwoRef.current;
  const lineThree = storyLineThreeRef.current;

  const capabilities = storyCapabilitiesRef.current;

  if (
    !section ||
    !scene ||
    !lineOne ||
    !lineTwo ||
    !lineThree ||
    !capabilities
  ) {
    return;
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2600",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Initial state
    gsap.set(lineOne, {
      opacity: 1,
      y: 0,
      scale: 1,
    });

    gsap.set(lineTwo, {
      opacity: 0,
      y: 40,
      scale: 0.96,
    });

    gsap.set(lineThree, {
      opacity: 0,
      y: 40,
      scale: 0.96,
    });

    gsap.set(capabilities, {
      xPercent: 35,
      opacity: 0,
    });

    // Scene 1 → Scene 2
    tl.to(lineOne, {
      opacity: 0,
      y: -45,
      scale: 0.96,
      duration: 1,
      ease: "power2.inOut",
    });

    tl.to(lineTwo, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.25");

    // Scene 2 → Scene 3
    tl.to(lineTwo, {
      opacity: 0,
      y: -45,
      scale: 0.96,
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.35");

    tl.to(lineThree, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.25");

    // Prepare typography scene for capabilities
    tl.to(lineThree, {
      opacity: 0,
      scale: 0.95,
      y: -30,
      duration: 0.8,
      ease: "power2.inOut",
    }, "+=0.45");

    // Right → left capability movement
    tl.to(capabilities, {
      xPercent: -35,
      opacity: 1,
      duration: 2.2,
      ease: "none",
    }, "-=0.15");
  }, section);

  return () => ctx.revert();
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
    opacity: isCursorVisible ? 1 : 0,
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
    IMMERSIVE HERO
========================= */}

<section className="immersive-hero">

  <div className="immersive-grid"></div>

  <div className="hero-noise"></div>


  {/* LEFT CONTENT */}

  <div className="immersive-content">

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
      Strategy, creativity, technology and performance marketing —
      everything your business needs to build a powerful digital brand
      and grow without limits.
    </p>

    <div className="hero-buttons">

      <a href="#contact" className="primary-button">
        Start a Conversation →
      </a>

      <a href="#services" className="secondary-button">
        Explore Services
      </a>

    </div>


    <div className="hero-capabilities">

      <span>PERFORMANCE</span>
      <i>✦</i>

      <span>SOCIAL</span>
      <i>✦</i>

      <span>SEO</span>
      <i>✦</i>

      <span>ADS</span>
      <i>✦</i>

      <span>WEB</span>

    </div>

  </div>


  {/* RIGHT INTERACTIVE UNIVERSE */}

  <div className="immersive-universe">
  

    <div className="universe-halo"></div>

    <div className="orbit orbit-one"></div>
    <div className="orbit orbit-two"></div>
    <div className="orbit orbit-three"></div>


    {/* CONNECTING LINES */}

    <div className="energy-line energy-line-one"></div>
    <div className="energy-line energy-line-two"></div>


    {/* CENTER */}

    <div className="infinity-core">

      <div className="core-inner-glow"></div>

      <span>∞</span>

    </div>


    {/* PLANETS */}

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


    {/* PARTICLES */}

    <span className="floating-particle particle-one"></span>
    <span className="floating-particle particle-two"></span>
    <span className="floating-particle particle-three"></span>
    <span className="floating-particle particle-four"></span>
    <span className="floating-particle particle-five"></span>
    <span className="floating-particle particle-six"></span>


    {/* STARS */}

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


  {/* SCROLL INDICATOR */}

  <div className="hero-scroll">

    <span>SCROLL TO EXPLORE</span>

    <div className="scroll-line">
      <span></span>
    </div>

  </div>

</section>







{/* =====================================================
    SCROLL STORY SECTION
===================================================== */}

<section
  ref={storySectionRef}
  className="scroll-story"
>
  <div
    ref={storySceneRef}
    className="scroll-story-scene"
  >

    {/* SMALL LABEL */}

    <div className="scroll-story-label">
      <span></span>
      HOW WE THINK
    </div>


    {/* MAIN TYPOGRAPHY */}

    <div className="scroll-story-words">

      <h2 ref={storyLineOneRef}>
        We turn business
      </h2>

      <h2 ref={storyLineTwoRef}>
        <span>goals into</span>
      </h2>

      <h2 ref={storyLineThreeRef}>
        digital growth.
      </h2>

    </div>


    {/* CAPABILITIES */}

    <div
      ref={storyCapabilitiesRef}
      className="story-capabilities"
    >

      <span>STRATEGY</span>
      <i>✦</i>

      <span>CREATIVE</span>
      <i>✦</i>

      <span>TECHNOLOGY</span>
      <i>✦</i>

      <span>PERFORMANCE</span>
      <i>✦</i>

      <span>STRATEGY</span>
      <i>✦</i>

      <span>CREATIVE</span>
      <i>✦</i>

    </div>


    {/* SMALL INFINITY DETAIL */}

    <div className="story-infinity">
      ∞
    </div>

  </div>
</section>







<div className="hero-transition-space">
  <div className="hero-transition-message">
    <span>∞</span>
    <p>ONE BRAND. INFINITE POSSIBILITIES.</p>
  </div>
</div>




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
    SERVICES — INTERACTIVE
========================= */}

<section className="services-interactive" id="services">

  <div className="services-intro">

    <div className="services-kicker">
      <span></span>
      OUR CAPABILITIES
    </div>

    <h2>
      One agency.
      <br />
      <em>Infinite ways to grow.</em>
    </h2>

    <p>
      Strategy, creativity, technology and performance —
      connected together to build brands that move forward.
    </p>

  </div>


  <div className="services-list">

    {/* 01 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">01</span>

        <div>
          <h3>Performance Marketing</h3>

          <p>
            Turn attention into measurable business growth.
          </p>
        </div>

      </div>

      <div className="service-middle">
        PERFORMANCE
      </div>

      <span className="interactive-arrow">↗</span>

    </a>


    {/* 02 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">02</span>

        <div>
          <h3>Social Media</h3>

          <p>
            Build attention, community and a stronger digital presence.
          </p>
        </div>

      </div>

      <div className="service-middle">
        SOCIAL
      </div>

      <span className="interactive-arrow">↗</span>

    </a>


    {/* 03 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">03</span>

        <div>
          <h3>Google & Meta Ads</h3>

          <p>
            Reach the right audience with performance-driven campaigns.
          </p>

        </div>

      </div>

      <div className="service-middle">
        ADS
      </div>

      <span className="interactive-arrow">↗</span>

    </a>


    {/* 04 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">04</span>

        <div>
          <h3>SEO & Organic Growth</h3>

          <p>
            Build sustainable visibility and long-term digital growth.
          </p>

        </div>

      </div>

      <div className="service-middle">
        SEO
      </div>

      <span className="interactive-arrow">↗</span>

    </a>


    {/* 05 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">05</span>

        <div>
          <h3>Web Development</h3>

          <p>
            Create fast, responsive and memorable digital experiences.
          </p>

        </div>

      </div>

      <div className="service-middle">
        WEB
      </div>

      <span className="interactive-arrow">↗</span>

    </a>


    {/* 06 */}

    <a href="#" className="interactive-service">

      <div className="service-left">

        <span className="interactive-number">06</span>

        <div>
          <h3>Branding & Digital Strategy</h3>

          <p>
            Shape a clear identity and strategy built for what's next.
          </p>

        </div>

      </div>

      <div className="service-middle">
        BRAND
      </div>

      <span className="interactive-arrow">↗</span>

    </a>

  </div>


  <div className="services-bottom">

    <span>∞</span>

    <p>
      MULTIPLE DISCIPLINES · ONE CONNECTED SYSTEM
    </p>

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




















