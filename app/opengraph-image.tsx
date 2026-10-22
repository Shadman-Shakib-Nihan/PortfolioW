import { ImageResponse } from "next/og";

export const alt = "Shadman Shakib — AI/ML Engineer and Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070b",
          color: "#f5f5f8",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-180px",
            right: "-120px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.45), rgba(14,165,233,0.08))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            left: "-140px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, rgba(14,165,233,0.22), rgba(124,58,237,0.02))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            SS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "22px", fontWeight: 600 }}>Shadman Shakib</span>
            <span style={{ fontSize: "15px", color: "#a2a2b4", letterSpacing: "2px" }}>
              AI / ML ENGINEER
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "66px",
              lineHeight: 1.06,
              letterSpacing: "-2.5px",
              fontWeight: 600,
              maxWidth: "940px",
            }}
          >
            <span>Building intelligent software</span>
            <span style={{ color: "#c4b5fd" }}>for real-world problems.</span>
          </div>
          <span style={{ fontSize: "24px", color: "#a2a2b4" }}>
            AI/ML Engineer · Full-Stack Developer · Computer Vision Researcher
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "19px",
            color: "#8b8b9c",
          }}
        >
          <span>github.com/Shadman-Shakib-Nihan</span>
          <span>Dhaka, Bangladesh</span>
        </div>
      </div>
    ),
    size,
  );
}
