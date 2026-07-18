import { Link } from "react-router-dom";
import { GhibliLibrary, GhibliStudy } from "../components/GhibliScene";

// const HERO   = "https://i.pinimg.com/1200x/23/d2/67/23d26715be8bb2fe7d7d99ea11225fe0.jpg";
const HERO   = "7.jpeg";
// const COLLAB = "https://i.pinimg.com/1200x/40/5b/91/405b9141b1639a6e78d0c7e1a89742df.jpg";

const COLLAB = "5.jpeg";

const features = [
  { icon:"menu_book",     color:"#0f5228", bg:"#e6f9ee",
    title:"Course Textbooks & References",
    desc:"Curated textbooks, eBooks, and reference materials for every BAIUST CSE course, organised by level and term for systematic academic study." },
  { icon:"description",   color:"#1d4ed8", bg:"#eff6ff",
    title:"Lecture Notes & Handouts",
    desc:"Comprehensive lecture notes, class handouts, presentation slides, and assignment sheets uploaded by verified BAIUST CSE students." },
  { icon:"play_circle",   color:"#c2410c", bg:"#fff7ed",
    title:"Instructional Video Content",
    desc:"Course-specific lecture recordings, topic-based tutorials, and supplementary instructional materials indexed by subject for focused study." },
  { icon:"layers",        color:"#7c3aed", bg:"#f5f3ff",
    title:"Complete Curriculum Structure",
    desc:"Full coverage of the BAIUST CSE programme — eight semesters from Level 1.1 to Level 4.2, encompassing 60+ courses as per the official curriculum." },
  { icon:"upload_file",   color:"#0f5228", bg:"#e6f9ee",
    title:"Student Resource Contribution",
    desc:"Students may upload and share academic materials. All submissions are subject to administrator review prior to publication on the platform." },
  { icon:"verified_user", color:"#d4a017", bg:"#fffbeb",
    title:"Reviewed & Quality-Verified",
    desc:"Every resource is reviewed and approved by the platform administrator to ensure academic accuracy and content quality before publication." },
];

