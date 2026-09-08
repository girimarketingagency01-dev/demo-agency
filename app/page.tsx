"use client";

import {
useEffect,
useLayoutEffect,
useRef,
useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
const [mouse, setMouse] = useState({
x: 0,
y: 0,
});

const [isCursorVisible, setIsCursorVisible] =
useState(false);

const [activePlanet, setActivePlanet] =
useState<string | null>(null);

/* =========================================
SCROLL STORY REFS
========================================= */

const processSectionRef =
  useRef<HTMLElement | null>(null);

const introLineOneRef =
  useRef<HTMLHeadingElement | null>(null);

const introLineTwoRef =
  useRef<HTMLHeadingElement | null>(null);

const introLineThreeRef =
  useRef<HTMLHeadingElement | null>(null);

const processStageRefs =
  useRef<(HTMLDivElement | null)[]>([]);

const processFinalRef =
  useRef<HTMLDivElement | null>(null);

const stages =
  processStageRefs.current.filter(Boolean) as HTMLDivElement[];  

/* =========================================
CUSTOM CURSOR + PLANET PROXIMITY
========================================= */

useEffect(() => {
const handleMouseMove = (event: MouseEvent) => {
const x = event.clientX;
const y = event.clientY;

  setMouse({
    x,
    y,
  });

  /*
    Hide custom cursor when it reaches
    any edge of the browser viewport.
  */
  const EDGE_GAP = 6;

  const insideViewport =
    x > EDGE_GAP &&
    y > EDGE_GAP &&
    x < window.innerWidth - EDGE_GAP &&
    y < window.innerHeight - EDGE_GAP;

  setIsCursorVisible(insideViewport);


  /* =====================================
     PLANET PROXIMITY
  ===================================== */

  const planets =
    document.querySelectorAll<HTMLElement>(
      ".planet"
    );

  let closestPlanet: string | null = null;

  let closestDistance = 110;

  planets.forEach((planet) => {
    const rect =
      planet.getBoundingClientRect();

    const planetX =
      rect.left + rect.width / 2;

    const planetY =
      rect.top + rect.height / 2;

    const distance = Math.hypot(
      x - planetX,
      y - planetY
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPlanet =
        planet.dataset.planet || null;
    }
  });

  setActivePlanet(closestPlanet);
};


window.addEventListener(
  "mousemove",
  handleMouseMove
);


return () => {
  window.removeEventListener(
    "mousemove",
    handleMouseMove
  );
};

}, []);

/* =========================================
GSAP PINNED STORY
========================================= */

useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const section = processSectionRef.current;

  const lineOne = introLineOneRef.current;
  const lineTwo = introLineTwoRef.current;
  const lineThree = introLineThreeRef.current;

  const stages = processStageRefs.current.filter(
    Boolean
  ) as HTMLDivElement[];

  const finalMessage = processFinalRef.current;

  if (
    !section ||
    !lineOne ||
    !lineTwo ||
    !lineThree ||
    stages.length !== 4 ||
    !finalMessage
  ) {
    return;
  }

  const ctx = gsap.context(() => {

    /* =========================
       INITIAL STATE
    ========================= */

    gsap.set(lineOne, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    });

    gsap.set(lineTwo, {
      opacity: 0,
      y: 70,
      scale: 0.94,
      filter: "blur(8px)",
    });

    gsap.set(lineThree, {
      opacity: 0,
      y: 70,
      scale: 0.94,
      filter: "blur(8px)",
    });

    gsap.set(stages, {
      opacity: 0,
      y: 80,
      scale: 0.92,
      filter: "blur(10px)",
    });

    gsap.set(finalMessage, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      filter: "blur(8px)",
    });


    /* =========================
       TIMELINE
    ========================= */

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=5600",
        pin: true,
        scrub: 1.15,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });


    /* =========================
       WE TURN BUSINESS
    ========================= */

    tl.to(lineOne, {
      opacity: 0,
      y: -70,
      scale: 0.92,
      filter: "blur(8px)",
      duration: 1.2,
      ease: "power2.inOut",
    });


    /* =========================
       GOALS INTO
    ========================= */

    tl.to(lineTwo, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    }, "-=0.25");


    tl.to(lineTwo, {
      opacity: 0,
      y: -70,
      scale: 0.92,
      filter: "blur(8px)",
      duration: 1.2,
      ease: "power2.inOut",
    }, "+=0.5");


    /* =========================
       DIGITAL GROWTH
    ========================= */

    tl.to(lineThree, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    }, "-=0.25");


    tl.to(lineThree, {
      opacity: 0,
      y: -70,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1.2,
      ease: "power2.inOut",
    }, "+=0.55");


    /* =========================
       STRATEGY
    ========================= */

    tl.to(stages[0], {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "power3.out",
    });

    tl.to(stages[0], {
      opacity: 0,
      y: -55,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.5");


    /* =========================
       CREATIVE
    ========================= */

    tl.to(stages[1], {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "power3.out",
    }, "-=0.2");

    tl.to(stages[1], {
      opacity: 0,
      y: -55,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.5");


    /* =========================
       TECHNOLOGY
    ========================= */

    tl.to(stages[2], {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "power3.out",
    }, "-=0.2");

    tl.to(stages[2], {
      opacity: 0,
      y: -55,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.5");


    /* =========================
       PERFORMANCE
    ========================= */

    tl.to(stages[3], {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.15,
      ease: "power3.out",
    }, "-=0.2");

    tl.to(stages[3], {
      opacity: 0,
      y: -55,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 1,
      ease: "power2.inOut",
    }, "+=0.55");


    /* =========================
       FINAL
    ========================= */

    tl.to(finalMessage, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.2");

  }, section);

  return () => {
    ctx.revert();
  };

}, []);

return (
 <main> 

  {/* =====================================
      CUSTOM INFINITY CURSOR
  ===================================== */}

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


  {/* =====================================
      NAVBAR
  ===================================== */}

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

        <small>
          DIGITAL MARKETING
        </small>
      </div>

    </div>


    <nav>
      <a href="#services">
        Services
      </a>

      <a href="#work">
        Work
      </a>

      <a href="#about">
        About
      </a>

      <a href="#insights">
        Insights
      </a>
    </nav>


    <a
      href="https://wa.me/919871401223?text=Hey%20Infinity%2C%20I%20want%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="nav-button"
    >
      Let's Talk →
    </a>

  </header>



  {/* =====================================
      HERO
  ===================================== */}

  <section className="immersive-hero">

    <div className="immersive-grid"></div>

    <div className="hero-noise"></div>


    {/* LEFT */}

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
        Strategy, creativity, technology and
        performance marketing — everything
        your business needs to build a powerful
        digital brand and grow without limits.
      </p>


      <div className="hero-buttons">

        <a
          href="https://wa.me/919871401223?text=Hey%20Infinity%2C%20I%20want%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button"
        >
          Start a Conversation →
        </a>

        <a
          href="#services"
          className="secondary-button"
        >
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


    {/* =================================
        RIGHT INFINITY UNIVERSE
    ================================= */}

    <div className="immersive-universe">

      <div className="universe-halo"></div>

      <div className="orbit orbit-one"></div>
      <div className="orbit orbit-two"></div>
      <div className="orbit orbit-three"></div>


      <div className="energy-line energy-line-one"></div>
      <div className="energy-line energy-line-two"></div>


      <div className="infinity-core">

        <div className="core-inner-glow"></div>

        <span>∞</span>

      </div>


      <div
        className={`planet planet-one ${
          activePlanet === "seo"
            ? "planet-active"
            : ""
        }`}
        data-planet="seo"
      >
        <span>SEO</span>
      </div>


      <div
        className={`planet planet-two ${
          activePlanet === "ads"
            ? "planet-active"
            : ""
        }`}
        data-planet="ads"
      >
        <span>ADS</span>
      </div>


      <div
        className={`planet planet-three ${
          activePlanet === "web"
            ? "planet-active"
            : ""
        }`}
        data-planet="web"
      >
        <span>WEB</span>
      </div>


      <div
        className={`planet planet-four ${
          activePlanet === "social"
            ? "planet-active"
            : ""
        }`}
        data-planet="social"
      >
        <span>SOCIAL</span>
      </div>


      <span className="floating-particle particle-one"></span>
      <span className="floating-particle particle-two"></span>
      <span className="floating-particle particle-three"></span>
      <span className="floating-particle particle-four"></span>
      <span className="floating-particle particle-five"></span>
      <span className="floating-particle particle-six"></span>


      <div className="star star-one">
        ✦
      </div>

      <div className="star star-two">
        ✦
      </div>

      <div className="star star-three">
        ✦
      </div>

      <div className="star star-four">
        ✦
      </div>

      <div className="star star-five">
        ✦
      </div>


      <div className="universe-label">

        <span>∞</span>

        ONE BRAND · INFINITE POSSIBILITIES

      </div>

    </div>


    {/* =================================
        SCROLL INDICATOR
    ================================= */}

    <div className="hero-scroll">

      <span>
        SCROLL TO EXPLORE
      </span>

      <div className="scroll-line">
        <span></span>
      </div>

    </div>

  </section>


  {/* =====================================
IMMERSIVE PROCESS STORY
===================================== */}

<section ref={processSectionRef} className="process-story" > <div className="process-story-bg"> <div className="process-orb process-orb-one"></div> <div className="process-orb process-orb-two"></div> </div>

<div className="process-story-scene">

{/* TOP LABEL */}

<div className="process-story-label">
  <span></span>
  HOW WE BUILD GROWTH
</div>


{/* INTRO */}

<div className="process-intro">

  <h2 ref={introLineOneRef}>
    We turn business
  </h2>

  <h2 ref={introLineTwoRef}>
    <span>goals into</span>
  </h2>

  <h2 ref={introLineThreeRef}>
    digital growth.
  </h2>

</div>


 {/* =================================
    PROCESS STAGES
================================= */}

<div className="process-stage">


  {/* =================================
      01 — STRATEGY
      TEXT LEFT / IMAGE RIGHT
  ================================= */}

  <div
    ref={(element) => {
      processStageRefs.current[0] = element;
    }}
    className="process-panel process-panel-left"
  >

    <div className="process-copy">

      <small>01</small>

      <h3>
        STRATEGY
      </h3>

      <p>
        We analyse your business, understand your
        goals and create a clear roadmap before
        execution begins.
      </p>

      <strong>
        THINK → PLAN → BUILD
      </strong>

    </div>


    <div className="process-visual">

      <div className="process-image-glow"></div>

      <div className="process-image-wrap">
        <img
          src="/process/strategy.png"
          alt="Strategy planning"
        />
      </div>


      {/* Floating elements */}

      <div className="visual-element strategy-board">
        <span>STRATEGY</span>
        <small>ROADMAP</small>
      </div>

      <div className="visual-element strategy-target">
        ◎
      </div>

      <div className="visual-element strategy-chart">
        ↗
        <small>GROWTH</small>
      </div>

      <div className="visual-orbit"></div>

    </div>

  </div>


  {/* =================================
      02 — CREATIVE
      IMAGE LEFT / TEXT RIGHT
  ================================= */}

  <div
    ref={(element) => {
      processStageRefs.current[1] = element;
    }}
    className="process-panel process-panel-right"
  >

    <div className="process-visual">

      <div className="process-image-glow"></div>

      <div className="process-image-wrap">
        <img
          src="/process/creative.png"
          alt="Creative design"
        />
      </div>


      <div className="visual-element creative-light">
        ✦
      </div>

      <div className="visual-element creative-palette">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="visual-element creative-pencil">
        ✎
      </div>

      <div className="visual-element creative-frame">
        ▧
      </div>

      <div className="visual-orbit"></div>

    </div>


    <div className="process-copy">

      <small>02</small>

      <h3>
        CREATIVE
      </h3>

      <p>
        We turn strategy into ideas, design and
        content that make your brand stand out
        and stay remembered.
      </p>

      <strong>
        IDEAS → CONCEPTS → VISUALS
      </strong>

    </div>

  </div>


  {/* =================================
      03 — TECHNOLOGY
      TEXT LEFT / IMAGE RIGHT
  ================================= */}

  <div
    ref={(element) => {
      processStageRefs.current[2] = element;
    }}
    className="process-panel process-panel-left"
  >

    <div className="process-copy">

      <small>03</small>

      <h3>
        TECHNOLOGY
      </h3>

      <p>
        We build fast, scalable and modern digital
        experiences designed around your business.
      </p>

      <strong>
        CODE → INNOVATE → SCALE
      </strong>

    </div>


    <div className="process-visual">

      <div className="process-image-glow"></div>

      <div className="process-image-wrap">
        <img
          src="/process/technology.png"
          alt="Technology development"
        />
      </div>


      <div className="visual-element tech-code">
        &lt;/&gt;
      </div>

      <div className="visual-element tech-cloud">
        ☁
      </div>

      <div className="visual-element tech-server">
        ▣
      </div>

      <div className="visual-element tech-ui">
        { }
      </div>

      <div className="visual-orbit"></div>

    </div>

  </div>


  {/* =================================
      04 — PERFORMANCE
      IMAGE LEFT / TEXT RIGHT
  ================================= */}

  <div
    ref={(element) => {
      processStageRefs.current[3] = element;
    }}
    className="process-panel process-panel-right"
  >

    <div className="process-visual">

      <div className="process-image-glow"></div>

      <div className="process-image-wrap">
        <img
          src="/process/performance.png"
          alt="Performance marketing analytics"
        />
      </div>


      <div className="visual-element performance-graph">
        ↗
        <small>GROWTH</small>
      </div>

      <div className="visual-element performance-bars">
        ▂▅▇
      </div>

      <div className="visual-element performance-percent">
        +328%
      </div>

      <div className="visual-orbit"></div>

    </div>


    <div className="process-copy">

      <small>04</small>

      <h3>
        PERFORMANCE
      </h3>

      <p>
        We measure, optimise and scale what works
        to turn digital activity into real business
        outcomes.
      </p>

      <strong>
        DATA → OPTIMISE → SCALE
      </strong>

    </div>

  </div>

</div>


{/* =================================
    FINAL MESSAGE
================================= */}

<div
  ref={processFinalRef}
  className="process-final"
>

  <div className="process-final-infinity">
    ∞
  </div>

  <div>

    <strong>
      ONE CONNECTED DIGITAL SYSTEM.
    </strong>

    <p>
      Strategy, creativity, technology and
      performance working together.
    </p>

  </div>

</div>

</div>

</section>


  {/* =====================================
      TRUSTED CAPABILITIES
  ===================================== */}

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


  {/* =====================================
      SERVICES
  ===================================== */}

  <section
    className="services-interactive"
    id="services"
  >

    <div className="services-intro">

      <div className="services-kicker">
        <span></span>
        OUR CAPABILITIES
      </div>


      <h2>
        One agency.
        <br />
        <em>
          Infinite ways to grow.
        </em>
      </h2>


      <p>
        Strategy, creativity, technology and
        performance connected together to
        build brands that move forward.
      </p>

    </div>


    <div className="services-list">


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            01
          </span>

          <div>

            <h3>
              Performance Marketing
            </h3>

            <p>
              Turn attention into measurable
              business growth.
            </p>

          </div>

        </div>


        <div className="service-middle">
          PERFORMANCE
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            02
          </span>

          <div>

            <h3>
              Social Media
            </h3>

            <p>
              Build attention, community and a
              stronger digital presence.
            </p>

          </div>

        </div>


        <div className="service-middle">
          SOCIAL
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            03
          </span>

          <div>

            <h3>
              Google & Meta Ads
            </h3>

            <p>
              Reach the right audience with
              performance-driven campaigns.
            </p>

          </div>

        </div>


        <div className="service-middle">
          ADS
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            04
          </span>

          <div>

            <h3>
              SEO & Organic Growth
            </h3>

            <p>
              Build sustainable visibility and
              long-term digital growth.
            </p>

          </div>

        </div>


        <div className="service-middle">
          SEO
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            05
          </span>

          <div>

            <h3>
              Web Development
            </h3>

            <p>
              Create fast, responsive and
              memorable digital experiences.
            </p>

          </div>

        </div>


        <div className="service-middle">
          WEB
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>


      <a
        href="#"
        className="interactive-service"
      >

        <div className="service-left">

          <span className="interactive-number">
            06
          </span>

          <div>

            <h3>
              Branding & Digital Strategy
            </h3>

            <p>
              Shape a clear identity and strategy
              built for what's next.
            </p>

          </div>

        </div>


        <div className="service-middle">
          BRAND
        </div>


        <span className="interactive-arrow">
          ↗
        </span>

      </a>

    </div>


    <div className="services-bottom">

      <span>∞</span>

      <p>
        MULTIPLE DISCIPLINES · ONE CONNECTED SYSTEM
      </p>

    </div>

  </section>


  {/* =====================================
      FINAL CTA
  ===================================== */}

  <section
    className="final-cta"
    id="contact"
  >

    <span>
      READY TO GO BEYOND?
    </span>


    <h2>
      Let's build
      <br />
      something <em>infinite.</em>
    </h2>


    <a
      href="https://wa.me/919871401223?text=Hey%20Infinity%2C%20I%20want%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
    >
      Start a Conversation →
    </a>

  </section>


  {/* =====================================
      FOOTER
  ===================================== */}

  <footer>

    <div className="footer-logo">

      <span>∞</span>

      <strong>
        INFINITY
      </strong>

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