"use client";

const pricingPlans = [
  {
    title: "Web Design & Development",
    price: "$500+",
    period: "per project",
    description:
      "Modern, responsive websites built around your business goals and conversion needs.",
    features: [
      "Business Website",
      "Responsive Design",
      "UI / UX",
      "Speed Optimization",
      "Basic On-Page SEO",
    ],
  },
  {
    title: "Meta Ads",
    price: "$500+",
    period: "per month",
    description:
      "Lead generation and sales campaigns designed for Facebook and Instagram.",
    features: [
      "Campaign Strategy",
      "Audience Research",
      "Creative Testing",
      "Retargeting",
      "Conversion Tracking",
    ],
  },
  {
    title: "Google Ads",
    price: "$500+",
    period: "per month",
    description:
      "Intent-driven Google campaigns designed to reach people actively searching.",
    features: [
      "Keyword Research",
      "Campaign Structure",
      "Search Ads",
      "Remarketing",
      "Conversion Tracking",
    ],
  },
  {
    title: "Social Media Marketing",
    price: "$500+",
    period: "per month",
    description:
      "Consistent content and social strategy built around your brand and audience.",
    features: [
      "Content Strategy",
      "Reel Concepts",
      "Static Creatives",
      "Content Calendar",
      "Growth Strategy",
    ],
  },
  {
    title: "Performance Marketing",
    price: "$750+",
    period: "per month",
    description:
      "Funnels, tracking and optimization focused on measurable business growth.",
    features: [
      "Funnel Optimization",
      "Conversion Tracking",
      "A/B Testing",
      "Retargeting",
      "Scaling Strategy",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="pricing-page">

      {/* HERO */}
      <section className="pricing-hero">

        <span className="pricing-kicker">
          INFINITY DIGITAL MARKETING
        </span>

        <h1>
          Clear pricing.
          <br />
          <em>Built to grow.</em>
        </h1>

        <p>
          Simple starting prices for brands ready to build,
          market and scale digitally.
        </p>

      </section>


      {/* PRICING CARDS */}
      <section className="pricing-section">

        <div className="pricing-grid">

          {pricingPlans.map((plan, index) => (
            <article
              className={`pricing-card ${
                index === 4 ? "pricing-card-featured" : ""
              }`}
              key={plan.title}
            >

              <span className="pricing-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2>
                {plan.title}
              </h2>

              <p className="pricing-description">
                {plan.description}
              </p>

              <div className="pricing-price">
                {plan.price}
              </div>

              <span className="pricing-period">
                {plan.period}
              </span>

              <div className="pricing-divider"></div>

              <div className="pricing-features">
                {plan.features.map((feature) => (
                  <span key={feature}>
                    <b>+</b>
                    {feature}
                  </span>
                ))}
              </div>

              <a
                href="/contact"
                className="pricing-card-button"
              >
                TALK TO INFINITY →
              </a>

            </article>
          ))}

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="pricing-bottom">

        <span>NEED SOMETHING CUSTOM?</span>

        <h2>
          Let's build the
          <br />
          <em>right solution.</em>
        </h2>

        <a
          href="/contact"
          className="pricing-bottom-button"
        >
          START A CONVERSATION →
        </a>

      </section>

    </main>
  );
}