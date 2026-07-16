import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

export default function Login({ onLogin }) {
  const [form, setForm]       = useState({ email:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isAdmin   = location.pathname === "/admin/login";

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.email || !form.password) {
      setError("Please enter your email address and password."); return;
    }
    setError(""); setLoading(true);
    try { await onLogin(form.email, form.password); navigate("/levels"); }
    catch (err) { setError(err.response?.data?.message || "Incorrect email or password. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"calc(100vh - var(--nav-h))",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem var(--px)", background:"var(--bg)" }}>

      <div style={{ width:"100%", maxWidth:420 }} className="fade-in">

        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
            <Logo size="md" />
          </div>
          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"var(--fs-xl)", color:"var(--ink)",
            marginBottom:8, letterSpacing:"-0.4px" }}>
            {isAdmin ? "Administrator Sign In" : "Sign In to Academix"}
          </h1>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.65 }}>
            {isAdmin
              ? "Sign in with your administrator credentials to access the admin panel."
              : "Use your registered BAIUST student credentials to access the platform."}
          </p>
        </div>

        <div className="card" style={{ padding:"clamp(1.25rem,5vw,2rem)",
          borderRadius:"var(--r-xl)" }}>

          {isAdmin && (
            <div style={{ background:"#fffbeb", border:"1px solid #fde68a",
              borderRadius:"var(--r-md)", padding:"10px 14px", marginBottom:18,
              display:"flex", alignItems:"center", gap:8 }}>
              <span className="ms sm" style={{ color:"#d4a017", flexShrink:0 }}>
                admin_panel_settings
              </span>
              <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                color:"#92400e", lineHeight:1.65 }}>
                You are signing in as an administrator. This area is restricted.
              </p>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>mail</span>
                <input className="form-input" name="email" type="email"
                  autoComplete="email"
                  placeholder="Enter your registered email"
                  value={form.email} onChange={handle}
                  onKeyDown={e => e.key==="Enter" && submit()}
                  style={{ paddingLeft:42 }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>lock</span>
                <input className="form-input" name="password" type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password} onChange={handle}
                  onKeyDown={e => e.key==="Enter" && submit()}
                  style={{ paddingLeft:42 }} />
              </div>
            </div>

            {!isAdmin && (
              <div style={{ background:"var(--pale)", border:"1px solid rgba(26,122,60,0.18)",
                borderRadius:"var(--r-md)", padding:"10px 14px",
                display:"flex", alignItems:"flex-start", gap:8 }}>
                <span className="ms sm" style={{ color:"var(--leaf)", flexShrink:0, marginTop:1 }}>info</span>
                <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                  color:"var(--ink3)", lineHeight:1.65 }}>
                  New registrations require administrator approval before sign-in is permitted.
                </p>
              </div>
            )}

            {error && (
              <div className="error-box">
                <span className="ms sm" style={{ color:"#991b1b", flexShrink:0 }}>error</span>
                <span>{error}</span>
              </div>
            )}

            <button className="btn btn-primary" onClick={submit} disabled={loading}
              style={{ width:"100%", marginTop:4, fontSize:"var(--fs-base)",
                borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">{loading ? "progress_activity" : "login"}</span>
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {!isAdmin ? (
              <Link to="/admin/login" style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                padding:"10px", borderRadius:"var(--r-md)",
                border:"1px dashed rgba(212,160,23,0.40)",
                background:"rgba(212,160,23,0.04)",
                fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
                fontWeight:600, color:"#92400e",
                textDecoration:"none",
                transition:"all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(212,160,23,0.10)"; e.currentTarget.style.borderColor="rgba(212,160,23,0.60)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(212,160,23,0.04)"; e.currentTarget.style.borderColor="rgba(212,160,23,0.40)"; }}
              >
                <span className="ms sm" style={{ color:"#d4a017" }}>admin_panel_settings</span>
                Administrator Sign In
              </Link>
            ) : (
              <Link to="/login" style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                padding:"10px", borderRadius:"var(--r-md)",
                border:"1px dashed var(--border2)",
                background:"var(--card2)",
                fontFamily:"var(--display)", fontSize:"var(--fs-xs)",
                fontWeight:600, color:"var(--ink3)",
                textDecoration:"none",
                transition:"all 0.15s",
              }}>
                <span className="ms sm">arrow_back</span>
                Back to Student Sign In
              </Link>
            )}
          </div>
        </div>

        <p style={{ marginTop:18, textAlign:"center",
          fontFamily:"var(--body)", fontSize:"var(--fs-sm)", color:"var(--ink3)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color:"var(--leaf)", fontWeight:700,
            fontFamily:"var(--display)" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}