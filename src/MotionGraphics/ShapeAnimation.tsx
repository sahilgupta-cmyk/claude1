import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const Circle: React.FC<{
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}> = ({ delay, x, y, size, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const rotation = interpolate(frame, [0, 120], [0, 360]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity: interpolate(scale, [0, 0.5], [0, 0.85], {
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

const Square: React.FC<{
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}> = ({ delay, x, y, size, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const rotation = interpolate(frame, [delay, delay + 60], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 8,
        backgroundColor: color,
        transform: `scale(${progress}) rotate(${rotation}deg)`,
        opacity: interpolate(progress, [0, 0.5], [0, 0.9], {
          extrapolateRight: "clamp",
        }),
      }}
    />
  );
};

export const ShapeAnimation: React.FC<{
  backgroundColor?: string;
}> = ({ backgroundColor = "#0a0a2e" }) => {
  const shapes = [
    { type: "circle", x: 300, y: 300, size: 120, color: "#ff6b6b", delay: 0 },
    { type: "square", x: 600, y: 400, size: 100, color: "#4ecdc4", delay: 8 },
    { type: "circle", x: 1000, y: 250, size: 80, color: "#45b7d1", delay: 15 },
    { type: "square", x: 1400, y: 500, size: 140, color: "#f7dc6f", delay: 5 },
    { type: "circle", x: 1600, y: 300, size: 100, color: "#bb8fce", delay: 20 },
    { type: "square", x: 800, y: 700, size: 90, color: "#ff6b6b", delay: 12 },
    { type: "circle", x: 480, y: 600, size: 60, color: "#82e0aa", delay: 25 },
    { type: "square", x: 1200, y: 750, size: 110, color: "#f1948a", delay: 18 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {shapes.map((shape, i) =>
        shape.type === "circle" ? (
          <Circle key={i} {...shape} />
        ) : (
          <Square key={i} {...shape} />
        ),
      )}
    </AbsoluteFill>
  );
};
