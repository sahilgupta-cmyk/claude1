import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const ScannerLine: React.FC = () => {
  const frame = useCurrentFrame();

  const xPosition = interpolate(frame % 150, [0, 150], [-20, 1100]);

  const opacity = interpolate(frame, [20, 40], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          position: "absolute",
          left: xPosition,
          top: 0,
          width: 1,
          height: "100%",
          backgroundColor: "#76B900",
          boxShadow:
            "0 0 10px rgba(118, 185, 0, 0.6), 0 0 30px rgba(118, 185, 0, 0.3), 0 0 60px rgba(118, 185, 0, 0.1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: xPosition - 40,
          top: 0,
          width: 80,
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(118, 185, 0, 0.04), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};