const steps = [
  { n:"01", icon:"person_add",   title:"Register Your Account",
    desc:"Create a free account using your BAIUST student credentials. Your registration will be reviewed and approved by the platform administrator." },
  { n:"02", icon:"grid_view",    title:"Browse by Level & Term",
    desc:"Navigate through all eight semesters of the CSE curriculum and select your course to access available academic materials." },
  { n:"03", icon:"upload_file",  title:"Access or Contribute",
    desc:"Download resources shared by your peers, or upload your own notes and materials to support fellow students in the community." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={{ position:"relative", minHeight:"clamp(460px,85vw,640px)",
        overflow:"hidden", display:"flex", alignItems:"center" }}>
        <img src={HERO} alt="BAIUST Campus"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover", objectPosition:"center 40%" }} />
        <div style={{ position:"absolute", inset:0,
          background:"linear-gradient(150deg,rgba(5,41,18,0.96) 0%,rgba(10,61,30,0.75) 55%,rgba(5,41,18,0.30) 100%)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:"var(--max)",
          margin:"0 auto", padding:"clamp(3rem,8vw,5.5rem) var(--px)", width:"100%" }}>

          <div style={{ display:"inline-flex", alignItems:"center", gap:7,
            background:"rgba(78,222,128,0.10)",
            border:"1.5px solid rgba(78,222,128,0.22)",
            borderRadius:"var(--r-pill)", padding:"5px 14px", marginBottom:20 }}>
            <div className="pulse-dot" />
            <span style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
              fontWeight:700, color:"var(--glow)", letterSpacing:"0.1em",
              textTransform:"uppercase" }}>BAIUST · Dept. of CSE · Academic Platform</span>
          </div>

          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(26px,7vw,56px)", color:"#fff",
            lineHeight:1.1, letterSpacing:"-0.8px", marginBottom:18, maxWidth:580 }}>
            Centralised Academic Resources for{" "}
            <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
              fontWeight:400, color:"var(--glow)" }}>BAIUST CSE Students</span>
          </h1>

          <p style={{ fontFamily:"var(--body)", fontSize:"clamp(14px,3.5vw,17px)",
            color:"rgba(255,255,255,0.65)", lineHeight:1.80,
            marginBottom:30, maxWidth:480, fontWeight:300 }}>
            A structured digital repository providing BAIUST CSE students with verified
            access to course textbooks, lecture notes, and instructional videos —
            spanning the complete eight-semester academic curriculum.
          </p>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <Link to="/register" className="btn btn-primary"
              style={{ fontSize:"clamp(13px,3.5vw,15px)" }}>
              <span className="ms sm">arrow_forward</span> Create Free Account
            </Link>
            <Link to="/login" style={{ display:"inline-flex", alignItems:"center",
              minHeight:44, padding:"0 20px",
              border:"1.5px solid rgba(255,255,255,0.28)", color:"#fff",
              borderRadius:"var(--r-pill)", fontFamily:"var(--display)",
              fontSize:"clamp(13px,3.5vw,15px)", fontWeight:700,
              background:"rgba(255,255,255,0.08)" }}>Sign In</Link>
          </div>

          <div style={{ display:"flex", gap:"clamp(16px,5vw,36px)", marginTop:38,
            flexWrap:"wrap", paddingTop:28,
            borderTop:"1px solid rgba(255,255,255,0.10)" }}>
            {[["8","Semesters"],["60+","Courses"],["3","Resource Types"],["Free","No Charges"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"var(--display)", fontWeight:800,
                  fontSize:"clamp(20px,5vw,28px)", color:"#fff", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                  color:"rgba(255,255,255,0.38)",
                  letterSpacing:"0.08em", textTransform:"uppercase", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ background:"linear-gradient(180deg,#d4eedd 0%,var(--bg) 100%)",
        padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr", gap:36, alignItems:"center" }}
          className="mission-grid">
          <div className="fade-in">
            <div className="sec-label">About the Platform</div>
            <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
              fontSize:"clamp(22px,5.5vw,38px)", color:"var(--ink)",
              letterSpacing:"-0.5px", lineHeight:1.12, marginBottom:18 }}>
              Developed for the BAIUST{" "}
              <span style={{ fontFamily:"var(--serif)", fontStyle:"italic",
                fontWeight:400, color:"var(--leaf)", display:"block" }}>
                CSE Academic Community
              </span>
            </h2>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
              color:"var(--ink2)", lineHeight:1.85, fontWeight:300, marginBottom:14 }}>
              BAIUST Academix addresses a persistent challenge faced by CSE students —
              the fragmentation of academic resources across informal channels such as
              messaging groups, personal storage, and peer-to-peer file sharing.
            </p>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
              color:"var(--ink3)", lineHeight:1.85, fontWeight:300, marginBottom:28 }}>
              This platform provides a centralised, structured, and administrator-verified
              repository of academic materials — accessible to all enrolled BAIUST CSE
              students, free of charge, at any time.
            </p>
            <Link to="/register" className="btn btn-primary">
              <span className="ms sm">person_add</span> Register for Access
            </Link>
          </div>
          <div><GhibliLibrary /></div>
        </div>
      </div>

      {/* Features */}
      <div style={{ background:"var(--bg2)", padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto" }}>
          <div className="sec-label">Platform Features</div>
          <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(22px,5vw,36px)", color:"var(--ink)",
            letterSpacing:"-0.5px", marginBottom:10, lineHeight:1.12 }}>
            A comprehensive academic resource platform
          </h2>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.75,
            marginBottom:30, maxWidth:520 }}>
            Structured access to course materials across all levels and terms
            of the BAIUST CSE programme.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:12 }}
            className="feature-grid">
            {features.map(f => (
              <div key={f.title} className="card icon-bounce"
                style={{ padding:"clamp(1rem,4vw,1.375rem)",
                  display:"flex", alignItems:"flex-start", gap:14 }}>
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
                    color:"var(--ink3)", lineHeight:1.75, fontWeight:300 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:"var(--bg)", padding:"clamp(2.5rem,6vw,5rem) var(--px)" }}>
        <div style={{ maxWidth:"var(--max)", margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr", gap:36, alignItems:"center" }}
          className="quote-grid">
          <div><GhibliStudy /></div>
          <div>
            <div className="sec-label">How It Works</div>
            <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
              fontSize:"clamp(22px,5vw,34px)", color:"var(--ink)",
              letterSpacing:"-0.4px", lineHeight:1.12, marginBottom:24 }}>
              Simple, structured,<br />and student-driven
            </h2>
            {steps.map(s => (
              <div key={s.n} style={{ display:"flex", gap:14, marginBottom:20 }}>
                <div style={{ width:36, height:36, minWidth:36, borderRadius:10,
                  background:"var(--pale)", border:"1.5px solid rgba(26,122,60,0.20)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0 }}>
                  <span className="ms sm" style={{ color:"var(--leaf)" }}>{s.icon}</span>
                </div>
                <div>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:"var(--fs-base)", color:"var(--ink)", marginBottom:4 }}>
                    <span style={{ color:"var(--mint)", marginRight:6,
                      fontSize:"var(--fs-xs)" }}>{s.n}</span>{s.title}
                  </p>
                  <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
                    color:"var(--ink3)", lineHeight:1.70, fontWeight:300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
            <Link to="/register" style={{ display:"inline-flex", alignItems:"center",
              gap:7, marginTop:8,
              background:"linear-gradient(135deg,var(--mint),var(--glow))",
              color:"var(--forest)", padding:"11px 22px", borderRadius:"var(--r-pill)",
              fontFamily:"var(--display)", fontSize:"var(--fs-sm)", fontWeight:800,
              boxShadow:"0 4px 14px rgba(46,184,92,0.25)" }}>
              <span className="ms sm">arrow_forward</span> Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ position:"relative", minHeight:"clamp(200px,40vw,280px)",
        overflow:"hidden", display:"flex", alignItems:"center" }}>
        <img src={COLLAB} alt="Students studying"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
            objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(5,41,18,0.88)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:"var(--max)",
          margin:"0 auto", padding:"clamp(2rem,6vw,4rem) var(--px)",
          textAlign:"center", width:"100%" }}>
          <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(20px,5vw,34px)", color:"#fff",
            letterSpacing:"-0.4px", marginBottom:10, lineHeight:1.15 }}>
            Join the BAIUST Academix community today
          </h2>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"rgba(255,255,255,0.55)", marginBottom:26,
            fontWeight:300, lineHeight:1.75, maxWidth:440, margin:"0 auto 26px" }}>
            Registration is free and open to all enrolled students of the
            Department of Computer Science and Engineering, BAIUST.
          </p>
          <Link to="/register" style={{ display:"inline-flex", alignItems:"center", gap:7,
            background:"linear-gradient(135deg,var(--glow),var(--mint))",
            color:"var(--forest)", padding:"12px 26px", borderRadius:"var(--r-pill)",
            fontFamily:"var(--display)", fontSize:"var(--fs-sm)", fontWeight:800,
            boxShadow:"0 4px 16px rgba(78,222,128,0.22)" }}>
            <span className="ms sm">person_add</span> Register Now — Free
          </Link>
        </div>
      </div>

      <style>{`
        @media (min-width:540px) { .feature-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (min-width:860px) {
          .feature-grid  { grid-template-columns: repeat(3,1fr) !important; }
          .mission-grid  { grid-template-columns: 1fr 1fr !important; }
          .quote-grid    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}