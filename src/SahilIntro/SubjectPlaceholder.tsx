import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Professional portrait placeholder on the right side.
 * Appears at ~1.3s with explosive spring entrance,
 * slight rotation overshoot and scale bounce.
 *
 * Replace the placeholder with an actual image via:
 *   <Img src={staticFile("sahil-portrait.png")} />
 */
export const SubjectPlaceholder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterFrame = 39; // ~1.3s at 30fps

  // Explosive spring entrance
  const scaleProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.5 },
  });
  const scale = interpolate(scaleProgress, [0, 1], [0, 1]);

  // Rotation overshoot
  const rotationProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 8, stiffness: 80, mass: 0.4 },
  });
  const rotation = interpolate(rotationProgress, [0, 1], [15, 0]);

  // Slide in from right
  const slideProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const translateX = interpolate(slideProgress, [0, 1], [300, 0]);

  const opacity = interpolate(frame, [enterFrame, enterFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Corner brackets around subject
  const bracketProgress = spring({
    frame: frame - enterFrame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const bracketOpacity = interpolate(bracketProgress, [0, 1], [0, 0.6]);

  const bracketStyle: React.CSSProperties = {
    position: "absolute",
    width: 25,
    height: 25,
    borderColor: "#76B900",
    borderStyle: "solid",
    opacity: bracketOpacity,
  };

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 350,
          width: 380,
          height: 480,
          opacity,
          transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* Corner brackets */}
        <div
          style={{
            ...bracketStyle,
            top: -15,
            left: -15,
            borderWidth: "2px 0 0 2px",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            top: -15,
            right: -15,
            borderWidth: "2px 2px 0 0",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            bottom: -15,
            left: -15,
            borderWidth: "0 0 2px 2px",
          }}
        />
        <div
          style={{
            ...bracketStyle,
            bottom: -15,
            right: -15,
            borderWidth: "0 2px 2px 0",
          }}
        />

        {/* Portrait placeholder — replace with <Img> for real photo */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 12,
            background:
              "linear-gradient(135deg, rgba(118,185,0,0.15) 0%, rgba(200,220,200,0.3) 50%, rgba(118,185,0,0.1) 100%)",
            border: "2px solid rgba(118, 185, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.1), 0 0 30px rgba(118, 185, 0, 0.15)",
          }}
        >
          {/* Silhouette icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "rgba(118, 185, 0, 0.2)",
              marginBottom: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 50,
            }}
          >
            👤
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: "rgba(118, 185, 0, 0.6)",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            Place portrait image at
            <br />
            public/sahil-portrait.png
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
