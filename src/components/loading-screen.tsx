"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Music } from "lucide-react";

const BRAND_COLORS = ["#F02D8A", "#FFD700", "#4A6FCC", "#2DB84B", "#F7941D", "#7B3FA0"];

/* Pre-computed floating notes — no Math.random at render */
const NOTES = [
  { left: "10%", delay: 0.3, dur: 2.8, color: BRAND_COLORS[0], size: 18 },
  { left: "25%", delay: 0.6, dur: 3.2, color: BRAND_COLORS[1], size: 22 },
  { left: "42%", delay: 0.1, dur: 2.5, color: BRAND_COLORS[2], size: 16 },
  { left: "58%", delay: 0.8, dur: 3.0, color: BRAND_COLORS[3], size: 20 },
  { left: "75%", delay: 0.4, dur: 2.6, color: BRAND_COLORS[4], size: 17 },
  { left: "88%", delay: 0.7, dur: 3.4, color: BRAND_COLORS[5], size: 21 },
];

/* Pre-computed sparkle stars */
const SPARKLES = [
  { left: "8%", top: "20%", delay: 0, size: 6 },
  { left: "85%", top: "15%", delay: 0.4, size: 8 },
  { left: "15%", top: "75%", delay: 0.8, size: 5 },
  { left: "78%", top: "70%", delay: 0.2, size: 7 },
  { left: "50%", top: "10%", delay: 0.6, size: 6 },
];

/* Bouncing dots for progress indicator */
const DOTS = [
  { color: BRAND_COLORS[0], delay: 0 },
  { color: BRAND_COLORS[1], delay: 0.15 },
  { color: BRAND_COLORS[2], delay: 0.3 },
  { color: BRAND_COLORS[3], delay: 0.45 },
  { color: BRAND_COLORS[4], delay: 0.6 },
];

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "exit">("loading");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new CustomEvent("loading-complete"));
    }, 3200);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${phase === "exit" ? "loading-screen--exit" : ""}`}
      aria-hidden="true"
    >
      {/* Aurora background */}
      <div className="loading-aurora" />

      {/* Floating sparkle stars */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="loading-sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Floating music notes rising from bottom */}
      {NOTES.map((n, i) => (
        <div
          key={i}
          className="loading-note"
          style={{
            left: n.left,
            color: n.color,
            animationDelay: `${n.delay}s`,
            animationDuration: `${n.dur}s`,
          }}
        >
          <Music style={{ width: n.size, height: n.size }} />
        </div>
      ))}

      {/* Center stage */}
      <div className="loading-center">
        {/* Logo with bounce-in */}
        <div className="loading-logo">
          <Image
            src="/SK_Logo_FN.png"
            alt="Selah Kids"
            width={180}
            height={180}
            priority
            className="loading-logo-img"
          />
        </div>

        {/* Characters peeking in from sides */}
        <div className="loading-characters">
          <div className="loading-char loading-char--left">
            <Image src="/SK_Andy_Intro_Pose-removebg-preview.png" alt="" width={90} height={120} priority />
          </div>
          <div className="loading-char loading-char--right">
            <Image src="/SK_Shiloh_Intro_Pose-removebg-preview.png" alt="" width={90} height={120} priority />
          </div>
        </div>

        {/* Bouncing dots */}
        <div className="loading-dots">
          {DOTS.map((d, i) => (
            <div
              key={i}
              className="loading-dot"
              style={{
                backgroundColor: d.color,
                animationDelay: `${d.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Tagline */}
        <p className="loading-tagline">
          Loading the adventure...
        </p>
      </div>

    </div>
  );
}
