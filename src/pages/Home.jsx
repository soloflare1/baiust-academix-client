import { Link } from "react-router-dom";
import { GhibliLibrary, GhibliStudy } from "../components/GhibliScene";

const HERO   = "https://i.pinimg.com/736x/53/de/d0/53ded0ac1b1f741f55bb9d002849619e.jpg";
const COLLAB = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&auto=format&fit=crop";

const features = [
  { icon:"menu_book",     color:"#0f5228", bg:"#e6f9ee", title:"Textbooks & References",    desc:"Recommended textbooks and reference materials for every BAIUST CSE course, organised by semester." },
  { icon:"description",   color:"#1d4ed8", bg:"#eff6ff", title:"Lecture Notes & Slides",    desc:"Class notes, PDFs, handwritten summaries and assignments shared by fellow BAIUSTians." },
  { icon:"play_circle",   color:"#c2410c", bg:"#fff7ed", title:"Video Lectures",             desc:"Tutorial recordings and topic-wise videos indexed by course for structured self-study." },
  { icon:"layers",        color:"#7c3aed", bg:"#f5f3ff", title:"All 8 Semesters",           desc:"Level 1.1 through 4.2 — sixty-plus courses structured exactly as per the BAIUST curriculum." },
  { icon:"upload_file",   color:"#0f5228", bg:"#e6f9ee", title:"Contribute Resources",       desc:"Upload your own notes and materials. Every submission is reviewed before going live." },
  { icon:"verified_user", color:"#d4a017", bg:"#fffbeb", title:"Admin-Verified Content",     desc:"All submissions are reviewed and approved by the administrator for quality assurance." },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <div style={{ position:"relative",
        minHeight:"clamp(460px,85vw,640px)",
        overflow:"hidden", display:"flex", alignItems:"center" }}>
        <img src={HERO} alt="University library"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center 30%" }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(5,41,18,0.95) 0%,rgba(10,61,30,0.70) 55%,rgba(5,41,18,0.20) 100%)" }} />

        <div style={{ position:"relative", zIndex:1, maxWidth:"var(--max)",
          margin:"0 auto", padding:"clamp(3rem,8vw,5.5rem) var(--px)", width:"100%" }}>

          {/* Live badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:7,
            background:"rgba(78,222,128,0.12)",
            border:"1.5px solid rgba(78,222,128,0.25)",
            borderRadius:"var(--r-pill)", padding:"5px 14px", marginBottom:20 }}>
            <div className="pulse-dot" />
            <span style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
              fontWeight:700, color:"var(--glow)", letterSpacing:"0.1em",
              textTransform:"uppercase" }}>BAIUST CSE · Now Live</span>
          </div>

          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(28px,7.5vw,60px)",
            color:"#fff", lineHeight:1.1, letterSpacing:"-0.8px",
            marginBottom:16, maxWidth:560 }}>
            The Academic<br />Repository for{" "}
            <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
              fontWeight:400, color:"var(--glow)" }}>BAIUSTians</span>
          </h1>

          <p style={{ fontFamily:"var(--body)",
            fontSize:"clamp(14px,3.5vw,17px)",
            color:"rgba(255,255,255,0.65)", lineHeight:1.75,
            marginBottom:28, maxWidth:440, fontWeight:300 }}>
            Access every textbook, lecture note, and tutorial for every course —
            from Level 1 to Level 4. Organised, verified, and free.
          </p>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Link to="/register" className="btn btn-primary"
              style={{ fontSize:"clamp(13px,3.5vw,15px)" }}>
              <span className="ms sm">arrow_forward</span> Get Started Free
            </Link>
            <Link to="/login" style={{
              display:"inline-flex", alignItems:"center",
              minHeight:44, padding:"0 20px",
              border:"1.5px solid rgba(255,255,255,0.28)", color:"#fff",
              borderRadius:"var(--r-pill)",
              fontFamily:"var(--display)",
              fontSize:"clamp(13px,3.5vw,15px)", fontWeight:700,
              background:"rgba(255,255,255,0.08)" }}>
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:"clamp(16px,5vw,32px)",
            marginTop:36, flexWrap:"wrap" }}>
            {[["8","Semesters"],["60+","Courses"],["Free","Always"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"var(--display)", fontWeight:800,
                  fontSize:"clamp(20px,5vw,28px)", color:"#fff", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                  color:"rgba(255,255,255,0.40)",
                  letterSpacing:"0.08em", textTransform:"uppercase", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission + Ghibli ── */}
      <div style={{ background:"linear-gradient(180deg,#ddf0cc 0%,var(--bg) 100%)",
        padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr", gap:32, alignItems:"center" }}
          className="mission-grid">
          <div className="fade-in">
            <div className="sec-label">Our Purpose</div>
            <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
              fontSize:"clamp(22px,5.5vw,38px)",
              color:"var(--ink)", letterSpacing:"-0.5px",
              lineHeight:1.12, marginBottom:16 }}>
              Built by a BAIUSTian,{" "}
              <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
                fontWeight:400, color:"var(--leaf)", display:"block" }}>
                for every BAIUSTian
              </span>
            </h2>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
              color:"var(--ink3)", lineHeight:1.8, fontWeight:300, marginBottom:12 }}>
              BAIUST Academix was built to solve a real problem — academic resources scattered
              across WhatsApp groups, personal drives, and USB sticks.
            </p>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
              color:"var(--ink3)", lineHeight:1.8, fontWeight:300, marginBottom:24 }}>
              This platform consolidates everything into one structured, verified, and
              searchable repository — free for every BAIUST CSE student.
            </p>
            <Link to="/register" className="btn btn-primary">
              <span className="ms sm">person_add</span> Join the Repository
            </Link>
          </div>
          <div><GhibliLibrary /></div>
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{ background:"var(--bg2)",
        padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto" }}>
          <div className="sec-label">Platform Capabilities</div>
          <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(22px,5vw,36px)",
            color:"var(--ink)", letterSpacing:"-0.5px",
            marginBottom:28, lineHeight:1.12 }}>
            Designed for academic rigour
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:12 }}
            className="feature-grid">
            {features.map((f,i) => (
              <div key={f.title} className="card icon-bounce"
                style={{ padding:"clamp(1rem,4vw,1.375rem)",
                  display:"flex", alignItems:"flex-start", gap:14,
                  animationDelay:`${i*0.05}s` }}>
                <div style={{ width:44, height:44, minWidth:44, borderRadius:12,
                  background:f.bg, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0,
                  boxShadow:`0 2px 8px ${f.color}18` }}>
                  <span className="ms" style={{ color:f.color, fontSize:22 }}>{f.icon}</span>
                </div>
                <div>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:"var(--fs-md)", marginBottom:5,
                    color:"var(--ink)", lineHeight:1.25 }}>{f.title}</p>
                  <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
                    color:"var(--ink3)", lineHeight:1.7, fontWeight:300 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quote ── */}
      <div style={{ background:"var(--bg)",
        padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr", gap:32, alignItems:"center" }}
          className="quote-grid">
          <div><GhibliStudy /></div>
          <div>
            <span className="ms xl fill" style={{ color:"var(--mint)",
              marginBottom:12, display:"block", fontSize:36 }}>format_quote</span>
            <blockquote style={{ fontFamily:"var(--serif)", fontStyle:"italic",
              fontSize:"clamp(18px,4.5vw,26px)", fontWeight:400,
              color:"var(--ink)", lineHeight:1.45, marginBottom:14 }}>
              The beautiful thing about learning is that no one can take it away from you.
            </blockquote>
            <p style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
              fontWeight:700, color:"var(--ink4)",
              letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:24 }}>
              — B.B. King
            </p>
            <Link to="/register" style={{
              display:"inline-flex", alignItems:"center", gap:7,
              background:"linear-gradient(135deg,var(--mint),var(--glow))",
              color:"var(--forest)", padding:"12px 22px",
              borderRadius:"var(--r-pill)",
              fontFamily:"var(--display)", fontSize:"var(--fs-sm)", fontWeight:800,
              boxShadow:"0 4px 14px rgba(46,184,92,0.28)" }}>
              <span className="ms sm">rocket_launch</span> Begin Your Journey
            </Link>
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div style={{ position:"relative", minHeight:"clamp(200px,40vw,280px)",
        overflow:"hidden", display:"flex", alignItems:"center" }}>
        <img src={COLLAB} alt="Students collaborating"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0,
          background:"rgba(5,41,18,0.84)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:"var(--max)",
          margin:"0 auto", padding:"clamp(2rem,6vw,4rem) var(--px)",
          textAlign:"center", width:"100%" }}>
          <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(20px,5vw,34px)",
            color:"#fff", letterSpacing:"-0.4px", marginBottom:10, lineHeight:1.15 }}>
            Ready to strengthen your academic foundation?
          </h2>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"rgba(255,255,255,0.55)", marginBottom:24,
            fontWeight:300, lineHeight:1.7 }}>
            Register today and join the BAIUST Academix community.
          </p>
          <Link to="/register" style={{
            display:"inline-flex", alignItems:"center", gap:7,
            background:"linear-gradient(135deg,var(--glow),var(--mint))",
            color:"var(--forest)", padding:"12px 24px",
            borderRadius:"var(--r-pill)",
            fontFamily:"var(--display)", fontSize:"var(--fs-sm)", fontWeight:800,
            boxShadow:"0 4px 16px rgba(78,222,128,0.25)" }}>
            <span className="ms sm">person_add</span> Register — It's Free
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width:540px) {
          .feature-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (min-width:860px) {
          .feature-grid  { grid-template-columns: repeat(3,1fr) !important; }
          .mission-grid  { grid-template-columns: 1fr 1fr !important; }
          .quote-grid    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
