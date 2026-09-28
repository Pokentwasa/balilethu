import { ImageResponse } from "next/og";

export const alt = "Balilethu Livestock — Quality livestock. Straightforward buying.";
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
          justifyContent: "space-between",
          padding: 72,
          background: "#183d2f",
          color: "#f4efe6",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#d8ccbc" }}>Balilethu Livestock</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 88, lineHeight: 1, fontFamily: "serif" }}>
          <span>Quality livestock.</span>
          <span style={{ fontStyle: "italic" }}>Straightforward buying.</span>
        </div>
        <div style={{ fontSize: 28, color: "#d8ccbc" }}>Calves · Cattle · Sheep · Goats · Layers · Broilers · Day-old chicks</div>
      </div>
    ),
    size,
  );
}
