import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { SEMESTERS } from "../data/courses";
import api from "../utils/api";

const TYPES = [
  { value:"",      label:"All",       icon:"filter_list",  color:"var(--leaf)", bg:"var(--pale)" },
  { value:"book",  label:"Textbooks", icon:"menu_book",    color:"#0f5228",     bg:"#e6f9ee" },
  { value:"note",  label:"Notes",     icon:"description",  color:"#1d4ed8",     bg:"#eff6ff" },
  { value:"video", label:"Videos",    icon:"play_circle",  color:"#c2410c",     bg:"#fff7ed" },
  { value:"other", label:"Others",    icon:"folder_open",  color:"#7c3aed",     bg:"#f5f3ff" },
];

const typeStyle = {
  book:  { bg:"#e6f9ee", c:"#0f5228", icon:"menu_book"   },
  note:  { bg:"#eff6ff", c:"#1d4ed8", icon:"description" },
  video: { bg:"#fff7ed", c:"#c2410c", icon:"play_circle" },
  other: { bg:"#f5f3ff", c:"#7c3aed", icon:"folder_open" },
};

export default function SearchPage() {
  const [query,      setQuery]      = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [semFilter,  setSemFilter]  = useState("");
  const [results,    setResults]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [searched,   setSearched]   = useState(false);

  const doSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true); setSearched(true);
    try {
      const { data } = await api.get("/resources", {
        params: { search:query, type:typeFilter||undefined, semId:semFilter||undefined, limit:30 }
      });
      setResults(data.data || []);
    } catch { setResults([]); }
    finally { setLoading(false); }
  }, [query, typeFilter, semFilter]);

  return (
    <div style={{ maxWidth:"var(--max)", margin:"0 auto", padding:"1.5rem var(--px) 3rem" }}>
      <div style={{ marginBottom:24 }} className="fade-in">
        <div className="sec-label">Find Resources</div>
        <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
          fontSize:"clamp(22px,5vw,34px)",
          letterSpacing:"-0.4px", color:"var(--ink)", marginBottom:8, lineHeight:1.1 }}>
          Search the Repository
        </h1>
        <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
          color:"var(--ink3)", fontWeight:300, lineHeight:1.7 }}>
          Find books, notes, and videos across all 60+ BAIUST CSE courses.
        </p>
      </div>

      {/* Search bar */}
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <div style={{ flex:1, position:"relative" }}>
          <span className="ms sm" style={{ position:"absolute", left:14, top:"50%",
            transform:"translateY(-50%)", color:"var(--ink4)", pointerEvents:"none" }}>search</span>
          <input className="form-input" placeholder="Search by title or description…"
            value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key==="Enter" && doSearch()}
            style={{ paddingLeft:42, borderRadius:"var(--r-pill)", fontSize:"var(--fs-base)" }} />
        </div>
        <button className="btn btn-primary" onClick={doSearch}
          disabled={loading || !query.trim()}
          style={{ fontSize:"var(--fs-sm)", flexShrink:0 }}>
          <span className="ms sm">search</span>
          <span className="hide-xs">{loading ? "…" : "Search"}</span>
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:6, marginBottom:24,
        flexWrap:"wrap", overflowX:"auto", scrollbarWidth:"none" }}>
        {TYPES.map(t => (
          <button key={t.value} onClick={() => setTypeFilter(t.value)} style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"7px 13px", borderRadius:"var(--r-pill)",
            fontFamily:"var(--display)", fontSize:"var(--fs-xs)", fontWeight:700,
            border:`1.5px solid ${typeFilter===t.value ? t.color : "var(--border2)"}`,
            background: typeFilter===t.value ? t.bg : "var(--card)",
            color: typeFilter===t.value ? t.color : "var(--ink3)",
            cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap",
            WebkitTapHighlightColor:"transparent",
          }}>
            <span className="ms sm" style={{ fontSize:14 }}>{t.icon}</span> {t.label}
          </button>
        ))}
        <select className="form-input" value={semFilter}
          onChange={e => setSemFilter(e.target.value)}
          style={{ width:"auto", fontSize:"var(--fs-xs)", padding:"7px 12px",
            borderRadius:"var(--r-pill)", fontFamily:"var(--display)",
            fontWeight:700, minHeight:0 }}>
          <option value="">All Semesters</option>
          {SEMESTERS.map(s => (
            <option key={s.id} value={s.id}>{s.label} — {s.name}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height:72 }} />)}
        </div>
      ) : searched && results.length === 0 ? (
        <div className="card" style={{ padding:"3rem", textAlign:"center",
          borderRadius:"var(--r-xl)" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"var(--bg2)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
            <span className="ms xl" style={{ color:"var(--ink4)", fontSize:28 }}>search_off</span>
          </div>
          <h3 style={{ fontFamily:"var(--display)", fontWeight:700,
            fontSize:"var(--fs-md)", color:"var(--ink)", marginBottom:6 }}>No Results</h3>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.65 }}>
            Try different keywords or adjust your filters.
          </p>
        </div>
      ) : results.length > 0 ? (
        <>
          <div className="sec-rule">
            <span className="sec-rule-label">
              {results.length} Result{results.length !== 1 && "s"}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {results.map(r => {
              const ts = typeStyle[r.type] || typeStyle.other;
              return (
                <div key={r._id} className="card"
                  style={{ padding:"clamp(10px,3vw,14px) clamp(12px,3vw,16px)",
                    display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, minWidth:40, borderRadius:10,
                    background:ts.bg, display:"flex", alignItems:"center",
                    justifyContent:"center", flexShrink:0,
                    border:`1px solid ${ts.c}22` }}>
                    <span className="ms sm" style={{ color:ts.c }}>{ts.icon}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:"var(--display)", fontWeight:700,
                      fontSize:"clamp(13px,3vw,15px)",
                      color:"var(--ink)", marginBottom:2,
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.title}</p>
                    <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                      color:"var(--ink3)", fontWeight:300 }}>
                      {r.course} · {r.uploadedBy?.name || "Anonymous"}
                    </p>
                  </div>
                  <Link to={`/course/${encodeURIComponent(r.course)}`} style={{
                    display:"inline-flex", alignItems:"center", gap:4,
                    fontFamily:"var(--display)", fontSize:"var(--fs-xs)", fontWeight:700,
                    color:"var(--leaf)", flexShrink:0,
                    padding:"6px 12px", borderRadius:"var(--r-pill)",
                    background:"var(--pale)", border:"1px solid rgba(26,122,60,0.18)",
                    whiteSpace:"nowrap",
                  }}>
                    View <span className="ms sm">arrow_forward</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      ) : !searched && (
        <div style={{ textAlign:"center", padding:"4rem 0" }} className="fade-in">
          <div style={{ width:72, height:72, borderRadius:"50%", background:"var(--pale)",
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 18px", border:"2px solid rgba(26,122,60,0.15)" }}>
            <span className="ms xl" style={{ color:"var(--mint)", fontSize:34 }}>travel_explore</span>
          </div>
          <h3 style={{ fontFamily:"var(--display)", fontWeight:700,
            fontSize:"var(--fs-lg)", color:"var(--ink)", marginBottom:8 }}>Search Anything</h3>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.7,
            maxWidth:300, margin:"0 auto" }}>
            Search books, notes, and videos across all BAIUST CSE courses.
          </p>
        </div>
      )}
    </div>
  );
}
