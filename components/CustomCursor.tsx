"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [isCursorVisible, setIsCursorVisible] =
    useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      setMouse({
        x,
        y,
      });

      const EDGE_GAP = 6;

      const insideViewport =
        x > EDGE_GAP &&
        y > EDGE_GAP &&
        x < window.innerWidth - EDGE_GAP &&
        y < window.innerHeight - EDGE_GAP;

      setIsCursorVisible(insideViewport);
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

  return (
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
  );
}