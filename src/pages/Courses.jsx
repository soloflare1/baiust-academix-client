import { useParams, Link } from "react-router-dom";
import { SEMESTERS, getCourseIcon } from "../data/courses";

const msMap = {
  "binary-tree":"account_tree","route":"alt_route","code":"code","database":"storage",
  "cpu":"memory","network":"hub","brain":"psychology","robot":"smart_toy",
  "world-www":"language","terminal-2":"terminal","circuit-board":"developer_board",
  "git-branch":"fork_right","math":"calculate","calculator":"calculate","atom":"science",
  "flask":"biotech","bolt":"bolt","language":"translate","book":"menu_book",
  "pencil-ruler":"design_services","antenna":"cell_tower","cpu-2":"computer",
  "award":"workspace_premium","microscope":"biotech","tool":"build",
  "layout-project":"assignment","chart-bar":"bar_chart","users":"groups",
  "chart-dots":"analytics","variable":"functions","omega":"all_inclusive","book-2":"auto_stories",
};

const SEM_COLORS = ["#0f5228","#1a7a3c","#2eb85c","#0a3d1e","#0f5228","#1a7a3c","#2eb85c","#0a3d1e"];

export default function Courses() {
  const { semId } = useParams();
  const sem = SEMESTERS.find(s => s.id === semId);
  const semIdx = SEMESTERS.findIndex(s => s.id === semId);
  const color = SEM_COLORS[semIdx] || "#0f5228";

  if (!sem) return (
    <div style={{ padding:"3rem var(--px)", textAlign:"center" }}>
      <p style={{ color:"var(--ink3)", marginBottom:16, fontFamily:"var(--body)" }}>Semester not found.</p>
      <Link to="/levels" className="btn btn-primary">Back to Levels</Link>
    </div>
  );

  return (
    <div style={{ maxWidth:"var(--max)", margin:"0 auto", padding:"1.5rem var(--px) 3rem" }}>
      <Link to="/levels" style={{ fontFamily:"var(--display)", fontSize:"var(--fs-sm)",
        fontWeight:700, color:"var(--leaf)", display:"inline-flex",
        alignItems:"center", gap:5, marginBottom:20, textDecoration:"none" }}>
        <span className="ms sm">arrow_back</span> All Semesters
      </Link>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${color} 0%,${color}cc 100%)`,
        borderRadius:"var(--r-xl)", padding:"clamp(1.25rem,4vw,2rem)",
        marginBottom:22, overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", right:-20, top:-20, width:120, height:120,
          borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />
        <p style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)", fontWeight:700,
          color:"rgba(255,255,255,0.60)", letterSpacing:"0.12em",
          textTransform:"uppercase", marginBottom:8 }}>
          BAIUST CSE · {sem.ordinal} Semester
        </p>
        <div style={{ display:"flex", justifyContent:"space-between",
          alignItems:"flex-end", flexWrap:"wrap", gap:10 }}>
          <div>
            <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
              fontSize:"clamp(22px,6vw,36px)", color:"#fff",
              letterSpacing:"-0.5px", marginBottom:4, lineHeight:1.1 }}>
              Level {sem.level} · Term {sem.term}
            </h1>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
              color:"rgba(255,255,255,0.55)", fontWeight:300 }}>
              {sem.name} — {sem.courses.length} courses
            </p>
          </div>
          <div style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"clamp(40px,12vw,64px)",
            color:"rgba(255,255,255,0.15)", lineHeight:1, letterSpacing:"-2px" }}>
            {sem.label}
          </div>
        </div>
      </div>

      <div className="sec-rule">
        <span className="sec-rule-label">Course Listing</span>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {sem.courses.map((course, i) => {
          const icon = msMap[getCourseIcon(course.code, course.title)] || "auto_stories";
          const isLab = course.title.toLowerCase().includes("sessional");
          return (
            <Link key={course.code}
              to={`/course/${encodeURIComponent(course.code)}`}
              style={{ textDecoration:"none" }}>
              <div className="card" style={{
                padding:"clamp(10px,3vw,14px) clamp(12px,3vw,18px)",
                display:"flex", alignItems:"center", gap:12,
                transition:"box-shadow 0.18s, transform 0.18s, border-color 0.18s",
                animationDelay:`${i*0.03}s`,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor="rgba(46,184,92,0.30)";
                  e.currentTarget.style.boxShadow="var(--sh-md)";
                  e.currentTarget.style.transform="translateX(4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor="var(--border)";
                  e.currentTarget.style.boxShadow="var(--sh-sm)";
                  e.currentTarget.style.transform="";
                }}>
                {/* Icon */}
                <div style={{ width:42, height:42, minWidth:42,
                  borderRadius:11, flexShrink:0,
                  background: isLab ? "var(--bg2)" : "var(--pale)",
                  border:`1px solid ${isLab ? "var(--border2)" : "rgba(26,122,60,0.18)"}`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ color: isLab ? "var(--ink3)" : "var(--leaf)", fontSize:20 }}>{icon}</span>
                </div>
                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:"clamp(13px,3.5vw,15.5px)",
                    color:"var(--ink)", marginBottom:3, lineHeight:1.3,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {course.title}
                  </p>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"var(--mono)",
                      fontSize:"clamp(10.5px,2.5vw,12px)",
                      color:"var(--leaf)", fontWeight:500,
                      background:"var(--pale)", padding:"2px 8px",
                      borderRadius:"var(--r-pill)" }}>{course.code}</span>
                    <span style={{ fontFamily:"var(--body)",
                      fontSize:"clamp(10.5px,2.5vw,12px)", color:"var(--ink3)" }}>
                      {course.credit} Cr
                    </span>
                    {isLab && (
                      <span style={{ fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
                        padding:"2px 8px", borderRadius:"var(--r-pill)",
                        background:"var(--bg2)", color:"var(--ink3)",
                        border:"1px solid var(--border2)", fontWeight:600 }}>Lab</span>
                    )}
                  </div>
                </div>
                <span className="ms sm" style={{ color:"var(--mint)", flexShrink:0 }}>chevron_right</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
