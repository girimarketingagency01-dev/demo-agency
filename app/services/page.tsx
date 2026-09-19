import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Web Design & Development",
    short: "Websites built to look premium, load fast and convert visitors into real enquiries.",
    points: [
      "Custom website design",
      "Responsive mobile-first development",
      "Landing pages",
      "Conversion-focused structure",
      "Performance optimization",
    ],
  },
  {
    number: "02",
    title: "Meta Ads",
    short: "Performance-focused Meta advertising built around leads, audiences, creatives and measurable growth.",
    points: [
      "Campaign strategy",
      "Audience targeting",
      "Creative testing",
      "Lead generation campaigns",
      "Retargeting systems",
    ],
  },
  {
    number: "03",
    title: "Google Ads",
    short: "Search and performance campaigns designed to capture high-intent customers when they are ready to act.",
    points: [
      "Search campaigns",
      "Keyword strategy",
      "Conversion tracking",
      "Campaign optimization",
      "Budget scaling",
    ],
  },
  {
    number: "04",
    title: "Social Media Marketing",
    short: "A strong social presence that makes your brand visible, consistent and easier to trust.",
    points: [
      "Content strategy",
      "Creative direction",
      "Social media planning",
      "Brand positioning",
      "Audience engagement",
    ],
  },
  {
    number: "05",
    title: "Performance Marketing",
    short: "A connected growth system focused on measurable outcomes rather than vanity metrics.",
    points: [
      "Funnel optimization",
      "A/B testing",
      "Retargeting systems",
      "Budget scaling",
      "CPL & CAC monitoring",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="inner-page services-page">

      <section className="inner-page-hero">
        <div className="inner-page-container">

          <span className="inner-page-kicker">
            INFINITY DIGITAL MARKETING
          </span>

          <h1>
            Digital services
            <br />
            built for <em>growth.</em>
          </h1>

          <p>
            Strategy, creativity, technology and performance marketing —
            connected together to help ambitious brands move forward.
          </p>

        </div>
      </section>


      <section className="services-page-list">
        <div className="inner-page-container">

          {services.map((service) => (
            <article
              className="service-page-card"
              key={service.number}
            >

              <div className="service-page-number">
                {service.number}
              </div>

              <div className="service-page-main">

                <h2>{service.title}</h2>

                <p className="service-page-description">
                  {service.short}
                </p>

                <div className="service-page-points">
                  {service.points.map((point) => (
                    <span key={point}>
                      {point}
                    </span>
                  ))}
                </div>

              </div>

              <Link
                href="/contact"
                className="service-page-arrow"
              >
                Discuss This Service →
              </Link>

            </article>
          ))}

        </div>
      </section>


      <section className="inner-page-cta">
        <div className="inner-page-container">

          <span>READY TO GO BEYOND?</span>

          <h2>
            Let&apos;s build
            <br />
            something <em>infinite.</em>
          </h2>

          <Link href="/contact">
            Start a Conversation →
          </Link>

        </div>
      </section>

    </main>
  );
}