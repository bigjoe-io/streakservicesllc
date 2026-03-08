import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background:
            "linear-gradient(135deg, rgba(249,115,22,1) 0%, rgba(251,191,36,1) 55%, rgba(202,68,19,1) 100%)",
          color: "#0b0b12",
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        S
      </div>
    ),
    size
  );
}

