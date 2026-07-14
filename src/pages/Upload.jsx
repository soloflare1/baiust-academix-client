import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEMESTERS } from "../data/courses";
import api from "../utils/api";

const TYPES = [
  { value:"book",  icon:"menu_book",   label:"Textbook",  desc:"Book / eBook",        color:"#0f5228", bg:"#e6f9ee" },
  { value:"note",  icon:"description", label:"Notes",     desc:"PDF / DOCX / Slides", color:"#1d4ed8", bg:"#eff6ff" },
  { value:"video", icon:"play_circle", label:"Video",     desc:"YouTube / Drive URL",  color:"#c2410c", bg:"#fff7ed" },
  { value:"other", icon:"folder_open", label:"Other",     desc:"Assignment / PQ",     color:"#7c3aed", bg:"#f5f3ff" },
];

export default function Upload() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const [form, setForm] = useState({
    title:"", description:"",
    type:   params.get("type")   || "note",
    semId:  params.get("semId")  || "",
    course: params.get("course") || "",
    fileUrl:"",
  });
  const [file, setFile]       = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const sem     = SEMESTERS.find(s => s.id === form.semId);
  const courses = sem?.courses || [];
  const at      = TYPES.find(t => t.value === form.type);

  const submit = async () => {
    if (!form.title || !form.semId || !form.course) {
      setError("Title, semester, and course are required."); return;
    }
    setError(""); setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k,v));
      const [level, term] = form.semId.split(".").map(Number);
      fd.append("level", level); fd.append("term", term);
      if (file) fd.append("file", file);
      await api.post("/resources", fd, { headers:{ "Content-Type":"multipart/form-data" } });
      navigate(`/course/${encodeURIComponent(form.course)}`);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth:640, margin:"0 auto", padding:"1.5rem var(--px) 3rem" }}>
      <div style={{ marginBottom:24 }} className="fade-in">
        <div className="sec-label">Share Knowledge</div>
        <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
          fontSize:"clamp(22px,5vw,34px)",
          letterSpacing:"-0.4px", color:"var(--ink)", marginBottom:8, lineHeight:1.1 }}>
          Submit a Resource
        </h1>
        <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
          color:"var(--ink3)", fontWeight:300, lineHeight:1.7 }}>
          Share materials with the community. All submissions are reviewed before publication.
        </p>
      </div>

      <div className="card" style={{ padding:"clamp(1.25rem,5vw,2rem)",
        borderRadius:"var(--r-xl)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Type */}
          <div className="form-group">
            <label className="form-label">Resource Category</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 }}
              className="type-grid">
              {TYPES.map(t => (
                <button key={t.value} type="button"
                  onClick={() => setForm({...form, type:t.value})}
                  style={{
                    padding:"14px 10px", borderRadius:"var(--r-lg)", cursor:"pointer",
                    border:`2px solid ${form.type===t.value ? t.color : "var(--border)"}`,
                    background: form.type===t.value ? t.bg : "var(--card2)",
                    textAlign:"center",
                    transition:"all 0.18s",
                    transform: form.type===t.value ? "scale(1.02)" : "scale(1)",
                  }}>
                  <span className="ms" style={{ color:form.type===t.value ? t.color : "var(--ink4)", fontSize:26 }}>{t.icon}</span>
                  <div style={{ fontFamily:"var(--display)", fontSize:"var(--fs-sm)",
                    fontWeight:700, marginTop:5,
                    color:form.type===t.value ? t.color : "var(--ink3)" }}>{t.label}</div>
                  <div style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                    color:"var(--ink4)", marginTop:2 }}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Semester */}
          <div className="form-group">
            <label className="form-label">Semester</label>
            <select className="form-input" name="semId" value={form.semId} onChange={handle}>
              <option value="">— Select semester —</option>
              {SEMESTERS.map(s => (
                <option key={s.id} value={s.id}>{s.label} — {s.name}</option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div className="form-group">
            <label className="form-label">Course</label>
            <select className="form-input" name="course" value={form.course}
              onChange={handle} disabled={!form.semId}>
              <option value="">— Select course —</option>
              {courses.map(c => (
                <option key={c.code} value={c.code}>{c.code} — {c.title}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" name="title"
              placeholder="e.g. Introduction to Algorithms — Cormen 4th Ed."
              value={form.title} onChange={handle} />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description
              <span style={{ fontFamily:"var(--body)", fontWeight:300,
                textTransform:"none", letterSpacing:0, marginLeft:6, fontSize:11, opacity:0.6 }}>
                (optional)
              </span>
            </label>
            <textarea className="form-input" name="description" rows={3}
              placeholder="Brief description, chapter range, or intended audience…"
              value={form.description} onChange={handle}
              style={{ resize:"vertical", lineHeight:1.65 }} />
          </div>

          {/* File / URL */}
          {form.type === "video" ? (
            <div className="form-group">
              <label className="form-label">Video URL</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>link</span>
                <input className="form-input" name="fileUrl" type="url"
                  placeholder="https://youtube.com/… or Google Drive link"
                  value={form.fileUrl} onChange={handle} style={{ paddingLeft:40 }} />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">File
                <span style={{ fontFamily:"var(--body)", fontWeight:300,
                  textTransform:"none", letterSpacing:0, marginLeft:6, fontSize:11, opacity:0.6 }}>
                  (PDF · DOC · PPT — max 50 MB)
                </span>
              </label>
              <label style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"14px 16px", cursor:"pointer",
                border:`2px dashed ${file ? at?.color : "var(--border2)"}`,
                borderRadius:"var(--r-lg)",
                background: file ? at?.bg : "var(--card2)",
                transition:"all 0.18s",
                minHeight:56,
              }}>
                <div style={{ width:38, height:38, borderRadius:9, flexShrink:0,
                  background: file ? `${at?.color}18` : "var(--bg2)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="ms" style={{ color:file ? at?.color : "var(--ink4)", fontSize:20 }}>
                    {file ? "check_circle" : "upload_file"}
                  </span>
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:"var(--fs-sm)", color:file ? at?.color : "var(--ink2)",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {file ? file.name : "Choose file to attach"}
                  </p>
                  {!file && <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                    color:"var(--ink4)", marginTop:2 }}>Tap to browse</p>}
                </div>
                <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={e => setFile(e.target.files[0])}
                  style={{ display:"none" }} />
              </label>
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          <div style={{ display:"flex", gap:10, paddingTop:10,
            borderTop:"1.5px solid var(--border)", flexWrap:"wrap" }}>
            <button className="btn btn-primary" onClick={submit} disabled={loading}
              style={{ fontSize:"var(--fs-base)", borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">upload_file</span>
              {loading ? "Submitting…" : "Submit Resource"}
            </button>
            <button className="btn btn-outline" onClick={() => navigate(-1)}
              style={{ fontSize:"var(--fs-sm)", borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">close</span> Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 480px) {
          .type-grid { grid-template-columns: repeat(4,1fr) !important; }
        }
      `}</style>
    </div>
  );
}
