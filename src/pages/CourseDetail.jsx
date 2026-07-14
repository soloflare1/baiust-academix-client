import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEMESTERS, getCourseIcon } from "../data/courses";
import api from "../utils/api";

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

const TABS = [
  { key:"book",  icon:"menu_book",   label:"Textbooks",  color:"#0f5228", bg:"#e6f9ee" },
  { key:"note",  icon:"description", label:"Notes",      color:"#1d4ed8", bg:"#eff6ff" },
  { key:"video", icon:"play_circle", label:"Videos",     color:"#c2410c", bg:"#fff7ed" },
  { key:"other", icon:"folder_open", label:"Others",     color:"#7c3aed", bg:"#f5f3ff" },
];

export default function CourseDetail({ user }) {
  const { courseCode } = useParams();
  const decoded = decodeURIComponent(courseCode);
  const [tab, setTab]             = useState("book");
  const [resources, setResources] = useState([]);
  const [loading, setLoading]     = useState(true);

  let course = null, sem = null;
  for (const s of SEMESTERS) {
    const c = s.courses.find(c => c.code === decoded);
    if (c) { course = c; sem = s; break; }
  }

  useEffect(() => {
    if (!course) return;
    setLoading(true);
    api.get(`/resources?course=${encodeURIComponent(decoded)}&type=${tab}`)
      .then(({ data }) => setResources(data.data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [decoded, tab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    await api.delete(`/resources/${id}`);
    setResources(prev => prev.filter(r => r._id !== id));
  };

  if (!course) return (
    <div style={{ padding:"3rem var(--px)", textAlign:"center" }}>
      <p style={{ color:"var(--ink3)", marginBottom:16 }}>Course not found.</p>
      <Link to="/levels" className="btn btn-primary">Back to Levels</Link>
    </div>
  );

  const courseIcon = msMap[getCourseIcon(course.code, course.title)] || "auto_stories";
  const activeTab  = TABS.find(t => t.key === tab);

  return (
    <div style={{ maxWidth:"var(--max)", margin:"0 auto", padding:"1.5rem var(--px) 3rem" }}>
      <Link to={`/semester/${sem.id}`} style={{ fontFamily:"var(--display)",
        fontSize:"var(--fs-sm)", fontWeight:700, color:"var(--leaf)",
        display:"inline-flex", alignItems:"center", gap:5,
        marginBottom:20, textDecoration:"none" }}>
        <span className="ms sm">arrow_back</span> {sem.name}
      </Link>

      {/* Course header */}
      <div className="card" style={{ padding:"clamp(1rem,4vw,1.5rem)",
        marginBottom:0, borderBottomLeftRadius:0, borderBottomRightRadius:0,
        borderRadius:"var(--r-xl) var(--r-xl) 0 0", borderBottom:"none" }}>

        <div style={{ display:"flex", alignItems:"flex-start",
          justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, flex:1, minWidth:0 }}>
            <div style={{ width:50, height:50, minWidth:50, borderRadius:13,
              background:"var(--pale)", border:"1.5px solid rgba(26,122,60,0.18)",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span className="ms lg" style={{ color:"var(--leaf)", fontSize:24 }}>{courseIcon}</span>
            </div>
            <div style={{ minWidth:0 }}>
              <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
                fontSize:"clamp(14px,4vw,19px)",
                color:"var(--ink)", marginBottom:4, lineHeight:1.25 }}>
                {course.title}
              </h1>
              <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--mono)", fontSize:"clamp(10px,2.5vw,12.5px)",
                  color:"var(--leaf)", fontWeight:500,
                  background:"var(--pale)", padding:"2px 9px",
                  borderRadius:"var(--r-pill)" }}>{course.code}</span>
                <span style={{ fontFamily:"var(--body)", fontSize:"clamp(10px,2.5vw,12px)",
                  color:"var(--ink3)" }}>
                  {course.credit} Cr · L{sem.level} T{sem.term}
                </span>
              </div>
            </div>
          </div>
          <Link to={`/upload?course=${encodeURIComponent(decoded)}&semId=${sem.id}`}
            className="btn btn-primary"
            style={{ fontSize:"var(--fs-sm)", padding:"9px 16px",
              borderRadius:"var(--r-pill)", flexShrink:0 }}>
            <span className="ms sm">upload_file</span>
            <span className="hide-xs"> Submit</span>
          </Link>
        </div>

        {/* Tabs — scrollable on mobile */}
        <div style={{ display:"flex", gap:0, borderBottom:"1.5px solid var(--border)",
          marginTop:18, overflowX:"auto", scrollbarWidth:"none" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display:"inline-flex", alignItems:"center", gap:5,
              padding:"10px clamp(10px,3vw,16px)",
              fontFamily:"var(--display)", fontWeight: tab===t.key ? 700 : 500,
              fontSize:"clamp(11.5px,2.5vw,13.5px)",
              color: tab===t.key ? t.color : "var(--ink3)",
              background:"none", border:"none", cursor:"pointer",
              borderBottom: tab===t.key ? `2.5px solid ${t.color}` : "2.5px solid transparent",
              marginBottom:"-1.5px", whiteSpace:"nowrap",
              transition:"color 0.15s",
              WebkitTapHighlightColor:"transparent",
            }}>
              <span className="ms sm" style={{ color: tab===t.key ? t.color : "var(--ink4)" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card" style={{ borderTopLeftRadius:0, borderTopRightRadius:0,
        borderTop:"none", padding:"clamp(1rem,4vw,1.5rem)",
        borderRadius:"0 0 var(--r-xl) var(--r-xl)" }}>

        {loading ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:68 }} />)}
          </div>
        ) : resources.length === 0 ? (
          <div style={{ textAlign:"center", padding:"2.5rem 1rem" }} className="fade-in">
            <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--bg2)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 14px" }}>
              <span className="ms xl" style={{ color:"var(--ink4)", fontSize:28 }}>inbox</span>
            </div>
            <h3 style={{ fontFamily:"var(--display)", fontWeight:700,
              fontSize:"var(--fs-md)", color:"var(--ink)", marginBottom:6 }}>
              No {activeTab?.label} Yet
            </h3>
            <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
              color:"var(--ink3)", fontWeight:300, lineHeight:1.65,
              maxWidth:280, margin:"0 auto 18px" }}>
              Be the first to contribute a resource for this course.
            </p>
            <Link to={`/upload?course=${encodeURIComponent(decoded)}&semId=${sem.id}&type=${tab}`}
              className="btn btn-primary" style={{ display:"inline-flex",
                fontSize:"var(--fs-sm)", borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">upload_file</span> Submit Resource
            </Link>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column" }}>
            {resources.map((r, idx) => (
              <div key={r._id} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"clamp(10px,3vw,14px) 0",
                borderBottom: idx < resources.length-1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ width:40, height:40, minWidth:40, borderRadius:10,
                  background:activeTab?.bg, flexShrink:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  border:`1px solid ${activeTab?.color}22` }}>
                  <span className="ms sm" style={{ color:activeTab?.color }}>{activeTab?.icon}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:"clamp(13px,3vw,15px)",
                    color:"var(--ink)", marginBottom:2, lineHeight:1.3,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {r.title}
                  </p>
                  <p style={{ fontFamily:"var(--body)",
                    fontSize:"clamp(10.5px,2.5vw,12px)",
                    color:"var(--ink3)", fontWeight:300 }}>
                    {r.uploadedBy?.name || "Anonymous"}
                    {r.createdAt && ` · ${new Date(r.createdAt).toLocaleDateString("en-GB",
                      { day:"numeric", month:"short", year:"numeric" })}`}
                  </p>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  {r.fileUrl && (
                    <a href={r.fileUrl} target="_blank" rel="noreferrer"
                      style={{ width:36, height:36, borderRadius:9,
                        border:"1.5px solid var(--border2)",
                        background:"var(--card)", display:"flex",
                        alignItems:"center", justifyContent:"center",
                        color:"var(--leaf)" }}>
                      <span className="ms sm">{r.type==="video" ? "open_in_new" : "download"}</span>
                    </a>
                  )}
                  {user && r.uploadedBy?._id === user._id && (
                    <button onClick={() => handleDelete(r._id)} style={{
                      width:36, height:36, borderRadius:9,
                      border:"1.5px solid #fecaca", background:"#fef2f2",
                      display:"flex", alignItems:"center",
                      justifyContent:"center", color:"#991b1b", cursor:"pointer" }}>
                      <span className="ms sm">delete</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
