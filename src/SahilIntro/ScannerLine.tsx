import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * Vertical glowing green scanner line that moves across the screen.
 */
export const ScannerLine: React.FC = () => {
  const frame = useCurrentFrame();

  // Scanner moves left to right, repeating
  const xPosition = interpolate(frame % 120, [0, 120], [-20, 1100]);

  const opacity = interpolate(frame, [30, 45], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Main scanner line */}
      <div
        style={{
          position: "absolute",
          left: xPosition,
          top: 0,
          width: 2,
          height: "100%",
          backgroundColor: "#76B900",
          boxShadow:
            "0 0 15px rgba(118, 185, 0, 0.8), 0 0 40px rgba(118, 185, 0, 0.4), 0 0 80px rgba(118, 185, 0, 0.2)",
        }}
      />
      {/* Trailing glow */}
      <div
        style={{
          position: "absolute",
          left: xPosition - 30,
          top: 0,
          width: 60,
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(118, 185, 0, 0.08), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
