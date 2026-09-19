import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="inner-page about-page">

      <section className="inner-page-hero">
        <div className="inner-page-container">

          <span className="inner-page-kicker">
            ABOUT INFINITY
          </span>

          <h1>
            Building brands
            <br />
            <em>with purpose.</em>
          </h1>

          <p>
            Infinity Digital Marketing was built with a simple belief:
            great digital marketing is not about doing more — it is about
            doing what actually moves a business forward.
          </p>

        </div>
      </section>


      {/* FOUNDER */}

      <section className="about-founder-section">
        <div className="inner-page-container about-founder-grid">

          <div className="about-founder-image">

            <div className="about-founder-glow"></div>

            <div className="about-founder-frame">
              <img
                src="/founder.png"
                alt="Founder - Infinity Digital Marketing"
              />
            </div>

            <div className="about-founder-tag">
              <span>∞</span>
              FOUNDER
            </div>

          </div>


          <div className="about-founder-copy">

            <span className="inner-page-kicker">
              THE PERSON BEHIND INFINITY
            </span>

            <h2>
              Building brands
              <br />
              <em>with purpose.</em>
            </h2>

            <p>
              Infinity Digital Marketing was built with a simple belief:
              great digital marketing is not about doing more — it is
              about doing what actually moves a business forward.
            </p>

            <p>
              From strategy and creative thinking to technology and
              performance, the focus is on creating digital systems that
              help brands communicate better, connect with the right
              audience and grow with confidence.
            </p>

            <div className="about-founder-signature">
              <strong>FOUNDER</strong>
              <span>Infinity Digital Marketing</span>
            </div>

          </div>

        </div>
      </section>


      {/* APPROACH */}

      <section className="about-approach-section">
        <div className="inner-page-container">

          <span className="inner-page-kicker">
            HOW WE THINK
          </span>

          <h2>
            One connected system.
            <br />
            <em>Four core principles.</em>
          </h2>

          <div className="about-principles">

            <div>
              <span>01</span>
              <h3>STRATEGY</h3>
              <p>
                Understand the business, audience and opportunity before
                deciding what should be done.
              </p>
            </div>

            <div>
              <span>02</span>
              <h3>CREATIVE</h3>
              <p>
                Turn strategy into ideas, content and experiences people
                actually notice.
              </p>
            </div>

            <div>
              <span>03</span>
              <h3>TECHNOLOGY</h3>
              <p>
                Build the digital systems required to create smoother,
                faster and more scalable experiences.
              </p>
            </div>

            <div>
              <span>04</span>
              <h3>PERFORMANCE</h3>
              <p>
                Measure what matters, optimize continuously and focus on
                meaningful business outcomes.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className="inner-page-cta">
        <div className="inner-page-container">

          <span>LET&apos;S WORK TOGETHER</span>

          <h2>
            Have a brand
            <br />
            ready to <em>grow?</em>
          </h2>

          <Link href="/contact">
            Start a Conversation →
          </Link>

        </div>
      </section>

    </main>
  );
}