import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const Ring: React.FC<{
  size: number;
  speed: number;
  dashLength: string;
  offset: number;
  blurAmount: number;
  thickness: number;
}> = ({ size, speed, dashLength, offset, blurAmount, thickness }) => {
  const frame = useCurrentFrame();
  const rotation = frame * speed + offset;

  const opacity = interpolate(frame, [10, 40], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        border: `${thickness}px dashed rgba(118, 185, 0, 0.35)`,
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
        top: -130,
      }}
    >
      <Ring size={340} speed={0.4} dashLength="10 20" offset={0} blurAmount={0} thickness={1} />
      <Ring size={400} speed={-0.25} dashLength="15 25" offset={45} blurAmount={1} thickness={2} />
      <Ring size={460} speed={0.18} dashLength="8 30" offset={90} blurAmount={2} thickness={1} />
    </AbsoluteFill>
  );
};
