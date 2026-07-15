import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Login({ onLogin }) {
  const [form, setForm]       = useState({ email:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      <div style={{ position:"fixed", top:"-15%", right:"-8%",
        width:"min(400px,80vw)", height:"min(400px,80vw)", borderRadius:"50%",
        background:"radial-gradient(circle,rgba(46,184,92,0.07) 0%,transparent 70%)",
        pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:420 }} className="fade-in">

        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
            <Logo size="md" />
          </div>
          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"var(--fs-xl)", color:"var(--ink)",
            marginBottom:8, letterSpacing:"-0.4px" }}>
            Sign In to Academix
          </h1>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.65 }}>
            Use your registered BAIUST student credentials to access the platform.
          </p>
        </div>

        <div className="card" style={{ padding:"clamp(1.25rem,5vw,2rem)",
          borderRadius:"var(--r-xl)" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>mail</span>
                <input className="form-input" name="email" type="email"
                  autoComplete="email"
                  placeholder="name@gmail.com"
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

            {/* Approval info box */}
            <div style={{ background:"var(--pale)", border:"1px solid rgba(26,122,60,0.18)",
              borderRadius:"var(--r-md)", padding:"10px 14px",
              display:"flex", alignItems:"flex-start", gap:8 }}>
              <span className="ms sm" style={{ color:"var(--leaf)", flexShrink:0, marginTop:1 }}>
                info
              </span>
              <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                color:"var(--ink3)", lineHeight:1.65 }}>
                New registrations require administrator approval before sign-in is permitted.
              </p>
            </div>

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