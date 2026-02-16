import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * Animated rotating dashed neon-green tech rings
 * spinning slowly with subtle blur depth.
 */
const Ring: React.FC<{
  size: number;
  speed: number;
  dashLength: string;
  offset: number;
  blurAmount: number;
}> = ({ size, speed, dashLength, offset, blurAmount }) => {
  const frame = useCurrentFrame();
  const rotation = frame * speed + offset;

  const opacity = interpolate(frame, [20, 40], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        border: `2px dashed rgba(118, 185, 0, 0.5)`,
        borderRadius: "50%",
        transform: `rotate(${rotation}deg)`,
        opacity,
        filter: `blur(${blurAmount}px)`,
        strokeDasharray: dashLength,
      }}
    />
  );
};

export const TechRings: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 100,
      }}
    >
      <Ring size={500} speed={0.3} dashLength="10 20" offset={0} blurAmount={0} />
      <Ring size={600} speed={-0.2} dashLength="15 25" offset={45} blurAmount={1} />
      <Ring size={700} speed={0.15} dashLength="8 30" offset={90} blurAmount={2} />
      <Ring size={400} speed={-0.4} dashLength="20 15" offset={135} blurAmount={0.5} />
    </AbsoluteFill>
  );
};
