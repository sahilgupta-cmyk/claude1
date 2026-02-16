import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * Clean white futuristic background with:
 * - Radial noise texture
 * - Soft green ambient glow
 * - Matrix-style data streams (low opacity)
 * - Floating geometric particles
 */

const DataStream: React.FC<{
  x: number;
  speed: number;
  opacity: number;
  chars: string;
}> = ({ x, speed, opacity, chars }) => {
  const frame = useCurrentFrame();
  const yOffset = (frame * speed) % 1920;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: yOffset - 1920,
        fontFamily: "monospace",
        fontSize: 12,
        color: "#76B900",
        opacity: opacity * 0.15,
        whiteSpace: "pre-wrap",
        lineHeight: 1.6,
        letterSpacing: 2,
        writingMode: "vertical-rl",
      }}
    >
      {chars}
    </div>
  );
};

const FloatingParticle: React.FC<{
  x: number;
  y: number;
  size: number;
  type: "triangle" | "hexagon";
  delay: number;
}> = ({ x, y, size, type, delay }) => {
  const frame = useCurrentFrame();

  const floatY = Math.sin((frame + delay) * 0.03) * 20;
  const floatX = Math.cos((frame + delay) * 0.02) * 10;
  const rotation = frame * 0.3 + delay;
  const opacity = interpolate(frame, [delay, delay + 20], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shape =
    type === "triangle"
      ? {
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size}px solid transparent`,
          borderBottomColor: "rgba(118, 185, 0, 0.3)",
        }
      : {
          width: size,
          height: size,
          backgroundColor: "transparent",
          border: "1px solid rgba(118, 185, 0, 0.3)",
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        };

  return (
    <div
      style={{
        position: "absolute",
        left: x + floatX,
        top: y + floatY,
        opacity,
        transform: `rotate(${rotation}deg)`,
        ...shape,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle pulsing green ambient glow
  const glowOpacity = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.03, 0.08],
  );

  const dataStreams = [
    { x: 80, speed: 3, opacity: 0.6, chars: "01001 11010 00110 10101 01110" },
    { x: 200, speed: 2.5, opacity: 0.4, chars: "10110 01001 11101 00011 10010" },
    { x: 520, speed: 3.5, opacity: 0.3, chars: "11001 00110 10011 01100 11010" },
    { x: 680, speed: 2, opacity: 0.5, chars: "00101 11010 01001 10110 01011" },
    { x: 900, speed: 2.8, opacity: 0.35, chars: "10010 01101 11000 00111 10100" },
    { x: 1000, speed: 3.2, opacity: 0.45, chars: "01110 10001 00100 11011 01010" },
  ];

  const particles: Array<{
    x: number;
    y: number;
    size: number;
    type: "triangle" | "hexagon";
    delay: number;
  }> = [
    { x: 100, y: 200, size: 20, type: "triangle", delay: 0 },
    { x: 900, y: 400, size: 16, type: "hexagon", delay: 10 },
    { x: 300, y: 1200, size: 14, type: "triangle", delay: 20 },
    { x: 800, y: 800, size: 22, type: "hexagon", delay: 5 },
    { x: 150, y: 1500, size: 18, type: "triangle", delay: 15 },
    { x: 950, y: 1000, size: 12, type: "hexagon", delay: 25 },
    { x: 500, y: 300, size: 15, type: "triangle", delay: 30 },
    { x: 700, y: 1600, size: 20, type: "hexagon", delay: 8 },
  ];

  return (
    <AbsoluteFill>
      {/* Base white background */}
      <AbsoluteFill style={{ backgroundColor: "#f8f8f8" }} />

      {/* Radial noise texture overlay */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(200,200,200,0.15) 100%)",
        }}
      />

      {/* Soft green ambient glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(118, 185, 0, 0.12) 0%, transparent 70%)",
          opacity: glowOpacity * 5,
        }}
      />

      {/* Matrix data streams */}
      {dataStreams.map((stream, i) => (
        <DataStream key={i} {...stream} />
      ))}

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </AbsoluteFill>
  );
};
