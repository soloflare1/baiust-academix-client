import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ background:"linear-gradient(135deg,var(--forest),var(--pine))",
      borderTop:"2px solid rgba(78,222,128,0.10)",
      padding:"clamp(2rem,6vw,3.5rem) var(--px) 1.75rem" }}>
      <div style={{ maxWidth:"var(--max)", margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr",
          gap:"2rem", marginBottom:"2rem" }} className="footer-grid">

          <div>
            <Logo size="sm" dark />
            <p style={{ marginTop:14, fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
              fontWeight:300, color:"rgba(255,255,255,0.38)",
              lineHeight:1.75, maxWidth:240 }}>
              A centralised academic resource platform for BAIUST CSE students.
            </p>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7,
              marginTop:14, background:"rgba(78,222,128,0.10)",
              border:"1px solid rgba(78,222,128,0.18)",
              borderRadius:"var(--r-pill)", padding:"5px 12px" }}>
              <div className="pulse-dot" />
              <span style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
                fontWeight:700, color:"var(--glow)", letterSpacing:"0.08em",
                textTransform:"uppercase" }}>Platform Active</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            {[
              { title:"Platform", links:[
                { label:"Browse Levels",     to:"/levels"   },
                { label:"Submit Resource",   to:"/upload"   },
                { label:"Search Repository", to:"/search"   },
              ]},
              { title:"Account", links:[
                { label:"Sign In",  to:"/login"    },
                { label:"Register", to:"/register" },
              ]},
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
                  fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
                  color:"var(--glow)", marginBottom:12 }}>{col.title}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {col.links.map(l => (
                    <Link key={l.label} to={l.to} style={{
                      fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
                      fontWeight:300, color:"rgba(255,255,255,0.40)",
                      transition:"color 0.15s, padding-left 0.15s",
                    }}
                      onMouseEnter={e => { e.target.style.color="var(--glow)"; e.target.style.paddingLeft="4px"; }}
                      onMouseLeave={e => { e.target.style.color="rgba(255,255,255,0.40)"; e.target.style.paddingLeft="0"; }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)",
          paddingTop:"1.25rem", display:"flex",
          justifyContent:"space-between", flexWrap:"wrap",
          gap:8, alignItems:"center" }}>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
            color:"rgba(255,255,255,0.22)", fontWeight:300 }}>
            © {new Date().getFullYear()} BAIUST Academix · CSE Department
          </p>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)" }}>
            <span style={{ color:"rgba(255,255,255,0.28)" }}>Developed by </span>
            <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
              color:"var(--glow)", fontSize:"var(--fs-md)" }}>
              Nosratee Jahan Naba
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 580px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
