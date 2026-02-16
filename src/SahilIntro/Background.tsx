import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const GridLine: React.FC<{
  orientation: "h" | "v";
  position: number;
  delay: number;
}> = ({ orientation, position, delay }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 30], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const style: React.CSSProperties =
    orientation === "h"
      ? {
          position: "absolute",
          left: 0,
          right: 0,
          top: position,
          height: 1,
          backgroundColor: "#76B900",
          opacity,
        }
      : {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: position,
          width: 1,
          backgroundColor: "#76B900",
          opacity,
        };

  return <div style={style} />;
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const glowOpacity = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.15, 0.35],
  );

  const gridLines: Array<{
    orientation: "h" | "v";
    position: number;
    delay: number;
  }> = [];
  for (let i = 0; i < 20; i++) {
    gridLines.push({ orientation: "h", position: i * 100, delay: i * 2 });
  }
  for (let i = 0; i < 12; i++) {
    gridLines.push({ orientation: "v", position: i * 100, delay: i * 2 + 5 });
  }

  return (
    <AbsoluteFill>
      {/* Dark base */}
      <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }} />

      {/* Subtle gradient overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(118, 185, 0, 0.08) 0%, transparent 60%)",
          opacity: glowOpacity * 2,
        }}
      />

      {/* Bottom gradient */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(118, 185, 0, 0.05) 0%, transparent 40%)",
        }}
      />

      {/* Grid lines */}
      {gridLines.map((line, i) => (
        <GridLine key={i} {...line} />
      ))}

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
