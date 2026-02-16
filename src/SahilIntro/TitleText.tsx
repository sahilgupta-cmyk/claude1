import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Knewave";

const { fontFamily } = loadFont();

export const TitleText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "SAHIL" flies in from left
  const sahilSlide = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const sahilX = interpolate(sahilSlide, [0, 1], [-800, 0]);
  const sahilOpacity = interpolate(sahilSlide, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // "GUPTA" flies in from right
  const guptaSlide = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });
  const guptaX = interpolate(guptaSlide, [0, 1], [800, 0]);
  const guptaOpacity = interpolate(guptaSlide, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Glow intensity
  const glowSize = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [20, 40],
  );

  // Underline wipe
  const lineProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 600]);

  // Subtitle entrance
  const subProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  const nameStyle: React.CSSProperties = {
    fontSize: 130,
    fontWeight: 900,
    fontFamily,
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 8,
    lineHeight: 1.1,
    textShadow: `0 0 ${glowSize}px rgba(118, 185, 0, 0.5), 0 0 ${glowSize * 2}px rgba(118, 185, 0, 0.2)`,
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -450,
      }}
    >
      {/* SAHIL */}
      <div
        style={{
          ...nameStyle,
          transform: `translateX(${sahilX}px)`,
          opacity: sahilOpacity,
        }}
      >
        SAHIL
      </div>

      {/* GUPTA */}
      <div
        style={{
          ...nameStyle,
          transform: `translateX(${guptaX}px)`,
          opacity: guptaOpacity,
          color: "#76B900",
        }}
      >
        GUPTA
      </div>

      {/* Underline */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: "#76B900",
          marginTop: 20,
          boxShadow: "0 0 15px rgba(118, 185, 0, 0.6)",
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          marginTop: 25,
          fontSize: 36,
          fontFamily: "'Courier New', monospace",
          color: "rgba(118, 185, 0, 0.9)",
          letterSpacing: 6,
          fontWeight: 600,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        SHOPIFY EXPERT
      </div>
    </AbsoluteFill>
  );
};
