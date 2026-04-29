import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const DIMS = [
  { id: "yap", name: "Yap Density", emoji: "🗣️", color: "#5B8DBE" },
  { id: "creative", name: "Unhinged Creativity", emoji: "🎨", color: "#9B7DC9" },
  { id: "overthink", name: "Overthink Spiral", emoji: "🌀", color: "#5ABEAA" },
  { id: "delulu", name: "Delulu Confidence", emoji: "💅", color: "#C9A862" },
  { id: "main", name: "Main Character", emoji: "👑", color: "#C97DAA" },
  { id: "doom", name: "Doomscroll Resilience", emoji: "📱", color: "#C98B6A" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const overall = searchParams.get("overall") || "0";
  const ropi = searchParams.get("ropi") || "Unknown Type";
  const hotTake = searchParams.get("hot") || "";
  const scores = DIMS.map((d) => ({
    ...d,
    value: parseInt(searchParams.get(d.id) || "0", 10),
  }));

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0014 0%, #1a0030 50%, #0a0014 100%)",
          fontFamily: "sans-serif",
          color: "white",
          padding: "48px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "48px", fontWeight: 900, background: "linear-gradient(to right, #a855f7, #ec4899, #f97316)", backgroundClip: "text", color: "transparent" }}>
              BrainRot Index
            </div>
            <div style={{ fontSize: "20px", color: "#a78bfa", marginTop: "4px" }}>
              {ropi}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "80px", fontWeight: 900 }}>{overall}</div>
            <div style={{ fontSize: "14px", color: "#a1a1aa" }}>/100</div>
          </div>
        </div>

        {/* Dimension bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px", flex: 1 }}>
          {scores.map((dim) => (
            <div key={dim.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "200px", fontSize: "16px", color: "#d4d4d8" }}>
                {dim.emoji} {dim.name}
              </div>
              <div style={{ flex: 1, height: "24px", background: "#27272a", borderRadius: "12px", overflow: "hidden", display: "flex" }}>
                <div
                  style={{
                    width: `${dim.value}%`,
                    height: "100%",
                    background: dim.color,
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div style={{ width: "40px", textAlign: "right", fontSize: "16px", fontWeight: 700, color: dim.color }}>
                {dim.value}
              </div>
            </div>
          ))}
        </div>

        {/* Hot take */}
        {hotTake && (
          <div style={{ fontSize: "16px", color: "#a1a1aa", marginTop: "16px", fontStyle: "italic" }}>
            &ldquo;{hotTake}&rdquo;
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", fontSize: "12px", color: "#52525b" }}>
          <span>brainrotindex.app</span>
          <span>Powered by Gemini</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
