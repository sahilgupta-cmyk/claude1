import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * "SAHIL GUPTA" massive centered title with:
 * - Pop-in scaling from 3x to 1x with bounce
 * - Blur fade-in
 * - Green glow aura
 * - Animated corner brackets
 */
export const TitleText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pop-in scale: 3x -> 1x with spring bounce
  const scaleProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const scale = interpolate(scaleProgress, [0, 1], [3, 1]);

  // Opacity fade-in
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Blur fade-in (sharp by frame 15)
  const blur = interpolate(frame, [0, 15], [12, 0], {
    extrapolateRight: "clamp",
  });

  // Glow intensity pulses subtly
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [15, 30],
  );

  // Corner brackets animation
  const bracketProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const bracketOpacity = interpolate(bracketProgress, [0, 1], [0, 0.7]);
  const bracketOffset = interpolate(bracketProgress, [0, 1], [30, 0]);

  const bracketStyle: React.CSSProperties = {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#76B900",
    borderStyle: "solid",
    opacity: bracketOpacity,
  };

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -200,
      }}
    >
      {/* Corner brackets around title area */}
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 140,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            ...bracketStyle,
            top: -bracketOffset,
            left: -bracketOffset,
            borderWidth: "3px 0 0 3px",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            top: -bracketOffset,
            right: -bracketOffset,
            borderWidth: "3px 3px 0 0",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            bottom: -bracketOffset,
            left: -bracketOffset,
            borderWidth: "0 0 3px 3px",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            bottom: -bracketOffset,
            right: -bracketOffset,
            borderWidth: "0 3px 3px 0",
          }}
        />
      </div>

      {/* Main title */}
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          fontFamily: "'Knewave', cursive, sans-serif",
          color: "#76B900",
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
          filter: `blur(${blur}px) drop-shadow(0 0 ${glowIntensity}px rgba(118, 185, 0, 0.6))`,
          letterSpacing: 4,
          lineHeight: 1.1,
        }}
      >
        SAHIL
        <br />
        GUPTA
      </div>
    </AbsoluteFill>
  );
};
