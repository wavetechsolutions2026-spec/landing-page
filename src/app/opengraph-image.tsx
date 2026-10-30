import { ImageResponse } from "next/og";

export default function opengraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#f5f5f5",
        fontFamily: "sans-serif",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}>
          <span style={{ color: "#3b82f6" }}>Wave</span>
          <span>Tech</span>
        </div>
        <p style={{
          marginTop: 20,
          fontSize: 24,
          color: "#9ca3af",
          textAlign: "center",
        }}>
          Software solutions for growing businesses
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
