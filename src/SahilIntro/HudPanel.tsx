import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Glassmorphism HUD panel that slides in from left (-600px).
 * Contains monospace text appearing line by line.
 */

const HudLine: React.FC<{
  text: string;
  delay: number;
  isBullet?: boolean;
}> = ({ text, delay, isBullet = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const translateX = interpolate(slideProgress, [0, 1], [-40, 0]);
  const opacity = interpolate(slideProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: isBullet ? 16 : 20,
        color: isBullet ? "rgba(255,255,255,0.85)" : "#76B900",
        fontWeight: isBullet ? 400 : 700,
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: isBullet ? 8 : 12,
        letterSpacing: isBullet ? 0.5 : 2,
        lineHeight: 1.4,
      }}
    >
      {isBullet ? `▸ ${text}` : text}
    </div>
  );
};

export const HudPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Panel slides in at ~1.5s (frame 45 at 30fps)
  const panelEntrance = spring({
    frame: frame - 45,
    fps,
    config: { damping: 14, stiffness: 60, mass: 0.8 },
  });
  const panelX = interpolate(panelEntrance, [0, 1], [-600, 0]);
  const panelOpacity = interpolate(panelEntrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow border pulse
  const glowIntensity = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.3, 0.7],
  );

  const lines = [
    { text: "SHOPIFY EXPERT", delay: 55, isBullet: false },
    { text: "E-commerce Architect", delay: 62, isBullet: false },
    { text: "", delay: 0, isBullet: false },
    { text: "Handles Shopify for Sadhana Shop", delay: 72, isBullet: true },
    { text: "Manages Sadhana Tablet Store", delay: 80, isBullet: true },
    { text: "Builds WhatsApp Marketing Funnels", delay: 88, isBullet: true },
    {
      text: "Designs High-Converting Email Campaigns",
      delay: 96,
      isBullet: true,
    },
    {
      text: "Performance & Conversion Optimization",
      delay: 104,
      isBullet: true,
    },
  ];

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 40 + panelX,
          top: 900,
          width: 520,
          padding: "30px 25px",
          background: "rgba(10, 40, 10, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          clipPath:
            "polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))",
          boxShadow: `0 0 20px rgba(118, 185, 0, ${glowIntensity}), inset 0 0 30px rgba(118, 185, 0, 0.05)`,
          border: "1px solid rgba(118, 185, 0, 0.3)",
          opacity: panelOpacity,
        }}
      >
        {lines.map((line, i) =>
          line.text === "" ? (
            <div key={i} style={{ height: 10 }} />
          ) : (
            <HudLine
              key={i}
              text={line.text}
              delay={line.delay}
              isBullet={line.isBullet}
            />
          ),
        )}
      </div>
    </AbsoluteFill>
  );
};
