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

const skills = [
  { icon: "🛒", label: "Shopify for\nSadhana Shop", color: "#76B900" },
  { icon: "📱", label: "Sadhana\nTablet Store", color: "#5fa300" },
  { icon: "💬", label: "WhatsApp\nMarketing Funnels", color: "#76B900" },
  { icon: "📧", label: "High-Converting\nEmail Campaigns", color: "#5fa300" },
  { icon: "⚡", label: "Performance &\nConversion", color: "#76B900" },
];

const SkillCard: React.FC<{
  skill: (typeof skills)[number];
  index: number;
  startFrame: number;
}> = ({ skill, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterDelay = startFrame + index * 25;

  // Scale + fade entrance
  const scaleProgress = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const scale = interpolate(scaleProgress, [0, 1], [0.3, 1]);
  const opacity = interpolate(scaleProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Slide from alternating sides
  const slideDir = index % 2 === 0 ? -1 : 1;
  const slideProgress = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const slideX = interpolate(slideProgress, [0, 1], [300 * slideDir, 0]);

  // Glow pulse after entrance
  const glowPhase = Math.max(0, frame - enterDelay - 20);
  const glowIntensity = interpolate(
    Math.sin(glowPhase * 0.08),
    [-1, 1],
    [0.2, 0.5],
  );

  // Exit animation - skills fade out before next scene
  const exitStart = 340;
  const exitOpacity = interpolate(frame, [exitStart, exitStart + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: opacity * exitOpacity,
        transform: `translateX(${slideX}px) scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "20px 35px",
        marginBottom: 16,
        background: "rgba(118, 185, 0, 0.08)",
        border: `1.5px solid rgba(118, 185, 0, ${glowIntensity})`,
        borderRadius: 16,
        boxShadow: `0 0 25px rgba(118, 185, 0, ${glowIntensity * 0.3}), inset 0 0 20px rgba(118, 185, 0, 0.03)`,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontSize: 50, lineHeight: 1 }}>{skill.icon}</div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Courier New', monospace",
          letterSpacing: 1,
          lineHeight: 1.3,
          whiteSpace: "pre-line",
          textShadow: `0 0 10px rgba(118, 185, 0, 0.3)`,
        }}
      >
        {skill.label}
      </div>
    </div>
  );
};

export const SkillsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "WHAT I DO" header entrance
  const headerProgress = spring({
    frame: frame - 110,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const headerScale = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerOpacity = interpolate(headerProgress, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Header exit
  const headerExitOpacity = interpolate(frame, [340, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line under header
  const lineProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 20, stiffness: 50 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 200]);

  return (
    <AbsoluteFill>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 680,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOpacity * headerExitOpacity,
          transform: `scale(${headerScale})`,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            fontFamily,
            color: "#76B900",
            letterSpacing: 8,
            textShadow: "0 0 20px rgba(118, 185, 0, 0.4)",
          }}
        >
          WHAT I DO
        </div>
        <div
          style={{
            width: lineWidth,
            height: 2,
            backgroundColor: "#76B900",
            margin: "12px auto 0",
            boxShadow: "0 0 10px rgba(118, 185, 0, 0.5)",
          }}
        />
      </div>

      {/* Skills list */}
      <div
        style={{
          position: "absolute",
          top: 790,
          left: 60,
          right: 60,
        }}
      >
        {skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} startFrame={130} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
