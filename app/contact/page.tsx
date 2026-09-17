"use client";

import { useState } from "react";

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState(
    "Web Design & Development"
  );

  const [appointmentHour, setAppointmentHour] = useState("");
  const [appointmentMinute, setAppointmentMinute] = useState("");
  const [appointmentPeriod, setAppointmentPeriod] = useState("");

  const [isTimePickerOpen, setIsTimePickerOpen] =
    useState(false);

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="contact-page">

      {/* =====================================
          CONTACT HERO
      ===================================== */}

      <section className="contact-page-hero">

        <span className="contact-page-kicker">
          INFINITY DIGITAL MARKETING
        </span>

        <h1>
          Let’s build
          <br />
          <em>something big.</em>
        </h1>

        <p>
          Tell us what you are building, what you need,
          and where you want your business to go.
        </p>

      </section>


      {/* =====================================
          CONTACT FORM
      ===================================== */}

      <section className="contact-form-section">

        <div className="contact-form-card">

          {!isSubmitted ? (
            <form
              className="contact-page-form"
              onSubmit={handleSubmit}
            >

              {/* FULL NAME */}

              <div className="contact-page-field full">
                <label>
                  FULL NAME
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>


              {/* MOBILE + COUNTRY */}

              <div className="contact-page-row">

                <div className="contact-page-field">

                  <label>
                    MOBILE NUMBER
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="+91 98765 43210"
                    required
                  />

                </div>


                <div className="contact-page-field">

                  <label>
                    COUNTRY
                  </label>

                  <select
                    name="country"
                    defaultValue=""
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
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

              </div>


              {/* SERVICE + OTHER SERVICE */}

              <div className="contact-page-row">

                <div className="contact-page-field">

                  <label>
                    SERVICE
                  </label>

                  <select
                    name="service"
                    value={selectedService}
                    onChange={(event) =>
                      setSelectedService(
                        event.target.value
                      )
                    }
                    required
                  >
                    <option>
                      Web Design & Development
                    </option>

                    <option>
                      Meta Ads
                    </option>

                    <option>
                      Google Ads
                    </option>

                    <option>
                      Social Media Marketing
                    </option>

                    <option>
                      Performance Marketing
                    </option>

                    <option>
                      Other Service
                    </option>
                  </select>

                </div>


                <div className="contact-page-field">

                  <label>
                    OTHER SERVICE
                  </label>

                  <input
                    type="text"
                    name="otherService"
                    placeholder="Enter if needed"
                  />

                </div>

              </div>


              {/* DATE + TIME */}

              <div className="contact-page-row">

                <div className="contact-page-field">

                  <label>
                    APPOINTMENT DATE
                  </label>

                  <input
                    type="date"
                    name="appointmentDate"
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    required
                  />

                </div>


                <div className="contact-page-field">

                  <label>
                    APPOINTMENT TIME
                  </label>

                  <button
                    type="button"
                    className="contact-time-trigger"
                    onClick={() =>
                      setIsTimePickerOpen(true)
                    }
                  >
                    {appointmentHour
                      ? `${appointmentHour}:${appointmentMinute} ${appointmentPeriod}`
                      : "Select appointment time"}

                    <span>◷</span>
                  </button>

                </div>

              </div>


              {/* EMAIL */}

              <div className="contact-page-field full">

                <label>
                  EMAIL
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />

              </div>


              {/* SUBMIT */}

              <button
                type="submit"
                className="contact-submit-button"
              >
                REQUEST CONSULTATION
                <span>→</span>
              </button>

            </form>
          ) : (

            /* =====================================
               THANK YOU
            ===================================== */

            <div className="contact-success">

              <div className="contact-success-icon">
                ∞
              </div>

              <span>
                REQUEST RECEIVED
              </span>

              <h2>
                Thank you.
                <br />
                <em>We’ll be in touch.</em>
              </h2>

              <p>
                Your consultation request has been
                received. Our team will get back to you.
              </p>

              <a href="/" className="contact-back-button">
                BACK TO HOME →
              </a>

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          CIRCULAR TIME PICKER
      ===================================== */}

      {isTimePickerOpen && (
        <div
          className="contact-time-overlay"
          onClick={() =>
            setIsTimePickerOpen(false)
          }
        >

          <div
            className="contact-time-picker"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="contact-time-title">
              SELECT APPOINTMENT TIME
            </div>


            {/* CLOCK */}

            <div className="contact-clock">

              {Array.from(
                { length: 12 },
                (_, index) => {

                  const hour = String(
                    index + 1
                  ).padStart(2, "0");

                  const angle =
                    index * 30;

                  const radius = 92;

                  const x =
                    Math.sin(
                      (angle * Math.PI) / 180
                    ) * radius;

                  const y =
                    -Math.cos(
                      (angle * Math.PI) / 180
                    ) * radius;

                  const isActive =
                    appointmentHour === hour;

                  return (
                    <button
                      key={hour}
                      type="button"
                      className={
                        isActive
                          ? "clock-number active"
                          : "clock-number"
                      }
                      style={{
                        transform:
                          `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                      onClick={() => {
                        setAppointmentHour(hour);
                        setAppointmentMinute("");
                        setAppointmentPeriod("");
                      }}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}

              <div className="clock-center-dot"></div>

            </div>


            {/* MINUTES */}

            <div className="contact-minute-grid">

              {[
                0,
                5,
                10,
                15,
                20,
                25,
                30,
                35,
                40,
                45,
                50,
                55,
              ].map((minute) => {

                const value = String(
                  minute
                ).padStart(2, "0");

                const active =
                  appointmentMinute === value;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={!appointmentHour}
                    className={
                      active
                        ? "minute-button active"
                        : "minute-button"
                    }
                    onClick={() =>
                      setAppointmentMinute(value)
                    }
                  >
                    {value}
                  </button>
                );
              })}

            </div>


            {/* AM / PM */}

            <div className="contact-period-grid">

              <button
                type="button"
                disabled={!appointmentMinute}
                className={
                  appointmentPeriod === "AM"
                    ? "period-button active"
                    : "period-button"
                }
                onClick={() =>
                  setAppointmentPeriod("AM")
                }
              >
                AM
              </button>


              <button
                type="button"
                disabled={!appointmentMinute}
                className={
                  appointmentPeriod === "PM"
                    ? "period-button active"
                    : "period-button"
                }
                onClick={() =>
                  setAppointmentPeriod("PM")
                }
              >
                PM
              </button>

            </div>


            {/* DONE */}

            <button
              type="button"
              className="contact-time-done"
              disabled={
                !appointmentHour ||
                !appointmentMinute ||
                !appointmentPeriod
              }
              onClick={() =>
                setIsTimePickerOpen(false)
              }
            >
              DONE
            </button>

          </div>

        </div>
      )}

    </main>
  );
}