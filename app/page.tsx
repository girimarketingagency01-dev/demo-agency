"use client";

import {
useEffect,
useLayoutEffect,
useRef,
useState,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { createPortal } from "react-dom";

export default function Home() {
const [mouse, setMouse] = useState({
x: 0,
y: 0,
});

const [isCursorVisible, setIsCursorVisible] =
useState(false);


const [activePlanet, setActivePlanet] =
useState<string | null>(null);



const [serviceIndex, setServiceIndex] = useState(0);
const [isContactOpen, setIsContactOpen] = useState(false);
const [selectedService, setSelectedService] = useState("Web Design & Development");



const [isThankYouOpen, setIsThankYouOpen] = useState(false);

const [appointmentHour, setAppointmentHour] = useState("");
const [appointmentMinute, setAppointmentMinute] = useState("");
const [appointmentPeriod, setAppointmentPeriod] = useState("");

const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);


useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;

    const isTyping =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT";

    if (isTyping || isContactOpen) return;

    if (event.key === "Enter") {
      setServiceIndex((prev) => (prev + 1) % 5);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isContactOpen]);



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


useEffect(() => {
  const section = document.querySelector<HTMLElement>(
    ".services-glass-section"
  );

  if (!section) return;

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();

    const totalScroll =
      section.offsetHeight - window.innerHeight;

    if (totalScroll <= 0) return;

    const passed = Math.min(
      Math.max(-rect.top, 0),
      totalScroll
    );

    const progress = passed / totalScroll;

    let index = 0;

    if (progress < 0.18) {
      index = 0;
    } else if (progress < 0.38) {
      index = 1;
    } else if (progress < 0.58) {
      index = 2;
    } else if (progress < 0.78) {
      index = 3;
    } else {
      index = 4;
    }

    setServiceIndex(index);
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  handleScroll();

  return () => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );
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

  </div>

  <div ref={processFinalRef} className="process-final">
    <div className="process-final-infinity">
      ∞
    </div>

    <div>
      <strong>ONE BRAND · INFINITE POSSIBILITIES</strong>
      <p>Strategy → Creative → Technology → Performance</p>
    </div>
  </div>

</section>




{/* =====================================================
    SERVICES — GLASS SCROLL EXPERIENCE
===================================================== */}

<section className="services-glass-section" id="services">

  <div className="services-glass-bg">
    <span className="services-orb orb-one"></span>
    <span className="services-orb orb-two"></span>
    <span className="services-orb orb-three"></span>
  </div>

  <div className="services-glass-stage">

    <div className="services-glass-panel">

      <div className="services-panel-top">
        <span>INFINITY DIGITAL MARKETING</span>
        <span className="services-counter">
              {String(serviceIndex + 1).padStart(2, "0")} / 05
        </span>
      </div>

      <div className="services-slides">

        {/* 01 */}
        <article
  className={`service-glass-slide ${
    serviceIndex === 0 ? "active" : ""
  }`}
>

          <div className="service-slide-copy">

            <span className="service-index">01 — WEB</span>

            <h2>
              Web Design
              <br />
              <em>& Development</em>
            </h2>

            <p>
              Fast, modern and conversion-focused websites built
              around your business goals.
            </p>

            <div className="service-pills">
              <span>Business Website</span>
              <span>E-commerce</span>
              <span>Corporate</span>
              <span>Landing Pages</span>
              <span>Blog</span>
              <span>Portfolio</span>
            </div>

            <div className="service-features">
              <span>Responsive Design</span>
              <span>UI / UX</span>
              <span>Speed Optimization</span>
              <span>Basic On-Page SEO</span>
              <span>Lead Integration</span>
              <span>3 Months Free Changes</span>
            </div>

          </div>

          <div className="service-slide-visual web-service-visual">
  <img
    src="/services/web.png"
    alt="Web Design and Development"
  />
</div>

        </article>


        {/* 02 */}
        <article
  className={`service-glass-slide ${
    serviceIndex === 1 ? "active" : ""
  }`}
>

          <div className="service-slide-copy">

            <span className="service-index">02 — META</span>

            <h2>
              Meta Ads
              <br />
              <em>That Convert.</em>
            </h2>

            <p>
              Facebook and Instagram campaigns designed to turn
              attention into qualified leads and sales.
            </p>

            <div className="service-pills">
              <span>Lead Generation</span>
              <span>Sales Campaigns</span>
              <span>Retargeting</span>
              <span>Creative Testing</span>
              <span>Audience Targeting</span>
              <span>Pixel & Events</span>
            </div>

            <div className="service-features">
              <span>Campaign Strategy</span>
              <span>Audience Research</span>
              <span>Creative Testing</span>
              <span>Retargeting</span>
              <span>Conversion Tracking</span>
            </div>

          </div>

          <div className="service-slide-visual ads-service-visual">
  <img
    src="/services/meta.png"
    alt="Meta Ads"
  />
</div>

        </article>


        {/* 03 */}
        <article
  className={`service-glass-slide ${
    serviceIndex === 2 ? "active" : ""
  }`}
>

          <div className="service-slide-copy">

            <span className="service-index">03 — GOOGLE</span>

            <h2>
              Google Ads
              <br />
              <em>At The Right Moment.</em>
            </h2>

            <p>
              Reach people actively searching for your products
              and services with intent-driven campaigns.
            </p>

            <div className="service-pills">
              <span>Search Ads</span>
              <span>Performance Max</span>
              <span>Remarketing</span>
              <span>Keyword Strategy</span>
              <span>Conversion Tracking</span>
            </div>

            <div className="service-features">
              <span>Keyword Research</span>
              <span>Campaign Structure</span>
              <span>Search Intent</span>
              <span>Remarketing</span>
              <span>Landing Page Optimization</span>
            </div>

          </div>

          <div className="service-slide-visual google-service-visual">
  <img
    src="/services/google.png"
    alt="Google Ads"
  />
</div>

        </article>


        {/* 04 */}
        <article
  className={`service-glass-slide ${
    serviceIndex === 3 ? "active" : ""
  }`}
>

          <div className="service-slide-copy">

            <span className="service-index">04 — SOCIAL</span>

            <h2>
              Social Media
              <br />
              <em>People Remember.</em>
            </h2>

            <p>
              Content strategy, reels, creatives and consistent
              social communication built around your brand.
            </p>

            <div className="service-pills">
              <span>Content Strategy</span>
              <span>Reels</span>
              <span>Static Content</span>
              <span>Content Calendar</span>
              <span>Captions</span>
              <span>Growth Strategy</span>
            </div>

            <div className="service-features">
              <span>Monthly Planning</span>
              <span>Reel Concepts</span>
              <span>Creative Direction</span>
              <span>Caption Strategy</span>
              <span>Growth Optimization</span>
            </div>

          </div>

          <div className="service-slide-visual social-service-visual">
  <img
    src="/services/social.png"
    alt="Social Media Marketing"
  />
</div>

        </article>


        {/* 05 */}
        <article
  className={`service-glass-slide ${
    serviceIndex === 4 ? "active" : ""
  }`}
>

          <div className="service-slide-copy">

            <span className="service-index">05 — PERFORMANCE</span>

            <h2>
              Performance
              <br />
              <em>With Numbers Behind It.</em>
            </h2>

            <p>
              Funnels, tracking, A/B testing and optimization
              built around measurable business growth.
            </p>

            <div className="service-pills">
              <span>Lead Generation</span>
              <span>Funnels</span>
              <span>A/B Testing</span>
              <span>Retargeting</span>
              <span>Scaling</span>
              <span>CPL / CAC</span>
            </div>

            <div className="service-features">
              <span>Conversion Tracking</span>
              <span>Funnel Optimization</span>
              <span>A/B Testing</span>
              <span>Retargeting Systems</span>
              <span>Budget Scaling</span>
              <span>CPL & CAC Monitoring</span>
            </div>

          </div>

         <div className="service-slide-visual performance-service-visual">
  <img
    src="/services/performance.png"
    alt="Performance Marketing"
  />
</div>

        </article>

      </div>


      <div className="services-panel-bottom">

        <div className="services-progress">
  {[0, 1, 2, 3, 4].map((index) => (
    <button
      key={index}
      type="button"
      className={`progress-dot ${
        serviceIndex === index ? "active" : ""
      }`}
      onClick={() => setServiceIndex(index)}
      aria-label={`Go to service ${index + 1}`}
    />
  ))}
</div>

        <span className="services-scroll-label">
          SCROLL TO EXPLORE
        </span>

      </div>

    </div>

  </div>

</section>



{/* =====================================
    TALK TO INFINITY
===================================== */}

<section className="talk-infinity-section">
  <div className="talk-infinity-content">
    <span className="talk-infinity-kicker">
      READY TO BUILD SOMETHING BIG?
    </span>

    <h2>
      Let’s Talk
      <br />
      <em>Infinity.</em>
    </h2>

    <p>
      Tell us what you are building, what you need,
      and where you want your business to go.
    </p>

    <button
      type="button"
      className="talk-infinity-button"
      onClick={() => {
        setSelectedService(
          serviceIndex === 0
            ? "Web Design & Development"
            : serviceIndex === 1
            ? "Meta Ads"
            : serviceIndex === 2
            ? "Google Ads"
            : serviceIndex === 3
            ? "Social Media Marketing"
            : "Performance Marketing"
        );

        setIsContactOpen(true);
      }}
    >
      TALK TO INFINITY
      <span>↗</span>
    </button>
  </div>
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



{typeof document !== "undefined" &&
  isContactOpen &&
  createPortal(
    <div
      className="infinity-modal-backdrop"
      onClick={() => setIsContactOpen(false)}
    >
      <div
        className="infinity-contact-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="infinity-modal-close"
          onClick={() => setIsContactOpen(false)}
          aria-label="Close consultation form"
        >
          ×
        </button>

        <div className="modal-header">
          <span>LET'S BUILD SOMETHING BIG</span>

          <h3>
            Talk to <em>Infinity.</em>
          </h3>

          <p>
            Tell us what you are building, what you need,
            and where you want your business to go.
          </p>
        </div>

        <form
          className="infinity-contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Thank you. We will contact you shortly.");
            setIsContactOpen(false);
          }}
        >
          <div className="modal-field">
            <label>FULL NAME</label>

            <input
              type="text"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="modal-row">

            <div className="modal-field">
              <label>COUNTRY</label>

              <select defaultValue="" required>
                <option value="" disabled>
                  Select country
                </option>

                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>United Arab Emirates</option>
                <option>Singapore</option>
                <option>Germany</option>
                <option>France</option>
                <option>Other</option>
              </select>
            </div>

            <div className="modal-field">
              <label>SERVICE</label>

              <select
                value={selectedService}
                onChange={(event) =>
                  setSelectedService(event.target.value)
                }
                required
              >
                <option>Web Design & Development</option>
                <option>Meta Ads</option>
                <option>Google Ads</option>
                <option>Social Media Marketing</option>
                <option>Performance Marketing</option>
                <option>Other Service</option>
              </select>
            </div>

          </div>

          <div className="modal-row">

            <div className="modal-field">
              <label>APPOINTMENT DATE</label>

              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="modal-field">
              <label>APPOINTMENT TIME</label>

              <input
                type="time"
                required
              />
            </div>

          </div>

          <div className="modal-field">
            <label>MOBILE NUMBER</label>

            <input
              type="tel"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div className="modal-field">
            <label>EMAIL</label>

            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="modal-submit"
          >
            REQUEST CONSULTATION
          </button>
        </form>
      </div>
    </div>,
    document.body
  )}


</main>
);
}