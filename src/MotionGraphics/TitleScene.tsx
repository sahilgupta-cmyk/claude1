import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TitleScene: React.FC<{
  title: string;
  subtitle?: string;
  color?: string;
  backgroundColor?: string;
}> = ({
  title,
  subtitle,
  color = "#ffffff",
  backgroundColor = "#0f0f0f",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slides in from below with spring physics
  const titleY = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 0.8 },
  });
  const titleTranslateY = interpolate(titleY, [0, 1], [80, 0]);

  // Title fades in
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle appears after a delay
  const subtitleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleTranslateY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  // Decorative line grows from center
  const lineWidth = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const lineScaleX = interpolate(lineWidth, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div
        style={{
          color,
          fontSize: 80,
          fontWeight: 700,
          fontFamily: "sans-serif",
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          textAlign: "center",
          letterSpacing: -2,
        }}
      >
        {title}
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: 200,
          height: 3,
          backgroundColor: color,
          margin: "20px 0",
          transform: `scaleX(${lineScaleX})`,
          opacity: 0.6,
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            color,
            fontSize: 32,
            fontWeight: 300,
            fontFamily: "sans-serif",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
            textAlign: "center",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {subtitle}
        </div>
      )}
    </AbsoluteFill>
  );
};
