import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

const STATUS_TABS = [
  { key:"pending",  icon:"pending",      label:"Pending Review", color:"#b45309", bg:"#fffbeb" },
  { key:"approved", icon:"check_circle", label:"Approved",       color:"#15803d", bg:"#f0fdf4" },
  { key:"rejected", icon:"cancel",       label:"Rejected",       color:"#b91c1c", bg:"#fef2f2" },
];

const USER_TABS = [
  { key:"pending",  icon:"person_add",   label:"Awaiting Approval", color:"#b45309", bg:"#fffbeb" },
  { key:"approved", icon:"how_to_reg",   label:"Active Students",   color:"#15803d", bg:"#f0fdf4" },
];

const typeIcon  = { book:"menu_book", note:"description", video:"play_circle", question:"quiz" };
const typeColor = {
  book:  { bg:"var(--g50)", c:"var(--g600)" },
  note:  { bg:"#eff6ff",    c:"#1d4ed8"     },
  video: { bg:"#fff7ed",    c:"#c2410c"     },
  other: { bg:"#f5f3ff",    c:"#7c3aed"     },
};

function StatCard({ icon, value, label, color }) {
  return (
    <div className="card" style={{ padding:"1.125rem", display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:44, height:44, borderRadius:11, background:`${color}18`,
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span className="ms" style={{ color, fontSize:24 }}>{icon}</span>
      </div>
      <div>
        <div style={{ fontFamily:"var(--serif)", fontWeight:700,
          fontSize:"clamp(22px,5vw,28px)", color:"var(--ink)", lineHeight:1 }}>{value}</div>
        <div style={{ fontFamily:"var(--sans)", fontSize:"clamp(11px,2.5vw,13px)",
          color:"var(--ink3)", marginTop:4 }}>{label}</div>
      </div>
    </div>
  );
}

export default function AdminPanel({ user }) {
  const [tab,        setTab]        = useState("resources");
  const [resTab,     setResTab]     = useState("pending");
  const [userTab,    setUserTab]    = useState("pending");
  const [stats,      setStats]      = useState(null);
  const [resources,  setResources]  = useState([]);
  const [users,      setUsers]      = useState([]);
  const [resPage,    setResPage]    = useState(1);
  const [userPage,   setUserPage]   = useState(1);
  const [resMeta,    setResMeta]    = useState({ total:0, pages:1 });
  const [userMeta,   setUserMeta]   = useState({ total:0, pages:1 });
  const [loading,    setLoading]    = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [rejectId,   setRejectId]   = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  if (!user || user.role !== "admin") return <Navigate to="/levels" replace />;

  const loadStats = useCallback(() =>
    api.get("/admin/stats").then(({ data }) => setStats(data.data)).catch(() => {}), []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const loadResources = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/resources?status=${resTab}&page=${resPage}&limit=12`);
      setResources(data.data); setResMeta(data.meta);
    } finally { setLoading(false); }
  }, [resTab, resPage]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/admin/users?status=${userTab}&page=${userPage}&limit=12${userSearch ? `&search=${userSearch}` : ""}`
      );
      setUsers(data.data); setUserMeta(data.meta);
    } finally { setLoading(false); }
  }, [userTab, userPage, userSearch]);

  useEffect(() => { if (tab === "resources") loadResources(); }, [tab, loadResources]);
  useEffect(() => { if (tab === "users")     loadUsers();     }, [tab, loadUsers]);

  // Resource actions
  const approve  = async (id) => {
    await api.patch(`/resources/${id}/status`, { status:"approved" });
    loadResources(); loadStats();
  };
  const doReject = async () => {
    if (!rejectId) return;
    await api.patch(`/resources/${rejectId}/status`, { status:"rejected", rejectedReason: rejectReason });
    setRejectId(null); setRejectReason(""); loadResources(); loadStats();
  };
  const deleteRes = async (id) => {
    if (!window.confirm("Permanently delete this resource?")) return;
    await api.delete(`/resources/${id}`); loadResources(); loadStats();
  };

  // User actions — students only
  const approveUser  = async (id) => {
    await api.patch(`/admin/users/${id}/approve`); loadUsers(); loadStats();
  };
  const suspendUser  = async (id) => {
    if (!window.confirm("Suspend this student account?")) return;
    await api.patch(`/admin/users/${id}/suspend`); loadUsers(); loadStats();
  };
  const deleteUser   = async (id) => {
    if (!window.confirm("Permanently delete this student account?")) return;
    await api.delete(`/admin/users/${id}`); loadUsers(); loadStats();
  };

  return (
    <div style={{ maxWidth:"var(--container)", margin:"0 auto", padding:"2rem var(--px) 3.5rem" }}>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <span className="ms lg" style={{ color:"var(--g500)" }}>admin_panel_settings</span>
          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(22px,5vw,30px)",
            fontWeight:700, color:"var(--ink)" }}>Administration Panel</h1>
        </div>
        <p style={{ fontFamily:"var(--body)", fontSize:"clamp(13px,3vw,15px)",
          color:"var(--ink3)", fontWeight:300, lineHeight:1.7 }}>
          Approve student registrations, manage submitted resources, and maintain the academic repository.
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12, marginBottom:32 }}
          className="stats-grid">
          <StatCard icon="pending"       value={stats.pendingUsers}      label="Awaiting Approval"   color="#b45309" />
          <StatCard icon="how_to_reg"    value={stats.activeUsers}       label="Active Students"     color="#15803d" />
          <StatCard icon="pending_actions" value={stats.pendingResources} label="Resources Pending"  color="#b45309" />
          <StatCard icon="check_circle"  value={stats.approvedResources} label="Published Resources" color="#0f5228" />
        </div>
      )}

      {/* Main tabs */}
      <div style={{ display:"flex", borderBottom:"0.5px solid var(--brd)", marginBottom:24 }}>
        {[
          { key:"resources", icon:"folder_open",     label:"Resource Approvals" },
          { key:"users",     icon:"manage_accounts", label:"Student Accounts"   },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            display:"flex", alignItems:"center", gap:6, padding:"10px 18px",
            fontFamily:"var(--sans)", fontSize:"clamp(13px,3vw,14.5px)",
            color: tab===t.key ? "var(--g600)" : "var(--ink3)",
            fontWeight: tab===t.key ? 600 : 400,
            background:"none", border:"none", cursor:"pointer",
            borderBottom: tab===t.key ? "2.5px solid var(--g500)" : "2.5px solid transparent",
            marginBottom:"-0.5px",
          }}>
            <span className="ms sm">{t.icon}</span>
            <span className="hide-xs">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Resources Tab ── */}
      {tab === "resources" && (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
            {STATUS_TABS.map(st => (
              <button key={st.key} onClick={() => { setResTab(st.key); setResPage(1); }} style={{
                display:"flex", alignItems:"center", gap:6, padding:"7px 16px",
                borderRadius:20, fontFamily:"var(--sans)", fontSize:13, fontWeight:500,
                border:`0.5px solid ${resTab===st.key ? st.color : "var(--brd2)"}`,
                background: resTab===st.key ? st.bg : "var(--surface)",
                color: resTab===st.key ? st.color : "var(--ink3)", cursor:"pointer",
              }}>
                <span className="ms sm">{st.icon}</span> {st.label}
                {st.key==="pending" && stats?.pendingResources > 0 && (
                  <span style={{ background:"#b45309", color:"#fff",
                    borderRadius:20, padding:"1px 7px", fontSize:11, fontWeight:700 }}>
                    {stats.pendingResources}
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:100 }} />)}
            </div>
          ) : resources.length === 0 ? (
            <div className="card" style={{ padding:"3rem", textAlign:"center" }}>
              <span className="ms xl" style={{ color:"var(--ink4)" }}>inbox</span>
              <p style={{ fontFamily:"var(--serif)", fontWeight:600, color:"var(--ink)",
                marginTop:12 }}>No {STATUS_TABS.find(s=>s.key===resTab)?.label} Resources</p>
              <p style={{ fontFamily:"var(--body)", fontSize:14, color:"var(--ink3)",
                fontWeight:300, marginTop:6 }}>No resources with this status at the moment.</p>
            </div>
          ) : (
            <>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {resources.map(r => {
                  const tc = typeColor[r.type] || typeColor.other;
                  return (
                    <div key={r._id} className="card" style={{ padding:"1.125rem 1.25rem" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                        <div style={{ width:38, height:38, minWidth:38, borderRadius:9,
                          background:tc.bg, display:"flex", alignItems:"center",
                          justifyContent:"center", flexShrink:0 }}>
                          <span className="ms sm" style={{ color:tc.c }}>
                            {typeIcon[r.type] || "folder_open"}
                          </span>
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(13px,3vw,15px)",
                            fontWeight:700, color:"var(--ink)", marginBottom:4, lineHeight:1.3 }}>
                            {r.title}
                          </p>
                          <p style={{ fontFamily:"var(--sans)", fontSize:12.5,
                            color:"var(--ink3)", fontWeight:300 }}>
                            {r.course} · {r.semId} ·{" "}
                            <span style={{ fontFamily:"var(--mono)", fontSize:11 }}>
                              {r.uploadedBy?.name || "Unknown"}
                            </span>
                            {r.uploadedBy?.studentId && ` (${r.uploadedBy.studentId})`}
                          </p>
                          {r.rejectedReason && (
                            <p style={{ fontFamily:"var(--body)", fontSize:12.5,
                              color:"#b91c1c", background:"#fef2f2",
                              padding:"4px 10px", borderRadius:6,
                              display:"inline-block", marginTop:6, fontStyle:"italic" }}>
                              Reason: {r.rejectedReason}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ display:"flex", gap:8, marginTop:12, paddingTop:10,
                        borderTop:"0.5px solid var(--brd)", flexWrap:"wrap" }}>
                        {r.fileUrl && (
                          <a href={r.fileUrl} target="_blank" rel="noreferrer"
                            style={{ display:"flex", alignItems:"center", gap:5,
                              fontFamily:"var(--sans)", fontSize:12.5, color:"var(--g600)",
                              padding:"5px 12px", borderRadius:7,
                              border:"0.5px solid var(--brd2)", background:"var(--surface)" }}>
                            <span className="ms sm">open_in_new</span> View
                          </a>
                        )}
                        {resTab === "pending" && (
                          <>
                            <button onClick={() => approve(r._id)} style={{
                              display:"flex", alignItems:"center", gap:5,
                              fontFamily:"var(--sans)", fontSize:12.5, color:"#15803d",
                              padding:"5px 14px", borderRadius:7,
                              border:"0.5px solid #bbf7d0", background:"#f0fdf4", cursor:"pointer" }}>
                              <span className="ms sm">check_circle</span> Approve & Publish
                            </button>
                            <button onClick={() => { setRejectId(r._id); setRejectReason(""); }} style={{
                              display:"flex", alignItems:"center", gap:5,
                              fontFamily:"var(--sans)", fontSize:12.5, color:"#b91c1c",
                              padding:"5px 14px", borderRadius:7,
                              border:"0.5px solid #fecaca", background:"#fef2f2", cursor:"pointer" }}>
                              <span className="ms sm">cancel</span> Reject
                            </button>
                          </>
                        )}
                        {resTab === "approved" && (
                          <button onClick={() => { setRejectId(r._id); setRejectReason(""); }} style={{
                            display:"flex", alignItems:"center", gap:5,
                            fontFamily:"var(--sans)", fontSize:12.5, color:"#b45309",
                            padding:"5px 14px", borderRadius:7,
                            border:"0.5px solid #fde68a", background:"#fffbeb", cursor:"pointer" }}>
                            <span className="ms sm">undo</span> Revoke
                          </button>
                        )}
                        <button onClick={() => deleteRes(r._id)} style={{
                          display:"flex", alignItems:"center", gap:5,
                          fontFamily:"var(--sans)", fontSize:12.5, color:"#991b1b",
                          padding:"5px 12px", borderRadius:7,
                          border:"0.5px solid #fecaca", background:"#fff5f5",
                          cursor:"pointer", marginLeft:"auto" }}>
                          <span className="ms sm">delete</span> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {resMeta.pages > 1 && (
                <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:20 }}>
                  <button className="btn btn-outline"
                    onClick={() => setResPage(p=>Math.max(1,p-1))} disabled={resPage===1}>Previous</button>
                  <span style={{ padding:"9px 14px", fontFamily:"var(--sans)",
                    fontSize:13, color:"var(--ink3)" }}>Page {resPage} of {resMeta.pages}</span>
                  <button className="btn btn-outline"
                    onClick={() => setResPage(p=>p+1)} disabled={resPage>=resMeta.pages}>Next</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── Users Tab ── */}
      {tab === "users" && (
        <div>
          {/* User sub-tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
            {USER_TABS.map(ut => (
              <button key={ut.key} onClick={() => { setUserTab(ut.key); setUserPage(1); }} style={{
                display:"flex", alignItems:"center", gap:6, padding:"7px 16px",
                borderRadius:20, fontFamily:"var(--sans)", fontSize:13, fontWeight:500,
                border:`0.5px solid ${userTab===ut.key ? ut.color : "var(--brd2)"}`,
                background: userTab===ut.key ? ut.bg : "var(--surface)",
                color: userTab===ut.key ? ut.color : "var(--ink3)", cursor:"pointer",
              }}>
                <span className="ms sm">{ut.icon}</span> {ut.label}
                {ut.key==="pending" && stats?.pendingUsers > 0 && (
                  <span style={{ background:"#b45309", color:"#fff",
                    borderRadius:20, padding:"1px 7px", fontSize:11, fontWeight:700 }}>
                    {stats.pendingUsers}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position:"relative", marginBottom:18 }}>
            <span className="ms sm" style={{ position:"absolute", left:13, top:"50%",
              transform:"translateY(-50%)", color:"var(--ink4)", pointerEvents:"none" }}>search</span>
            <input className="form-input" placeholder="Search by name, email, or student ID…"
              value={userSearch}
              onChange={e => { setUserSearch(e.target.value); setUserPage(1); }}
              style={{ paddingLeft:38 }} />
          </div>

          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:72 }} />)}
            </div>
          ) : users.length === 0 ? (
            <div className="card" style={{ padding:"3rem", textAlign:"center" }}>
              <span className="ms xl" style={{ color:"var(--ink4)" }}>person_search</span>
              <p style={{ fontFamily:"var(--serif)", fontWeight:600, color:"var(--ink)", marginTop:12 }}>
                No Students Found
              </p>
              <p style={{ fontFamily:"var(--body)", fontSize:14, color:"var(--ink3)",
                fontWeight:300, marginTop:6 }}>
                {userTab === "pending"
                  ? "No students are currently awaiting approval."
                  : "No active students found."}
              </p>
            </div>
          ) : (
            <>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {users.map(u => (
                  <div key={u._id} className="card"
                    style={{ padding:"1rem 1.25rem", display:"flex",
                      alignItems:"center", gap:12, flexWrap:"wrap" }}>

                    {/* Avatar */}
                    <div style={{ width:42, height:42, minWidth:42, borderRadius:"50%",
                      background: u.isApproved ? "var(--g50)" : "#fffbeb",
                      border:`1px solid ${u.isApproved ? "var(--g100)" : "#fde68a"}`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:16, fontWeight:700,
                      color: u.isApproved ? "var(--g600)" : "#b45309", flexShrink:0 }}>
                      {u.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div style={{ flex:1, minWidth:120 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7,
                        flexWrap:"wrap", marginBottom:3 }}>
                        <p style={{ fontFamily:"var(--serif)", fontSize:"clamp(13px,3vw,15px)",
                          fontWeight:700, color:"var(--ink)" }}>{u.name}</p>
                        {!u.isApproved && (
                          <span style={{ fontFamily:"var(--sans)", fontSize:10,
                            padding:"2px 8px", borderRadius:20,
                            background:"#fffbeb", color:"#b45309",
                            border:"0.5px solid #fde68a", fontWeight:700 }}>
                            PENDING
                          </span>
                        )}
                        {u.isApproved && !u.isActive && (
                          <span style={{ fontFamily:"var(--sans)", fontSize:10,
                            padding:"2px 8px", borderRadius:20,
                            background:"#fef2f2", color:"#b91c1c",
                            border:"0.5px solid #fecaca", fontWeight:700 }}>
                            SUSPENDED
                          </span>
                        )}
                      </div>
                      <p style={{ fontFamily:"var(--sans)", fontSize:12.5,
                        color:"var(--ink3)", fontWeight:300 }}>
                        {u.email}
                        {u.studentId && (
                          <span style={{ fontFamily:"var(--mono)", marginLeft:8,
                            fontSize:11, color:"var(--g600)" }}>{u.studentId}</span>
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                      {!u.isApproved && (
                        <button onClick={() => approveUser(u._id)} style={{
                          display:"flex", alignItems:"center", gap:5,
                          fontFamily:"var(--sans)", fontSize:12.5, color:"#15803d",
                          padding:"6px 14px", borderRadius:8, cursor:"pointer",
                          border:"0.5px solid #bbf7d0", background:"#f0fdf4" }}>
                          <span className="ms sm">how_to_reg</span> Approve
                        </button>
                      )}
                      {u.isApproved && (
                        <button onClick={() => suspendUser(u._id)} style={{
                          display:"flex", alignItems:"center", gap:5,
                          fontFamily:"var(--sans)", fontSize:12.5, color:"#b45309",
                          padding:"6px 14px", borderRadius:8, cursor:"pointer",
                          border:"0.5px solid #fde68a", background:"#fffbeb" }}>
                          <span className="ms sm">block</span> Suspend
                        </button>
                      )}
                      <button onClick={() => deleteUser(u._id)} style={{
                        display:"flex", alignItems:"center", gap:5,
                        fontFamily:"var(--sans)", fontSize:12.5, color:"#991b1b",
                        padding:"6px 12px", borderRadius:8, cursor:"pointer",
                        border:"0.5px solid #fecaca", background:"#fef2f2" }}>
                        <span className="ms sm">person_remove</span> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {userMeta.pages > 1 && (
                <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:20 }}>
                  <button className="btn btn-outline"
                    onClick={() => setUserPage(p=>Math.max(1,p-1))} disabled={userPage===1}>Previous</button>
                  <span style={{ padding:"9px 14px", fontFamily:"var(--sans)",
                    fontSize:13, color:"var(--ink3)" }}>Page {userPage} of {userMeta.pages}</span>
                  <button className="btn btn-outline"
                    onClick={() => setUserPage(p=>p+1)} disabled={userPage>=userMeta.pages}>Next</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Reject modal */}
      {rejectId && (
        <div style={{ position:"fixed", inset:0, background:"rgba(3,26,12,0.55)",
          zIndex:200, display:"flex", alignItems:"center",
          justifyContent:"center", padding:"1rem" }}>
          <div className="card" style={{ width:"100%", maxWidth:460, padding:"2rem" }}>
            <h3 style={{ fontFamily:"var(--serif)", fontSize:22, fontWeight:700,
              color:"var(--ink)", marginBottom:6 }}>Reject Submission</h3>
            <p style={{ fontFamily:"var(--body)", fontSize:14, color:"var(--ink3)",
              fontWeight:300, lineHeight:1.7, marginBottom:18 }}>
              Provide an optional reason for rejection. This will be recorded with the resource.
            </p>
            <div className="form-group" style={{ marginBottom:18 }}>
              <label className="form-label">Rejection Reason (optional)</label>
              <textarea className="form-input" rows={3}
                placeholder="e.g. Duplicate resource, incorrect course, insufficient quality…"
                value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                style={{ resize:"vertical" }} />
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={doReject} style={{
                display:"flex", alignItems:"center", gap:7,
                padding:"10px 20px", borderRadius:"var(--r-md)",
                background:"#b91c1c", color:"#fff", border:"none",
                fontFamily:"var(--sans)", fontSize:14, fontWeight:500, cursor:"pointer" }}>
                <span className="ms sm">cancel</span> Confirm Rejection
              </button>
              <button onClick={() => setRejectId(null)} className="btn btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@media (max-width:540px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </div>
  );
}
