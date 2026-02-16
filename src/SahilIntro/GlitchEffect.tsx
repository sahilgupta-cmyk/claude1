import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

/**
 * Occasional subtle digital glitch distortion:
 * - Micro skew
 * - Slight hue shift
 * - RGB split for 3 frames
 * Applied to children.
 */
export const GlitchEffect: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();

  // Glitch triggers every ~60 frames, lasts 3 frames
  const glitchCycle = frame % 70;
  const isGlitching = glitchCycle >= 0 && glitchCycle < 3;

  if (!isGlitching) {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const glitchFrame = glitchCycle;
  const skewX = glitchFrame === 0 ? 1.5 : glitchFrame === 1 ? -1 : 0.5;
  const rgbShift = glitchFrame === 1 ? 3 : 0;
  const hueShift = glitchFrame === 0 ? 10 : 0;

  return (
    <AbsoluteFill>
      {/* RGB split - red channel offset */}
      {rgbShift > 0 && (
        <AbsoluteFill
          style={{
            transform: `translateX(${rgbShift}px)`,
            mixBlendMode: "screen",
            opacity: 0.3,
            filter: "hue-rotate(120deg) saturate(3)",
          }}
        >
          {children}
        </AbsoluteFill>
      )}

      {/* Main layer with glitch */}
      <AbsoluteFill
        style={{
          transform: `skewX(${skewX}deg)`,
          filter: `hue-rotate(${hueShift}deg)`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
