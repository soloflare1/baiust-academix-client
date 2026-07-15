import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    name:"", email:"", studentId:"", password:""
  });
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.email || !form.studentId || !form.password) {
      setError("All fields are required. Please fill in the complete form."); return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long."); return;
    }
    setError(""); setLoading(true);
    try {
      await api.post("/auth/register", form);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (msg.toLowerCase().includes("pending") || msg.toLowerCase().includes("approval")) {
        setSuccess(true);
      } else {
        setError(msg || "Registration failed. Please verify your details and try again.");
      }
    } finally { setLoading(false); }
  };

  if (success) return (
    <div style={{ minHeight:"calc(100vh - var(--nav-h))",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem var(--px)", background:"var(--bg)" }}>
      <div style={{ width:"100%", maxWidth:460, textAlign:"center" }} className="fade-in">
        <div style={{ width:68, height:68, borderRadius:"50%",
          background:"linear-gradient(135deg,var(--mint),var(--glow))",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 20px",
          boxShadow:"0 6px 20px rgba(46,184,92,0.28)" }}>
          <span className="ms xl fill" style={{ color:"var(--forest)", fontSize:32 }}>
            how_to_reg
          </span>
        </div>
        <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
          fontSize:"var(--fs-xl)", color:"var(--ink)",
          marginBottom:14, letterSpacing:"-0.4px" }}>
          Registration Submitted
        </h2>
        <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
          color:"var(--ink3)", lineHeight:1.78,
          fontWeight:300, marginBottom:10, maxWidth:380, margin:"0 auto 10px" }}>
          Your registration request has been submitted successfully.
        </p>
        <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
          color:"var(--ink2)", lineHeight:1.78, fontWeight:400,
          marginBottom:28, maxWidth:380, margin:"0 auto 28px" }}>
          Your account is <strong style={{ color:"var(--leaf)" }}>pending administrator approval</strong>.
          You will be able to sign in once your account has been reviewed and activated.
        </p>
        <Link to="/login" className="btn btn-primary"
          style={{ fontSize:"var(--fs-base)", padding:"12px 28px" }}>
          <span className="ms sm">login</span> Return to Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"calc(100vh - var(--nav-h))",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem var(--px)", background:"var(--bg)" }}>

      <div style={{ position:"fixed", top:"-10%", left:"-5%",
        width:"min(400px,80vw)", height:"min(400px,80vw)", borderRadius:"50%",
        background:"radial-gradient(circle,rgba(46,184,92,0.06) 0%,transparent 70%)",
        pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:440 }} className="fade-in">

        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
            <Logo size="md" />
          </div>
          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"var(--fs-xl)", color:"var(--ink)",
            marginBottom:8, letterSpacing:"-0.4px" }}>
            Student Registration
          </h1>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.65 }}>
            Register to request access to the BAIUST Academix platform.
            All registrations are subject to administrator approval.
          </p>
        </div>

        <div className="card" style={{ padding:"clamp(1.25rem,5vw,2rem)",
          borderRadius:"var(--r-xl)" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>person</span>
                <input className="form-input" name="name" type="text"
                  autoComplete="name"
                  placeholder="As per university records"
                  value={form.name} onChange={handle}
                  onKeyDown={e => e.key==="Enter" && submit()}
                  style={{ paddingLeft:42 }} />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
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

            {/* Student ID */}
            <div className="form-group">
              <label className="form-label">Student ID *</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>badge</span>
                <input className="form-input" name="studentId" type="text"
                  autoComplete="off"
                  placeholder="e.g. 1118005"
                  value={form.studentId} onChange={handle}
                  onKeyDown={e => e.key==="Enter" && submit()}
                  style={{ paddingLeft:42 }} />
              </div>
              <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                color:"var(--ink4)", marginTop:4 }}>
                Enter your official BAIUST student ID number.
              </p>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <div style={{ position:"relative" }}>
                <span className="ms sm" style={{ position:"absolute", left:14,
                  top:"50%", transform:"translateY(-50%)",
                  color:"var(--ink4)", pointerEvents:"none" }}>lock</span>
                <input className="form-input" name="password" type="password"
                  autoComplete="new-password"
                  placeholder="Minimum 8 characters"
                  value={form.password} onChange={handle}
                  onKeyDown={e => e.key==="Enter" && submit()}
                  style={{ paddingLeft:42 }} />
              </div>
              <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                color:"var(--ink4)", marginTop:4 }}>
                Choose a strong password of at least 8 characters.
              </p>
            </div>

            {error && (
              <div className="error-box">
                <span className="ms sm" style={{ color:"#991b1b", flexShrink:0 }}>error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Approval notice */}
            <div style={{ background:"var(--pale)", border:"1px solid rgba(26,122,60,0.18)",
              borderRadius:"var(--r-md)", padding:"10px 14px",
              display:"flex", alignItems:"flex-start", gap:8 }}>
              <span className="ms sm" style={{ color:"var(--leaf)", flexShrink:0, marginTop:1 }}>
                info
              </span>
              <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-xs)",
                color:"var(--ink3)", lineHeight:1.65 }}>
                Your account will be activated after review by the platform administrator.
                You will not be able to sign in until your registration is approved.
              </p>
            </div>

            <button className="btn btn-primary" onClick={submit} disabled={loading}
              style={{ width:"100%", marginTop:4, fontSize:"var(--fs-base)",
                borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">{loading ? "progress_activity" : "person_add"}</span>
              {loading ? "Submitting Registration…" : "Submit Registration"}
            </button>
          </div>
        </div>

        <p style={{ marginTop:18, textAlign:"center",
          fontFamily:"var(--body)", fontSize:"var(--fs-sm)", color:"var(--ink3)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color:"var(--leaf)", fontWeight:700,
            fontFamily:"var(--display)" }}>Sign in here</Link>
        </p>
      </div>
    </div>
  );
}