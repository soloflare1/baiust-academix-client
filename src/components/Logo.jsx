export default function Logo({ size = "md", dark = false }) {
  const h = { sm: 36, md: 44, lg: 56 }[size] || 44;
  const text = dark ? "#fff" : "#0b1f10";
  const accent = dark ? "#4ede80" : "#1a7a3c";
  const sub = dark ? "rgba(255,255,255,0.45)" : "#4a6e54";

  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      {/* Logo mark — stylised A in shield */}
      <div style={{
        width: h, height: h, borderRadius: Math.round(h*0.24),
        background: dark ? "rgba(255,255,255,0.12)" : "#0f5228",
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0, position:"relative", overflow:"hidden",
        boxShadow: dark ? "none" : "0 2px 10px rgba(15,82,40,0.30)",
      }}>
        {/* BAIUST logo image — falls back to SVG */}
        <img
          src="/baiust-logo.png"
          alt="BAIUST"
          style={{ width:"82%", height:"82%", objectFit:"contain" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback SVG mark */}
        <div style={{ display:"none", alignItems:"center", justifyContent:"center",
          position:"absolute", inset:0 }}>
          <svg viewBox="0 0 32 32" width={h*0.6} height={h*0.6}>
            <path d="M6 26 L16 6 L26 26 M10 19 L22 19" stroke="#4ede80"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Wordmark */}
      <div style={{ display:"flex", flexDirection:"column", gap:1 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
          <span style={{
            fontFamily:"'Syne', sans-serif",
            fontSize: h * 0.36, fontWeight: 800,
            color: text, letterSpacing:"-0.5px", lineHeight:1,
          }}>BAIUST</span>
          <span style={{
            fontFamily:"'Instrument Serif', serif",
            fontSize: h * 0.38, fontWeight: 400,
            fontStyle:"italic", color: accent, lineHeight:1,
          }}>Academix</span>
        </div>
        <span style={{
          fontFamily:"'DM Sans', sans-serif",
          fontSize: h * 0.185, fontWeight: 400,
          color: sub, letterSpacing:"0.09em",
          textTransform:"uppercase", lineHeight:1,
        }}>Academic Resource Platform</span>
      </div>
    </div>
  );
}
