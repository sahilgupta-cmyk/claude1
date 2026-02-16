import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
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
 *  100-350: Skills showcase — each skill slides in with its own transition
 *  350-420: Closing — everything fades, name returns center
 */
export const SahilIntro: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade to black at the very end
  const endFade = interpolate(frame, [400, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
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

        {/* Layer 6: Skills showcase — appears after intro settles */}
        <SkillsShowcase />
      </GlitchEffect>

      {/* Closing title flash */}
      {frame >= 360 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: interpolate(frame, [360, 380, 410, 420], [0, 1, 1, 0], {
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
