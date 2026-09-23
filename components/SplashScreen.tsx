"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 6000);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="infinity-splash">

      {/* Background glow */}
      <div className="splash-ambient-glow" />

      {/* Initial light streak */}
      <div className="splash-light-streak" />

      {/* Infinity portal */}
     <div className="splash-portal">
  <div className="splash-ring splash-ring-one" />
  <div className="splash-ring splash-ring-two" />
  <div className="splash-infinity-glow" />

  <svg
    className="splash-infinity-svg"
    viewBox="0 0 200 160"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="infinityGradient"
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
      >
        <stop offset="0%" stopColor="#00eaff" />
        <stop offset="45%" stopColor="#319fff" />
        <stop offset="72%" stopColor="#635cff" />
        <stop offset="100%" stopColor="#a94dff" />
      </linearGradient>
    </defs>

    <path
      className="splash-infinity-path"
      d="M 100 80 C 75 35, 25 35, 25 80 C 25 125, 75 125, 100 80 C 125 35, 175 35, 175 80 C 175 125, 125 125, 100 80"
      fill="none"
      stroke="url(#infinityGradient)"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
</div>

<div className="splash-brand-text">
  INFINITY
  <span>DIGITAL MARKETING</span>
</div>

    </div>
  );
}