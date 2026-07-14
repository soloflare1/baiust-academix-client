/**
 * CSE-themed illustrations
 * To swap for a real image/GIF:
 *   <div className="illus" style={{height:280}}>
 *     <img src="/illustrations/cse.gif" alt="CSE" />
 *   </div>
 */

export function GhibliLibrary({ style = {} }) {
  return (
    <div className="illus" style={{ height:"clamp(200px,40vw,320px)", ...style,
      background:"linear-gradient(135deg,#0a1a2e 0%,#0f2a4a 100%)" }}>
      <svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg"
        style={{ width:"100%", height:"100%" }}>

        {/* ── Background grid (code editor feel) ── */}
        <defs>
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(78,222,128,0.06)" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ede80" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#4ede80" stopOpacity="0"/>
          </radialGradient>
          <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
          <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        </defs>

        <rect width="520" height="300" fill="#0a1a2e"/>
        <rect width="520" height="300" fill="url(#grid)"/>

        {/* Ambient glow */}
        <ellipse cx="260" cy="150" rx="200" ry="130" fill="url(#glow1)"/>

        {/* ── Laptop ── */}
        {/* Screen */}
        <rect x="130" y="60" width="260" height="168" rx="10" fill="#0d2137" stroke="#1a4a6e" strokeWidth="2"/>
        <rect x="138" y="68" width="244" height="152" rx="7" fill="#060e18"/>
        {/* Screen glow */}
        <rect x="138" y="68" width="244" height="152" rx="7" fill="rgba(78,222,128,0.03)"/>

        {/* ── Code editor content ── */}
        {/* Line numbers */}
        <rect x="138" y="68" width="28" height="152" rx="7 0 0 7" fill="rgba(255,255,255,0.03)"/>
        {[80,94,108,122,136,150,164,178,192,206].map((y,i) => (
          <text key={i} x="150" y={y} textAnchor="middle"
            style={{ fontFamily:"monospace", fontSize:"8px", fill:"rgba(255,255,255,0.18)" }}>
            {i+1}
          </text>
        ))}

        {/* Code lines with syntax highlighting */}
        {[
          { y:80,  color:"#569cd6", w:38, text:"import" },
          { y:80,  color:"#d4d4d4", w:8,  x:208, text:" {" },
          { y:80,  color:"#4ec9b0", w:58, x:220, text:"useState" },
          { y:80,  color:"#d4d4d4", w:8,  x:282, text:"}" },
          { y:94,  color:"#6a9955", w:120, text:"// BAIUST Academix" },
          { y:108, color:"#569cd6", w:30, text:"const" },
          { y:108, color:"#9cdcfe", w:50, x:200, text:"courses" },
          { y:108, color:"#d4d4d4", w:8,  x:254, text:"=" },
          { y:108, color:"#4ede80", w:22, x:266, text:"60" },
          { y:122, color:"#c586c0", w:32, text:"async" },
          { y:122, color:"#dcdcaa", w:55, x:205, text:"fetchData" },
          { y:122, color:"#d4d4d4", w:8,  x:264, text:"()" },
          { y:136, color:"#d4d4d4", w:8,  text:"{" },
          { y:150, color:"#569cd6", w:30,  x:182, text:"await" },
          { y:150, color:"#9cdcfe", w:60,  x:216, text:"api.get" },
          { y:150, color:"#ce9178", w:80,  x:280, text:"`/resources`" },
          { y:164, color:"#4ede80", w:80,  x:182, text:"setResources" },
          { y:178, color:"#d4d4d4", w:8,  text:"}" },
          { y:192, color:"#6a9955", w:100, text:"// 60+ courses" },
        ].map((l, i) => (
          <rect key={i} x={l.x || 174} y={l.y-8} width={l.w} height="9"
            rx="2" fill={l.color} opacity="0.85"/>
        ))}

        {/* Cursor blink */}
        <rect x="174" y="206" width="7" height="10" rx="1" fill="#4ede80"
          style={{ animation:"blink 1.2s step-end infinite" }}/>

        {/* Tab bar */}
        <rect x="138" y="68" width="244" height="14" rx="7 7 0 0" fill="rgba(255,255,255,0.05)"/>
        <rect x="142" y="70" width="52" height="10" rx="3" fill="rgba(78,222,128,0.15)" stroke="rgba(78,222,128,0.30)" strokeWidth="0.5"/>
        <text x="168" y="78" textAnchor="middle"
          style={{ fontFamily:"monospace", fontSize:"6px", fill:"rgba(78,222,128,0.80)" }}>
          App.jsx
        </text>
        <rect x="198" y="70" width="52" height="10" rx="3" fill="rgba(255,255,255,0.04)"/>
        <text x="224" y="78" textAnchor="middle"
          style={{ fontFamily:"monospace", fontSize:"6px", fill:"rgba(255,255,255,0.35)" }}>
          api.js
        </text>

        {/* Laptop base */}
        <rect x="110" y="228" width="300" height="12" rx="6" fill="#1a3a5c" stroke="#1f4a70" strokeWidth="1.5"/>
        <rect x="205" y="228" width="110" height="5" rx="3" fill="#0f2a45"/>

        {/* ── Floating elements ── */}

        {/* Circuit node top-left */}
        <g style={{ animation:"floatA 4s ease-in-out infinite" }}>
          <circle cx="76" cy="90" r="18" fill="rgba(78,222,128,0.08)" stroke="rgba(78,222,128,0.20)" strokeWidth="1"/>
          <circle cx="76" cy="90" r="9"  fill="rgba(78,222,128,0.12)" stroke="rgba(78,222,128,0.35)" strokeWidth="1"/>
          <circle cx="76" cy="90" r="3"  fill="#4ede80"/>
          <line x1="76" y1="72" x2="76" y2="54" stroke="rgba(78,222,128,0.25)" strokeWidth="1"/>
          <line x1="94" y1="90" x2="112" y2="90" stroke="rgba(78,222,128,0.25)" strokeWidth="1"/>
          <circle cx="76" cy="54" r="3" fill="rgba(78,222,128,0.50)"/>
        </g>

        {/* Circuit node top-right */}
        <g style={{ animation:"floatB 5s ease-in-out infinite" }}>
          <circle cx="444" cy="80" r="16" fill="rgba(86,156,214,0.08)" stroke="rgba(86,156,214,0.20)" strokeWidth="1"/>
          <circle cx="444" cy="80" r="8"  fill="rgba(86,156,214,0.12)" stroke="rgba(86,156,214,0.30)" strokeWidth="1"/>
          <circle cx="444" cy="80" r="3"  fill="#569cd6"/>
          <line x1="428" y1="80" x2="408" y2="80" stroke="rgba(86,156,214,0.25)" strokeWidth="1"/>
          <line x1="444" y1="96" x2="444" y2="116" stroke="rgba(86,156,214,0.25)" strokeWidth="1"/>
          <circle cx="444" cy="116" r="3" fill="rgba(86,156,214,0.50)"/>
        </g>

        {/* Chip bottom-left */}
        <g style={{ animation:"floatC 6s ease-in-out infinite" }}>
          <rect x="44" y="186" width="60" height="52" rx="6"
            fill="rgba(78,222,128,0.06)" stroke="rgba(78,222,128,0.22)" strokeWidth="1.2"/>
          <rect x="54" y="196" width="40" height="32" rx="3"
            fill="rgba(78,222,128,0.10)" stroke="rgba(78,222,128,0.30)" strokeWidth="0.8"/>
          {/* Pins */}
          {[0,1,2].map(i => (
            <g key={i}>
              <line x1="44" y1={200+i*10} x2="36" y2={200+i*10} stroke="rgba(78,222,128,0.35)" strokeWidth="1.2"/>
              <line x1="104" y1={200+i*10} x2="112" y2={200+i*10} stroke="rgba(78,222,128,0.35)" strokeWidth="1.2"/>
            </g>
          ))}
          <text x="74" y="215" textAnchor="middle"
            style={{ fontFamily:"monospace", fontSize:"7px", fill:"rgba(78,222,128,0.60)" }}>CPU</text>
        </g>

        {/* Stack/database bottom-right */}
        <g style={{ animation:"floatA 5.5s ease-in-out infinite reverse" }}>
          {[0,1,2].map(i => (
            <g key={i}>
              <ellipse cx="448" cy={188+i*18} rx="30" ry="9"
                fill={`rgba(197,134,192,${0.08+i*0.03})`}
                stroke={`rgba(197,134,192,${0.20+i*0.05})`} strokeWidth="1"/>
              <rect x="418" y={179+i*18} width="60" height="18"
                fill={`rgba(197,134,192,${0.05+i*0.02})`}/>
              <ellipse cx="448" cy={179+i*18} rx="30" ry="9"
                fill={`rgba(197,134,192,${0.08+i*0.03})`}
                stroke={`rgba(197,134,192,${0.18+i*0.04})`} strokeWidth="1"/>
            </g>
          ))}
          <text x="448" y="216" textAnchor="middle"
            style={{ fontFamily:"monospace", fontSize:"7px", fill:"rgba(197,134,192,0.70)" }}>DB</text>
        </g>

        {/* Floating code tags */}
        <g style={{ animation:"floatB 7s ease-in-out infinite" }}>
          <rect x="50" y="136" width="56" height="18" rx="4"
            fill="rgba(206,145,120,0.10)" stroke="rgba(206,145,120,0.25)" strokeWidth="0.8"/>
          <text x="78" y="149" textAnchor="middle"
            style={{ fontFamily:"monospace", fontSize:"8px", fill:"rgba(206,145,120,0.75)" }}>
            {"<API />"}
          </text>
        </g>

        <g style={{ animation:"floatC 8s ease-in-out infinite" }}>
          <rect x="394" y="150" width="74" height="18" rx="4"
            fill="rgba(78,222,128,0.08)" stroke="rgba(78,222,128,0.22)" strokeWidth="0.8"/>
          <text x="431" y="163" textAnchor="middle"
            style={{ fontFamily:"monospace", fontSize:"8px", fill:"rgba(78,222,128,0.70)" }}>
            {"{ useState }"}
          </text>
        </g>

        {/* Bottom wire connections */}
        <path d="M 112 212 Q 130 228 150 228" stroke="rgba(78,222,128,0.18)"
          strokeWidth="1" fill="none" strokeDasharray="3,3"/>
        <path d="M 408 212 Q 390 228 370 228" stroke="rgba(86,156,214,0.18)"
          strokeWidth="1" fill="none" strokeDasharray="3,3"/>

        {/* Bottom status bar */}
        <rect x="0" y="272" width="520" height="28" fill="rgba(0,0,0,0.30)"/>
        <circle cx="20" cy="286" r="5" fill="#4ede80" opacity="0.80"/>
        <text x="32" y="290"
          style={{ fontFamily:"monospace", fontSize:"8px", fill:"rgba(255,255,255,0.40)" }}>
          BAIUST Academix · CSE · 60+ Courses
        </text>
        <text x="480" y="290" textAnchor="end"
          style={{ fontFamily:"monospace", fontSize:"8px", fill:"rgba(78,222,128,0.60)" }}>
          v2.0
        </text>

        <style>{`
          @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
          @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        `}</style>
      </svg>
    </div>
  );
}

