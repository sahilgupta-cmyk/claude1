import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SubjectPlaceholder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterFrame = 50;

  // Scale bounce entrance
  const scaleProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const scale = interpolate(scaleProgress, [0, 1], [0.5, 1]);

  // Slide up
  const slideProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const translateY = interpolate(slideProgress, [0, 1], [100, 0]);

  const opacity = interpolate(frame, [enterFrame, enterFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Green glow ring pulse
  const glowPhase = Math.max(0, frame - enterFrame - 15);
  const glowIntensity = interpolate(
    Math.sin(glowPhase * 0.06),
    [-1, 1],
    [0.3, 0.7],
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: -130,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          position: "relative",
        }}
      >
        {/* Glow ring behind portrait */}
        <div
          style={{
            position: "absolute",
            top: -20,
            left: -20,
            right: -20,
            bottom: -20,
            borderRadius: "50%",
            border: `2px solid rgba(118, 185, 0, ${glowIntensity})`,
            boxShadow: `0 0 30px rgba(118, 185, 0, ${glowIntensity * 0.4}), inset 0 0 30px rgba(118, 185, 0, ${glowIntensity * 0.1})`,
          }}
        />

        <Img
          src={staticFile("sahil-silhouette.svg")}
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid rgba(118, 185, 0, 0.5)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(118, 185, 0, 0.2)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
