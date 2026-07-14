import { Link } from "react-router-dom";
import { SEMESTERS } from "../data/courses";
import { GhibliLibrary } from "../components/GhibliScene";

const SEM_COLORS = [
  "#0f5228","#1a7a3c","#2eb85c","#0a3d1e",
  "#0f5228","#1a7a3c","#2eb85c","#0a3d1e",
];

export default function LevelTerm({ user }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background:"linear-gradient(135deg,#c5e8d0 0%,#e8f9ee 100%)",
        padding:"2rem var(--px) 0",
        overflow:"hidden",
      }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto" }}>
          {/* Text block */}
          <div style={{ paddingBottom:"1.5rem" }} className="fade-in">
            <div className="sec-label">BAIUST CSE · Academic Repository</div>
            <h1 style={{
              fontFamily:"var(--display)", fontWeight:800,
              fontSize:"var(--fs-2xl)",
              color:"var(--forest)", lineHeight:1.12,
              letterSpacing:"-0.5px", marginBottom:12,
            }}>
              Welcome,{" "}
              <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
                fontWeight:400, color:"var(--leaf)" }}>
                {user?.name?.split(" ")[0] || "Student"}
              </span>
            </h1>
            <p style={{
              fontFamily:"var(--body)", fontSize:"var(--fs-base)",
              color:"var(--ink2)", fontWeight:300, lineHeight:1.75,
              marginBottom:20, maxWidth:420,
            }}>
              Select your Level and Term to access books, notes, and videos for your courses.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <Link to="/upload" className="btn btn-primary">
                <span className="ms sm">upload_file</span> Submit Resource
              </Link>
              <Link to="/search" className="btn btn-outline">
                <span className="ms sm">search</span> Search
              </Link>
            </div>
          </div>

          {/* Illustration — hidden on very small screens to save space */}
          <div className="hero-illus" style={{ display:"flex", justifyContent:"center" }}>
            <GhibliLibrary style={{ maxWidth:380 }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:"var(--max)", margin:"0 auto",
        padding:"1.75rem var(--px) 3rem" }}>

        <div className="sec-rule">
          <span className="sec-rule-label">Select Level &amp; Term</span>
        </div>

        {/* Mobile: 1 col → sm: 2 col → lg: 4 col */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:10 }}
          className="lt-grid">
          {SEMESTERS.map((sem, idx) => {
            const color = SEM_COLORS[idx];
            return (
              <Link key={sem.id} to={`/semester/${sem.id}`}
                style={{ textDecoration:"none" }}>
                <div className="card" style={{
                  display:"flex", alignItems:"stretch",
                  overflow:"hidden", cursor:"pointer",
                  borderLeft:`4px solid ${color}`,
                  transition:"box-shadow 0.2s, transform 0.18s",
                  minHeight:72,
                }}
                  onTouchStart={e => { e.currentTarget.style.transform="scale(0.98)"; }}
                  onTouchEnd={e => { e.currentTarget.style.transform=""; }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow="var(--sh-md)";
                    e.currentTarget.style.transform="translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow="var(--sh-sm)";
                    e.currentTarget.style.transform="";
                  }}>

                  {/* Level badge */}
                  <div style={{
                    width:"clamp(68px,18vw,88px)",
                    minWidth:"clamp(68px,18vw,88px)",
                    background:`linear-gradient(135deg,${color},${color}cc)`,
                    display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0,
                  }}>
                    <span style={{
                      fontFamily:"var(--display)", fontWeight:800,
                      fontSize:"clamp(24px,6vw,36px)",
                      color:"#fff", lineHeight:1,
                      letterSpacing:"-1px",
                      textShadow:"0 2px 8px rgba(0,0,0,0.20)",
                    }}>
                      {sem.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ flex:1, padding:"clamp(10px,3vw,14px) 12px",
                    minWidth:0, display:"flex", flexDirection:"column",
                    justifyContent:"center" }}>
                    <p style={{
                      fontFamily:"var(--display)", fontWeight:700,
                      fontSize:"clamp(14px,3.5vw,17px)",
                      color:"var(--ink)", marginBottom:3, lineHeight:1.25,
                    }}>
                      {sem.name}
                    </p>
                    <p style={{
                      fontFamily:"var(--body)", fontSize:"clamp(11px,2.5vw,13px)",
                      color:"var(--ink3)", marginBottom:8,
                    }}>
                      Level {sem.level} · Term {sem.term}
                    </p>
                    <span style={{
                      display:"inline-flex", alignItems:"center", gap:4,
                      fontFamily:"var(--display)", fontWeight:700,
                      fontSize:"clamp(10px,2vw,12px)",
                      padding:"3px 10px", borderRadius:"var(--r-pill)",
                      background:`${color}14`, color,
                      border:`1px solid ${color}28`,
                      width:"fit-content",
                    }}>
                      <span className="ms sm" style={{ fontSize:12, color }}>menu_book</span>
                      {sem.courses.length} Courses
                    </span>
                  </div>

                  {/* Arrow */}
                  <div style={{ display:"flex", alignItems:"center",
                    paddingRight:12, flexShrink:0 }}>
                    <span className="ms sm" style={{ color:"var(--ink4)", fontSize:20 }}>
                      chevron_right
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)",
          gap:10, marginTop:20 }}>
          {[
            { icon:"layers",    n:"8",    l:"Semesters"     },
            { icon:"menu_book", n:"60+",  l:"Courses"       },
            { icon:"groups",    n:"Free", l:"BAIUSTians" },
          ].map(s => (
            <div key={s.l} className="card"
              style={{ padding:"clamp(12px,3vw,20px)", textAlign:"center" }}>
              <span className="ms lg" style={{ color:"var(--mint)",
                fontSize:"clamp(22px,5vw,28px)" }}>{s.icon}</span>
              <div style={{ fontFamily:"var(--display)", fontWeight:800,
                fontSize:"clamp(18px,4.5vw,26px)",
                color:"var(--ink)", lineHeight:1, marginTop:6 }}>{s.n}</div>
              <div style={{ width:16, height:2.5,
                background:"linear-gradient(to right,var(--mint),var(--glow))",
                borderRadius:2, margin:"7px auto" }} />
              <div style={{ fontFamily:"var(--body)",
                fontSize:"clamp(10px,2vw,12px)",
                color:"var(--ink3)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 540px) {
          .lt-grid      { grid-template-columns: repeat(2,1fr) !important; }
          .hero-illus   { margin-top: -1rem; }
        }
        @media (min-width: 860px) {
          .lt-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
        @media (max-width: 380px) {
          .hero-illus { display: none !important; }
        }
      `}</style>
    </div>
  );
}
