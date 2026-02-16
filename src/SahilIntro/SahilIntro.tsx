import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { TechRings } from "./TechRings";
import { TitleText } from "./TitleText";
import { SubjectPlaceholder } from "./SubjectPlaceholder";
import { HudPanel } from "./HudPanel";
import { ScannerLine } from "./ScannerLine";
import { GlitchEffect } from "./GlitchEffect";

/**
 * Main composition: Cinematic 9:16 portrait tech-corporate intro
 * for "SAHIL GUPTA" — Shopify Expert.
 *
 * 1080x1920 @ 30fps, ~7 seconds (210 frames)
 *
 * Layer order (back to front):
 *  1. Background (white + radial texture + green glow + data streams + particles)
 *  2. Tech rings (rotating dashed neon circles)
 *  3. Title text ("SAHIL GUPTA" with pop-in + corner brackets)
 *  4. Subject portrait (spring entrance from right at 1.3s)
 *  5. HUD panel (glassmorphism, slides from left at 1.5s)
 *  6. Scanner line (vertical green sweep)
 *  7. Glitch effect wrapper (occasional 3-frame distortion)
 */
export const SahilIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f8f8f8" }}>
      {/* Layer 1: Background */}
      <Background />

      {/* Layer 2: Tech rings — appear after 0.6s */}
      <Sequence from={18}>
        <TechRings />
      </Sequence>

      {/* Layer 3–6 wrapped in glitch effect */}
      <GlitchEffect>
        {/* Layer 3: Title text — immediate entrance */}
        <Sequence from={5}>
          <TitleText />
        </Sequence>

        {/* Layer 4: Subject portrait — enters at ~1.3s */}
        <SubjectPlaceholder />

        {/* Layer 5: HUD panel — slides in at ~1.5s */}
        <HudPanel />
      </GlitchEffect>

      {/* Layer 6: Scanner line (not affected by glitch) */}
      <ScannerLine />
    </AbsoluteFill>
  );
};
