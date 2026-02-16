import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "./Background";
import { TechRings } from "./TechRings";
import { TitleText } from "./TitleText";
import { SubjectPlaceholder } from "./SubjectPlaceholder";
import { SkillsShowcase } from "./SkillsShowcase";
import { ScannerLine } from "./ScannerLine";
import { GlitchEffect } from "./GlitchEffect";

/**
 * Redesigned cinematic 9:16 portrait intro for "SAHIL GUPTA"
 * 1080x1920 @ 30fps, ~14 seconds (420 frames)
 *
 * Scene flow:
 *  0-100:   Name entrance (SAHIL from left, GUPTA from right) + portrait
 *  70-100:  Tagline appears below subtitle
 *  100-350: Skills showcase — each skill slides in with its own transition
 *  350-420: Closing — tagline + name flash + fade to black
 */

const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter-style entrance at frame 70
  const enterDelay = 70;
  const taglineText = "Turning Clicks Into Customers";

  const progress = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  // Number of visible characters (typewriter effect)
  const charsVisible = Math.min(
    taglineText.length,
    Math.max(0, Math.floor((frame - enterDelay) * 1.2)),
  );
  const displayText =
    frame >= enterDelay ? taglineText.slice(0, charsVisible) : "";

  // Cursor blink
  const showCursor =
    frame >= enterDelay && frame < enterDelay + 50 && frame % 10 < 6;

  // Exit fade
  const exitOpacity = interpolate(frame, [330, 350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: 180,
      }}
    >
      <div
        style={{
          opacity: opacity * exitOpacity,
          transform: `translateY(${translateY}px)`,
          fontSize: 28,
          fontFamily: "'Courier New', monospace",
          color: "rgba(255, 255, 255, 0.8)",
          letterSpacing: 2,
          textAlign: "center",
          padding: "12px 30px",
          border: "1px solid rgba(118, 185, 0, 0.2)",
          borderRadius: 8,
          background: "rgba(118, 185, 0, 0.05)",
        }}
      >
        {displayText}
        {showCursor && (
          <span style={{ color: "#76B900", marginLeft: 2 }}>|</span>
        )}
      </div>
    </AbsoluteFill>
  );
};

export const SahilIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade to black at the very end
  const endFade = interpolate(frame, [400, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background music */}
      <Audio src={staticFile("ambient-tone.wav")} volume={0.6} />

      {/* Layer 1: Background (always visible) */}
      <Background />

      {/* Layer 2: Scanner line (subtle, always running) */}
      <ScannerLine />

      {/* Layer 3: Tech rings around portrait area */}
      <Sequence from={10}>
        <TechRings />
      </Sequence>

      {/* Glitch wraps the main content */}
      <GlitchEffect>
        {/* Layer 4: Title text — immediate entrance */}
        <Sequence from={0}>
          <TitleText />
        </Sequence>

        {/* Layer 5: Portrait — enters shortly after name */}
        <SubjectPlaceholder />

        {/* Layer 6: Tagline with typewriter effect */}
        <Tagline />

        {/* Layer 7: Skills showcase — appears after intro settles */}
        <SkillsShowcase />
      </GlitchEffect>

      {/* Closing title flash */}
      {frame >= 355 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: interpolate(frame, [355, 375, 410, 420], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: "#76B900",
              textAlign: "center",
              letterSpacing: 6,
              textShadow:
                "0 0 30px rgba(118, 185, 0, 0.6), 0 0 60px rgba(118, 185, 0, 0.3)",
              fontFamily: "'Knewave', cursive",
            }}
          >
            SAHIL
            <br />
            GUPTA
          </div>
          {/* Closing tagline */}
          <div
            style={{
              marginTop: 30,
              fontSize: 26,
              fontFamily: "'Courier New', monospace",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: 4,
              opacity: interpolate(frame, [375, 390], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            LET&apos;S BUILD SOMETHING GREAT
          </div>
        </AbsoluteFill>
      )}

      {/* Final fade to black */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000",
          opacity: endFade,
        }}
      />
    </AbsoluteFill>
  );
};
