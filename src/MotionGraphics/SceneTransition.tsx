import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const WipeTransition: React.FC<{
  startFrame: number;
  duration: number;
  color?: string;
}> = ({ startFrame, duration, color = "#ffffff" }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration / 2, startFrame + duration],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        transform: `scaleX(${progress})`,
        transformOrigin: frame < startFrame + duration / 2 ? "left" : "right",
      }}
    />
  );
};

export const SceneTransition: React.FC<{
  scene1Color?: string;
  scene2Color?: string;
  transitionColor?: string;
}> = ({
  scene1Color = "#1a1a2e",
  scene2Color = "#16213e",
  transitionColor = "#e94560",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const midpoint = Math.floor(durationInFrames / 2);

  // Scene 1 text
  const scene1Opacity = interpolate(frame, [0, 10, midpoint - 15, midpoint], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 2 text
  const scene2Opacity = interpolate(
    frame,
    [midpoint, midpoint + 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      {/* Scene 1 */}
      <Sequence durationInFrames={midpoint + 15}>
        <AbsoluteFill
          style={{
            backgroundColor: scene1Color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "sans-serif",
              opacity: scene1Opacity,
            }}
          >
            Scene One
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2 */}
      <Sequence from={midpoint - 15}>
        <AbsoluteFill
          style={{
            backgroundColor: scene2Color,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              fontFamily: "sans-serif",
              opacity: scene2Opacity,
            }}
          >
            Scene Two
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Wipe overlay */}
      <WipeTransition
        startFrame={midpoint - 15}
        duration={30}
        color={transitionColor}
      />
    </AbsoluteFill>
  );
};
