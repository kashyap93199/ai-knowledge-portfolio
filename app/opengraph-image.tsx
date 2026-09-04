import { ImageResponse } from "next/og";

export const alt = "AI Knowledge Portfolio — Exploring AI Through Design, Data, and 3D";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #05070f 0%, #0d1428 60%, #1a1040 100%)",
          color: "#e6eaf2",
          fontFamily: "sans-serif",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            AI
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 1 }}>
            AI Knowledge Portfolio
          </div>
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            textAlign: "center",
            maxWidth: 950,
            lineHeight: 1.15,
          }}
        >
          Exploring Artificial Intelligence Through Design, Data, and 3D
        </div>
        <div style={{ marginTop: 28, fontSize: 24, opacity: 0.75, textAlign: "center", maxWidth: 800 }}>
          An interactive portfolio experience explaining AI concepts, workflows, and future
          possibilities — built entirely with free, open-source tools.
        </div>
      </div>
    ),
    { ...size }
  );
}