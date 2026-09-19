"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${isMenuOpen ? "mobile-menu-open" : ""}`}>
      <div className="logo">
        <Link
          href="/"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "inherit",
            textDecoration: "none",
          }}
        >
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
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <nav className="desktop-nav">
        <Link href="/services">Services</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
      </nav>

      {/* DESKTOP LET'S TALK */}
      <Link href="/contact" className="nav-button desktop-talk-button">
        Let's Talk →
      </Link>

      {/* MOBILE HAMBURGER */}
      <button
        type="button"
        className={`mobile-menu-toggle ${
          isMenuOpen ? "active" : ""
        }`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <Link href="/services" onClick={closeMenu}>
            <span>01</span>
            Services
          </Link>

          <Link href="/pricing" onClick={closeMenu}>
            <span>02</span>
            Pricing
          </Link>

         <a href="/about" onClick={closeMenu}>
  <span>03</span>
  About
</a>

          <Link
            href="/contact"
            className="mobile-menu-talk"
            onClick={closeMenu}
          >
            Let's Talk →
          </Link>
        </div>
      </div>
    </header>
  );
}