export function GhibliStudy({ style = {} }) {
  return (
    <div className="illus" style={{ height:"clamp(170px,32vw,260px)", ...style,
      background:"linear-gradient(135deg,#0a1a2e 0%,#0f2a4a 100%)" }}>
      <svg viewBox="0 0 380 220" xmlns="http://www.w3.org/2000/svg"
        style={{ width:"100%", height:"100%" }}>

        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(78,222,128,0.05)" strokeWidth="0.5"/>
          </pattern>
        </defs>

        <rect width="380" height="220" fill="#0a1a2e"/>
        <rect width="380" height="220" fill="url(#grid2)"/>

        {/* ── Browser / platform window ── */}
        <rect x="30" y="20" width="320" height="180" rx="10"
          fill="#0d2137" stroke="#1a4a6e" strokeWidth="1.5"/>
        {/* Title bar */}
        <rect x="30" y="20" width="320" height="28" rx="10 10 0 0" fill="#0f2d47"/>
        <circle cx="50" cy="34" r="5" fill="#ff5f57" opacity="0.85"/>
        <circle cx="66" cy="34" r="5" fill="#febc2e" opacity="0.85"/>
        <circle cx="82" cy="34" r="5" fill="#28c840" opacity="0.85"/>
        {/* URL bar */}
        <rect x="100" y="27" width="200" height="14" rx="7" fill="rgba(255,255,255,0.06)"/>
        <text x="200" y="37.5" textAnchor="middle"
          style={{ fontFamily:"monospace", fontSize:"7px", fill:"rgba(255,255,255,0.35)" }}>
          localhost:5173/levels
        </text>

        {/* ── Simulated Academix UI inside browser ── */}
        {/* Navbar strip */}
        <rect x="30" y="48" width="320" height="22" fill="#0f5228" opacity="0.90"/>
        <text x="48" y="62"
          style={{ fontFamily:"sans-serif", fontSize:"8px", fontWeight:"bold",
            fill:"#4ede80" }}>BAIUST</text>
        <text x="80" y="62"
          style={{ fontFamily:"sans-serif", fontSize:"8px", fontStyle:"italic", fill:"#6ddba0" }}>Academix</text>

        {/* Semester cards grid */}
        {[
          {x:38, y:78,  label:"1.1", color:"#0f5228"},
          {x:100,y:78,  label:"1.2", color:"#1a7a3c"},
          {x:162,y:78,  label:"2.1", color:"#2eb85c"},
          {x:224,y:78,  label:"2.2", color:"#0a3d1e"},
          {x:38, y:128, label:"3.1", color:"#0f5228"},
          {x:100,y:128, label:"3.2", color:"#1a7a3c"},
          {x:162,y:128, label:"4.1", color:"#2eb85c"},
          {x:224,y:128, label:"4.2", color:"#0a3d1e"},
        ].map((c,i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width="56" height="44" rx="6"
              fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
            <rect x={c.x} y={c.y} width="4" height="44" rx="3 0 0 3" fill={c.color} opacity="0.9"/>
            <text x={c.x+30} y={c.y+18} textAnchor="middle"
              style={{ fontFamily:"sans-serif", fontSize:"11px", fontWeight:"bold",
                fill:c.color }}>
              {c.label}
            </text>
            <rect x={c.x+8} y={c.y+24} width="40" height="3" rx="2"
              fill="rgba(255,255,255,0.10)"/>
            <rect x={c.x+8} y={c.y+30} width="28" height="3" rx="2"
              fill="rgba(255,255,255,0.07)"/>
          </g>
        ))}

        {/* Right panel — resource list */}
        <rect x="286" y="78" width="58" height="94" rx="6"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>
        {["menu_book","description","play_circle"].map((_, i) => (
          <g key={i}>
            <rect x="292" y={86+i*28} width="8" height="8" rx="2"
              fill={["#4ede80","#569cd6","#c2410c"][i]} opacity="0.70"/>
            <rect x="304" y={87+i*28} width="32" height="3" rx="1.5"
              fill="rgba(255,255,255,0.12)"/>
            <rect x="304" y={93+i*28} width="22" height="2" rx="1"
              fill="rgba(255,255,255,0.07)"/>
          </g>
        ))}

        {/* Bottom bar */}
        <rect x="30" y="178" width="320" height="22" rx="0 0 10 10"
          fill="rgba(0,0,0,0.25)"/>
        <text x="45" y="193"
          style={{ fontFamily:"monospace", fontSize:"7px", fill:"rgba(78,222,128,0.55)" }}>
          ● Live · 60+ courses · Free
        </text>

        {/* Floating elements outside browser */}
        <g style={{ animation:"floatA 4s ease-in-out infinite" }}>
          <circle cx="14" cy="80" r="10"
            fill="rgba(78,222,128,0.08)" stroke="rgba(78,222,128,0.22)" strokeWidth="1"/>
          <circle cx="14" cy="80" r="4" fill="#4ede80" opacity="0.60"/>
        </g>
        <g style={{ animation:"floatB 5s ease-in-out infinite" }}>
          <circle cx="366" cy="120" r="10"
            fill="rgba(86,156,214,0.08)" stroke="rgba(86,156,214,0.22)" strokeWidth="1"/>
          <circle cx="366" cy="120" r="4" fill="#569cd6" opacity="0.60"/>
        </g>

        <style>{`
          @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        `}</style>
      </svg>
    </div>
  );
}
